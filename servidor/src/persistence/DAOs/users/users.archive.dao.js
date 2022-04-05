const ContenedorArchive = require('../../../containers/archive.container');

class UsersDaoArchive extends ContenedorArchive {
    constructor() {
        super('DB/users.json');

        this.users = this.readFile();
    }

    async create(newUser) {
        try {
            const users = await this.readFile();

            if (!users.length) {
                newUser._id = '1';
            } else {
                newUser._id = (Number(users[users.length - 1]._id) + 1).toString();
            }

            users.push(newUser);

            await this.writeFile(users);

            return newUser;
        } catch (error) {
            throw error;
        }
    }

    async getAll() {
        try {
            return await this.readFile();
        } catch (error) {
            throw error;
        }
    }

    async getById(id) {
        try {
            const users = await this.readFile();

            const user = users.find((user) => user._id === id);

            return user;
        } catch (error) {
            throw error;
        }
    }

    async getByEmail(email) {
        try {
            const users = await this.readFile();

            const user = users.find((user) => user.email === email);

            return user;
        } catch (error) {
            throw error;
        }
    }

    async update(id, newUser) {
        try {
            const users = await this.readFile();

            const user = users.find((user) => user._id === id);

            const index = users.indexOf(user);

            for (const key in user) {
                if (newUser[key]) {
                    user[key] = newUser[key];
                }
            }

            users[index] = user;

            await this.writeFile(users);

            return users[index];
        } catch (error) {
            throw error;
        }
    }

    async deleteById(id) {
        try {
            const users = await this.readFile();

            const user = users.find((user) => user._id === id);

            users.splice(users.indexOf(user), 1);

            await this.writeFile(users);
            
            return user;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UsersDaoArchive;
