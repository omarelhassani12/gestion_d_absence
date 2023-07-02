const db = require('../config/database');

const Stagaire = {
  getAll() {
    return new Promise((resolve, reject) => {
      // Logic to fetch all stagiaires from the database
      db.query('SELECT * FROM stagiaires', (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },

  create(stagiaire) {
    return new Promise((resolve, reject) => {
      // Logic to create a new stagiaire in the database
      db.query('INSERT INTO stagiaires SET ?', stagiaire, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },

  // Other model methods for stagiaire-related operations
};

module.exports = Stagaire;
