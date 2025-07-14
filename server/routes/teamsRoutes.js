const express = require('express');
const router = express.Router();
const { 
  getAllTeams, 
  getTeamById, 
  getPopularTeams, 
  getTeamsByLeague,
  getTeamsByCountry,
  getAllLeagues
} = require('../controllers/teamsController');

// Get all teams with optional filtering
router.get('/', getAllTeams);

// Get all leagues
router.get('/leagues', getAllLeagues);

// Get popular teams
router.get('/popular', getPopularTeams);

// Get teams by league
router.get('/league/:id', getTeamsByLeague);

// Get teams by country
router.get('/country/:code', getTeamsByCountry);

// Get team by ID
router.get('/:id', getTeamById);

module.exports = router;
