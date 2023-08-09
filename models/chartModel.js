const db = require('../config/database');

const ChartModel = {
    async fetchAbsenceChartData() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT DATE_FORMAT(date, "%d/%m/%Y") AS formattedDate, COUNT(*) AS totalAbsences FROM absence GROUP BY formattedDate';
            db.query(query, (error, results) => {
                if (error) {
                    console.error('Error fetching absence data:', error);
                    reject(error);
                } else {
                    console.log("result inside model", results);
                    resolve(results.map(item => ({ date: item.formattedDate, totalAbsences: item.totalAbsences })));
                }
            });
        });
    },
};

module.exports = ChartModel;
