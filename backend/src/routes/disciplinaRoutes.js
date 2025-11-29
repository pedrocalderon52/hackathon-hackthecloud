const { Router } = require('express');
const { listAttendance } = require('../controllers/disciplinaController');

const router = Router();

router.get('/:semesterId/attendance', listAttendance);

module.exports = router;
