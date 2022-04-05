const ContenedorMemoria = require('../../../containers/memory.container');

class MessagesDaoMemoria extends ContenedorMemoria {
    constructor() {
        super('messages');

        this.messages = this.data;
    }

    create(newMessage) {
        try {
            const messages = this.read();

            if (!messages.length) {
                newMessage._id = '1';
            } else {
                newMessage._id = (
                    Number(messages[messages.length - 1]._id) + 1
                ).toString();
            }

            newMessage.timestamp = new Date();
            newMessage.type = newMessage.type || 'sistema';

            orders.push(newMessage);

            this.write(messages);

            return newMessage;
        } catch (error) {
            throw error;
        }
    }

    getAll() {
        try {
            return this.read();
        } catch (error) {
            throw error;
        }
    }

    getAllByEmail(email) {
        try {
            const messages = this.read();

            const filterMessages = messages.filter((message) => message.email === email);

            return filterMessages;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = MessagesDaoMemoria;
