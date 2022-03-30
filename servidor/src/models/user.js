const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, 'el correo es obligatorio'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'la contraseña es obligatoria'],
    },
    nombre: { type: String, required: [true, 'el nombre es obligatorio'] },
    direccion: {
        type: String,
        required: [true, 'la dirección es obligatoria'],
    },
    edad: { type: Number, required: [true, 'la edad es obligatoria'] },
    telefono: {
        type: Number,
        required: [true, 'el número de teléfono es obligatorio'],
    },
    foto: { type: String },
});

UserSchema.methods.toJSON = function() {
    const { __v, password, _id, ...user } = this.toObject();
    user.uid = _id;
    return user;
}

module.exports = model('User', UserSchema);
