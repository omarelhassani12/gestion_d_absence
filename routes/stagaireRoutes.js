// StagaireRoutes.js
const express = require('express');
const StagaireController = require('../controllers/stagaireController');

const StagaireRoutes = express.Router();

StagaireRoutes.get('/', StagaireController.getAllStagaire);
StagaireRoutes.get('/:id', StagaireController.getStagiaireById);
StagaireRoutes.post('/', StagaireController.createStagaire);
StagaireRoutes.put('/:id', StagaireController.updateStagaire);
StagaireRoutes.delete('/:id', StagaireController.deleteStagaire);
StagaireRoutes.post('/upload', StagaireController.uploadStagiaireList);

module.exports = StagaireRoutes;
