const fs = require('fs');

class ContenedorArchivo {
    constructor(archivo) {
        this.archivo = archivo;
        this.init();
    }

    async init() {
        const isFolderExists = fs.existsSync('DB');
        if(!isFolderExists) {
            await fs.promises.mkdir('DB');
        }
    }

    async writeFile(data) {
        try {
            await fs.promises.writeFile(
                this.archivo,
                JSON.stringify(data, null, 2),
            );
        } catch (error) {
            throw error;
        }
    }

    async readFile() {
        try {
            if (!fs.existsSync(this.archivo)) return [];

            const contenido = await fs.promises.readFile(this.archivo, 'utf-8');

            if (!contenido) return [];

            const data = JSON.parse(contenido);

            return data;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ContenedorArchivo;
