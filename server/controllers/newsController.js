const axios = require('axios');

// Base URL for the free news API
const NEWS_API_BASE_URL = 'https://saurav.tech/NewsAPI';

// Football keywords for filtering
const FOOTBALL_KEYWORDS = [
  'football', 'soccer', 'premier league', 'la liga', 'bundesliga', 
  'serie a', 'champions league', 'world cup', 'uefa', 'fifa',
  'manchester united', 'liverpool', 'chelsea', 'arsenal', 'manchester city',
  'real madrid', 'barcelona', 'bayern munich', 'juventus', 'psg',
  'ronaldo', 'messi', 'neymar', 'mbappe', 'salah', 'kane', 'haaland'
];

// Helper function to check if an article is football-related
const isFootballRelated = (article) => {
  const title = article.title?.toLowerCase() || '';
  const description = article.description?.toLowerCase() || '';
  const content = article.content?.toLowerCase() || '';
  
  return FOOTBALL_KEYWORDS.some(keyword => 
    title.includes(keyword) || description.includes(keyword) || content.includes(keyword)
  );
};

// @desc    Get latest football news
// @route   GET /api/news
// @access  Public
exports.getLatestNews = async (req, res) => {
  try {
    // Get sports news from multiple countries to increase chances of finding football news
    const countries = ['us', 'gb', 'de', 'fr', 'es', 'it'];
    let allArticles = [];
    
    // Fetch news from each country
    for (const country of countries) {
      try {
        const response = await axios.get(`${NEWS_API_BASE_URL}/top-headlines/category/sports/${country}.json`);
        if (response.data && response.data.articles) {
          allArticles = [...allArticles, ...response.data.articles];
        }
      } catch (error) {
        console.log(`Error fetching news from ${country}:`, error.message);
        // Continue with other countries if one fails
      }
    }
    
    // Also try to get news from specific sports sources
    const sources = ['espn', 'fox-sports', 'talksport', 'bbc-sport'];
    for (const source of sources) {
      try {
        const response = await axios.get(`${NEWS_API_BASE_URL}/everything/${source}.json`);
        if (response.data && response.data.articles) {
          allArticles = [...allArticles, ...response.data.articles];
        }
      } catch (error) {
        console.log(`Error fetching news from ${source}:`, error.message);
        // Continue with other sources if one fails
      }
    }

    // Filter for football/soccer related news only
    const footballNews = allArticles.filter(isFootballRelated);
    
    // Remove duplicates (based on title)
    const uniqueFootballNews = Array.from(
      new Map(footballNews.map(article => [article.title, article])).values()
    );
    
    // Sort by published date (newest first)
    uniqueFootballNews.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

    res.status(200).json({
      success: true,
      data: {
        status: 'ok',
        totalResults: uniqueFootballNews.length,
        articles: uniqueFootballNews.slice(0, 20) // Limit to 20 articles
      }
    });
  } catch (error) {
    console.error('Error fetching latest news:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error fetching latest news',
      error: error.message
    });
  }
};

// @desc    Get news by team
// @route   GET /api/news/team/:name
// @access  Public
exports.getNewsByTeam = async (req, res) => {
  try {
    const { name } = req.params;
    
    // Get sports news from multiple countries to increase chances of finding team news
    const countries = ['us', 'gb', 'de', 'fr', 'es', 'it'];
    let allArticles = [];
    
    // Fetch news from each country
    for (const country of countries) {
      try {
        const response = await axios.get(`${NEWS_API_BASE_URL}/top-headlines/category/sports/${country}.json`);
        if (response.data && response.data.articles) {
          allArticles = [...allArticles, ...response.data.articles];
        }
      } catch (error) {
        console.log(`Error fetching news from ${country}:`, error.message);
        // Continue with other countries if one fails
      }
    }
    
    // Also try to get news from specific sports sources
    const sources = ['espn', 'fox-sports', 'talksport', 'bbc-sport'];
    for (const source of sources) {
      try {
        const response = await axios.get(`${NEWS_API_BASE_URL}/everything/${source}.json`);
        if (response.data && response.data.articles) {
          allArticles = [...allArticles, ...response.data.articles];
        }
      } catch (error) {
        console.log(`Error fetching news from ${source}:`, error.message);
        // Continue with other sources if one fails
      }
    }
    
    // Filter for football news first
    const footballNews = allArticles.filter(isFootballRelated);
    
    // Then filter for news related to the specified team
    const teamName = name.toLowerCase();
    const teamNews = footballNews.filter(article => {
      const title = article.title?.toLowerCase() || '';
      const description = article.description?.toLowerCase() || '';
      const content = article.content?.toLowerCase() || '';
      
      return title.includes(teamName) || 
             description.includes(teamName) || 
             content.includes(teamName);
    });
    
    // Remove duplicates (based on title)
    const uniqueTeamNews = Array.from(
      new Map(teamNews.map(article => [article.title, article])).values()
    );
    
    // Sort by published date (newest first)
    uniqueTeamNews.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

    res.status(200).json({
      success: true,
      data: {
        status: 'ok',
        totalResults: uniqueTeamNews.length,
        articles: uniqueTeamNews.slice(0, 15) // Limit to 15 articles
      }
    });
  } catch (error) {
    console.error(`Error fetching news for team ${req.params.name}:`, error.message);
    res.status(500).json({
      success: false,
      message: `Error fetching news for team ${req.params.name}`,
      error: error.message
    });
  }
};

