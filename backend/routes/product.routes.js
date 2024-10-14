// no se alcanzo a implementar las rutas con auth admin en el frontend, queda pendiente
const express = require('express');
const router = express.Router();

const auth = require('../middleware/authorization');

const { readAll, readOne, create, update, remove, search } = require('../controllers/product.controller');

router.post("/create", auth(['admin']), create);
router.get("/readall", readAll);
router.get("/readone/:id", readOne);
router.put("/update/:id", auth(['admin']), update);
router.delete("/delete/:id", auth(['admin']), remove);

// Nueva ruta para buscar productos
router.get("/search", search);

module.exports = router;