const { Router } = require('express');
const passport = require('passport');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares');

const { productExistsById } = require('../utils/db-validators');

const { PERSISTENCE } = require('../config');

const isAdmin = require('../middlewares/isAdmin');

const {
    productsGet,
    productsGetById,
    productsPost,
    productsPut,
    productsDelete,
} = require('../controllers/products.controller');

const isMongoPersistence = PERSISTENCE === 'mongo';

const router = Router();

router.get('/', [
    passport.authenticate('jwt', { session: false })
], productsGet);

router.get('/:id', [
    check('id', 'No es un ID válido').if(() => isMongoPersistence).isMongoId().bail().custom(productExistsById),
    check('id').if(() => !isMongoPersistence).custom(productExistsById),
    validateFields,
    passport.authenticate('jwt', { session: false }),
], productsGetById);

router.post('/', [
    check('nombre', 'el nombre es obligatorio').notEmpty(),
    check('descripcion', 'la descripcion es obligatoria').notEmpty(),
    check('categoria', 'la categoria es requerida').notEmpty(),
    check('foto', 'la foto debe ser un URL de una imagen').isURL(),
    check('precio', 'el precio es obligatorio').notEmpty(),
    check('stock', 'el stock es obligatorio').notEmpty(),
    check('codigo', 'el codigo es obligatorio').notEmpty(),
    validateFields,
    passport.authenticate('jwt', { session: false }),
    isAdmin,
], productsPost);

router.put('/:id', [
    check('id', 'No es un ID válido').if(() => isMongoPersistence).isMongoId().bail().custom(productExistsById),
    check('id').if(() => !isMongoPersistence).custom(productExistsById),
    check('foto', 'la foto debe ser un URL de una imagen').isURL(),
    validateFields,
    passport.authenticate('jwt', { session: false }),
    isAdmin,
], productsPut);

router.delete('/:id', [
    check('id', 'No es un ID válido').if(() => isMongoPersistence).isMongoId().bail().custom(productExistsById),
    check('id').if(() => !isMongoPersistence).custom(productExistsById),
    validateFields,
    passport.authenticate('jwt', { session: false }),
    isAdmin,
], productsDelete);

module.exports = router;
