// GroupRoutes.js
const express = require('express');
const GroupController = require('../controllers/groupController');

const GroupRoutes = express.Router();

GroupRoutes.get('/', GroupController.getAllGroups);
GroupRoutes.get('/:id', GroupController.getGroupById);
GroupRoutes.post('/', GroupController.createGroup);
GroupRoutes.post('/update/:id', GroupController.updateGroup); 
GroupRoutes.get('/update/:id', GroupController.getGroupById); 
GroupRoutes.delete('/:id', GroupController.deleteGroup);

module.exports = GroupRoutes;



