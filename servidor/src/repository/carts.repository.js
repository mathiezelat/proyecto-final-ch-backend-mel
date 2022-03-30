const CartDto = require('../DTOs/cart.dto');
const ProductDto = require('../DTOs/product.dto');

const { cartsDao } = require('../DAOs');

class CartsRepo {
    constructor() {
        this.dao = cartsDao;
    }

    async createCart(email, direccion) {
        try {
            const cart = await this.dao.createCart(email, direccion);
            const cartDto = new CartDto(cart);
            return cartDto;
        } catch (error) {
            console.log({error});
            throw error;
        }
    }

    async getAllCarts() {
        try {
            const carts = await this.dao.getAllCarts();
            const cartsDto = carts.map((cart) => {
                const cartDto = new CartDto(cart);
                return cartDto;
            });
            return cartsDto;
        } catch (error) {
            console.log({error});
            throw error;
        }
    }

    async getCartById(id) {
        try {
            const cart = await this.dao.getCartById(id);
            if (cart) {
                const cartDto = new CartDto(cart);
                return cartDto;
            }
        } catch (error) {
            throw error;
        }
    }

    async getCartByUserId(userId) {
        try {
            const carts = await this.dao.getCartByUserId(userId);
            const cartsDto = carts.map((cart) => {
                const cartDto = new CartDto(cart);
                return cartDto;
            });
            return cartsDto;
        } catch (error) {
            console.log({error});
            throw error;
        }
    }

    async getCartByEmail(email) {
        try {
            const cart = await this.dao.getCartByEmail(email);
            if(cart) {
                const cartDto = new CartDto(cart);
                return cartDto;
            }
        } catch (error) {
            console.log({error});
            throw error;
        }
    }

    async updateCart(id, newCart) {
        try {
            const cart = await this.dao.update(id, newCart);
            if (cart) {
                const cartDto = new CartDto(cart);
                return cartDto;
            }
        } catch (error) {
            console.log({error});
            throw error;
        }
    }

    async deleteCartById(id) {
        try {
            const cart = await this.dao.deleteCartById(id);
            if (cart) {
                const cartDto = new CartDto(cart);
                return cartDto;
            }
        } catch (error) {
            console.log({error});
            throw error;
        }
    }

    async getProductFromCart(id, productId) {
        try {
            const product = await this.dao.getProductFromCart(id, productId);
            if (product) {
                const productDto = new ProductDto(product);
                return productDto;
            }
        } catch (error) {
            throw error;
        }
    }

    async getProductsFromCart(id) {
        try {
            const products = await this.dao.getProductsFromCart(id);
            const productsDto = products.map((product) => {
                const productDto = new ProductDto(product);
                return productDto;
            });
            return productsDto;
        } catch (error) {
            console.log({error});
            throw error;
        }
    }

    async addProductsToCart(id, newProducts) {
        try {
            const cart = await this.dao.addProductsToCart(id, newProducts);
            if (cart) {
                const cartDto = new CartDto(cart);
                return cartDto;
            }
        } catch (error) {
            console.log({error});
            throw error;
        }
    }

    async deleteProductToCart(id, idProduct) {
        try {
            const cart = await this.dao.deleteProductToCart(id, idProduct);
            if (cart) {
                const cartDto = new CartDto(cart);
                return cartDto;
            }
        } catch (error) {
            console.log({error});
            throw error;
        }
    }
}

module.exports = CartsRepo;
