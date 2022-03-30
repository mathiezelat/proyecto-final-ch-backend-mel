const {
    createCart,
    getAllCarts,
    getCartByUserId,
    deleteCartById,
    getProductsFromCart,
    addProductsToCart,
    deleteProductToCart,
    getCartByEmail,
} = require('../api/carts');

const cartsGet = async (req, res, next) => {
    try {
        const carts = await getAllCarts();

        res.status(200).json(carts);
    } catch (error) {
        next(error);
    }
};

const cartsGetByUserId = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const cart = await getCartByUserId(userId);

        res.status(200).json(cart);
    } catch (error) {
        next(error);
    }
};

const cartGetByEmail = async (req, res, next) => {
    try {
        const { email } = req.query;

        const cart = await getCartByEmail(email);

        res.status(200).json(cart);
    } catch (error) {
        next(error);
    }
};

const cartsPost = async (req, res, next) => {
    try {
        const { userId } = req.body;

        const cart = await createCart(userId);

        res.status(201).json(cart);
    } catch (error) {
        next(error);
    }
};

const cartsDelete = async (req, res, next) => {
    try {
        const { id } = req.params;

        const cart = await deleteCartById(id);

        res.status(200).json(cart);
    } catch (error) {
        next(error);
    }
};

const cartsGetProducts = async (req, res, next) => {
    try {
        const { id } = req.params;

        const cart = await getProductsFromCart(id);

        res.status(200).json(cart);
    } catch (error) {
        next(error);
    }
};

const cartsPostProducts = async (req, res, next) => {
    try {
        const { id } = req.params;

        const { productos } = req.body;

        const carrito = await addProductsToCart(id, productos);

        res.status(201).json(carrito);
    } catch (error) {
        next(error);
    }
};

const cartsDeleteProducts = async (req, res, next) => {
    try {
        const { id, idProduct } = req.params;

        const cart = await deleteProductToCart(id, idProduct);

        res.status(200).json(cart);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    cartsGet,
    cartsGetByUserId,
    cartGetByEmail,
    cartsPost,
    cartsDelete,
    cartsGetProducts,
    cartsPostProducts,
    cartsDeleteProducts,
};
