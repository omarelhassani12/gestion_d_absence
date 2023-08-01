const express = require('express');
const AbsenceController = require('../controllers/absenceController');

const AbsenceRoutes = express.Router();

AbsenceRoutes.get('/', AbsenceController.getAllAbsences);

AbsenceRoutes.get('/:id', AbsenceController.getAbsenceById);
AbsenceRoutes.post('/create', AbsenceController.createAbsence);
AbsenceRoutes.post('/update/:id', AbsenceController.updateAbsence); // Add the update route

AbsenceRoutes.delete('/:id', AbsenceController.deleteAbsence);
AbsenceRoutes.get('/download-pdf/:stagiaireId', AbsenceController.downloadPDF);



module.exports = AbsenceRoutes;
