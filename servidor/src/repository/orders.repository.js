const OrderDto = require('../DTOs/order.dto');
const { ordersDao } = require('../DAOs');

class OrdersRepo {
    constructor() {
        this.dao = ordersDao;
    }

    async createOrder (newOrder) {
        try {
            const order = await this.dao.create(newOrder);
            const orderDto = new OrderDto(order);
            return orderDto;
        } catch (error) {
            throw error;
        }
    }

    async getAllOrders () {
        try {
            const orders = await this.dao.getAll();
            const ordersDto = orders.map((order) => {
                const orderDto = new OrderDto(order);
                return orderDto;
            });
            return ordersDto;
        } catch (error) {
            throw error;
        }
    }

    async getOrderById (id) {
        try {
            const order = await this.dao.getById(id);
            if (order) {
                const orderDto = new OrderDto(order);
                return orderDto;
            }
        } catch (error) {
            throw error;
        }
    }

    async getOrdersByEmail (email) {
        try {
            const orders = await this.dao.getAllByEmail(email);
            if (orders) {
                const ordersDto = orders.map((order) => {
                    const orderDto = new OrderDto(order);
                    return orderDto;
                });
                return ordersDto;
            } 
        } catch (error) {
            throw error;
        }
    }

}

module.exports = OrdersRepo;