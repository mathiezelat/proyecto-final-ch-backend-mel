const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares');

const { validateConfirmPassword } = require('../utils/validators');

const { emailExists } = require('../utils/db-validators');

const {
    authGetProfile,
    authPostSignup,
    authPostLogin,
} = require('../controllers/auth.controller');

const router = Router();

router.get('/profile', authGetProfile);

router.post('/signup',[
    check('email', 'el email no es válido').isEmail(),
    check('email').custom(emailExists),
    check('password', 'la password debe de tener más de 6 caracteres').isLength({ min: 6 }),
    check('confirmPassword').custom(validateConfirmPassword),
    check('nombre', 'el nombre es requerido').notEmpty(),
    check('direccion', 'la direccion es obligatoria').notEmpty(),
    check('edad', 'la edad es obligatoria y debe ser un número').notEmpty().isNumeric(),
    check('telefono', 'el teléfono no es válido').isMobilePhone(['es-AR']),
    check('foto', 'la foto debe ser un URL de una imagen').isURL(),
    validateFields,
], authPostSignup);

router.post('/login', [
    check('email', 'el email no es válido').isEmail(),
    check('password', 'la password es obligatoria').notEmpty(),
    validateFields,
], authPostLogin);

module.exports = router;
