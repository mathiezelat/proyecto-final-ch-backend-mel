const { 
    getAllUsers,
    getUserById,
} = require('../api/users');

const usersGet = async (req, res, next) => {
    try {
        const users = await getAllUsers();

        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

const usersGetById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const user = await getUserById(id);
        
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    usersGet,
    usersGetById,
};
