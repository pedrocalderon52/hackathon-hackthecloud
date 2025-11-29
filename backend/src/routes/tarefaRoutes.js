// src/routes/tarefaRoutes.js
const { Router } = require('express');
const { createTarefa, readTarefas, readTarefa, updateTarefa, deleteTarefa } = require('../controllers/tarefaController');

const router = Router();

router.post('/', createTarefa);
router.get('/', readTarefas);
router.get('/:id', readTarefa);
router.put('/:id', updateTarefa);
router.delete('/:id', deleteTarefa);

module.exports = router;
