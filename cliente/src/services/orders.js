import axios from "axios";
import URL from '../utils/URL';

const baseUrl = `${URL}/api/orders`;

const createOrder = async (credentials, token) => {
    try {
        const config = {
            headers: {
                Authorization: token,
            }
        };
        const response = await axios.post(baseUrl, credentials, config);
        const { data: order } = response;
        return order;
    } catch (error) {
        throw error;
    }
};

const getOrdersByUserEmail = async (email, token) => {
    try {
        const config = {
            headers: {
                Authorization: token,
            }
        };
        const response = await axios(`${baseUrl}/user?email=${email}`, config);
        const { data: orders } = response;
        return orders;
    } catch (error) {
        throw error;
    }
}

const services = { createOrder, getOrdersByUserEmail }

export default services;