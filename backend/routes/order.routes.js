// hubo problemas con create y no se alcanzó a implementar el resto de las rutas, queda pendiente solucionarlo
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authorization');
const { createOrder, getOrder, getAllOrders, updateOrderStatus } = require('../controllers/order.controller');

router.post("/create", auth(['client', 'admin']), createOrder);
router.get("/", auth(['admin']), getAllOrders);
router.get('/:id', auth(['client', 'admin']), getOrder);
router.put('/:id', auth(['admin']), updateOrderStatus);

module.exports = router;
