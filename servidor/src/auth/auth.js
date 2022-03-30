const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const { Strategy: JWTStrategy } = require('passport-jwt');
const { ExtractJwt } = require('passport-jwt');
const bcrypt = require('bcrypt');

const { sendMailOfNewUserRegistration } = require('../utils/nodemailer');
const logger = require('../logger/winston');

const { SECRET_OR_PRIVATE_KEY } = require('../config');

const {
    createUser,
    getUserByEmail,
} = require('../api/users');

passport.use('signup', new LocalStrategy({
        usernameField: 'email',
        passReqToCallback: true,
    }, async (req, email, password, done) => {
        try {
            const { nombre, direccion, edad, telefono, foto } = req.body;
            
            const newUser = {
                email, 
                password,
                nombre,
                direccion,
                edad,
                telefono,
                foto,
            };

            const hash = await bcrypt.hash(password, await bcrypt.genSalt(10));
            newUser.password = hash;

            const user = await createUser(newUser);

            await sendMailOfNewUserRegistration(user);
            logger.info(`Registro de usuario: ${email} con éxito`);

            return done(null, user, { message: 'Inicio de sesión con éxito' });
        } catch (error) {
            done(error);
        }
    }
));

passport.use('login', new LocalStrategy({
        usernameField: 'email',
    }, async (email, password, done) => {
        try {
            const user = await getUserByEmail(email);
            if (!user) {
                return done(null, false, { message: 'Usuario no encontrado' });
            }

            const isValidPassword = await bcrypt.compare(password, user.password);
            if(!isValidPassword) {
                return done(null, false, { message: 'Contraseña incorrecta' });
            }
            
            logger.info(`Inicio de sesión de usuario: ${email} con éxito`);

            return done(null, user, { message: 'Inicio de sesión con éxito' })
        } catch (error) {
            done(error);
        }
    }
));

passport.use(new JWTStrategy({
        secretOrKey: SECRET_OR_PRIVATE_KEY,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    }, async (token, done) => {
        try {
            return done(null, token.user);
        } catch (error) {
            done(error);
        }
    }
));

module.exports = passport;