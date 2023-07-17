// AbsenceRoutes.js
const express = require('express');
const AbsenceController = require('../controllers/absenceController');

const AbsenceRoutes = express.Router();

AbsenceRoutes.get('/', AbsenceController.getAllAbsences);
AbsenceRoutes.get('/:id', AbsenceController.getAbsenceById);
AbsenceRoutes.post('/', AbsenceController.createAbsence);
AbsenceRoutes.post('/update/:id', AbsenceController.updateAbsence); 
AbsenceRoutes.get('/update/:id', AbsenceController.getAbsenceById); 
AbsenceRoutes.delete('/:id', AbsenceController.deleteAbsence);

module.exports = AbsenceRoutes;
