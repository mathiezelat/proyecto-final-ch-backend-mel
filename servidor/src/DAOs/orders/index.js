const OrdersDaoMemory = require('./orders.memory.dao');
const OrdersDaoArchive = require('./orders.archive.dao');
const OrdersDaoMongoDB = require('./orders.mongodb.dao');

module.exports = {
    OrdersDaoMemory,
    OrdersDaoArchive,
    OrdersDaoMongoDB,
}