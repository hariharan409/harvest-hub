const { CropRecord } = require("../models/cropRecordModel");
const embeddingService = require("../services/embeddingService");

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
            {
                // Project specific columns (fields) in the result
                $project: {
                    status: 1,        // Include status
                    embedding: 1
                }
            }
        ]);

         // Calculate the cosine similarity score for each result
         const resultsWithScores = result.map(item => {
            const score = embeddingService.cosineSimilarity(queryEmbedding, item.embedding);
            return { status: item.status, score };
        });

        return resultsWithScores.length > 0 ? resultsWithScores : "We don't have that data at the moment";
    } catch (error) {
        throw new Error(error.message || error);
    }
}