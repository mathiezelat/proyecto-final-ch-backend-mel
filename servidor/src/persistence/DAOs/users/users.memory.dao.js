const ContenedorMemoria = require('../../../containers/memory.container');

class UsersDaoMemoria extends ContenedorMemoria {
    constructor() {
        super('users');

        this.users = this.data;
    }

    create(newUser) {
        try {
            const users = this.read();

            if (!users.length) {
                newUser._id = '1';
            } else {
                newUser._id = (Number(users[users.length - 1]._id) + 1).toString();
            }

            users.push(newUser);

            this.write(users);

            return newUser;
        } catch (error) {
            throw error;
        }
    }

    getAll() {
        try {
            return this.read();
        } catch (error) {
            throw error;
        }
    }

    getById(id) {
        try {
            const users = this.read();

            const user = users.find((user) => user._id === id);

            return user;
        } catch (error) {
            throw error;
        }
    }

    getByEmail(email) {
        try {
            const users = this.read();

            const user = users.find((user) => user.email === email);

            return user;
        } catch (error) {
            throw error;
        }
    }

    update(id, newUser) {
        try {
            const users = this.read();

            const user = users.find((user) => user._id === id);

            const index = users.indexOf(user);

            for (const key in user) {
                if (newUser[key]) {
                    user[key] = newUser[key];
                }
            }

            users[index] = user;

            this.write(users);

            return users[index];
        } catch (error) {
            throw error;
        }
    }

    deleteById(id) {
        try {
            const users = this.read();

            const user = users.find((user) => user._id === id);

            users.splice(users.indexOf(user), 1);

            this.write(users);
            
            return user;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UsersDaoMemoria;
