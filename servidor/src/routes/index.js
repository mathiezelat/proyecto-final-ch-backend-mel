const { Router } = require('express');

const authRoute = require('./auth.route');
const productsRoute = require('./products.route');
const cartsRoute = require('./carts.route');
const ordersRoute = require('./orders.route');
const usersRoute = require('./users.route');
const serverConfigurationRoute = require('./server.configuration.route');

const { routesNotFound } = require('../middlewares');

const router = Router();

router.use('/auth', authRoute);

router.use('/productos', productsRoute);

router.use('/carritos', cartsRoute);

router.use('/orders', ordersRoute);

router.use('/users', usersRoute);

router.use('/configuration', serverConfigurationRoute);

router.use('*', routesNotFound);

module.exports = router;
