const ProductDto = require('../DTOs/product.dto');
const { productsDao } = require('../DAOs');

class ProductsRepo {
    constructor() {
        this.dao = productsDao;
    }
    
    async createProduct (newProduct) {
        try {
            const product = await productsDao.create(newProduct);
            const productDto = new ProductDto(product);
            return productDto;
        } catch (error) {
            throw error;
        }
    }

    async getAllProducts () {
        try {
            const products = await productsDao.getAll();
            const productsDto = products.map((product) => {
                const productDto = new ProductDto(product);
                return productDto;
            });
            return productsDto;
        } catch (error) {
            throw error;
        }
    }

    async getAllProductsByIds (ids) {
        try {
            const products = await productsDao.getAllByIds(ids);
            const productsDto = products.map((product) => {
                const productDto = new ProductDto(product);
                return productDto;
            });
            return productsDto;
        } catch (error) {
            throw error;
        }
    }

    async getProductById (id) {
        try {
            const product = await productsDao.getById(id);
            if (product) {
                const productDto = new ProductDto(product);
                return productDto;
            }
        } catch (error) {
            throw error;
        }
    }

    async updateProduct (id, newProduct) {
        try {
            const product = await productsDao.update(id, newProduct);
            if (product) {
                const productDto = new ProductDto(product);
                return productDto;
            }
        } catch (error) {
            throw error;
        }
    }

    async deleteProduct (id) {
        try {
            const product = await productsDao.deleteById(id);
            if (product) {
                const productDto = new ProductDto(product);
                return productDto;
            }
        } catch (error) {
            throw error;
        }
    }

}

module.exports = ProductsRepo;