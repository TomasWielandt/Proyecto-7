const User = require('../models/user');
const bcryptjs = require('bcryptjs');

const jwt = require('jsonwebtoken');

require('dotenv').config();

const register = async (req, res) => {
    try {
        const { name, email, password, phone, address, active, role } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'El correo electrónico ya está en uso.' });
        }
        const salt = await bcryptjs.genSalt(parseInt(process.env.SALT || 10));
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            phone,
            address,
            active,
            role,
        });
        const payload = { user: { id: newUser.id, role: newUser.role } };
        jwt.sign(
            payload,
            process.env.SECRET,
            {
                expiresIn: '1h'
            },
            (error, token) => {
                if (error) throw error;
                // Aquí devolvemos tanto el token como el _id del nuevo usuario
                res.status(201).json({ userId: newUser.id, token });
            }
        );
        // res.status(201).json(newUser);
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: 'error al dar de alta al usuario' });
    }
};

// Login considerando si el usuario está activo o no
const logIn = async (req, res) => {
    const { email, password } = req.body;
    console.log('Intentando iniciar sesión con el email:', email); // Log del email que se está intentando usar

    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.log('Usuario no encontrado:', email); // Log si no se encuentra el usuario
            return res.status(400).json({ message: 'usuario o password incorrecto' });
        }

        const passwordCorrect = await bcryptjs.compare(password, user.password);
        if (!passwordCorrect) {
            console.log('Contraseña incorrecta para el usuario:', email); // Log si la contraseña es incorrecta
            return res.status(400).json({ message: 'usuario o password incorrecto' });
        }

        if (!user.active) {
            console.log('Usuario inactivo:', email); // Log si el usuario está inactivo
            return res.status(400).json({ message: 'usuario inactivo, contacte al administrador' });
        }

        console.log('Usuario encontrado y autenticado:', email); // Log cuando el usuario es autenticado correctamente

        const payload = { user: { id: user.id, role: user.role } };
        jwt.sign(
            payload,
            process.env.SECRET,
            { expiresIn: '1h' },
            (error, token) => {
                if (error) {
                    console.error('Error al generar el token:', error); // Log del error al generar token
                    throw error;
                }
                console.log('Token generado para el usuario:', email); // Log si el token se genera correctamente
                res.status(200).json({ userId: user.id, token });
            }
        );
    } catch (error) {
        console.error('Error en el login del usuario:', error); // Log del error general en el login
        res.status(500).json({ message: 'error al iniciar sesión del usuario' });
    }
};

// veifyToken no se alcanzó a implementar, queda pendiente
const verifyToken = async (req, res) => {
    try {
      // retorna los datos excluyendo el password
      usuarioVerificado = await User.findById(req.user.id).select('-password');
      res.json(usuarioVerificado);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'error verificando el token'});
    }
  };

//   // Función de depuración temporal para verificar manualmente el hash de la contraseña
// const verifyPassword = async () => {
//     const email = 'tomas@gmail.com';  // Reemplaza con el email que quieres verificar
//     const plainPassword = '111'; // Reemplaza con la contraseña que quieres probar
//     const user = await User.findOne({ email });
//     if (!user) {
//         console.log('Usuario no encontrado');
//         return;
//     }
    
//     const isMatch = await bcryptjs.compare(plainPassword, user.password);
//     console.log(`La contraseña ${isMatch ? 'coincide' : 'no coincide'}`);
// };

// // Llama a esta función para verificar la contraseña manualmente
// verifyPassword();

// // Función temporal para actualizar la contraseña de un usuario específico
// const updatePassword = async () => {
//     const email = 'tomas@gmail.com'; // Reemplaza con el email del usuario que quieres actualizar
//     const newPassword = '1234'; // Reemplaza con la nueva contraseña en texto plano que quieras usar

//     try {
//         const user = await User.findOne({ email });
//         if (!user) {
//             console.log('Usuario no encontrado');
//             return;
//         }

//         // Generar un nuevo hash para la nueva contraseña
//         const salt = await bcryptjs.genSalt(parseInt(process.env.SALT || 10));
//         const hashedPassword = await bcryptjs.hash(newPassword, salt);

//         // Actualizar la contraseña en la base de datos
//         user.password = hashedPassword;
//         await user.save();

//         console.log('Contraseña actualizada correctamente para el usuario:', email);
//     } catch (error) {
//         console.error('Error actualizando la contraseña:', error);
//     }
// };

// // Llama a esta función para actualizar la contraseña manualmente
// updatePassword();

module.exports = { register, logIn, verifyToken };