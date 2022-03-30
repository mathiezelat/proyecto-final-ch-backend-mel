import axios from "axios";
import URL from '../utils/URL';

const baseUrl = `${URL}/api/carritos`;

const createCart = async (credentials, token) => {
    try {
        const config = {
            headers: {
                Authorization: token,
            }
        };
        const response = await axios.post(baseUrl, credentials, config);
        const { data: cart } = response;
        return cart;
    } catch (error) {
        throw error;
    }
}

const getCartByUserEmail = async (email, token) => {
    try {
        const config = {
            headers: {
                Authorization: token,
            }
        };
        const response = await axios(`${baseUrl}/user?email=${email}`, config);
        const { data: cart } = response;
        return cart;
    } catch (error) {
        throw error;
    }
}

const addProductToCart = async (cartId, credentials, token) => {
    try {
        const config = {
            headers: {
                Authorization: token,
            }
        };
        const response = await axios.post(`${baseUrl}/${cartId}/productos`, credentials, config);
        const { data: cart } = response;
        return cart;
    } catch (error) {
        throw error;
    }
}

const deleteProductToCart = async (cartId, productId, token) => {
    try {
        const config = {
            headers: {
                Authorization: token,
            }
        };
        const response = await axios.delete(`${baseUrl}/${cartId}/productos/${productId}`, config);
        const { data: cart } = response;
        return cart;
    } catch (error) {
        throw error;
    }
}

const deleteCart = async (cartId, token) => {
    try {
        const config = {
            headers: {
                Authorization: token,
            }
        };
        const response = await axios.delete(`${baseUrl}/${cartId}`, config);
        const { data: cart } = response;
        return cart;
    } catch (error) {
        throw error;
    }
}

const services = { createCart, getCartByUserEmail, addProductToCart, deleteProductToCart, deleteCart }

export default services;