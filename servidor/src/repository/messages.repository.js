const MessageDto = require('../persistence/DTOs/message.dto');

const { messagesDao } = require('../persistence/DAOs');

class MessagesRepo {
    constructor() {
        this.dao = messagesDao;
    }
    
    async createMessage(newMessage) {
        try {
            const message = await this.dao.create(newMessage);
            const messageDto = new MessageDto(message);
            return messageDto;
        } catch (error) {
            throw error;
        }
    }

    async getAllMessages() {
        try {
            const messages = await this.dao.getAll();
            const messagesDto = messages.map((message) => {
                const messageDto = new MessageDto(message);
                return messageDto;
            });
            return messagesDto;
        } catch (error) {
            throw error;
        }
    }

    async getAllMessagesByEmail(email) {
        try {
            const messages = await this.dao.getAllByEmail(email);
            const messagesDto = messages.map((message) => {
                const messageDto = new MessageDto(message);
                return messageDto;
            });
            return messagesDto;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = MessagesRepo;