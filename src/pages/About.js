import React from 'react';
import '../styles/about.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About <span>Foot</span>Zone</h1>
        <p>Your ultimate destination for live football scores, news, and updates</p>
      </div>
      
      <div className="about-content">
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            At FootZone, we're passionate about football and committed to bringing you the most 
            comprehensive and up-to-date football information from around the world. Our mission 
            is to provide football fans with a one-stop platform for all their football needs, 
            from live scores to in-depth statistics, news, and analysis.
          </p>
        </section>
        
        <section className="about-section">
          <h2>What We Offer</h2>
          <div className="features-grid">
            <div className="feature-card">
              <i className="fas fa-bolt"></i>
              <h3>Live Matches</h3>
              <p>Real-time updates of all major league and tournament matches</p>
            </div>
            <div className="feature-card">
              <i className="fas fa-newspaper"></i>
              <h3>Latest News</h3>
              <p>Breaking news, match reports, and exclusive interviews</p>
            </div>
            <div className="feature-card">
              <i className="fas fa-users"></i>
              <h3>Team Profiles</h3>
              <p>Detailed information about all major football teams</p>
            </div>
            <div className="feature-card">
              <i className="fas fa-chart-bar"></i>
              <h3>Statistics</h3>
              <p>Comprehensive player and team statistics across all competitions</p>
            </div>
          </div>
        </section>
        
        <section className="about-section">
          <h2>Our Team</h2>
          <p>
            FootZone is run by a team of football enthusiasts and tech experts who are dedicated 
            to creating the best football experience for fans worldwide. We combine our love for 
            the game with cutting-edge technology to deliver a seamless user experience.
          </p>
        </section>
        
        <section className="about-section">
          <h2>Contact Us</h2>
          <p>
            Have questions, suggestions, or feedback? We'd love to hear from you!
          </p>
          <div className="contact-info">
            <div className="contact-item">
              <i className="fas fa-envelope"></i>
              <span>contact@footzone.com</span>
            </div>
            <div className="contact-item">
              <i className="fas fa-phone"></i>
              <span>+1 (123) 456-7890</span>
            </div>
            <div className="contact-item">
              <i className="fas fa-map-marker-alt"></i>
              <span>123 Football Avenue, Sports City, World</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;