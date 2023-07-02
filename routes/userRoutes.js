// Routes for user-related endpoints

const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/users', userController.getAllUsers);
router.post('/users', userController.createUser);

// Other routes for user-related endpoints

module.exports = router;
