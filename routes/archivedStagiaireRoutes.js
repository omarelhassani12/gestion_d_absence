const express = require('express');
const ArchivedStagiairesRoutes = express.Router();
const ArchivedStagiairesController = require('../controllers/archivedStagiaireController');

ArchivedStagiairesRoutes.get('/', ArchivedStagiairesController.getAll);
ArchivedStagiairesRoutes.post('/:id', ArchivedStagiairesController.archiveStagire);
ArchivedStagiairesRoutes.post('/retrieve/:id', ArchivedStagiairesController.retierveStagire);
ArchivedStagiairesRoutes.post('/', ArchivedStagiairesController.create);
ArchivedStagiairesRoutes.get('/:id', ArchivedStagiairesController.getById);
ArchivedStagiairesRoutes.put('/:id', ArchivedStagiairesController.update);
ArchivedStagiairesRoutes.delete('/:id', ArchivedStagiairesController.delete);

module.exports = ArchivedStagiairesRoutes;
