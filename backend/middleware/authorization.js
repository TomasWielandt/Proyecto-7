const jwt = require('jsonwebtoken');
require('dotenv').config();

// Autorización considerando el rol del usuario
module.exports = (roles) => {
    return (req, res, next) => {
        let { authorization } = req.headers;
        if (!authorization) {
            return res.status(401).json({ message: 'Acceso no autorizado' });
        }

        try {
            let [type, token] = authorization.split(" ");
            if (type === 'Token' || type === 'Bearer') {
                const openToken = jwt.verify(token, process.env.SECRET);
                req.user = openToken.user;
                if (roles.includes(req.user.role)) {
                    next();
                } else {
                    return res.status(403).json({ message: 'Acceso no autorizado' });
                }
            } else {
                return res.status(401).json({ message: 'Acceso no autorizado' });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Ocurrió un error', error });
        }
    };
};
