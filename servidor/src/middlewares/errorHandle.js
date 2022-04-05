const logger = require('../logger/winston');

const errorHandle = (error, req, res, next) => {
    const status = error.status || 500;
    const errorMessageAndStatus = {
        errors: [
            {
                msg: error.message,
            }
        ]
    };
    logger.warn(errorMessageAndStatus);
    res.status(status);
    res.json(errorMessageAndStatus);
}

module.exports = {
    errorHandle
};