const UsersRepo = require('../repository/users.repository');

const usersApi = new UsersRepo();

const createUser = async (newUser) => {
    try {
        return usersApi.createUser(newUser);
    } catch (error) {
        throw error;
    }
}

const getAllUsers = async () => {
    try {
        return usersApi.getAllUsers();
    } catch (error) {
        throw error;
    }
}

const getUserByEmail = async (email) => {
    try {
        return usersApi.getUserByEmail(email);
    } catch (error) {
        throw error;
    }
}

const getUserById = async (id) => {
    try {
        return usersApi.getUserById(id);
    } catch (error) {
        throw error;
    }
}

const updateUser = async (id, newUser) => {
    try {
        return usersApi.updateUser(id, newUser);
    } catch (error) {
        throw error;
    }
}

const deleteUser = async (id) => {
    try {
        return usersApi.deleteUser(id);
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