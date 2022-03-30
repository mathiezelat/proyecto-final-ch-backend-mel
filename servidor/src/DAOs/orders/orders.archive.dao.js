const ContenedorArchivo = require('../../containers/archive.container');

class OrdersDaoArchivo extends ContenedorArchivo {
    constructor() {
        super('DB/orders.json');

        this.orders = this.readFile();
    }

    async count() {
        try {
            const orders = await this.readFile();
            return orders.length;
        } catch (error) {
            throw error;
        }
    }

    async create(newOrder) {
        try {
            const orders = await this.readFile();

            if (!orders.length) {
                newOrder._id = '1';
            } else {
                newOrder._id = (Number(orders[orders.length - 1]._id) + 1).toString();
            }

            newOrder.orderNumber = await this.count() + 1;
            newOrder.estado = 'generada';
            newOrder.timestamp = new Date();

            orders.push(newOrder);

            await this.writeFile(orders);

            return newOrder;
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

    async getById(id) {
        try {
            const orders = await this.readFile();

            const order = orders.find((order) => order._id === id);

            return order;
        } catch (error) {
            throw error;
        }
    }

    async getAllByEmail(email) {
        try {
            const orders = await this.readFile();

            const filterOrders = orders.filter((order) => order.email === email);

            return filterOrders;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = OrdersDaoArchivo;
