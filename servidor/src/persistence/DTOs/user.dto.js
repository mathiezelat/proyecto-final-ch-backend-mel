class UserDto {
    constructor(user) {
        this.uid = user._id;
        this.email = user.email;
        this.password = user.password;
        this.nombre = user.nombre;
        this.direccion = user.direccion;
        this.edad = user.edad;
        this.telefono = user.telefono;
        this.foto = user.foto;
    }

    toJSON() {
        const { password, ...usuario } = this;
        return usuario;
    }
}

module.exports = UserDto;