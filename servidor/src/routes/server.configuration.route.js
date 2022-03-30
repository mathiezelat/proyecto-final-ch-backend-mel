const { Router } = require('express');

const {
    getServerConfiguration,
} = require('../controllers/server.configuration.controller');

const router = Router();

router.get('/', getServerConfiguration);

module.exports = router;
