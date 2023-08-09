const express = require('express');
const ChartController = require('../controllers/chartController');
const ChartRoutes = express.Router();

ChartRoutes.get('/chart-data', ChartController.getAbsenceChartData);
ChartRoutes.get('/chart-data-by-month', ChartController.getAbsenceChartDataByMonth);

module.exports = ChartRoutes;
