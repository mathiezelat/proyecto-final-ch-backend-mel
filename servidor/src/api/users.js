const UsersRepo = require('../repository/users.repository');

const usersApi = new UsersRepo();

const createUser = async (newUser) => {
    try {
        return await usersApi.createUser(newUser);
    } catch (error) {
        throw error;
    }
}

const getAllUsers = async () => {
    try {
        return await usersApi.getAllUsers();
    } catch (error) {
        throw error;
    }
}

const getUserByEmail = async (email) => {
    try {
        return await usersApi.getUserByEmail(email);
    } catch (error) {
        throw error;
    }
}

const getUserById = async (id) => {
    try {
        return await usersApi.getUserById(id);
    } catch (error) {
        throw error;
    }
}

const updateUser = async (id, newUser) => {
    try {
        return await usersApi.updateUser(id, newUser);
    } catch (error) {
        throw error;
    }
}

const deleteUser = async (id) => {
    try {
        return await usersApi.deleteUser(id);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createUser,
    getAllUsers,
    getUserByEmail,
    getUserById,
    updateUser,
    deleteUser,
};