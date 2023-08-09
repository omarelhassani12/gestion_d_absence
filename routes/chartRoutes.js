const express = require('express');
const ChartController = require('../controllers/chartController');
const ChartRoutes = express.Router();

ChartRoutes.get('/chart-data', ChartController.getAbsenceChartData);

module.exports = ChartRoutes;
