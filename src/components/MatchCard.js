import React from 'react';
import '../styles/matchCard.css';

const MatchCard = ({ match, onClick, isSelected }) => {
  return (
    <div 
      className={`match-card ${isSelected ? 'selected' : ''} ${match.status.includes('Live') ? 'live' : ''}`}
      onClick={onClick}
    >
      <div className="match-header">
        <div className="competition">{match.competition}</div>
        {match.status.includes('Live') && <div className="live-badge">LIVE</div>}
      </div>
      
      <div className="teams">
        <div className="team">
          <img src={match.team1Logo} alt={match.team1} className="team-logo" />
          <span>{match.team1}</span>
        </div>
        <div className="vs">vs</div>
        <div className="team">
          <img src={match.team2Logo} alt={match.team2} className="team-logo" />
          <span>{match.team2}</span>
        </div>
      </div>
      
      <div className="score">{match.score}</div>
      <div className="status">{match.status}</div>
      <div className="venue">{match.venue}</div>
      <div className="date">{match.date}</div>
    </div>
  );
};

export default MatchCard;