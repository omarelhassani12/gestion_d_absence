const express = require('express');
const AbsenceController = require('../controllers/absenceController');

const AbsenceRoutes = express.Router();

// Existing routes
AbsenceRoutes.get('/', AbsenceController.getAllAbsences);
AbsenceRoutes.get('/:id', AbsenceController.getAbsenceById);
AbsenceRoutes.post('/', AbsenceController.createAbsence);
AbsenceRoutes.post('/update/:id', AbsenceController.updateAbsence);
AbsenceRoutes.get('/update/:id', AbsenceController.getAbsenceById);
AbsenceRoutes.delete('/:id', AbsenceController.deleteAbsence);

// New route to handle "/absence/new-absence/:id"
AbsenceRoutes.get('/new-absence/:id', AbsenceController.getStagiaireById);

// Route to handle form submission with Stagiaire ID
AbsenceRoutes.post('/:id', AbsenceController.createAbsence);


module.exports = AbsenceRoutes;
// const express = require('express');
// const AbsenceController = require('../controllers/absenceController');

// const AbsenceRoutes = express.Router();

// // Existing routes
// AbsenceRoutes.get('/', AbsenceController.getAllAbsences);
// AbsenceRoutes.get('/:id', AbsenceController.getAbsenceById);
// AbsenceRoutes.post('/', AbsenceController.createAbsence);
// AbsenceRoutes.post('/update/:id', AbsenceController.updateAbsence);
// AbsenceRoutes.get('/update/:id', AbsenceController.getAbsenceById);
// AbsenceRoutes.delete('/:id', AbsenceController.deleteAbsence);

// // New route to handle "/absence/new-absence/:id"
// AbsenceRoutes.get('/new-absence/:id', AbsenceController.getStagiaireById);

// module.exports = AbsenceRoutes;
