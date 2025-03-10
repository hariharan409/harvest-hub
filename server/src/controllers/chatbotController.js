const { sendResponse } = require("../utils/apiResponse");
const chatbotService = require("../services/chatbotService");


exports.getChatResponseFromRAG = async(request,response) => {
    try {
        const {query} = request.query;
        if(!query) {
            throw new Error("The input data cannot be empty");
        }
        const data = await chatbotService.getChatResponseFromRAG(query);
        sendResponse(response,200,true,"chat bot response",data);
    } catch (error) {
        sendResponse(response,500,false,error.message || error,null);
    }
}