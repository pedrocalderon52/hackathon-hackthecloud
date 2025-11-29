// src/routes/tarefaRoutes.js
const { Router } = require('express');
const { createTarefa, updateTarefa, deleteTarefa } = require('../controllers/tarefaController');

const router = Router();

router.post('/', createTarefa);
router.put('/:id', updateTarefa);
router.delete('/:id', deleteTarefa);

module.exports = router;
