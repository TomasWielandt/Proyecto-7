const jwt = require('jsonwebtoken');
require('dotenv').config();

// Autorización considerando el rol del usuario
module.exports = (roles) => {
    return (req, res, next) => {
        let { authorization } = req.headers;
        console.log('Cabecera de autorización recibida:', authorization); // Log de la cabecera de autorización

        if (!authorization) {
            console.log('No se envió la cabecera de autorización'); // Log si no se envió autorización
            return res.status(401).json({ message: 'Acceso no autorizado' });
        }

        try {
            let [type, token] = authorization.split(" ");
            console.log('Tipo de autorización:', type, 'Token recibido:', token); // Log del tipo y el token recibido

            if (type === 'Token' || type === 'Bearer') {
                const openToken = jwt.verify(token, process.env.SECRET);
                req.user = openToken.user;
                console.log('Token verificado, usuario:', req.user); // Log si el token es válido

                if (roles.includes(req.user.role)) {
                    console.log('Usuario autorizado con el rol:', req.user.role); // Log si el usuario tiene el rol correcto
                    next();
                } else {
                    console.log('Rol no autorizado para el usuario:', req.user.role); // Log si el usuario no tiene un rol autorizado
                    return res.status(403).json({ message: 'Acceso no autorizado' });
                }
            } else {
                console.log('Tipo de autorización no válido:', type); // Log si el tipo de autorización no es válido
                return res.status(401).json({ message: 'Acceso no autorizado' });
            }
        } catch (error) {
            console.error('Error al verificar el token:', error); // Log del error al verificar el token
            return res.status(500).json({ message: 'Ocurrió un error', error });
        }
    };
};

