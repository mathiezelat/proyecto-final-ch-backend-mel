const { Schema, model } = require('mongoose');

const OrderSchema = new Schema({
    email: { type: String, required: true },
    items: { type: Array, required: true },
    orderNumber: { type: Number, default: 0 },
    estado: { type: String, default: 'generada' },
    timestamp: { type: Date, default: Date.now },
});

module.exports = model('Order', OrderSchema);
