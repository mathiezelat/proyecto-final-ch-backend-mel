import axios from "axios";
import URL from '../utils/URL';

const baseUrl = `${URL}/api/users`;

const getUserById = async (uid, token) => {
    try {
        const config = {
            headers: {
                Authorization: token,
            }
        };

        const response = await axios(`${baseUrl}/${uid}`, config);
        const { data: user } = response;
        return user;
    } catch (error) {
        throw error;
    }
}

const services = {
    getUserById,
}

export default services;