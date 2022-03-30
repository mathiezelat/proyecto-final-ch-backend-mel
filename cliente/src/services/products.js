import axios from "axios";
import URL from '../utils/URL';

const baseUrl = `${URL}/api/productos`;

const createProduct = async (credentials, token) => {
    try {
        const config = {
            headers: {
                Authorization: token,
            }
        };
        const response = await axios.post(baseUrl, credentials, config);
        const { data: product } = response;
        return product;
    } catch (error) {
        throw error;
    }
}

const getAllProducts = async (token) => {
    try {
        const config = {
            headers: {
                Authorization: token,
            }
        };
        const response = await axios(baseUrl, config);
        const { data: products } = response;
        return products;
    } catch (error) {
        throw error;
    }
}

const deleteProduct = async (id, token) => {
    try {
        const config = {
            headers: {
                Authorization: token,
            }
        };
        const response = await axios.delete(`${baseUrl}/${id}`, config);
        const { data: product } = response;
        return product; 
    } catch (error) {
        throw error;
    }
}

const services = {
    createProduct,
    getAllProducts,
    deleteProduct,
}

export default services;