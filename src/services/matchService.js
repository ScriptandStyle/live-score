import api from './api';

// Get live matches
export const getLiveMatches = async () => {
  try {
    const response = await api.get('/matches/live');
    return response.data;
  } catch (error) {
    console.error('Error fetching live matches:', error);
    throw error;
  }
};

// Get upcoming matches
export const getUpcomingMatches = async () => {
  try {
    const response = await api.get('/matches/upcoming');
    return response.data;
  } catch (error) {
    console.error('Error fetching upcoming matches:', error);
    throw error;
  }
};

// Get match details by ID
export const getMatchById = async (id) => {
  try {
    const response = await api.get(`/matches/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching match with ID ${id}:`, error);
    throw error;
  }
};

// Get recent match results
export const getRecentResults = async () => {
  try {
    const response = await api.get('/matches/results');
    return response.data;
  } catch (error) {
    console.error('Error fetching recent results:', error);
    throw error;
  }
};
