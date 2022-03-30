class CartDto {
    constructor(cart) {
        this.id = cart._id;
        this.email = cart.email;
        this.items = cart.items;
        this.direccion = cart.direccion;
        this.timestamp = cart.timestamp;
    }
}

module.exports = CartDto;