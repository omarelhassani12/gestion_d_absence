
// Routes for user-related endpoints

const express = require('express');

const serviceRoutes = express.Router();
//for the admin 
serviceRoutes.get('/', (req, res) => {
  const user = req.session.user || null;
    res.render('dashboard' , { user });
  });
//for the formateur 
serviceRoutes.get('/dashboard', (req, res) => {
    res.render('formateur/dashboard');
  });
serviceRoutes.get('/sign-in', (req, res) => {
    res.render('login');
  });
serviceRoutes.get('/sign-up', (req, res) => {
    res.render('register');
  });

  module.exports = serviceRoutes;