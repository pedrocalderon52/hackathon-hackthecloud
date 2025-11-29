// src/routes/blocoRoutes.js
const { Router } = require('express');
const { createBloco, readBlocos, readBloco, updateBloco, deleteBloco } = require('../controllers/blocoController');

const router = Router();

router.post('/', createBloco);
router.put('/:id', updateBloco);
router.delete('/:id', deleteBloco);
router.get('/', readBlocos);
router.get('/:id', readBloco);

module.exports = router;