// @desc    Get top headlines for football
// @route   GET /api/news/headlines
// @access  Public
exports.getSportsHeadlines = async (req, res) => {
  try {
    // Get sports headlines from multiple countries
    const countries = ['us', 'gb', 'de', 'fr', 'es', 'it'];
    let allArticles = [];
    
    // Fetch headlines from each country
    for (const country of countries) {
      try {
        const response = await axios.get(`${NEWS_API_BASE_URL}/top-headlines/category/sports/${country}.json`);
        if (response.data && response.data.articles) {
          allArticles = [...allArticles, ...response.data.articles];
        }
      } catch (error) {
        console.log(`Error fetching headlines from ${country}:`, error.message);
        // Continue with other countries if one fails
      }
    }
    
    // Filter for football/soccer related news only
    const footballHeadlines = allArticles.filter(isFootballRelated);
    
    // Remove duplicates (based on title)
    const uniqueHeadlines = Array.from(
      new Map(footballHeadlines.map(article => [article.title, article])).values()
    );
    
    // Sort by published date (newest first)
    uniqueHeadlines.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

    res.status(200).json({
      success: true,
      data: {
        status: 'ok',
        totalResults: uniqueHeadlines.length,
        articles: uniqueHeadlines.slice(0, 15) // Limit to 15 articles
      }
    });
  } catch (error) {
    console.error('Error fetching football headlines:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error fetching football headlines',
      error: error.message
    });
  }
};

// @desc    Search news by keyword
// @route   GET /api/news/search/:keyword
// @access  Public
exports.searchNews = async (req, res) => {
  try {
    const { keyword } = req.params;
    
    // Get news from multiple sources
    const sources = ['cnn', 'bbc-news', 'espn', 'fox-sports', 'talksport', 'bbc-sport'];
    const countries = ['us', 'gb', 'de', 'fr', 'es', 'it'];
    let allArticles = [];
    
    // Try to get news from specific sources first
    for (const source of sources) {
      try {
        const response = await axios.get(`${NEWS_API_BASE_URL}/everything/${source}.json`);
        if (response.data && response.data.articles) {
          allArticles = [...allArticles, ...response.data.articles];
        }
      } catch (error) {
        console.log(`Error fetching news from ${source}:`, error.message);
        // Continue with other sources if one fails
      }
    }
    
    // Also get sports news from different countries
    for (const country of countries) {
      try {
        const response = await axios.get(`${NEWS_API_BASE_URL}/top-headlines/category/sports/${country}.json`);
        if (response.data && response.data.articles) {
          allArticles = [...allArticles, ...response.data.articles];
        }
      } catch (error) {
        console.log(`Error fetching news from ${country}:`, error.message);
        // Continue with other countries if one fails
      }
    }
    
    // Filter for football news first
    const footballNews = allArticles.filter(isFootballRelated);
    
    // Then filter for news related to the keyword
    const searchTerm = keyword.toLowerCase();
    const filteredNews = footballNews.filter(article => {
      const title = article.title?.toLowerCase() || '';
      const description = article.description?.toLowerCase() || '';
      const content = article.content?.toLowerCase() || '';
      
      return title.includes(searchTerm) || 
             description.includes(searchTerm) || 
             content.includes(searchTerm);
    });
    
    // Remove duplicates (based on title)
    const uniqueFilteredNews = Array.from(
      new Map(filteredNews.map(article => [article.title, article])).values()
    );
    
    // Sort by relevance (count keyword occurrences in title, description, content)
    uniqueFilteredNews.sort((a, b) => {
      const countOccurrences = (text, term) => {
        return (text.match(new RegExp(term, 'gi')) || []).length;
      };
      
      const aScore = countOccurrences(a.title?.toLowerCase() || '', searchTerm) * 3 + 
                    countOccurrences(a.description?.toLowerCase() || '', searchTerm) * 2 + 
                    countOccurrences(a.content?.toLowerCase() || '', searchTerm);
                    
      const bScore = countOccurrences(b.title?.toLowerCase() || '', searchTerm) * 3 + 
                    countOccurrences(b.description?.toLowerCase() || '', searchTerm) * 2 + 
                    countOccurrences(b.content?.toLowerCase() || '', searchTerm);
                    
      return bScore - aScore;
    });

    res.status(200).json({
      success: true,
      data: {
        status: 'ok',
        totalResults: uniqueFilteredNews.length,
        articles: uniqueFilteredNews.slice(0, 15) // Limit to 15 articles
      }
    });
  } catch (error) {
    console.error(`Error searching news for "${req.params.keyword}":`, error.message);
    res.status(500).json({
      success: false,
      message: `Error searching news for "${req.params.keyword}"`,
      error: error.message
    });
  }
};
