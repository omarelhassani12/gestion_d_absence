const express = require('express');
const StaffGroupRoutes = express.Router();
const StaffGroupController = require('../controllers/staffGroupController');

// Get all groups
StaffGroupRoutes.get('/', StaffGroupController.getAllGroups);

// Get groups by formateur ID
StaffGroupRoutes.get('/formateur/:userId', StaffGroupController.getGroupsByFormateurId);

// Get group by ID
StaffGroupRoutes.get('/:groupId', StaffGroupController.getGroupById);

// Create a new group
StaffGroupRoutes.post('/', StaffGroupController.createGroup);

// Update group by ID
StaffGroupRoutes.put('/update/:groupId', StaffGroupController.updateGroup);

// Delete group by ID
StaffGroupRoutes.delete('/:groupId', StaffGroupController.deleteGroup);

// Get group by ID with formateurs
StaffGroupRoutes.get('/details/:groupId', StaffGroupController.findGroupByIdWithFormateurs);

module.exports = StaffGroupRoutes;
