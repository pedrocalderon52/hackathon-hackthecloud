const { Router } = require('express');
const { getDailyActivities } = require('../controllers/diaController');

const router = Router();

router.get('/', getDailyActivities);

module.exports = router;
