const { createTransport } = require('nodemailer');
const logger = require('../logger/winston');
const { 
    NODEMAILER_MAIL, 
    NODEMAILER_MAIL_PASSWORD 
} = require('../config');

const transporter = createTransport({
    service: 'gmail',
    auth: {
        user: NODEMAILER_MAIL,
        pass: NODEMAILER_MAIL_PASSWORD,
    },
});

const sendMail = async (subject, html) => {
    try {
        const options = {
            from: `Servidor Node.js <${NODEMAILER_MAIL}>`,
            to: NODEMAILER_MAIL,
            subject,
            html,
        };

        const info = await transporter.sendMail(options);

        logger.info(info);
    } catch (error) {
        logger.error(error);
    }
};

const sendMailOfNewUserRegistration = async (newUser) => {
    try {
        await sendMail(
            `Nuevo registro de usuario - ${newUser.email}`,
            `
            <ul>
                <li>
                    <p>Nombre: ${newUser.nombre}</p>
                </li>
                <li>
                    <p>Edad: ${newUser.edad}</p>
                </li>
                <li>
                    <p>Email: ${newUser.email}</p>
                </li>
                <li>
                    <p>Dirección: ${newUser.direccion}</p>
                </li>
                <li>
                    <p>Número de teléfono: +${newUser.telefono}</p>
                </li>
                <li>
                    <p>Id del usuario: ${newUser.uid}</p>
                </li>
            </ul>
        `,
        );
    } catch (error) {
        logger.error(error);
    }
};

const sendMailOfNewOrder = async (newOrder) => {
    try {
        const htmlItems = newOrder.items.map((item, index) => (`
            <div>
                <h3>Producto ${index}</h3>
                <ul>
                    <li>
                        <p>Nombre: ${item.nombre}</p>
                    </li>
                    <li>
                        <p>Descripción: ${item.descripcion}</p>
                    </li>
                    <li>
                        <p>Categoría: ${item.categoria}</p>
                    </li>
                    <li>
                        <p>Precio: ${item.precio}</p>
                    </li>
                    <li>
                        <p>Cantidad: ${item.cantidad}</p>
                    </li>
                </ul>
            </div>
        `)).join("");

        const totalPrice = newOrder.items.reduce((acc, cur) => acc + cur.precio, 0);

        await sendMail(`Nuevo pedido de ${newOrder.email}`, `<div>
            <p>Número de orden: ${newOrder.orderNumber}</p>
            <p>Id del pedido: ${newOrder.id}</p>
            ${htmlItems}
            <p>Precio total: ${totalPrice}</p>
        </div>`);
    } catch (error) {
        logger.error(error);
    }
}

module.exports = {
    sendMail,
    sendMailOfNewUserRegistration,
    sendMailOfNewOrder,
};
