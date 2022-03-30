const { Router } = require('express');
const passport = require('passport');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares');

const { userExistsById } = require('../utils/db-validators');

const { PERSISTENCE } = require('../config');

const {
    usersGet,
    usersGetById,
} = require('../controllers/users.controller');

const isMongoPersistence = PERSISTENCE === 'mongo';

const router = Router();

router.get('/', usersGet);

router.get('/:id', [
    check('id', 'No es un ID válido').if(() => isMongoPersistence).isMongoId().bail().custom(userExistsById),
    check('id').if(() => !isMongoPersistence).custom(userExistsById),
    validateFields,
    passport.authenticate('jwt', { session: false }),
], usersGetById);

module.exports = router;