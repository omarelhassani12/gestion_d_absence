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
};

module.exports = ChartController;
