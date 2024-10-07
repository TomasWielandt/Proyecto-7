const express = require('express');
const router = express.Router();

const userRouter = require('./user.routes');
const authRouter = require('./auth.routes');
const productRouter = require('./product.routes');

router.use('/user', userRouter);
router.use('/user', authRouter);
router.use('/product', productRouter);

module.exports = router;