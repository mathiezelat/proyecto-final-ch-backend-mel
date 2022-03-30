const ProductsRepo = require('../repository/products.repository');

const productsApi = new ProductsRepo();

const createProduct = async (product) => {
    try {
        return await productsApi.createProduct(product);
    } catch (error) {
        throw error;
    }
};

const getAllProducts = async () => {
    try {
        return await productsApi.getAllProducts();
    } catch (error) {
        throw error;
    }
};

const getAllProductsByIds = async (ids) => {
    try {
        return await productsApi.getAllProductsByIds(ids);
    } catch (error) {
        throw error;
    }
};

const getProductById = async (id) => {
    try {
        return await productsApi.getProductById(id);
    } catch (error) {
        throw error;
    }
};

const updateProduct = async (id, newProduct) => {
    try {
        return await productsApi.updateProduct(id, newProduct);
    } catch (error) {
        throw error;
    }
};

const deleteProduct = async (id) => {
    try {
        return await productsApi.deleteProduct(id);
        s;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getAllProductsByIds,
    getProductById,
    updateProduct,
    deleteProduct,
};
