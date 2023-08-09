
// Routes for user-related endpoints

const express = require('express');
const DashboardController = require('../controllers/serviceController');

const serviceRoutes = express.Router();
//for the admin 
serviceRoutes.get('/', DashboardController.getDataForDashboard);

serviceRoutes.get('/sign-in', (req, res) => {
    res.render('login');
  });
serviceRoutes.get('/sign-up', (req, res) => {
    res.render('register');
  });

  module.exports = serviceRoutes;