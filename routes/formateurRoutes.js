
// Routes for user-related endpoints

const express = require('express');

const FormateurRoutes = express.Router();

// //for the formateur 
// FormateurRoutes.get('/formateur-dashboard', (req, res) => {
//   // const user = req.session.user || null;
//     res.render('formateur-dashboard' ,req);
//   });
FormateurRoutes.get('/', (req, res) => {
  const user = req.session.user || null;
    res.render('dashboard-formateur' ,user);
  });


  module.exports = FormateurRoutes;