const path = require('path');
const logger = require('../logger/winston');


const routesRenderReact = (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "index.html"), err => {
        if (err) {
            logger.warn(err);
        }
    });
}

module.exports = {
    routesRenderReact
};