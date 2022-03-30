const { Schema, model } = require('mongoose');

const CartSchema = new Schema({
    email: { type: String, required: true },
    items: { type: Array, required: true, default: [] },
    direccion: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

module.exports = model('Cart', CartSchema);
