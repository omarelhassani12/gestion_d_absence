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

module.exports = AbsenceRoutes;


// // AbsenceRoutes.js
// const express = require('express');
// const AbsenceController = require('../controllers/absenceController');

// const AbsenceRoutes = express.Router();

// AbsenceRoutes.get('/', AbsenceController.getAllAbsences);
// AbsenceRoutes.get('/:id', AbsenceController.getAbsenceById);
// AbsenceRoutes.get('/:id', AbsenceController.getAbsenceById); 
// AbsenceRoutes.post('/', AbsenceController.createAbsence);
// AbsenceRoutes.post('/update/:id', AbsenceController.updateAbsence); 
// AbsenceRoutes.get('/update/:id', AbsenceController.getAbsenceById); 
// AbsenceRoutes.delete('/:id', AbsenceController.deleteAbsence);

// module.exports = AbsenceRoutes;
