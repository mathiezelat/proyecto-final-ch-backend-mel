const path = require('path');
require('dotenv').config({
    path: path.resolve(process.cwd(), process.env.NODE_ENV + '.env'),
});

module.exports = {
    PORT: process.env.PORT || 8080,
    MODE_SERVER: process.env.MODE_SERVER || 'fork',
    PERSISTENCE: process.env.PERSISTENCE || 'memoria',
    ADMIN: process.env.ADMIN || 'false',
    MONGODB_CNN: process.env.MONGODB_CNN || 'mongodb://localhost/ecommerce-mel',
    TOKEN_EXPIRES_IN: process.env.TOKEN_EXPIRES_IN || '1h',
    SECRET_OR_PRIVATE_KEY: process.env.SECRET_OR_PRIVATE_KEY || '',
    NODEMAILER_MAIL: process.env.NODEMAILER_MAIL || '',
    NODEMAILER_MAIL_PASSWORD: process.env.NODEMAILER_MAIL_PASSWORD || '',
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID || '',
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN || '',
    TWILIO_NUMBER: process.env.TWILIO_NUMBER || '',
    TWILIO_NUMBER_WSP: process.env.TWILIO_NUMBER_WSP || '',
    TWILIO_NUMBER_USER_ADMIN: process.env.TWILIO_NUMBER_USER_ADMIN || '',
    TWILIO_NUMBER_USER_ADMIN_WSP: process.env.TWILIO_NUMBER_USER_ADMIN_WSP || '',
};
