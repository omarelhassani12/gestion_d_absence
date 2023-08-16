const express = require('express');
const ArchivedStagiairesActionRoutes = express.Router();
const ArchivedStagiairesActionController = require('../controllers/archivedStagiaireActionController');

ArchivedStagiairesActionRoutes.get('/', ArchivedStagiairesActionController.getAll);
ArchivedStagiairesActionRoutes.post('/:id', ArchivedStagiairesActionController.archiveStagire);
ArchivedStagiairesActionRoutes.post('/retrieve/:id', ArchivedStagiairesActionController.retrieveStagire);

module.exports = ArchivedStagiairesActionRoutes;
