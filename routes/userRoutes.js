// UserRoutes.js
const express = require('express');
const UserController = require('../controllers/UserController');

const UserRoutes = express.Router();

UserRoutes.get('/', UserController.getAllUsers);
UserRoutes.get('/:id', UserController.getUserById);
UserRoutes.post('/', UserController.createUser);
UserRoutes.post('/update/:id', UserController.updateUser); 
UserRoutes.get('/update/:id', UserController.getUserById); 
UserRoutes.delete('/:id', UserController.deleteUser);

module.exports = UserRoutes;



