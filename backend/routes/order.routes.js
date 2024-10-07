// routes/order.routes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authorization');
const { createOrder, readAllOrders, readOneOrder } = require('../controllers/order.controller');

router.post("/create", auth(['client', 'admin']), createOrder);
router.get("/readall", auth(['admin']), readAllOrders);
router.get('/readone/:id', auth(['client', 'admin']), readOneOrder);

module.exports = router;
