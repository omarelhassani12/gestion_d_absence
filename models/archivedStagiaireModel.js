const db = require('../config/database');

const ArchivedStagiaireModel = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM archived_stagiaires', (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },

  create: (newStagiaire) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO archived_stagiaires SET ?', newStagiaire, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.insertId);
        }
      });
    });
  },

  findById(id) {
    return new Promise((resolve, reject) => {
      db.query('SELECT id,CEF,firstName,lastName,groupId FROM archived_stagiaires WHERE id = ?', [id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      });
    });
  },

  update: (id, updatedData) => {
    return new Promise((resolve, reject) => {
      db.query('UPDATE archived_stagiaires SET ? WHERE id = ?', [updatedData, id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.affectedRows > 0);
        }
      });
    });
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM archived_stagiaires WHERE id = ?', [id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.affectedRows > 0);
        }
      });
    });
  },

};

module.exports = ArchivedStagiaireModel;
