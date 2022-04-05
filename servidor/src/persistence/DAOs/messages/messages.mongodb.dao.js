const ContenedorMongoDB = require('../../../containers/mongodb.container');

const Message = require('../../models/message');

class MessagesDaoMongoDB extends ContenedorMongoDB {
    constructor() {
        super(Message);
    }
};

module.exports = MessagesDaoMongoDB;