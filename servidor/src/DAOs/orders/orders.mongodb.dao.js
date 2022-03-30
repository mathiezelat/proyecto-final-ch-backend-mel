const ContenedorMongoDB = require('../../containers/mongodb.container');

const Order = require('../../models/order');

class OrdersDaoMongoDB extends ContenedorMongoDB {
    constructor() {
        super(Order);
    }

    async create(object) {
        try {
            object.orderNumber = await this.model.count() + 1;
            const created = await this.model.create(object);
            return created;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = OrdersDaoMongoDB;
