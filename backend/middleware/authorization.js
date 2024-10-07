const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (requiredRole = 'client') => {
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
                if (openToken.user.role && (openToken.user.role === 'client' || openToken.user.role === 'admin')) {
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
