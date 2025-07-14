const axios = require('axios');
const { teams, leagues } = require('../data/teamsData');

// Base URL for the free football data
const FOOTBALL_DATA_BASE_URL = 'https://raw.githubusercontent.com/openfootball/football.json/master';

// Helper function to get current season
const getCurrentSeason = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1; // JavaScript months are 0-based
  
  // If we're in the second half of the year, use current year/next year format
  // Otherwise use previous year/current year format
  return month >= 7 
    ? `${year}-${(year + 1).toString().slice(2)}` 
    : `${year - 1}-${year.toString().slice(2)}`;
};

// @desc    Get all teams
// @route   GET /api/teams
// @access  Public
exports.getAllTeams = async (req, res) => {
  try {
    // Filter parameters
    const { league, country, search } = req.query;
    
    let filteredTeams = [...teams];
    
    // Apply filters if provided
    if (league) {
      filteredTeams = filteredTeams.filter(team => team.leagueId === league);
    }
    
    if (country) {
      // Get league IDs for the specified country
      const leagueIds = leagues
        .filter(l => l.country.toLowerCase() === country.toLowerCase())
        .map(l => l.id);
      
      filteredTeams = filteredTeams.filter(team => leagueIds.includes(team.leagueId));
    }
    
    if (search) {
      const searchTerm = search.toLowerCase();
      filteredTeams = filteredTeams.filter(team => 
        team.name.toLowerCase().includes(searchTerm) || 
        team.shortName.toLowerCase().includes(searchTerm)
      );
    }
    
    // Add league information to each team
    const teamsWithLeagueInfo = filteredTeams.map(team => {
      const league = leagues.find(l => l.id === team.leagueId);
      return {
        ...team,
        league: league ? {
          id: league.id,
          name: league.name,
          country: league.country,
          logo: league.logo
        } : null
      };
    });
    
    res.status(200).json({
      success: true,
      data: {
        count: teamsWithLeagueInfo.length,
        teams: teamsWithLeagueInfo
      }
    });
  } catch (error) {
    console.error('Error fetching teams:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error fetching teams',
      error: error.message
    });
  }
};

// @desc    Get teams by league
// @route   GET /api/teams/league/:id
// @access  Public
exports.getTeamsByLeague = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find the league
    const league = leagues.find(l => l.id === id);
    
    if (!league) {
      return res.status(404).json({
        success: false,
        message: `League with ID ${id} not found`
      });
    }
    
    // Filter teams by league
    const leagueTeams = teams.filter(team => team.leagueId === id);
    
    res.status(200).json({
      success: true,
      data: {
        league: {
          id: league.id,
          name: league.name,
          country: league.country,
          logo: league.logo
        },
        count: leagueTeams.length,
        teams: leagueTeams
      }
    });
  } catch (error) {
    console.error(`Error fetching teams for league ${req.params.id}:`, error.message);
    res.status(500).json({
      success: false,
      message: `Error fetching teams for league ${req.params.id}`,
      error: error.message
    });
  }
};

// @desc    Get teams by country
// @route   GET /api/teams/country/:code
// @access  Public
exports.getTeamsByCountry = async (req, res) => {
  try {
    const { code } = req.params;
    
    // Find leagues for the country
    const countryLeagues = leagues.filter(l => 
      l.countryCode.toLowerCase() === code.toLowerCase() || 
      l.country.toLowerCase() === code.toLowerCase()
    );
    
    if (countryLeagues.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No leagues found for country ${code}`
      });
    }
    
    // Get league IDs
    const leagueIds = countryLeagues.map(l => l.id);
    
    // Filter teams by league IDs
    const countryTeams = teams.filter(team => leagueIds.includes(team.leagueId));
    
    // Add league information to each team
    const teamsWithLeagueInfo = countryTeams.map(team => {
      const league = leagues.find(l => l.id === team.leagueId);
      return {
        ...team,
        league: league ? {
          id: league.id,
          name: league.name,
          country: league.country,
          logo: league.logo
        } : null
      };
    });
    
    res.status(200).json({
      success: true,
      data: {
        country: countryLeagues[0].country,
        leagues: countryLeagues,
        count: teamsWithLeagueInfo.length,
        teams: teamsWithLeagueInfo
      }
    });
  } catch (error) {
    console.error(`Error fetching teams for country ${req.params.code}:`, error.message);
    res.status(500).json({
      success: false,
      message: `Error fetching teams for country ${req.params.code}`,
      error: error.message
    });
  }
};

// @desc    Get team details by ID
// @route   GET /api/teams/:id
// @access  Public
exports.getTeamById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find team by ID
    const team = teams.find(t => t.id.toString() === id);
    
    if (!team) {
      return res.status(404).json({
        success: false,
        message: `Team with ID ${id} not found`
      });
    }
    
    // Get league information
    const league = leagues.find(l => l.id === team.leagueId);
    
    // Format response
    const teamWithLeagueInfo = {
      ...team,
      league: league ? {
        id: league.id,
        name: league.name,
        country: league.country,
        logo: league.logo
      } : null
    };
    
    res.status(200).json({
      success: true,
      data: teamWithLeagueInfo
    });
  } catch (error) {
    console.error(`Error fetching team with ID ${req.params.id}:`, error.message);
    res.status(500).json({
      success: false,
      message: `Error fetching team with ID ${req.params.id}`,
      error: error.message
    });
  }
};

// @desc    Get all leagues
// @route   GET /api/teams/leagues
// @access  Public
exports.getAllLeagues = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: {
        count: leagues.length,
        leagues: leagues
      }
    });
  } catch (error) {
    console.error('Error fetching leagues:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error fetching leagues',
      error: error.message
    });
  }
};

// @desc    Get popular teams
// @route   GET /api/teams/popular
// @access  Public
exports.getPopularTeams = async (req, res) => {
  try {
    // Get top 10 popular teams
    const popularTeams = teams.slice(0, 10).map(team => {
      const league = leagues.find(l => l.id === team.leagueId);
      return {
        ...team,
        league: league ? {
          id: league.id,
          name: league.name,
          country: league.country,
          logo: league.logo
        } : null
      };
    });
    
    res.status(200).json({
      success: true,
      data: {
        count: popularTeams.length,
        teams: popularTeams
      }
    });
  } catch (error) {
    console.error('Error fetching popular teams:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error fetching popular teams',
      error: error.message
    });
  }
};
