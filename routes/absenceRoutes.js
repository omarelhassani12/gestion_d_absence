const express = require('express');
const AbsenceController = require('../controllers/absenceController');

const AbsenceRoutes = express.Router();

AbsenceRoutes.get('/', AbsenceController.getAllAbsences);
AbsenceRoutes.get('/absences', AbsenceController.getAllAbsencesWithHoures);
AbsenceRoutes.get('/absences/function', AbsenceController.getAllAbsencesWithFunctions);
AbsenceRoutes.get('/absences/pvnd', AbsenceController.getAllAbsencesForPvND);
AbsenceRoutes.get('/absences/pvm', AbsenceController.getAllAbsencesForPvM);
AbsenceRoutes.get('/absences/notes', AbsenceController.getAllAbsencesForNotes);

AbsenceRoutes.get('/:id', AbsenceController.getAbsenceById);
AbsenceRoutes.post('/create', AbsenceController.createAbsence);
AbsenceRoutes.post('/update/:id', AbsenceController.updateAbsence); // Add the update route

AbsenceRoutes.delete('/:id', AbsenceController.deleteAbsence);



module.exports = AbsenceRoutes;
