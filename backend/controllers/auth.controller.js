const User = require('../models/user');
const bcryptjs = require('bcryptjs');

const jwt = require('jsonwebtoken');

require('dotenv').config();

const register = async (req, res) => {
    try {
        const { name, email, password, active, role } = req.body;
        const salt = await bcryptjs.genSalt(parseInt(process.env.SALT || 10));
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            active,
            role,
        });
        res.status(201).json(newUser);
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: 'error al dar de alta al usuario' });
    }
};

const logIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'usuario o password incorrecto' });
        }
        const passwordCorrect = await bcryptjs.compare(password, user.password);
        if (!passwordCorrect) {
            return res.status(400).json({ message: 'usuario o password incorrecto' });
        }
        if (!user.active) {
            return res.status(400).json({ message: 'usuario inactivo, contacte al administrador' });
        }
        const payload = { user: { id: user.id, role: user.role } };
        jwt.sign(
            payload,
            process.env.SECRET,
            {
                expiresIn: '1h'
            },
            (error, token) => {
                if (error) throw error;
                res.status(200).json({ token });
            }
        );
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: 'error al iniciar sesión del usuario' });
    }
};

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

module.exports = { register, logIn, verifyToken };