const ContenedorArchivo = require('../../../containers/archive.container');

class CarritosDaoArchivo extends ContenedorArchivo {
    constructor() {
        super('DB/carritos.json');

        this.carts = this.readFile();
    }

    async createCart(email, direccion) {
        try {
            const carts = await this.readFile();

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
                cart._id = (Number(carts[carts.length - 1]._id) + 1).toString();
            }

            carts.push(cart);

            await this.writeFile(carts);

            return cart;
        } catch (error) {
            throw error;
        }
    }

    async getAllCarts() {
        try {
            return await this.readFile();
        } catch (error) {
            throw error;
        }
    }

    async getCartById(id) {
        try {
            const carts = await this.getAllCarts();
            
            const cart = carts.find(cart => cart._id === id);

            return cart;
        } catch (error) {
            throw error;
        }
    }

    async getCartByEmail(email) {
        try {
            const carts = await this.getAllCarts();

            const cart = carts.find(cart => cart.email === email);

            return cart;
        } catch (error) {
            throw error;
        }
    }

    async getAllByIds(ids) {
        try {
            const records = [];
            
            for (const id of ids) {
                const item = await this.getCartById(id);
                records.push(item);
            }
            
            return records;
        } catch (error) {
            throw error;
        }
    }

    async getCartByUserId(userId) {
        try {
            const carts = await this.readFile();

            const cart = carts.find(cart => cart.userId === userId);

            return cart;
        } catch (error) {
            throw error;
        }
    }

    async getProductFromCart(id, productId) {
        try {
            const products = await this.getProductsFromCart(id);
            if (products) {
                const product = products.find((product) => product.id === productId);
                return product;
            }
        } catch (error) {
            throw error;
        }
    }

    async getProductsFromCart(id) {
        try {
            const carts = await this.readFile();

            const cart = carts.find((cart) => cart._id === id);

            return cart?.items;
        } catch (error) {
            throw error;
        }
    }

    async update(id, newCart) {
        try {
            const carts = await this.readFile();

            const cart = carts.find((cart) => cart._id === id);

            const index = carts.indexOf(cart);

            for (const key in cart) {
                if (newCart[key]) {
                    cart[key] = newCart[key];
                }
            }

            carts[index] = cart;

            await this.writeFile(carts);

            return carts[index];
        } catch (error) {
            throw error;
        }
    }

    async deleteCartById(id) {
        try {
            const carts = await this.readFile();

            const cart = carts.find((cart) => cart._id === id);

            carts.splice(carts.indexOf(cart), 1);

            await this.writeFile(carts);

            return cart;
        } catch (error) {
            throw error;
        }
    }

    async addProductsToCart(id, newProducts) {
        try {
            const carts = await this.readFile();

            const cart = carts.find((cart) => cart._id === id);

            const products = await this.getProductsFromCart(id);

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

            await this.writeFile(carts);

            return cart;
        } catch (error) {
            throw error;
        }
    }

    async deleteProductToCart(id, productId) {
        try {
            const carts = await this.readFile();

            const cart = carts.find((cart) => cart._id === id);

            const index = carts.indexOf(cart);

            const products = await this.getProductsFromCart(id);

            const product = products.find((product) => product.id === productId);

            cart.items.splice(cart.items.indexOf(product), 1);

            carts[index] = cart;

            await this.writeFile(carts);

            return cart;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = CarritosDaoArchivo;
