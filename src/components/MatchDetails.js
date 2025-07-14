import React from 'react';
import '../styles/matchDetails.css';

const MatchDetails = ({ match }) => {
  return (
    <div className="match-details">
      <div className="match-info">
        <div className="teams">
          <div className="team">
            <img src={match.team1Logo} alt={match.team1} className="team-logo" />
            <span>{match.team1}</span>
          </div>
          <div className="score">{match.score}</div>
          <div className="team">
            <img src={match.team2Logo} alt={match.team2} className="team-logo" />
            <span>{match.team2}</span>
          </div>
        </div>
        
        <div className="details">
          <div className="detail-item">
            <span className="label">Status:</span>
            <span className="value">{match.status}</span>
          </div>
          <div className="detail-item">
            <span className="label">Venue:</span>
            <span className="value">{match.venue}</span>
          </div>
          <div className="detail-item">
            <span className="label">Date:</span>
            <span className="value">{match.date}</span>
          </div>
          <div className="detail-item">
            <span className="label">Competition:</span>
            <span className="value">{match.competition}</span>
          </div>
        </div>
      </div>
      
      <div className="match-events">
        <h3>Match Events</h3>
        <ul>
          {match.events.map((event, index) => (
            <li key={index} className={`event ${event.team === 'team1' ? 'team1-event' : 'team2-event'}`}>
              <span className="minute">{event.minute}'</span>
              <span className="player">{event.player}</span>
              <span className="event-type">{event.type === 'goal' ? '⚽ Goal' : '🟨 Yellow Card'}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="match-stats">
        <h3>Statistics</h3>
        <div className="stats-grid">
          <div className="stat">
            <span className="stat-name">Possession</span>
            <div className="stat-bar">
              <div className="stat-value team1" style={{ width: `${match.stats.possession.team1}%` }}>
                {match.stats.possession.team1}%
              </div>
              <div className="stat-value team2" style={{ width: `${match.stats.possession.team2}%` }}>
                {match.stats.possession.team2}%
              </div>
            </div>
          </div>
          <div className="stat">
            <span className="stat-name">Shots</span>
            <div className="stat-numbers">
              <span className="team1-stat">{match.stats.shots.team1}</span>
              <span className="team2-stat">{match.stats.shots.team2}</span>
            </div>
          </div>
          <div className="stat">
            <span className="stat-name">Shots on Target</span>
            <div className="stat-numbers">
              <span className="team1-stat">{match.stats.shotsOnTarget.team1}</span>
              <span className="team2-stat">{match.stats.shotsOnTarget.team2}</span>
            </div>
          </div>
          <div className="stat">
            <span className="stat-name">Corners</span>
            <div className="stat-numbers">
              <span className="team1-stat">{match.stats.corners.team1}</span>
              <span className="team2-stat">{match.stats.corners.team2}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchDetails;