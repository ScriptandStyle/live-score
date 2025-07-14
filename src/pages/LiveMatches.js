import React, { useState, useEffect } from 'react';
import MatchCard from '../components/MatchCard';
import MatchDetails from '../components/MatchDetails';
import { getLiveMatches, getRecentResults, getUpcomingMatches } from '../services/matchService';
import '../styles/liveMatches.css';

const LiveMatches = () => {
  const [liveMatches, setLiveMatches] = useState([]);
  const [recentMatches, setRecentMatches] = useState([]);
  const [upcomingMatches, setUpcomingMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllMatches = async () => {
      try {
        setLoading(true);
        
        // Fetch live, recent, and upcoming matches in parallel
        const [liveResponse, recentResponse, upcomingResponse] = await Promise.all([
          getLiveMatches(),
          getRecentResults(),
          getUpcomingMatches()
        ]);
        
        // Process live matches
        if (liveResponse.success && liveResponse.data.matches) {
          setLiveMatches(formatMatches(liveResponse.data.matches));
        }
        
        // Process recent matches
        if (recentResponse.success && recentResponse.data.matches) {
          setRecentMatches(formatMatches(recentResponse.data.matches));
        }
        
        // Process upcoming matches
        if (upcomingResponse.success && upcomingResponse.data.matches) {
          setUpcomingMatches(formatMatches(upcomingResponse.data.matches));
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching matches:', error);
        setError('Failed to load matches. Please try again later.');
        setLoading(false);
        
        // Use mock data if API fails
        setLiveMatches(getMockMatches());
      }
    };

    fetchAllMatches();
  }, []);

  // Format API response to match our component structure
  const formatMatches = (matches) => {
    return matches.map(match => ({
      id: match.id,
      team1: match.homeTeam.name,
      team2: match.awayTeam.name,
      team1Logo: match.homeTeam.crest || 'https://via.placeholder.com/50',
      team2Logo: match.awayTeam.crest || 'https://via.placeholder.com/50',
      score: `${match.score.fullTime.home || 0} - ${match.score.fullTime.away || 0}`,
      status: getMatchStatus(match),
      venue: match.venue || 'TBD',
      date: new Date(match.utcDate).toLocaleDateString(),
      competition: match.competition.name,
      events: match.goals ? formatEvents(match.goals, match.homeTeam.id) : [],
      stats: {
        possession: { team1: 50, team2: 50 }, // Default values as API might not provide these
        shots: { team1: 0, team2: 0 },
        shotsOnTarget: { team1: 0, team2: 0 },
        corners: { team1: 0, team2: 0 }
      }
    }));
  };

  // Format goals into events
  const formatEvents = (goals, homeTeamId) => {
    return goals.map(goal => ({
      minute: goal.minute,
      player: goal.scorer.name,
      team: goal.team.id === homeTeamId ? 'team1' : 'team2',
      type: 'goal'
    }));
  };

  // Get match status text
  const getMatchStatus = (match) => {
    switch (match.status) {
      case 'LIVE':
        return `Live - ${match.minute || ''}`;
      case 'FINISHED':
        return 'Final';
      case 'SCHEDULED':
        return new Date(match.utcDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      default:
        return match.status;
    }
  };

  // Fallback mock data if API fails
  const getMockMatches = () => {
    return [
      {
        id: 1,
        team1: 'FC Barcelona',
        team2: 'Real Madrid',
        team1Logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/47/FC_Barcelona_%28crest%29.svg/1200px-FC_Barcelona_%28crest%29.svg.png',
        team2Logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png',
        score: '2 - 1',
        status: 'Final',
        venue: 'Camp Nou, Barcelona',
        date: 'May 5, 2025',
        competition: 'La Liga',
        events: [
          { minute: 25, player: 'Lewandowski', team: 'team1', type: 'goal' },
          { minute: 52, player: 'Benzema', team: 'team2', type: 'goal' },
          { minute: 78, player: 'Pedri', team: 'team1', type: 'goal' }
        ],
        stats: {
          possession: { team1: 58, team2: 42 },
          shots: { team1: 14, team2: 8 },
          shotsOnTarget: { team1: 6, team2: 3 },
          corners: { team1: 7, team2: 4 }
        }
      },
      {
        id: 2,
        team1: 'Manchester City',
        team2: 'Liverpool',
        team1Logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Manchester_City_FC_badge.svg/1200px-Manchester_City_FC_badge.svg.png',
        team2Logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Liverpool_FC.svg/1200px-Liverpool_FC.svg.png',
        score: '1 - 1',
        status: 'Live - 65\'',
        venue: 'Etihad Stadium, Manchester',
        date: 'May 5, 2025',
        competition: 'Premier League',
        events: [
          { minute: 12, player: 'Haaland', team: 'team1', type: 'goal' },
          { minute: 43, player: 'Salah', team: 'team2', type: 'goal' }
        ],
        stats: {
          possession: { team1: 52, team2: 48 },
          shots: { team1: 9, team2: 7 },
          shotsOnTarget: { team1: 4, team2: 3 },
          corners: { team1: 5, team2: 3 }
        }
      }
    ];
  };

  const handleMatchSelect = (match) => {
    setSelectedMatch(match);
  };

  // Combine all matches for display
  const allMatches = [...liveMatches, ...recentMatches, ...upcomingMatches];

  if (loading) {
    return <div className="loading">Loading matches...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="live-matches-container">
      <h1>Live Matches & Results</h1>
      
      <div className="matches-container">
        <div className="matches-list">
          {liveMatches.length > 0 && (
            <>
              <h2>Live Matches</h2>
              {liveMatches.map(match => (
                <MatchCard 
                  key={match.id} 
                  match={match} 
                  onClick={() => handleMatchSelect(match)}
                  isSelected={selectedMatch && selectedMatch.id === match.id}
                />
              ))}
            </>
          )}
          
          {recentMatches.length > 0 && (
            <>
              <h2>Recent Results</h2>
              {recentMatches.map(match => (
                <MatchCard 
                  key={match.id} 
                  match={match} 
                  onClick={() => handleMatchSelect(match)}
                  isSelected={selectedMatch && selectedMatch.id === match.id}
                />
              ))}
            </>
          )}
          
          {upcomingMatches.length > 0 && (
            <>
              <h2>Upcoming Matches</h2>
              {upcomingMatches.map(match => (
                <MatchCard 
                  key={match.id} 
                  match={match} 
                  onClick={() => handleMatchSelect(match)}
                  isSelected={selectedMatch && selectedMatch.id === match.id}
                />
              ))}
            </>
          )}
          
          {allMatches.length === 0 && (
            <div className="no-matches">
              <p>No matches available at the moment.</p>
            </div>
          )}
        </div>
        
        <div className="match-details">
          {selectedMatch ? (
            <MatchDetails match={selectedMatch} />
          ) : (
            <div className="select-match-prompt">
              <i className="fas fa-info-circle"></i>
              <p>Select a match to view detailed information</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveMatches;