const ContenedorMemoria = require('../../../containers/memory.container');

class CarritosDaoMemoria extends ContenedorMemoria {
    constructor() {
        super('carritos');

        this.carts = this.data;
    }

    createCart(email, direccion) {
        try {
            const carts = this.read();

            const cart = {
                _id: 0,
                email,
                items: [],
                direccion,
                timestamp: new Date(),
            };

            if (!carts.length) {
                cart._id = '1';
            } else {
                cart._id = String(Math.max(...carts.map(c => Number(c._id))) + 1);
            }

            carts.push(cart);

            this.write(carts);

            return cart;
        } catch (error) {
            throw error;
        }
    }

    getAllCarts() {
        try {
            return this.read();
        } catch (error) {
            throw error;
        }
    }

    getCartById(id) {
        try {
            const carts = this.getAllCarts();
            
            const cart = carts.find(cart => cart._id === id);

            return cart;
        } catch (error) {
            throw error;
        }
    }

    getCartByEmail(email) {
        try {
            const carts = this.getAllCarts();

            const cart = carts.find(cart => cart.email === email);

            return cart;
        } catch (error) {
            throw error;
        }
    }
    

    getAllByIds(ids) {
        try {
            const records = [];
            
            for (const id of ids) {
                const item = this.getCartById(id);
                records.push(item);
            }
            
            return records;
        } catch (error) {
            throw error;
        }
    }

    getCartByUserId(userId) {
        try {
            const carts = this.read();

            const cart = carts.find(cart => cart.userId === userId);

            return cart;
        } catch (error) {
            throw error;
        }
    }

    getProductFromCart(id, productId) {
        try {
            const products = this.getProductsFromCart(id);
            if (products) {
                const product = products.find((product) => product.id === productId);
                return product;
            }
        } catch (error) {
            throw error;
        }
    }

    getProductsFromCart(id) {
        try {
            const carts = this.read();

            const cart = carts.find((cart) => cart._id === id);

            return cart?.items;
        } catch (error) {
            throw error;
        }
    }

    update(id, newCart) {
        try {
            const carts = this.read();

            const cart = carts.find((cart) => cart._id === id);

            const index = carts.indexOf(cart);

            for (const key in cart) {
                if (newCart[key]) {
                    cart[key] = newCart[key];
                }
            }

            carts[index] = cart;

            this.write(carts);

            return carts[index];
        } catch (error) {
            throw error;
        }
    }

    deleteCartById(id) {
        try {
            const carts = this.read();

            const cart = carts.find((cart) => cart._id === id);

            carts.splice(carts.indexOf(cart), 1);

            this.write(carts);

            return cart;
        } catch (error) {
            throw error;
        }
    }

    addProductsToCart(id, newProducts) {
        try {
            const carts = this.read();

            const cart = carts.find((cart) => cart._id === id);

            const products = this.getProductsFromCart(id);

            for (const newProduct of newProducts) {
                const isProductInCart = products.find((product) => product.id === newProduct.id);
                if (isProductInCart) {
                    const index = cart.items.findIndex((item) => item.id === newProduct.id);
                    cart.items[index].cantidad++;
                } else {
                    newProduct.cantidad = 1;
                    cart.items.push(newProduct);
                }
            }

            carts[carts.indexOf(cart)] = cart;

            this.write(carts);

            return cart;
        } catch (error) {
            throw error;
        }
    }

    deleteProductToCart(id, productId) {
        try {
            const carts = this.read();

            const cart = carts.find((cart) => cart._id === id);

            const index = carts.indexOf(cart);

            const products = this.getProductsFromCart(id);

            const product = products.find((product) => product.id === productId);

            cart.items.splice(cart.items.indexOf(product), 1);

            carts[index] = cart;

            this.write(carts);

            return cart;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = CarritosDaoMemoria;
