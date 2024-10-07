const express = require('express');
const router = express.Router();

const auth = require('../middleware/authorization');

const { register, logIn, verifyToken } = require('../controllers/auth.controller');

router.post("/register", register);
router.post("/login", logIn);
router.get("/verifytoken", auth(['admin', 'client']), verifyToken);

module.exports = router;