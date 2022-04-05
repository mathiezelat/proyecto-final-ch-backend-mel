const MessagesDaoMemory = require('./messages.memory.dao');
const MessagesDaoArchive = require('./messages.archive.dao');
const MessagesDaoMongoDB = require('./messages.mongodb.dao')

module.exports = {
    MessagesDaoMemory,
    MessagesDaoArchive,
    MessagesDaoMongoDB,
}