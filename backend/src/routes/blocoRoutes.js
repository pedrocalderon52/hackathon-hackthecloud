// src/routes/blocoRoutes.js
const { Router } = require('express');
const { createBloco, updateBloco, deleteBloco } = require('../controllers/blocoController');

const router = Router();

router.post('/', createBloco);
router.put('/:id', updateBloco);
router.delete('/:id', deleteBloco);

module.exports = router;
