// src/routes/provaRoutes.js
const { Router } = require('express');
const { createProva, readProvas, readProva, updateProva, deleteProva } = require('../controllers/provaController');

const router = Router();

router.post('/', createProva);
router.put('/:id', updateProva);
router.delete('/:id', deleteProva);
router.get('/', readProvas);
router.get('/:id', readProva);

module.exports = router;
