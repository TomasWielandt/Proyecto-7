const express = require('express');
const router = express.Router();

const userRouter = require('./user.routes');
const authRouter = require('./auth.routes');
const productRouter = require('./product.routes');
const orderRouter = require('./order.routes');

router.use('/user', userRouter);
router.use('/user', authRouter);
router.use('/product', productRouter);
router.use('/order', orderRouter);

module.exports = router;