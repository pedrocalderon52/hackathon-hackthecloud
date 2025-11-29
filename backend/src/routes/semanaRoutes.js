// src/routes/semanaRoutes.js
const { Router } = require('express');
const { listarEventos, calcularICS, sugestaoReorganizacao } = require('../controllers/semanaController');

const router = Router();

router.get('/:semanaId/eventos', listarEventos);
router.get('/:semanaId/ics', calcularICS);
router.get('/:semanaId/sugestoes', sugestaoReorganizacao);

module.exports = router;
