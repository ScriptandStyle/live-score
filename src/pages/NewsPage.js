import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getLatestNews, getSportsHeadlines, searchNews } from '../services/newsService';
import '../styles/news.css';

const NewsPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  const newsCategories = ['all', 'premier-league', 'la-liga', 'champions-league', 'world-cup', 'transfers'];
  
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        
        let response;
        if (activeCategory === 'all') {
          response = await getLatestNews();
        } else {
          // Search for news by category
          response = await searchNews(activeCategory.replace('-', ' '));
        }
        
        if (response.success && response.data.articles) {
          const formattedNews = response.data.articles.map((article, index) => ({
            id: index + 1,
            title: article.title,
            summary: article.description || 'No description available',
            date: new Date(article.publishedAt).toLocaleDateString(),
            category: getCategoryFromArticle(article),
            image: article.urlToImage || 'https://via.placeholder.com/600x400?text=Football+News',
            content: article.content || article.description,
            url: article.url
          }));
          
          setNewsItems(formattedNews);
        } else {
          // Fallback to mock data if API response is not as expected
          setNewsItems(getMockNews());
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching news:', error);
        setError('Failed to load news. Please try again later.');
        setNewsItems(getMockNews());
        setLoading(false);
      }
    };

    fetchNews();
  }, [activeCategory]);

  // Determine category from article content
  const getCategoryFromArticle = (article) => {
    const title = article.title?.toLowerCase() || '';
    const description = article.description?.toLowerCase() || '';
    
    if (title.includes('premier league') || description.includes('premier league')) {
      return 'premier-league';
    } else if (title.includes('la liga') || description.includes('la liga')) {
      return 'la-liga';
    } else if (title.includes('champions league') || description.includes('champions league')) {
      return 'champions-league';
    } else if (title.includes('world cup') || description.includes('world cup')) {
      return 'world-cup';
    } else if (title.includes('transfer') || description.includes('transfer')) {
      return 'transfers';
    } else {
      return 'all';
    }
  };

  // Fallback mock data if API fails
  const getMockNews = () => {
    return [
      {
        id: 1,
        title: 'Haaland Breaks Premier League Scoring Record',
        summary: 'Manchester City striker Erling Haaland has broken the single-season Premier League scoring record with 35 goals.',
        date: 'May 5, 2025',
        category: 'premier-league',
        image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
        content: `Erling Haaland has rewritten the Premier League record books by scoring his 35th goal of the season in Manchester City's 3-0 win over Everton. The Norwegian striker surpassed the previous record of 34 goals set by Andy Cole and Alan Shearer (in 42-game seasons) and Mohamed Salah's 32 in a 38-game season.

Haaland achieved the feat in just 31 appearances, with his latest goal coming in the 39th minute at Goodison Park. The 22-year-old has been in sensational form since joining City from Borussia Dortmund last summer.

"Records are meant to be broken," Haaland said after the match. "I'm happy to help the team. The most important thing is that we keep winning games as we chase the title."

City manager Pep Guardiola praised his star striker: "Erling is a special player with an incredible mentality. He's not satisfied with just scoring goals - he wants to win trophies for the team."`
      },
      {
        id: 2,
        title: 'Barcelona Clinch La Liga Title',
        summary: 'FC Barcelona have secured their 27th La Liga title with four games to spare after defeating Espanyol.',
        date: 'May 5, 2025',
        category: 'la-liga',
        image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
        content: `Barcelona were crowned La Liga champions for the 2022-23 season after a 4-2 victory over city rivals Espanyol at the RCDE Stadium. This marks their first league title since 2019 and the first under manager Xavi Hernandez.

Robert Lewandowski scored twice to take his league tally to 21 goals in his debut season with the club, while Alejandro Balde and Jules Kounde also found the net. The victory gives Barcelona an unassailable 14-point lead over second-placed Real Madrid with four games remaining.

"It's a special moment for everyone at the club," said Xavi. "We've worked hard all season and the players deserve this. The fans have been incredible in their support."

The title triumph represents a remarkable turnaround for Barcelona, who finished second last season and were eliminated from the Champions League at the group stage this campaign.`
      }
    ];
  };

  const handleNewsClick = (newsId) => {
    const selectedNews = newsItems.find(item => item.id === newsId);
    if (selectedNews) {
      // If the news has an external URL, open it in a new tab
      if (selectedNews.url) {
        window.open(selectedNews.url, '_blank');
      } else {
        // Otherwise navigate to the internal news detail page
        navigate(`/news/${newsId}`, { state: { newsItem: selectedNews } });
      }
    }
  };

  const filteredNews = activeCategory === 'all' 
    ? newsItems 
    : newsItems.filter(item => item.category === activeCategory);

  if (loading) {
    return <div className="loading">Loading news...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="news-container">
      <h1>Football News</h1>
      <p className="subtitle">Stay updated with the latest happenings in the world of football</p>
      
      <div className="news-categories">
        {newsCategories.map(category => (
          <button
            key={category}
            className={`category-btn ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          </button>
        ))}
      </div>
      
      <div className="news-grid">
        {filteredNews.length > 0 ? (
          filteredNews.map(news => (
            <div key={news.id} className="news-card" onClick={() => handleNewsClick(news.id)}>
              <div className="news-image">
                <img src={news.image} alt={news.title} />
                <span className="category-badge">{news.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span>
              </div>
              <div className="news-content">
                <h2>{news.title}</h2>
                <p>{news.summary}</p>
                <div className="news-footer">
                  <span className="date">{news.date}</span>
                  <div className="read-more">
                    Read More <i className="fas fa-arrow-right"></i>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-news">
            <p>No news available for this category at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsPage;