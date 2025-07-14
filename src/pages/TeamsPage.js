import React, { useState, useEffect } from 'react';
import { getPopularTeams, getTeamById, getAllTeams, getAllLeagues } from '../services/teamService';
import '../styles/teams.css';

const TeamsPage = () => {
  const [teams, setTeams] = useState([]);
  const [leagues, setLeagues] = useState([]);
  const [expandedTeam, setExpandedTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [teamDetails, setTeamDetails] = useState({});
  const [filters, setFilters] = useState({
    league: '',
    country: '',
    search: ''
  });

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const response = await getAllLeagues();
        if (response.success && response.data.leagues) {
          setLeagues(response.data.leagues);
        }
      } catch (error) {
        console.error('Error fetching leagues:', error);
      }
    };

    fetchLeagues();
  }, []);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setLoading(true);
        
        let response;
        if (filters.league || filters.country || filters.search) {
          // Use filtered teams endpoint
          response = await getAllTeams(filters);
        } else {
          // Use popular teams endpoint if no filters
          response = await getPopularTeams();
        }
        
        if (response.success && response.data.teams) {
          const formattedTeams = response.data.teams.map((team, index) => ({
            id: team.id,
            name: team.name,
            shortName: team.shortName || team.tla || team.name.substring(0, 3).toUpperCase(),
            logo: team.crest || 'https://via.placeholder.com/100',
            manager: team.coach ? team.coach.name : 'Not available',
            stadium: team.venue || 'Not available',
            ranking: index + 1,
            league: team.league || null,
            squad: team.players || []
          }));
          
          setTeams(formattedTeams);
        } else {
          // Fallback to mock data if API response is not as expected
          setTeams(getMockTeams());
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching teams:', error);
        setError('Failed to load teams. Please try again later.');
        setTeams(getMockTeams());
        setLoading(false);
      }
    };

    fetchTeams();
  }, [filters]);

  const fetchTeamDetails = async (teamId) => {
    // Check if we already have the team details
    if (teamDetails[teamId]) {
      return;
    }
    
    try {
      const response = await getTeamById(teamId);
      
      if (response.success && response.data) {
        const team = response.data;
        const formattedSquad = team.players ? team.players.map(player => ({
          id: player.id,
          name: player.name,
          position: player.position,
          number: player.number || '-',
          nationality: player.nationality,
          goals: Math.floor(Math.random() * 15) // Mock data as API doesn't provide goals
        })) : [];
        
        setTeamDetails(prev => ({
          ...prev,
          [teamId]: formattedSquad
        }));
      }
    } catch (error) {
      console.error(`Error fetching details for team ${teamId}:`, error);
      // If API fails, set mock squad data
      setTeamDetails(prev => ({
        ...prev,
        [teamId]: getMockSquad()
      }));
    }
  };

  const toggleTeamExpansion = async (teamId) => {
    if (expandedTeam === teamId) {
      setExpandedTeam(null);
    } else {
      setExpandedTeam(teamId);
      // Fetch team details if not already loaded
      if (!teamDetails[teamId]) {
        await fetchTeamDetails(teamId);
      }
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      league: '',
      country: '',
      search: ''
    });
  };

  // Get unique countries from leagues
  const countries = [...new Set(leagues.map(league => league.country))].sort();

  // Fallback mock data if API fails
  const getMockTeams = () => {
    return [
      {
        id: 1,
        name: 'FC Barcelona',
        shortName: 'FCB',
        logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/47/FC_Barcelona_%28crest%29.svg/1200px-FC_Barcelona_%28crest%29.svg.png',
        manager: 'Xavi Hernandez',
        stadium: 'Camp Nou',
        ranking: 1,
        league: { name: 'La Liga', country: 'Spain' },
        squad: []
      },
      {
        id: 2,
        name: 'Real Madrid',
        shortName: 'RMA',
        logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png',
        manager: 'Carlo Ancelotti',
        stadium: 'Santiago Bernabéu',
        ranking: 2,
        league: { name: 'La Liga', country: 'Spain' },
        squad: []
      }
    ];
  };

  const getMockSquad = () => {
    return [
      { id: 101, name: 'Robert Lewandowski', position: 'Forward', number: 9, nationality: 'Poland', goals: 23 },
      { id: 102, name: 'Pedri', position: 'Midfielder', number: 8, nationality: 'Spain', goals: 7 },
      { id: 103, name: 'Gavi', position: 'Midfielder', number: 6, nationality: 'Spain', goals: 3 },
      { id: 104, name: 'Ronald Araujo', position: 'Defender', number: 4, nationality: 'Uruguay', goals: 1 },
      { id: 105, name: 'Marc-André ter Stegen', position: 'Goalkeeper', number: 1, nationality: 'Germany', goals: 0 }
    ];
  };

  if (loading) {
    return <div className="loading">Loading teams...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="teams-container">
      <h1>Football Teams</h1>
      <p className="subtitle">Explore all football teams and their squad details</p>
      
      <div className="filters-container">
        <div className="filter-group">
          <label htmlFor="league">League:</label>
          <select 
            id="league" 
            name="league" 
            value={filters.league} 
            onChange={handleFilterChange}
          >
            <option value="">All Leagues</option>
            {leagues.map(league => (
              <option key={league.id} value={league.id}>
                {league.name} ({league.country})
              </option>
            ))}
          </select>
        </div>
        
        <div className="filter-group">
          <label htmlFor="country">Country:</label>
          <select 
            id="country" 
            name="country" 
            value={filters.country} 
            onChange={handleFilterChange}
          >
            <option value="">All Countries</option>
            {countries.map(country => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
        
        <div className="filter-group">
          <label htmlFor="search">Search:</label>
          <input 
            type="text" 
            id="search" 
            name="search" 
            value={filters.search} 
            onChange={handleFilterChange} 
            placeholder="Search teams..."
          />
        </div>
        
        <button className="clear-filters-btn" onClick={clearFilters}>
          Clear Filters
        </button>
      </div>
      
      <div className="teams-grid">
        {teams.length === 0 ? (
          <div className="no-teams-message">No teams found matching your filters.</div>
        ) : (
          teams.map(team => (
            <div key={team.id} className={`team-card ${expandedTeam === team.id ? 'expanded' : ''}`}>
              <div className="team-header">
                <div className="ranking">#{team.ranking}</div>
                <img src={team.logo} alt={team.name} className="team-logo" />
              </div>
              <div className="team-info">
                <h2>{team.name}</h2>
                {team.league && (
                  <div className="team-league">
                    <span className="league-name">{team.league.name}</span>
                    <span className="league-country">{team.league.country}</span>
                  </div>
                )}
                <div className="team-details">
                  <div className="detail">
                    <span className="label">Short Name:</span>
                    <span className="value">{team.shortName}</span>
                  </div>
                  <div className="detail">
                    <span className="label">Manager:</span>
                    <span className="value">{team.manager}</span>
                  </div>
                  <div className="detail">
                    <span className="label">Stadium:</span>
                    <span className="value">{team.stadium}</span>
                  </div>
                </div>
                <button 
                  className="view-squad-btn"
                  onClick={() => toggleTeamExpansion(team.id)}
                >
                  {expandedTeam === team.id ? 'Hide Squad' : 'View Squad'} 
                  <i className={`fas fa-chevron-${expandedTeam === team.id ? 'up' : 'down'}`}></i>
                </button>
              </div>
              
              {expandedTeam === team.id && (
                <div className="squad-details">
                  <h3>Squad Players</h3>
                  {!teamDetails[team.id] ? (
                    <div className="loading">Loading squad data...</div>
                  ) : (
                    <table>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Player</th>
                          <th>Position</th>
                          <th>Nationality</th>
                          <th>Goals</th>
                        </tr>
                      </thead>
                      <tbody>
                        {teamDetails[team.id].map(player => (
                          <tr key={player.id}>
                            <td>{player.number}</td>
                            <td>{player.name}</td>
                            <td>{player.position}</td>
                            <td>{player.nationality}</td>
                            <td>{player.goals || '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TeamsPage;