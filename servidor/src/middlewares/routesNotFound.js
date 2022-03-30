const logger = require('../logger/winston');

const routesNotFound = (req, res) => {
    logger.info(`Info: ruta '${req.originalUrl}' método '${req.method}' no implementada`);
    res.status(404).json({
        error: 404,
        description: `ruta '${req.originalUrl}' método '${req.method}' no implementada`,
    });
}

module.exports = {
    routesNotFound
};