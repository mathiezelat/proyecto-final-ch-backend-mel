const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const compression = require('compression');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express')

const passport = require('./auth/auth');
const socketIo = require('./socketIo');

const swaggerDocument = require('./docs/swagger.json');

const { errorHandle, routesRenderReact } = require('./middlewares');

const app = express();

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: "*"
    }
});

app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(passport.initialize());
// app.use('/uploads', express.static(__dirname + '/uploads'));

io.on('connection', (socket) => {
    socketIo(io, socket);
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api', require('./routes'));

app.use(errorHandle);

app.use('*', routesRenderReact);


module.exports = httpServer;
