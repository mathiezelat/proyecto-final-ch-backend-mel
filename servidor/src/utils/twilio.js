const twilio = require('twilio');
const logger = require('../logger/winston');

const {
    TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN,
    TWILIO_NUMBER,
    TWILIO_NUMBER_WSP,
    TWILIO_NUMBER_USER_ADMIN,
    TWILIO_NUMBER_USER_ADMIN_WSP,
} = require('../config');

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

const sendSMS = async (body, to) => {
    try {
        const message = await client.messages.create({
            body: body,
            from: TWILIO_NUMBER,
            to: to,
        });
        logger.info(message);
    } catch (error) {
        logger.error(error);
    }
};

const sendWSP = async (body, to) => {
    try {
        const whatsapp = await client.messages.create({
            body: body,
            from: TWILIO_NUMBER_WSP,
            to: to,
        });
        logger.info(whatsapp);
    } catch (error) {
        logger.error(error);
    }
};

const sendWspOfNewOrder = async (newOrder) => {
    try {
        await sendWSP(
            `Nuevo pedido de ${newOrder.email} - Número de orden: ${newOrder.orderNumber}`,
            TWILIO_NUMBER_USER_ADMIN_WSP,
        );
    } catch (error) {
        logger.error(error);
    }
};

module.exports = {
    sendSMS,
    sendWSP,
    sendWspOfNewOrder,
};
