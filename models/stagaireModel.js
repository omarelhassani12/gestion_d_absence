const db = require('../config/database');

const StagiaireModel = {
  findAll() {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM stagiaires', (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },

   findById(id) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM stagiaires WHERE id = ?', [id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      });
    });
  },

  create(stagiaire) {
    return new Promise((resolve, reject) => {
      if (!stagiaire) {
        reject(new Error('Stagiaire object is null or undefined'));
        return;
      }

      db.query('INSERT INTO stagiaires SET ?', [stagiaire], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.insertId);
        }
      });
    });
  },

  delete(id) {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM stagiaires WHERE id = ?', [id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.affectedRows > 0);
        }
      });
    });
  },

  insertList(stagiaireList) {
    return new Promise((resolve, reject) => {
      if (!stagiaireList || stagiaireList.length === 0) {
        reject(new Error('Stagiaire list is null or empty'));
        return;
      }
  
      const values = stagiaireList.map((stagiaire) => [stagiaire.CFE, stagiaire.firstName, stagiaire.lastName]);
  
      const query = 'INSERT INTO stagiaires (CFE, firstName, lastName) VALUES ?';
  
      db.query(query, [values], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.affectedRows);
        }
      });
    });
  },
  
};

module.exports = StagiaireModel;
