const MessagesRepo = require('../repository/messages.repository');

const messagesApi = new MessagesRepo();

const createMessage = async(newMessage) => {
    try {
        return messagesApi.createMessage(newMessage);
    } catch (error) {
        throw error;
    }
};

const getAllMessages = async () => {
    try {
        return messagesApi.getAllMessages();
    } catch (error) {
        throw error;
    }
};

const getAllMessagesByEmail = async (email) => {
    try {
        return messagesApi.getAllMessagesByEmail(email);
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createMessage,
    getAllMessages,
    getAllMessagesByEmail,
}