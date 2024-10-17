require('dotenv').config();

const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ruleRoutes = require('./src/routes/ruleRoutes');

const app = express();
const port = 5000;
app.use(cors());
// Middleware
app.use(bodyParser.json());

// MongoDB connection
const mongoURI = process.env.MONGODB_URI; // Update with your MongoDB URI
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Routes
app.use('/api', ruleRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
