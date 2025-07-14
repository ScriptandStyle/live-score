const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

// Route files
const authRoutes = require('./routes/authRoutes');
const matchesRoutes = require('./routes/matchesRoutes');
const teamsRoutes = require('./routes/teamsRoutes');
const newsRoutes = require('./routes/newsRoutes');

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/matches', matchesRoutes);
app.use('/api/teams', teamsRoutes);
app.use('/api/news', newsRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the LiveScore API' });
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
