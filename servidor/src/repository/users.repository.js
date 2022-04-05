const UserDto = require('../persistence/DTOs/user.dto');
const { usersDao } = require('../persistence/DAOs');

class UsersRepo {
    constructor() {
        this.dao = usersDao;
    }

    async createUser (newUser) {
        try {
            const user = await this.dao.create(newUser);
            const userDto = new UserDto(user);
            return userDto;
        } catch (error) {
            throw error;
        }
    }

    async getAllUsers () {
        try {
            const users = await this.dao.getAll();
            const usersDto = users.map((user) => {
                const userDto = new UserDto(user);
                return userDto;
            });
            return usersDto;
        } catch (error) {
            throw error;
        }
    }

    async getUserByEmail (email) {
        try {
            const user = await this.dao.getByEmail(email);
            if (user) {
                const userDto = new UserDto(user);
                return userDto;
            }
        } catch (error) {
            throw error;
        }
    }

    async getUserById (id) {
        try {
            const user = await this.dao.getById(id);
            if (user) {
                const userDto = new UserDto(user);
                return userDto;
            }
        } catch (error) {
            throw error;
        }
    }

    async updateUser (id, newUser) {
        try {
            const user = await this.dao.update(id, newUser);
            if (user) {
                const userDto = new UserDto(user);
                return userDto;
            }
        } catch (error) {
            throw error;
        }
    }

    async deleteUser (id) {
        try {
            const user = await this.dao.deleteById(id);
            if (user) {
                const userDto = new UserDto(user);
                return userDto;
            }
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UsersRepo;