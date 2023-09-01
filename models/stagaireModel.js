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

        const sql = 'INSERT INTO stagiaires SET ?';

        db.query(sql, [stagiaire], (error, results) => {
            if (error) {
              if (error.code === 'ER_DUP_ENTRY') {
                // For duplicate entry error (CEF already exists)
                reject('CEF already exists');
            }else {
                    // For other server errors
                    reject('Internal server error');
                }
            } else {
                // For successful insertion
                resolve('Stagiaire created successfully');
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

  updateStatus(stagiaireId, newStatus){
    return new Promise((resolve, reject) => {
        const query = 'UPDATE stagiaires SET status = ? WHERE id = ?';
        db.query(query, [newStatus, stagiaireId], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
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
