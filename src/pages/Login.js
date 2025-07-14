import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Save token to localStorage
      localStorage.setItem('token', data.token);
      
      // Redirect to home page
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <h1>Login to LiveScore</h1>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              required
              placeholder="Enter your password"
              minLength="6"
            />
          </div>
          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="register-link">
          <p>Don't have an account? <span onClick={() => navigate('/register')}>Register</span></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
