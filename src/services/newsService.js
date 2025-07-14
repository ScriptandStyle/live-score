import api from './api';

// Get latest news
export const getLatestNews = async () => {
  try {
    const response = await api.get('/news');
    return response.data;
  } catch (error) {
    console.error('Error fetching latest news:', error);
    throw error;
  }
};

// Get news by team
export const getNewsByTeam = async (teamName) => {
  try {
    const response = await api.get(`/news/team/${teamName}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching news for team ${teamName}:`, error);
    throw error;
  }
};

// Get sports headlines
export const getSportsHeadlines = async () => {
  try {
    const response = await api.get('/news/headlines');
    return response.data;
  } catch (error) {
    console.error('Error fetching sports headlines:', error);
    throw error;
  }
};

// Search news by keyword
export const searchNews = async (keyword) => {
  try {
    const response = await api.get(`/news/search/${keyword}`);
    return response.data;
  } catch (error) {
    console.error(`Error searching news for "${keyword}":`, error);
    throw error;
  }
};
