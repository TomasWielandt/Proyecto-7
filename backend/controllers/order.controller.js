// no se pudieron implementar los controles de order en el frontend ya que no funcionó la conección entre frontend y backend 
//con paypal, queda pendiente de arregalar
const Order = require('../models/order');
const Product = require('../models/product');

const createOrder = async (req, res) => {
    const userId = req.user.id; // Obtener el ID del usuario autenticado desde el middleware
    const { items, orderId } = req.body; // Obtener items y el orderId de PayPal

    try {
        let totalAmount = 0; // Inicializar totalAmount
        const orderItems = []; // Array para almacenar los items de la orden

        // Iterar sobre los items para calcular el total
        for (const item of items) {
            const product = await Product.findById(item.productId);
            if (!product) {
                return res.status(404).json({ message: `Producto con ID ${item.productId} no encontrado.` });
            }
            totalAmount += product.price * item.quantity; // Calcular el total

            // Crear un objeto de item que incluya el producto y el precio
            orderItems.push({
                product: product._id, // Asignar la referencia al producto
                quantity: item.quantity, // Cantidad del producto
                price: product.price // Asignar el precio del producto
            });
        }

        // Crear la nueva orden con el totalAmount calculado
        const newOrder = await Order.create({
            user: userId, // Asignar el ID del usuario autenticado
            items: orderItems, // Pasar los items con detalles completos
            totalAmount, // Usar el totalAmount calculado
            paypalOrderId: orderId // Guardar el orderId de PayPal
        });

        res.status(201).json(newOrder); // Devolver la nueva orden creada
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear la orden', error });
    }
};

const getOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const userId = req.user.id;

        // Busca la orden por ID
        const order = await Order.findById(orderId);
        
        if (!order) {
            return res.status(404).json({ message: 'Orden no encontrada' });
        }

        // Verifica si el usuario es el dueño de la orden
        if (!order.user) {
            return res.status(404).json({ message: 'No se encontró el usuario asociado a la orden' });
        }

        if (order.user.toString() !== userId) {
            return res.status(403).json({ message: 'No tienes permiso para acceder a esta orden' });
        }

        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error obteniendo la orden', error });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({});
        res.json({ orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error obteniendo las órdenes', error });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const orderId = req.params.id;
        const { status } = req.body;

        const updatedOrder = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({ message: 'Orden no encontrada' });
        }

        res.json(updatedOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error actualizando el estado de la orden' });
    }
};

module.exports = {
    createOrder,
    getOrder,
    getAllOrders,
    updateOrderStatus,
};
