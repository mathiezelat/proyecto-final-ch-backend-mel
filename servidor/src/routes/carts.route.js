const { Router } = require('express');
const passport = require('passport');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares');

const {
    userExistsById,
    cartExistsById, 
    productExistsById, 
    productsExistsByIds,
    cartProductExistsById,
} = require('../utils/db-validators');

const { PERSISTENCE } = require('../config');

const {
    cartsGet,
    cartGetByEmail,
    cartsPost,
    cartsDelete,
    cartsGetProducts,
    cartsPostProducts,
    cartsDeleteProducts,
} = require('../controllers/carts.controller');

const isMongoPersistence = PERSISTENCE === 'mongo';

const router = Router();

router.get('/', [
    passport.authenticate('jwt', { session: false }),
], cartsGet);

router.get('/user', [
    check('email', 'el email no es válido').isEmail(),
    validateFields,
    passport.authenticate('jwt', { session: false }),
], cartGetByEmail);

router.post('/', [
    check('userId', 'el userId es obligatorio').notEmpty(),
    check('userId', 'No es un ID válido').if(() => isMongoPersistence).isMongoId().bail().custom(userExistsById),
    check('userId').if(() => !isMongoPersistence).custom(userExistsById),
    validateFields,
    passport.authenticate('jwt', { session: false }),
], cartsPost);

router.delete('/:id', [
    check('id', 'No es un ID válido').if(() => isMongoPersistence).isMongoId().bail().custom(cartExistsById),
    check('id').if(() => !isMongoPersistence).custom(cartExistsById),
    validateFields,
    passport.authenticate('jwt', { session: false }),
], cartsDelete);

router.get('/:id/productos', [
    check('id', 'No es un ID válido').if(() => isMongoPersistence).isMongoId().bail().custom(cartExistsById),
    check('id').if(() => !isMongoPersistence).custom(cartExistsById),
    validateFields,
    passport.authenticate('jwt', { session: false }),
], cartsGetProducts);

router.post('/:id/productos', [
    check('id', 'No es un ID válido').if(() => isMongoPersistence).isMongoId().bail().custom(cartExistsById),
    check('id').if(() => !isMongoPersistence).custom(cartExistsById),
    check('productos', 'los productos son obligatorios').notEmpty(),
    check('productos.*', 'No es un ID válido').if(() => isMongoPersistence).isMongoId().bail().custom(productExistsById),
    check('productos').if(() => !isMongoPersistence).custom(productsExistsByIds),
    validateFields,
    passport.authenticate('jwt', { session: false }),
], cartsPostProducts);

router.delete('/:id/productos/:idProduct', [
    check('id', 'No es un ID válido').if(() => isMongoPersistence).isMongoId().bail().custom(cartExistsById),
    check('id').if(() => !isMongoPersistence).custom(cartExistsById),
    check('idProduct', 'No es un ID válido').if(() => isMongoPersistence).isMongoId().bail().custom(productExistsById).custom(cartProductExistsById),
    check('idProduct').if(() => !isMongoPersistence).custom(productExistsById).custom(cartProductExistsById),
    validateFields,
    passport.authenticate('jwt', { session: false }),
], cartsDeleteProducts);

module.exports = router;
