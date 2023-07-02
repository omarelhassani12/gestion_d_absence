const express = require('express');
const StagaireController = require('../controllers/StagaireController');

const StagaireRoutes = express.Router();

StagaireRoutes.get('/', StagaireController.getAllStagaire); // Route for the root path
StagaireRoutes.get('/stagaire', StagaireController.getAllStagaire);
StagaireRoutes.post('/stagaire', StagaireController.createStagaire);

// Other routes for user-related endpoints

module.exports = StagaireRoutes;
