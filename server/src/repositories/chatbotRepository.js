const { CropRecord } = require("../models/cropRecordModel");
const embeddingService = require("../services/embeddingService");
const {HfInference} = require("@huggingface/inference");
const hf = new HfInference(process.env.HUGGING_FACE_TOKEN || "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");

exports.getChatResponseFromRAG = async(query) => {
    try {
        // generate embedding for the user query
        const queryEmbedding = await embeddingService.generateEmbedding(query);
        // Use mongoDB's `$vectorSearch`
        const result = await CropRecord.aggregate([
            {
                $vectorSearch: {
                    index: "default",  // The name of the vector search index
                    path: "embedding", // The field where embeddings are stored
                    queryVector: queryEmbedding,
                    numCandidates: 200,       // Number of candidates to fetch before filtering
                    limit: 10                 // Get the most relevant crop record
                }
            },
        ]);

         // Calculate the cosine similarity score for each result
         const resultsWithScores = result.map(item => {
            const score = embeddingService.cosineSimilarity(queryEmbedding, item.embedding);
            return { ...item, score };
        });

        const finalResponse = await generateRagResponse(resultsWithScores,query); 
        return finalResponse;
    } catch (error) {
        throw new Error(error.message || error);
    }
}

const generateRagResponse = async(cropRecordList,userPrompt) => {
    // combine relevant crop data into a structured format
    const cropData = cropRecordList.map(crop => `
        Crop ID: ${crop.cropID}
        Status: ${crop.status}
        Planting Date: ${crop.plantingDate.toISOString().split("T")[0]}
        Work Details: ${JSON.stringify(crop.workDetails)}
      `).join("\n");

      const prompt = `
        JSON Data:
        (${cropData})

        QUESTION:
        (${userPrompt})

        INSTRUCTIONS:
        Answer the users QUESTION using the JSON DATA above.
        Keep your answer ground in the facts of the JSON.
        If the JSON doesn’t contain the facts to answer the QUESTION return {NONE}
        You are given a relevant data about farming. Answer the question only based on this information. Do not use any additional information.
        Only give me one word answer.
    `;

    const chatCompletion = await hf.chatCompletion({
        model: "meta-llama/Llama-3.2-3B-Instruct",
        messages: [
            {
                role: "user",
                content: prompt
            }
        ],
        provider: "sambanova",
        temperature: 0.5,
        max_tokens: 2048,
        top_p: 0.7,

    });
    
    console.log(chatCompletion.choices[0].message);
    return chatCompletion.choices[0].message;    
}