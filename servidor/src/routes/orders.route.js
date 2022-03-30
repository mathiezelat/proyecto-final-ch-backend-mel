const { Router } = require('express');
const passport = require('passport');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares');

const { orderExistsById, cartExistsById } = require('../utils/db-validators');

const { PERSISTENCE } = require('../config');

const {
    ordersGet,
    ordersGetById,
    ordersGetByEmail,
    ordersPost,
} = require('../controllers/orders.controller');

const isMongoPersistence = PERSISTENCE === 'mongo';

const router = Router();

router.get('/', ordersGet);

router.get('/user', [
    check('email', 'el email no es válido').isEmail(),
    validateFields,
    passport.authenticate('jwt', { session: false }),
],ordersGetByEmail);

router.get('/:id', [
    check('id', 'No es un ID válido').if(() => isMongoPersistence).isMongoId().bail().custom(orderExistsById),
    check('id').if(() => !isMongoPersistence).custom(orderExistsById),
    validateFields,
    passport.authenticate('jwt', { session: false }),
], ordersGetById);

router.post('/', [
    check('cartId', 'el cartId es obligatorio').notEmpty(),
    check('cartId', 'No es un ID válido').if(() => isMongoPersistence).isMongoId().bail().custom(cartExistsById),
    check('cartId').if(() => !isMongoPersistence).custom(cartExistsById),
    validateFields,
    passport.authenticate('jwt', { session: false }),
], ordersPost);

module.exports = router;