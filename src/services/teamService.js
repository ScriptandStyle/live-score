import api from './api';

// Get all teams with optional filtering
export const getAllTeams = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams();
    
    if (filters.league) queryParams.append('league', filters.league);
    if (filters.country) queryParams.append('country', filters.country);
    if (filters.search) queryParams.append('search', filters.search);
    
    const queryString = queryParams.toString();
    const url = queryString ? `/teams?${queryString}` : '/teams';
    
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching all teams:', error);
    throw error;
  }
};

// Get all leagues
export const getAllLeagues = async () => {
  try {
    const response = await api.get('/teams/leagues');
    return response.data;
  } catch (error) {
    console.error('Error fetching leagues:', error);
    throw error;
  }
};

// Get teams by league
export const getTeamsByLeague = async (leagueId) => {
  try {
    const response = await api.get(`/teams/league/${leagueId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching teams for league ${leagueId}:`, error);
    throw error;
  }
};

// Get teams by country
export const getTeamsByCountry = async (countryCode) => {
  try {
    const response = await api.get(`/teams/country/${countryCode}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching teams for country ${countryCode}:`, error);
    throw error;
  }
};

// Get popular teams
export const getPopularTeams = async () => {
  try {
    const response = await api.get('/teams/popular');
    return response.data;
  } catch (error) {
    console.error('Error fetching popular teams:', error);
    throw error;
  }
};

// Get team by ID
export const getTeamById = async (teamId) => {
  try {
    const response = await api.get(`/teams/${teamId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching team with ID ${teamId}:`, error);
    throw error;
  }
};
