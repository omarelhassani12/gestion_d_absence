const express = require('express');
const JustifiedAbsenceRoutes = express.Router();
const JustifiedAbsenceController = require('../controllers/justifiedAbsenceController');

// GET all justified absences
JustifiedAbsenceRoutes.get('/', JustifiedAbsenceController.getAllJustifiedAbsences);

// GET justified absence by ID
JustifiedAbsenceRoutes.get('/:id', JustifiedAbsenceController.getJustifiedAbsenceById);

// POST create a new justified absence
JustifiedAbsenceRoutes.post('/', JustifiedAbsenceController.createJustifiedAbsence);

// PUT update an existing justified absence
JustifiedAbsenceRoutes.put('/:id', JustifiedAbsenceController.updateJustifiedAbsence);

// DELETE justified absence by ID
JustifiedAbsenceRoutes.delete('/:id', JustifiedAbsenceController.deleteJustifiedAbsence);

module.exports = JustifiedAbsenceRoutes;
