const ContenedorMemoria = require('../../containers/memory.container');

class ProductosDaoMemoria extends ContenedorMemoria {
    constructor() {
        super('productos');

        this.products = this.data;
    }

    create(newProduct) {
        try {
            const products = this.read();

            if (!products.length) {
                newProduct._id = '1';
            } else {
                newProduct._id = (Number(products[products.length - 1]._id) + 1).toString();
            }

            newProduct.codigo = 0;

            newProduct.timestamp = new Date();

            products.push(newProduct);

            this.write(products);

            return newProduct;
        } catch (error) {
            throw error;
        }
    }

    getAll() {
        try {
            return this.read();
        } catch (error) {
            throw error;
        }
    }

    getAllByIds(ids) {
        try {
            const records = [];

            for (const id of ids) {
                const items = this.getById(id);
                records.push(items);
            }

            return records;
        } catch (error) {
            throw error;
        }
    }

    getById(id) {
        try {
            const products = this.read();

            const product = products.find((product) => product._id === id);

            return product;
        } catch (error) {
            throw error;
        }
    }

    update(id, newProduct) {
        try {
            const products = this.read();

            const product = products.find((product) => product._id === id);

            const index = products.indexOf(product);

            for (const key in product) {
                if (newProduct[key]) {
                    product[key] = newProduct[key];
                }
            }

            products[index] = product;

            this.write(products);

            return products[index];
        } catch (error) {
            throw error;
        }
    }

    deleteById(id) {
        try {
            const products = this.read();

            const product = products.find((product) => product._id === id);

            products.splice(products.indexOf(product), 1);

            this.write(products);

            return product;
        } catch (error) {
            throw error;
        }
    }

    deleteAll() {
        try {
            this.products = [];

            this.write(this.products);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ProductosDaoMemoria;
