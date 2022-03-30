
const validateConfirmPassword = async (confirmPassword, { req }) => {
    const password = req.body.password;
    if(password !== confirmPassword) {
        throw new Error('Las contraseñas deben ser iguales');
    }
}

module.exports = {
    validateConfirmPassword,
}