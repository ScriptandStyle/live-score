import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/footer.css';

// Import icons from assets
import facebookIcon from '../assets/icons/facebook.svg';
import twitterIcon from '../assets/icons/twitter.svg';
import instagramIcon from '../assets/icons/instagram.svg';
import youtubeIcon from '../assets/icons/youtube.svg';
import emailIcon from '../assets/icons/email.svg';
import phoneIcon from '../assets/icons/phone.svg';
import locationIcon from '../assets/icons/location.svg';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>About FootZone</h3>
          <p>
            FootZone is your ultimate destination for live footbll scores, news, 
            and updates from around the world.
          </p>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <img src={facebookIcon} alt="Facebook" className="social-icon" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <img src={twitterIcon} alt="Twitter" className="social-icon" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <img src={instagramIcon} alt="Instagram" className="social-icon" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <img src={youtubeIcon} alt="YouTube" className="social-icon" />
            </a>
          </div>
        </div>
        
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/live-scores">Live Scores</Link></li>
            <li><Link to="/teams">Teams</Link></li>
            <li><Link to="/news">News</Link></li>
            <li><Link to="/about">About Us</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Contact Us</h3>
          <ul className="contact-info">
            <li>
              <img src={emailIcon} alt="Email" className="contact-icon" />
              contact@footzone.com
            </li>
            <li>
              <img src={phoneIcon} alt="Phone" className="contact-icon" />
              +1 (123) 456-7890
            </li>
            <li>
              <img src={locationIcon} alt="Location" className="contact-icon" />
              123 Football Lane, Sports City, World
            </li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} CricZone. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;