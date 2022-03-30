const CartsRepo = require('../repository/carts.repository');

const { getAllProductsByIds } = require('./products');
const { getUserById } = require('./users');

const cartsApi = new CartsRepo();

const createCart = async (userId) => {
    try {
        const { email, direccion } = await getUserById(userId);
        return await cartsApi.createCart(email, direccion);
    } catch (error) {
        throw error;
    }
};

const getAllCarts = async () => {
    try {
        return await cartsApi.getAllCarts();
    } catch (error) {
        throw error;
    }
};

const getCartById = async (id) => {
    try {
        return await cartsApi.getCartById(id);
    } catch (error) {
        throw error;
    }
};

const getCartByUserId = async (userId) => {
    try {
        return await cartsApi.getCartByUserId(userId);
    } catch (error) {
        throw error;
    }
};

const getCartByEmail = async (email) => {
    try {
        return await cartsApi.getCartByEmail(email);
    } catch (error) {
        throw error;
    }
}

const updateCart = async (id, newCart) => {
    try {
        return await cartsApi.updateCart(id, newCart);
    } catch (error) {
        throw error;
    }
}

const deleteCartById = async (id) => {
    try {
        return await cartsApi.deleteCartById(id);
    } catch (error) {
        throw error;
    }
}

const getProductFromCart = async (id, productId) => {
    try {
        return await cartsApi.getProductFromCart(id, productId);
    } catch (error) {
        throw error;
    }
};

const getProductsFromCart = async (id) => {
    try {
        return await cartsApi.getProductsFromCart(id);
    } catch (error) {
        throw error;
    }
};

const addProductsToCart = async (id, ids) => {
    try {
        const products = await getAllProductsByIds(ids);
        return await cartsApi.addProductsToCart(id, products);
    } catch (error) {
        throw error;
    }
};

const deleteProductToCart = async (id, idProduct) => {
    try {
        return await cartsApi.deleteProductToCart(id, idProduct);
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
