const validateFields = require('./validateFields');
const errorHandle = require('./errorHandle');
const routesNotFound = require('./routesNotFound');
const routesRenderReact = require('./routesRenderReact');

module.exports = {
    ...validateFields,
    ...errorHandle,
    ...routesNotFound,
    ...routesRenderReact,
}