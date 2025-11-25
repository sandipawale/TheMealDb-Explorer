const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mealRoutes = require('./routes/mealRoutes');

const app = express();

// Middleware
app.use(cors()); // Allow all origins for local dev
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api', mealRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.send('TheMealDB Explorer API is running');
});

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error('Error:', err);
  const status = err.status || 500;
  res.status(status).json({
    error: err.message || 'Internal Server Error'
  });
});

module.exports = app;
