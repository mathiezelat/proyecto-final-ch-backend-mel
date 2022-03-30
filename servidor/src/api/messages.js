const MessagesRepo = require('../repository/messages.repository');

const messagesApi = new MessagesRepo();

const createMessage = async(newMessage) => {
    try {
        return await messagesApi.createMessage(newMessage);
    } catch (error) {
        throw error;
    }
};

const getAllMessages = async () => {
    try {
        return await messagesApi.getAllMessages();
    } catch (error) {
        throw error;
    }
};

const getAllMessagesByEmail = async (email) => {
    try {
        return await messagesApi.getAllMessagesByEmail(email);
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createMessage,
    getAllMessages,
    getAllMessagesByEmail,
}