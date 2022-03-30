const mongoose = require('mongoose');
const { MONGODB_CNN } = require('../config');

class ContenedorMongoDB {
    constructor(model) {
        this.model = model;
        this.init();
    }

    async init() {
        try {
            if (!this.conexion) {
                this.conexion = await mongoose.connect(MONGODB_CNN, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                });
            }
        } catch (error) {
            throw error;
        }
    }

    async count() {
        try {
            const count = await this.model.countDocuments();

            return count;
        } catch (error) {
            throw error;
        }
    }

    async create(object) {
        try {
            const created = await this.model.create(object);

            return created;
        } catch (error) {
            throw error;
        }
    }

    async getAll() {
        try {
            const list = await this.model.find({});

            return list;
        } catch (error) {
            throw error;
        }
    }

    async getById(id) {
        try {
            const item = await this.model.findById(id);

            return item;
        } catch (error) {
            throw error;
        }
    }

    async getByEmail(email) {
        try {
            const item = await this.model.findOne({ email });

            return item;
        } catch (error) {
            throw error;
        }
    }

    async getAllByEmail(email) {
        try {
            const items = await this.model.find({email});

            return items;
        } catch (error) {
            throw error;
        }
    }

    async getAllByIds(ids) {
        try {
            const records = [];

            for (const id of ids) {
                const item = await this.model.findById(id);

                records.push(item);
            }

            return records;
        } catch (error) {
            throw error;
        }
    }

    async getByUserId(userId) {
        try {
            const records = await this.model.find({ userId });

            return records;
        } catch (error) {
            throw error ;
        }
    }

    async update(id, elements) {
        try {
            const item = await this.model.findByIdAndUpdate(id, elements, { new: true });

            return item;
        } catch (error) {
            throw error;
        }
    }

    async deleteById(id) {
        try {
            const itemDeleted = await this.model.findByIdAndDelete(id);

            return itemDeleted;
        } catch (error) {
            throw error;
        }
    }

    async deleteAll() {
        try {
            const items = await this.model.deleteMany({});

            return items;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ContenedorMongoDB;
