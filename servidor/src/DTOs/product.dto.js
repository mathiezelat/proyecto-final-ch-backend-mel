class ProductDto {
    constructor(product) {
        this.id = product._id;
        this.nombre = product.nombre;
        this.descripcion = product.descripcion;
        this.categoria = product.categoria;
        this.foto = product.foto;
        this.precio = product.precio;
        this.stock = product.stock;
        this.codigo = product.codigo;
        this.timestamp = product.timestamp;
    }
}

module.exports = ProductDto;