// hubo problemas con las rutas orders, queda pendiente solucionarlo
const express = require('express');
const router = express.Router();

const userRouter = require('./user.routes');
const authRouter = require('./auth.routes');
const productRouter = require('./product.routes');
const orderRouter = require('./order.routes');

router.use('/users', userRouter);
router.use('/users', authRouter);
router.use('/products', productRouter);
router.use('/orders', orderRouter);

module.exports = router;