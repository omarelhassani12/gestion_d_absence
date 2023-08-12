// stagaireModel.js
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
 
  findAllByGroupId(groupId) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM stagiaires WHERE groupId = ?', [groupId], (error, results) => {
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

  update(id, updatedData) {
    return new Promise((resolve, reject) => {
      if (!updatedData) {
        reject(new Error('Updated data is null or undefined'));
        return;
      }
  
      db.query('UPDATE stagiaires SET ? WHERE id = ?', [updatedData, id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.changedRows > 0);
        }
      });
    });
  }
  ,

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

      const values = stagiaireList.map((stagiaire) => [stagiaire.CEF, stagiaire.firstName, stagiaire.lastName]);

      const query = 'INSERT INTO stagiaires (CEF, firstName, lastName) VALUES ?';

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
