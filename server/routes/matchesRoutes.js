const express = require('express');
const { 
  getLiveMatches, 
  getUpcomingMatches, 
  getMatchById, 
  getRecentResults 
} = require('../controllers/matchesController');

const router = express.Router();

router.get('/live', getLiveMatches);
router.get('/upcoming', getUpcomingMatches);
router.get('/results', getRecentResults);
router.get('/:id', getMatchById);

module.exports = router;
