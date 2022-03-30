const ContenedorMemoria = require('../../containers/memory.container');

class OrdersDaoMemoria extends ContenedorMemoria {
    constructor() {
        super('orders');

        this.orders = this.data;
    }

    count() {
        try {
            const orders = this.read();
            return orders.length;
        } catch (error) {
            throw error;
        }
    }

    create(newOrder) {
        try {
            const orders = this.read();

            if (!orders.length) {
                newOrder._id = '1';
            } else {
                newOrder._id = (Number(orders[orders.length - 1]._id) + 1).toString();
            }

            newOrder.orderNumber = this.count() + 1;
            newOrder.estado = 'generada';
            newOrder.timestamp = new Date();

            orders.push(newOrder);

            this.write(orders);

            return newOrder;
        } catch (error) {
            throw error;
        }
    }

    getAll() {
        try {
            return this.read();
        } catch (error) {
            throw error;
        }
    }

    getById(id) {
        try {
            const orders = this.read();

            const order = orders.find((order) => order._id === id);
            
            return order;
        } catch (error) {
            throw error;
        }
    }

    getAllByEmail(email) {
        try {
            const orders = this.read();

            const filterOrders = orders.filter((order) => order.email === email);

            return filterOrders;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = OrdersDaoMemoria;
