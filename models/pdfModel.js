// models/pdfModel.js
const db = require('../config/database');

function findStagiaireFromDatabase(stagiaireId) {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM stagiaires WHERE id = ?",
      [stagiaireId],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      }
    );
  });
}

module.exports = {
  findStagiaireFromDatabase,
};
