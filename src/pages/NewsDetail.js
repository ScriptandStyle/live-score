import React from 'react';
import { useParams } from 'react-router-dom';
import '../styles/newsDetail.css';

const NewsDetail = () => {
  const { id } = useParams();
  
  const newsItem = {
    id: 1,
    title: 'Haaland Breaks Premier League Scoring Record',
    date: 'May 15, 2023',
    category: 'premier-league',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    content: `Erling Haaland has rewritten the Premier League record books by scoring his 35th goal of the season in Manchester City's 3-0 win over Everton. The Norwegian striker surpassed the previous record of 34 goals set by Andy Cole and Alan Shearer (in 42-game seasons) and Mohamed Salah's 32 in a 38-game season.

Haaland achieved the feat in just 31 appearances, with his latest goal coming in the 39th minute at Goodison Park. The 22-year-old has been in sensational form since joining City from Borussia Dortmund last summer.

"Records are meant to be broken," Haaland said after the match. "I'm happy to help the team. The most important thing is that we keep winning games as we chase the title."

City manager Pep Guardiola praised his star striker: "Erling is a special player with an incredible mentality. He's not satisfied with just scoring goals - he wants to win trophies for the team."`
  };

  return (
    <div className="news-detail-container">
      <div className="news-header">
        <h1>{newsItem.title}</h1>
        <div className="news-meta">
          <span className="category">{newsItem.category.toUpperCase()}</span>
          <span className="date">{newsItem.date}</span>
        </div>
      </div>
      
      <div className="news-image">
        <img src={newsItem.image} alt={newsItem.title} />
      </div>
      
      <div className="news-content">
        {newsItem.content.split('\n\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
};

export default NewsDetail;