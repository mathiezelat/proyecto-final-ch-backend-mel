const DB = {};

class ContenedorMemoria {
    constructor(memoria) {
        this.database = DB;
        this.collection = memoria;
        this.data = [];
    }

    write(data) {
        try {
            this.database[this.collection] = data;
            return data;
        } catch (error) {
            throw error;
        }
    }

    read() {
        try {
            const data = this.database[this.collection];
            if (!data) return [];
            return data;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ContenedorMemoria;
