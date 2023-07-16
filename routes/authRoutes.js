// authRoutes.js

const express = require('express');
const authRoutes = express.Router();
const UserController = require('../controllers/UserController');

// Route for user registration
authRoutes.post('/register', UserController.register);

// Route for user login
authRoutes.post('/login', UserController.login);

module.exports = authRoutes;
