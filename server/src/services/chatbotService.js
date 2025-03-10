const chatbotRepository = require("../repositories/chatbotRepository");

exports.getChatResponseFromRAG = async(query) => {
    try {
        return await chatbotRepository.getChatResponseFromRAG(query);
    } catch (error) {
        throw new Error(error.message || error);
    }
}