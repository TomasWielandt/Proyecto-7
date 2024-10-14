// no se alcanzó a implementar readAll, create, y remove en el frontend, queda pendiente
const User = require('../models/user');
const bcryptjs = require('bcryptjs');

const readAll = async (req, res) => {
    try {
        const users = await User.find({});
        res.json({ users });
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: 'error obteniendo los usuarios', error });
    }
};

const readOne = async (req, res) => {
    try {
    const user = await User.findById(req.params.id);
    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'error obteniendo al usuario' });
  }
};

const create = async (req, res) => {
    try {
      const { name, email, password, phone, address, active, role } = req.body;
  
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);
  
      const nuevoUsuario = await User.create({ name, email, password: hashedPassword, phone, address, active, role });
      res.json(nuevoUsuario);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'error creando un usuario' });
    }
  };

  const update = async (req, res) => {
    try {
        const { name, email, password, phone, address, active, role } = req.body;

        // Crea un objeto para las actualizaciones
        const updates = { name, email, phone, address, active, role };

        // Si se proporciona una nueva contraseña, hashearla
        if (password) {
            const salt = await bcryptjs.genSalt(10);
            updates.password = await bcryptjs.hash(password, salt);
        }

        // Actualizar el usuario sin sobrescribir la contraseña si no se proporciona una nueva
        const usuarioActualizado = await User.findByIdAndUpdate(req.params.id, updates, { new: true });
        res.json(usuarioActualizado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'error actualizando un usuario' });
    }
};

  

  const remove = async (req, res) => {
    try {
      const usuarioBorrado = await User.findByIdAndDelete(req.params.id);
      res.json(usuarioBorrado);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'error borrando un usuario' });
    }
  };

module.exports = { readAll, readOne, create, update, remove };