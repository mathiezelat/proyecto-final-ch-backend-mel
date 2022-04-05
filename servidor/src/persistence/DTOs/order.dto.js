class OrderDto {
    constructor(order) {
        this.id = order._id;
        this.email = order.email;
        this.items = order.items;
        this.orderNumber = order.orderNumber;
        this.estado = order.estado;
        this.timestamp = order.timestamp;
    }
}

module.exports = OrderDto;