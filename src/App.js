import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import LiveMatches from './pages/LiveMatches';
import TeamsPage from './pages/TeamsPage';
import NewsPage from './pages/NewsPage';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Footer from './components/Footer';
import './styles/navbar.css';
import './styles/home.css';
import './styles/liveMatches.css';
import './styles/teams.css';
import './styles/news.css';
import './styles/about.css';
import './styles/footer.css';
import './styles/login.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/live-matches" element={<LiveMatches />} />
            <Route path="/teams" element={<TeamsPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;