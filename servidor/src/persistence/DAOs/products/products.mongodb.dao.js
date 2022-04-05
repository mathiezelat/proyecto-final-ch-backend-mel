const ContenedorMongoDB = require('../../../containers/mongodb.container');

const Product = require('../../models/product');

class ProductosDaoMongoDB extends ContenedorMongoDB {
    constructor() {
        super(Product);
    }
}

module.exports = ProductosDaoMongoDB;
