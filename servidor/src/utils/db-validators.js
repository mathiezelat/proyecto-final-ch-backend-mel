const { getUserById, getUserByEmail } = require('../api/users');
const { getProductById } = require('../api/products');
const { getCartById, getProductFromCart, getCartByEmail } = require('../api/carts');
const { getOrderById } = require('../api/orders');

const emailExists = async (email = '') => {
    const userEmailExists = await getUserByEmail(email);
    if (userEmailExists) {
        throw new Error(`El email ${email} ya está registrado`);
    }
};

const userExistsById = async (id) => {
    const user = await getUserById(id);
    if (!user) {
        throw new Error(`No existe el usuario con el id ${id}`);
    }
};

const productExistsById = async (id) => {
    const product = await getProductById(id);
    if (!product) {
        throw new Error(`No existe el producto con el id ${id}`);
    }
};

const productsExistsByIds = async (ids) => {
    for (const id of ids) {
        const product = await getProductById(id);
        if (!product) {
            throw new Error(`No existe el producto con el id ${id}`);
        }
    }
};

const cartExistsById = async (id) => {
    const cart = await getCartById(id);
    if (!cart) {
        throw new Error(`No existe el carrito con el id ${id}`);
    }
};

const cartExistByUserEmail = async(email) => {
    const cart = await getCartByEmail(email);
    if (!cart) {
        throw new Error(`No existe el carrito del usuario ${email}`);
    }
};

const cartProductExistsById = async (idProduct, {req}) => {
    const { id } = req.params;
    const product = await getProductFromCart(id, idProduct);
    if (!product) {
        throw new Error(`No existe el producto con el id ${idProduct} en el carrito`);
    }
};

const orderExistsById = async (id) => {
    const order = await getOrderById(id);
    if (!order) {
        throw new Error(`No existe la orden con el id ${id}`);
    }
};

module.exports = {
    userExistsById,
    emailExists,
    productExistsById,
    productsExistsByIds,
    cartExistsById,
    cartExistByUserEmail,
    cartProductExistsById,
    orderExistsById,
};
