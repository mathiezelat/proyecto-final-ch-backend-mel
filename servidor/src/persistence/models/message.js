const { Schema, model } = require('mongoose');

const MessageSchema = new Schema({
    email: { type: String, required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    type: { type: String, default: 'sistema' },
});

module.exports = model('Message', MessageSchema);
