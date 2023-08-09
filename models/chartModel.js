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
    async fetchAbsenceChartDataByMonth() {
        return new Promise((resolve, reject) => {
            const query = `
            SELECT DATE_FORMAT(date, '%m-%Y') AS monthYear, COUNT(*) AS totalAbsences
            FROM absence
            GROUP BY monthYear
            ORDER BY date
          `;
            db.query(query, (error, results) => {
                if (error) {
                    console.error('Error fetching absence data:', error);
                    reject(error);
                } else {
                    console.log("this is the result of fetchAbs by month" + results);
                    resolve(results.map(item => ({ monthYear: item.monthYear, totalAbsences: item.totalAbsences })));
                }
            });
        });
    },
 
    
};

module.exports = ChartModel;
