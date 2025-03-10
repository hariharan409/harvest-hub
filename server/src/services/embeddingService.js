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
        console.log(error.message || error);
        throw new Error(error.message || error);
    }
}

module.exports = {
    generateEmbedding
}