const { Router } = require('express');
const { createUser, createSemester, createWeek, createDiscipline } = require('../controllers/setupController');

const router = Router();

router.post('/usuarios', createUser);
router.post('/semestres', createSemester);
router.post('/semanas', createWeek);
router.post('/disciplinas', createDiscipline);

module.exports = router;
