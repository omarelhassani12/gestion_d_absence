// StagiaireRoutes.js
const express = require('express');
const StagaireController = require('../controllers/stagaireController');

const StagaireRoutes = express.Router();

StagaireRoutes.get('/', StagaireController.getAllStagiaire);
StagaireRoutes.post('/create', StagaireController.createStagaire);
StagaireRoutes.post('/update/:id', StagaireController.updateStagiaire); // Updated route definition
StagaireRoutes.delete('/:id', StagaireController.deleteStagiaire);
StagaireRoutes.post('/upload', StagaireController.uploadStagiaireList);
StagaireRoutes.get('/stagiaire-update/:id', StagaireController.getStagiaireById);
StagaireRoutes.get('/get-stagiaire-details/:id', StagaireController.getStagiaireDetails);

module.exports = StagaireRoutes;

