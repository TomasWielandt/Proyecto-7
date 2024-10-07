// controllers/order.controller.js
const Order = require('../models/order');
const Product = require('../models/product');

const createOrder = async (req, res) => {
    try {
        const { products } = req.body;
        const userId = req.user.id;

        let orderProducts = [];
        let totalOrderValue = 0;

        for (const item of products) {
            const product = await Product.findById(item.product);

            if (!product) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }

            if (item.quantity > product.stock) {
                return res.status(400).json({ message: `La cantidad solicitada para ${product.name} excede el stock disponible.` });
            }

            const total = product.price * item.quantity;
            totalOrderValue += total;

            orderProducts.push({
                product: product._id,
                quantity: item.quantity,
                total: total,
            });

            product.stock -= item.quantity;
            await product.save();
        }

        const newOrder = await Order.create({
            user: userId,
            products: orderProducts,
        });

        res.status(201).json({ newOrder, totalOrderValue });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear la orden', error });
    }
};

const readAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('user').populate('products.product');
        res.json({ orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error obteniendo las órdenes', error });
    }
};

const readOneOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id).populate('user').populate('products.product');

        if (!order) {
            return res.status(404).json({ message: 'Orden no encontrada' });
        }

        res.json({ order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error obteniendo la orden', error });
    }
};

module.exports = { createOrder, readAllOrders, readOneOrder };
