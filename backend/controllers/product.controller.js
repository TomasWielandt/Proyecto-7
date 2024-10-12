const Product = require('../models/product');
// const bcryptjs = require('bcryptjs');

const readAll = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json({ products });
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: 'error obteniendo los productos', error });
    }
};

const readOne = async (req, res) => {
    try {
    const product = await Product.findById(req.params.id);
    res.json({ product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'error obteniendo el producto' });
  }
};

const create = async (req, res) => {
    try {
      const { name, description, price, stock, imageUrl } = req.body;
  
      const nuevoProducto = await Product.create({ name, description, price, stock, imageUrl });
      res.json(nuevoProducto);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'error creando un producto' });
    }
  };

  const update = async (req, res) => {
    try {
      const { name, description, price, stock, imageUrl } = req.body;
  
      const productoActualizado = await Product.findByIdAndUpdate(req.params.id, { name, description, price, stock, imageUrl }, { new:true });
      res.json(productoActualizado);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'error actualizando un producto' });
    }
  };

  const remove = async (req, res) => {
    try {
      const productoBorrado = await Product.findByIdAndDelete(req.params.id);
      res.json(productoBorrado);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'error borrando un producto' });
    }
  };

  // Función de búsqueda de productos
const search = async (req, res) => {
  try {
    const { name } = req.query;

    // Usamos una expresión regular para ignorar mayúsculas y minúsculas y buscar coincidencias parciales
    const products = await Product.find({ name: { $regex: name, $options: 'i' } });

    res.json({ products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error buscando productos', error });
  }
};

module.exports = { readAll, readOne, create, update, remove, search };