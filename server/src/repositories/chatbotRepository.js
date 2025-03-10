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
            // {
            //     // Project specific columns (fields) in the result
            //     $project: {
            //         status: 1,        // Include status
            //         embedding: 1
            //     }
            // }
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
        Expense Details: ${JSON.stringify(crop.expenseList)}
      `).join("\n");

      const prompt = `
        You are an AI that provides structured responses based on farming data.
        
        Relevant Data:
        ${cropData}

        User Query: "${userPrompt}"
        
        Format the response naturally based on the user's query.
        AI Response:
    `;

    const result = await hf.textGeneration({
        model: "gpt2",
        inputs: prompt,
        parameters: { 
            max_new_tokens: 200,
            temperature: 0.8,  // Increase randomness (default is 1.0)
            top_p: 0.9,        // Use nucleus sampling
            repetition_penalty: 1.2, // Penalize word repetition
            do_sample: true,   // Enable sampling for varied responses
        },
    });

    console.log(result)
    
    return result.generated_text.replace(prompt, "").trim();
}