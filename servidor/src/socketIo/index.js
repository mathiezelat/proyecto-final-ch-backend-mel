const {
    createMessage,
    getAllMessages,
    getAllMessagesByEmail,
} = require('../api/messages');

const socketIo = async (io, socket) => {
    console.log(`Nuevo cliente conectado, socketId: ${socket.id}`);

    socket.emit('messages', await getAllMessages());

    socket.on('message', async (newMessage) => {
        if(newMessage.message !== '' && newMessage.email !== '') {
            const message = await createMessage(newMessage);
            io.sockets.emit('message', message);
        }
    });
}

module.exports = socketIo;