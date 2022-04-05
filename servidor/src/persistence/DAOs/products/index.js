const ProductsDaoMemory = require('./products.memory.dao');
const ProductsDaoArchive = require('./products.archive.dao');
const ProductsDaoMongoDB = require('./products.mongodb.dao');

module.exports = {
    ProductsDaoMemory,
    ProductsDaoArchive,
    ProductsDaoMongoDB,
}