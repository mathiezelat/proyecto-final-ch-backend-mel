const ContenedorArchivo = require('../../containers/archive.container');

class ProductosDaoArchivo extends ContenedorArchivo {
    constructor() {
        super('DB/productos.json');

        this.products = this.readFile();
    }

    async create(newProduct) {
        try {
            const products = await this.readFile();

            if (!products.length) {
                newProduct._id = '1';
            } else {
                newProduct._id = (Number(products[products.length - 1]._id) + 1).toString();
            }

            newProduct.codigo = 0;

            newProduct.timestamp = new Date();

            products.push(newProduct);

            await this.writeFile(products);

            return newProduct;
        } catch (error) {
            throw error;
        }
    }

    async getAll() {
        try {
            return await this.readFile();
        } catch (error) {
            throw error;
        }
    }

    async getAllByIds(ids) {
        try {
            const records = [];

            for (const id of ids) {
                const items = await this.getById(id);
                records.push(items);
            }

            return records;
        } catch (error) {
            throw error;
        }
    }

    async getById(id) {
        try {
            const products = await this.readFile();

            const product = products.find((product) => product._id === id);

            return product;
        } catch (error) {
            throw error;
        }
    }

    async update(id, newProduct) {
        try {
            const products = await this.readFile();

            const product = products.find((product) => product._id === id);

            const index = products.indexOf(product);

            for (const key in product) {
                if (newProduct[key]) {
                    product[key] = newProduct[key];
                }
            }

            products[index] = product;

            await this.writeFile(products);

            return products[index];
        } catch (error) {
            throw error;
        }
    }

    async deleteById(id) {
        try {
            const products = await this.readFile();

            const product = products.find((product) => product._id === id);

            products.splice(products.indexOf(product), 1);

            await this.writeFile(products);

            return product;
        } catch (error) {
            throw error;
        }
    }

    async deleteAll() {
        try {
            this.products = [];

            await this.writeFile(this.products);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ProductosDaoArchivo;
