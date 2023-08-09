const db = require('../config/database');

const ChartModel = {
    async fetchAbsenceChartData() {
        try {
          const query = 'SELECT date, COUNT(*) AS totalAbsences FROM absence GROUP BY date';
          const result = await db.query(query);
          return result;
        } catch (error) {
          console.error('Error fetching absence data:', error);
          throw error;
        }
      },

};

module.exports = ChartModel;