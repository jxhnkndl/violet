const express = require('express');
const path = require('path');

const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

// req body parsing middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// start server
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API running on port ${PORT} 🌍`);
  });
});