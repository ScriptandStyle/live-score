const express = require('express');
const { 
  getLatestNews, 
  getNewsByTeam, 
  getSportsHeadlines,
  searchNews
} = require('../controllers/newsController');

const router = express.Router();

router.get('/', getLatestNews);
router.get('/headlines', getSportsHeadlines);
router.get('/team/:name', getNewsByTeam);
router.get('/search/:keyword', searchNews);

module.exports = router;
