const { 
    createOrder,
    getAllOrders, 
    getOrderById,
    getOrdersByEmail, 
} = require('../api/orders');

const ordersGet = async (req, res, next) => {
    try {
        const orders = await getAllOrders();

        res.status(200).json(orders);
    } catch (error) {
        next(error);
    }
};

const ordersGetById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const orders = await getOrderById(id);

        res.status(200).json(orders);
    } catch (error) {
        next(error);
    }
};

const ordersGetByEmail = async (req, res, next) => {
    try {
        const { email } = req.query;

        const orders = await getOrdersByEmail(email);

        res.status(200).json(orders);
    } catch (error) {
        next(error);
    }
}

const ordersPost = async (req, res, next) => {
    try {
        const { cartId } = req.body;

        const order = await createOrder(cartId);

        res.status(201).json(order);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    ordersGet,
    ordersGetById,
    ordersGetByEmail,
    ordersPost,
};
