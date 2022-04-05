const CartsDaoMemory = require('./carts.memory.dao');
const CartsDaoArchive = require('./carts.archive.dao');
const CartsDaoMongoDB = require('./carts.mongodb.dao');

module.exports = {
    CartsDaoMemory,
    CartsDaoArchive,
    CartsDaoMongoDB,
}
