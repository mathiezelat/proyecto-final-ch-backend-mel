const {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} = require('../api/products');

const productsGet = async (req, res, next) => {
    try {
        const products = await getAllProducts();
        
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
};

const productsGetById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const product = await getProductById(id);

        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
};

const productsPost = async (req, res, next) => {
    try {
        const { 
            nombre, 
            descripcion, 
            categoria, 
            foto, 
            precio, 
            stock,
            codigo,
        } = req.body;

        const product = await createProduct({
            nombre,
            descripcion,
            categoria,
            foto,
            precio,
            stock,
            codigo,
        });

        res.status(201).json(product);
    } catch (error) {
        next(error);
    }
};

const productsPut = async (req, res, next) => {
    try {
        const { id } = req.params;

        const { 
            nombre, 
            descripcion, 
            categoria, 
            foto, 
            precio, 
            stock,
            codigo,
        } = req.body;

        const product = await updateProduct(id, {
            nombre, 
            descripcion, 
            categoria, 
            foto, 
            precio, 
            stock,
            codigo,
        });

        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
};

const productsDelete = async (req, res, next) => {
    try {
        const { id } = req.params;

        const product = await deleteProduct(id);

        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    productsGet,
    productsGetById,
    productsPost,
    productsPut,
    productsDelete,
};
