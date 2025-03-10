const {HfInference} = require("@huggingface/inference");

const hf = new HfInference(process.env.HUGGING_FACE_TOKEN || "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");

const generateEmbedding = async(text) => {
    try {
        const result = await hf.featureExtraction({
            model: "sentence-transformers/all-MiniLM-L6-v2", 
            inputs: text,
        });
        return result;  // The resulting embedding vector for the text
    } catch (error) {
        throw new Error(error.message || error);
    }
}

const cosineSimilarity = (vecA, vecB) => {
    const dotProduct = vecA.reduce((acc, val, index) => acc + val * vecB[index], 0);
    const magnitudeA = Math.sqrt(vecA.reduce((acc, val) => acc + val * val, 0));
    const magnitudeB = Math.sqrt(vecB.reduce((acc, val) => acc + val * val, 0));

    if (magnitudeA && magnitudeB) {
        return dotProduct / (magnitudeA * magnitudeB);
    }
    return 0;
};

module.exports = {
    generateEmbedding,
    cosineSimilarity
}