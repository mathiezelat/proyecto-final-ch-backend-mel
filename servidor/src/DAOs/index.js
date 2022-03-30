const { PERSISTENCE } = require('../config');

const { 
    CartsDaoMemory, 
    CartsDaoArchive, 
    CartsDaoMongoDB,
} = require('./carts');

const {
    OrdersDaoMemory,
    OrdersDaoArchive,
    OrdersDaoMongoDB,
} = require('./orders');

const {
    ProductsDaoMemory,
    ProductsDaoArchive,
    ProductsDaoMongoDB,
} = require('./products');

const { 
    UsersDaoMemory, 
    UsersDaoArchive, 
    UsersDaoMongoDB,
} = require('./users');

const {
    MessagesDaoMemory,
    MessagesDaoArchive,
    MessagesDaoMongoDB,
} = require('./messages');

class PersistanceFactory {
    constructor(persistence) {
        switch (persistence) {
            case 'archivo':
                return {
                    productsDao: new ProductsDaoArchive(),
                    cartsDao: new CartsDaoArchive(),
                    usersDao: new UsersDaoArchive(),
                    ordersDao: new OrdersDaoArchive(),
                    messagesDao: new MessagesDaoArchive(),
                };
            case 'mongo':
                return {
                    productsDao: new ProductsDaoMongoDB(),
                    cartsDao: new CartsDaoMongoDB(),
                    usersDao: new UsersDaoMongoDB(),
                    ordersDao: new OrdersDaoMongoDB(),
                    messagesDao: new MessagesDaoMongoDB(),
                };
            case 'memoria':
            default:
                return {
                    productsDao: new ProductsDaoMemory(),
                    cartsDao: new CartsDaoMemory(),
                    usersDao: new UsersDaoMemory(),
                    ordersDao: new OrdersDaoMemory(),
                    messagesDao: new MessagesDaoMemory(),
                };
        }
    }
}

module.exports = new PersistanceFactory(PERSISTENCE);
