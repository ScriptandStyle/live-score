import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/home.css';

const Home = () => {
  const liveMatches = [
    {
      id: 1,
      team1: 'FCB',
      team2: 'RMA',
      score: 'Barcelona 2 - 1 Real Madrid',
      status: 'Final',
    },
    {
      id: 2,
      team1: 'MCI',
      team2: 'LIV',
      score: 'Man City 1 - 1 Liverpool',
      status: 'Live - 65\'',
    },
  ];

  const newsItems = [
    {
      id: 1,
      title: 'Champions League 2023 Schedule Announced',
      summary: 'UEFA has announced the schedule for the upcoming Champions League season.',
      date: 'May 15, 2023',
    },
    {
      id: 2,
      title: 'Mbappe Scores Hat-trick Against Marseille',
      summary: 'Kylian Mbappe led PSG to a 4-0 victory with three goals.',
      date: 'May 12, 2023',
    },
  ];

  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to <span>Foot</span>Zone</h1>
          <p>Your ultimate destination for live football scores, news, and updates</p>
          <Link to="/live-matches" className="cta-button">
            View Live Matches <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
      </section>

      <section className="live-matches-section">
        <h2>Live Matches</h2>
        <div className="matches-grid">
          {liveMatches.map(match => (
            <div key={match.id} className="match-card">
              <div className="teams">
                <span className="team">{match.team1}</span>
                <span className="vs">vs</span>
                <span className="team">{match.team2}</span>
              </div>
              <div className="score">{match.score}</div>
              <div className="status">{match.status}</div>
              <Link to={`/live-matches/${match.id}`} className="view-btn">
                View Details <i className="fas fa-chevron-right"></i>
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="news-section">
        <h2>Latest News</h2>
        <div className="news-grid">
          {newsItems.map(news => (
            <div key={news.id} className="news-card">
              <h3>{news.title}</h3>
              <p>{news.summary}</p>
              <div className="news-footer">
                <span className="date">{news.date}</span>
                <Link to={`/news/${news.id}`} className="read-more">
                  Read More <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;