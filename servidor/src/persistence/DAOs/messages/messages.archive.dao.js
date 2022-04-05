const ContenedorArchivo = require('../../../containers/archive.container');

class MessagesDaoArchivo extends ContenedorArchivo {
    constructor() {
        super('DB/messages.json');

        this.messages = this.readFile();
    }

    async create(newMessage) {
        try {
            const messages = await this.readFile();

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

            await this.writeFile(messages);

            return newMessage;
        } catch (error) {
            throw error;
        }
    }

    async getAll() {
        try {
            return await this.readFile();
        } catch (error) {
            throw error;
        }
    }

    async getAllByEmail(email) {
        try {
            const messages = await this.readFile();

            const filterMessages = messages.filter((message) => message.email === email);

            return filterMessages;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = MessagesDaoArchivo;