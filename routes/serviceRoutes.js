
// Routes for user-related endpoints

const express = require('express');

const serviceRoutes = express.Router();

serviceRoutes.get('/', (req, res) => {
    res.render('dashboard');
  });

  module.exports = serviceRoutes;