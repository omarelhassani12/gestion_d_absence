const express = require('express');
const JustifiedAbsenceRoutes = express.Router();
const JustifiedAbsenceController = require('../controllers/justifiedAbsenceController');

JustifiedAbsenceRoutes.get('/', JustifiedAbsenceController.getAllJustifiedAbsences);
JustifiedAbsenceRoutes.get('/:id', JustifiedAbsenceController.getJustifiedAbsenceById);
JustifiedAbsenceRoutes.post('/', JustifiedAbsenceController.createJustifiedAbsence);
JustifiedAbsenceRoutes.put('/:id', JustifiedAbsenceController.updateJustifiedAbsence);
JustifiedAbsenceRoutes.delete('/:id', JustifiedAbsenceController.deleteJustifiedAbsence);

module.exports = JustifiedAbsenceRoutes;
