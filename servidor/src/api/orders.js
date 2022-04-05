const OrdersRepo = require('../repository/orders.repository');

const { 
    getCartById 
} = require('./carts');

const { sendMailOfNewOrder } = require('../utils/nodemailer');
const { sendWspOfNewOrder } = require('../utils/twilio');

const ordersApi = new OrdersRepo();

const createOrder = async (cartId) => {
    try {
        const cart = await getCartById(cartId);

        const newOrder = {
            items: cart.items,
            email: cart.email,
        };

        const orderCreated = await ordersApi.createOrder(newOrder);

        await Promise.all([
            sendMailOfNewOrder(orderCreated),
            sendWspOfNewOrder(orderCreated)
        ]);
        
        return orderCreated;
    } catch (error) {
        throw error;
    }
}

const getAllOrders = async () => {
    try {
        return ordersApi.getAllOrders();
    } catch (error) {
        throw error;
    }
}

const getOrderById = async (id) => {
    try {
        return ordersApi.getOrderById(id);
    } catch (error) {
        throw error;
    }
}

const getOrdersByEmail = async(email) => {
    try {
        return ordersApi.getOrdersByEmail(email);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    getOrdersByEmail,
};