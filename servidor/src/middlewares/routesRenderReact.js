const path = require('path');

const routesRenderReact = (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "index.html"), err => {
        if (err) {
            console.log(err);
        }
    });
}

module.exports = {
    routesRenderReact
};