const ChartModel = require("../models/chartModel");

const ChartController = {
  async getAbsenceChartData(req, res) {
    try {
      const chartData = await ChartModel.fetchAbsenceChartData();
      res.json(chartData);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching chart data' });
    }
  },

  async getAbsenceChartDataByMonth(req, res) {
    try {
      const chartData = await ChartModel.fetchAbsenceChartDataByMonth();
      res.json(chartData);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching chart data by month' });
    }
  },
};

module.exports = ChartController;
