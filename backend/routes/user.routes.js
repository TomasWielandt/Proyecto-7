// no se alcanzó a implementar create, readall y delete, queda pendiente
const express = require('express');
const router = express.Router();

const auth = require('../middleware/authorization');

const { readAll, readOne, create, update, remove } = require('../controllers/user.controller');

router.post("/create", auth(['admin']), create);
router.get("/readall", auth(['admin']), readAll);
router.get("/readone/:id", auth(['admin', 'client']), readOne);
router.put("/update/:id", auth(['admin', 'client']), update);
router.delete("/delete/:id", auth(['admin']), remove);

module.exports = router;