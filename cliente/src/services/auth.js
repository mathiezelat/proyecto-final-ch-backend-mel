import axios from 'axios';
import URL from '../utils/URL';

const baseUrl = `${URL}/api/auth`;

const profile = async token => {
	try {
		const config = {
			headers: {
				Authorization: token,
			},
		};

		const response = await axios(`${baseUrl}/profile`, config);
		const { data: user } = response;
		return user;
	} catch (error) {
		throw error;
	}
};

const signup = async credentials => {
	try {
		const response = await axios.post(`${baseUrl}/signup`, credentials);
		const { data: user } = response;
		return user;
	} catch (error) {
		throw error;
	}
};

const login = async credentials => {
	try {
		const response = await axios.post(`${baseUrl}/login`, credentials);
		const { data: user } = response;
		return user;
	} catch (error) {
		throw error;
	}
};

const services = {
	profile,
	login,
	signup,
};

export default services;
