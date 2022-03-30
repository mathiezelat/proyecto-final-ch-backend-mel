const ContenedorMongoDB = require('../../containers/mongodb.container');

const Cart = require('../../models/cart');

class CarritosDaoMongoDB extends ContenedorMongoDB {
    constructor() {
        super(Cart);
    }

    async createCart(email, direccion) {
        try {
            const response = await this.create({
                email,
                items: [],
                direccion,
            });

            return response;
        } catch (error) {
            throw error;
        }
    }

    async getAllCarts() {
        try {
            return await this.getAll();
        } catch (error) {
            throw error;
        }
    }

    async getCartById(id) {
        try {
            return await this.getById(id);
        } catch (error) {
            throw error;
        }
    }

    async getCartByUserId(userId) {
        try {
            return await this.getByUserId(userId);
        } catch (error) {
            throw error;
        }
    }

    async getCartByEmail(email) {
        try {
            return await this.getByEmail(email);
        } catch (error) {
            throw error;
        }
    }

    async getProductFromCart(id, productId) {
        try {
            const products = await this.getProductsFromCart(id);
            
            if (products) {
                const product = products.find((items) => String(items.id) === String(productId));
                return product;
            }
        } catch (error) {
            throw error;
        }
    }

    async getProductsFromCart(id) {
        try {
            const cart = await this.getById(id);

            return cart?.items;
        } catch (error) {
            throw error;
        }
    }

    async addProductsToCart(id, newProducts) {
        try {
            const products = await this.getProductsFromCart(id);

            for (const newProduct of newProducts) {
                const isProductInCart = products.find((product) => String(product.id) === String(newProduct.id));
                if (isProductInCart) {
                    isProductInCart.cantidad++;
                } else {
                    newProduct.cantidad = 1;
                    products.push(newProduct);
                }
            }

            const response = await this.update(id, {
                items: products,
            });

            return response;
        } catch (error) {
            throw error;
        }
    }

    async deleteProductToCart(id, productId) {
        try {
            const products = await this.getProductsFromCart(id);

            const deleteProduct = products.find((product) => String(product.id) === productId );

            products.splice(products.indexOf(deleteProduct), 1);

            const response = await this.update(id, {
                items: products,
            });

            return response;
        } catch (error) {
            throw error;
        }
    }

    async deleteCartById(id) {
        try {
            const response = await this.deleteById(id);

            return response;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = CarritosDaoMongoDB;
