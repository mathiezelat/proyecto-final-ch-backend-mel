const passport = require('passport');
const jwt = require('jsonwebtoken');

const { 
    SECRET_OR_PRIVATE_KEY, 
    TOKEN_EXPIRES_IN 
} = require('../config');

const authGetProfile = [
    passport.authenticate('jwt', { 
        session: false 
    }), 
    (req, res, next) => {
        res.json({
            nombre: req.user.nombre,
            email: req.user.email,
            uid: req.user.uid,
            token: req.headers['authorization'].split(' ')[1],
        })
    }
];

const authPostSignup = [
    passport.authenticate('signup', {
        session: false,
    }),
    async (req, res, next) => {
        res.json({
            message: 'Registro con éxito',
            user: req.user,
        });
    },
];

const authPostLogin = async (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {
        try {
            if (err || !user) {
                const error = {
                    message: info.message,
                    status: 400,
                };
                return next(error);
            }

            req.login(user, { session: false }, async (err) => {
                if (err) return next(err);
                const body = { nombre: user.nombre, uid: user.uid, email: user.email };
                const token = jwt.sign({ user: body }, SECRET_OR_PRIVATE_KEY, {
                    expiresIn: TOKEN_EXPIRES_IN,
                });
                return res.json({ token, nombre: user.nombre, email: user.email, uid: user.uid });
            });
        } catch (error) {
            return next(error);
        }
    })(req, res, next);
};

module.exports = {
    authGetProfile,
    authPostSignup,
    authPostLogin,
};
