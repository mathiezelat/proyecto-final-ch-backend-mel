const UsersDaoMemory = require('./users.memory.dao');
const UsersDaoArchive = require('./users.archive.dao');
const UsersDaoMongoDB = require('./users.mongodb.dao');

module.exports = {
    UsersDaoMemory,
    UsersDaoArchive,
    UsersDaoMongoDB,
}