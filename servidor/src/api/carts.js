const CartsRepo = require('../repository/carts.repository');

const { getAllProductsByIds } = require('./products');
const { getUserById } = require('./users');

const cartsApi = new CartsRepo();

const createCart = async (userId) => {
    try {
        const { email, direccion } = await getUserById(userId);
        return cartsApi.createCart(email, direccion);
    } catch (error) {
        throw error;
    }
};

const getAllCarts = async () => {
    try {
        return cartsApi.getAllCarts();
    } catch (error) {
        throw error;
    }
};

const getCartById = async (id) => {
    try {
        return cartsApi.getCartById(id);
    } catch (error) {
        throw error;
    }
};

const getCartByUserId = async (userId) => {
    try {
        return cartsApi.getCartByUserId(userId);
    } catch (error) {
        throw error;
    }
};

const getCartByEmail = async (email) => {
    try {
        return cartsApi.getCartByEmail(email);
    } catch (error) {
        throw error;
    }
}

const updateCart = async (id, newCart) => {
    try {
        return cartsApi.updateCart(id, newCart);
    } catch (error) {
        throw error;
    }
}

const deleteCartById = async (id) => {
    try {
        return cartsApi.deleteCartById(id);
    } catch (error) {
        throw error;
    }
}

const getProductFromCart = async (id, productId) => {
    try {
        return cartsApi.getProductFromCart(id, productId);
    } catch (error) {
        throw error;
    }
};

const getProductsFromCart = async (id) => {
    try {
        return cartsApi.getProductsFromCart(id);
    } catch (error) {
        throw error;
    }
};

const addProductsToCart = async (id, ids) => {
    try {
        const products = await getAllProductsByIds(ids);
        return cartsApi.addProductsToCart(id, products);
    } catch (error) {
        throw error;
    }
};

const deleteProductToCart = async (id, idProduct) => {
    try {
        return cartsApi.deleteProductToCart(id, idProduct);
    } catch (error) {
        throw error;
    }
};


module.exports = {
    createCart,
    getAllCarts,
    getCartById,
    getCartByUserId,
    getCartByEmail,
    updateCart,
    deleteCartById,
    getProductFromCart,
    getProductsFromCart,
    addProductsToCart,
    deleteProductToCart,
};
