const { Router } = require('express');
const { getWeeklyRecommendations } = require('../controllers/recommendationController');

const router = Router();

router.get('/:semanaId', getWeeklyRecommendations);

module.exports = router;
