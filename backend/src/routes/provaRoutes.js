// src/routes/provaRoutes.js
const { Router } = require('express');
const { createProva, updateProva, deleteProva } = require('../controllers/provaController');

const router = Router();

router.post('/', createProva);
router.put('/:id', updateProva);
router.delete('/:id', deleteProva);

module.exports = router;
