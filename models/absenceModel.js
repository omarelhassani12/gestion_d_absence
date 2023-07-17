const db = require('../config/database');

const AbsenceModel = {
  findAll() {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT * FROM absence',
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });
  },

  findById(id) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM absence WHERE observation_id = ?';
      db.query(sql, [id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      });
    });
  },

  create(absence) {
    return new Promise((resolve, reject) => {
      if (!absence) {
        reject(new Error('Absence object is null or undefined'));
        return;
      }

      db.query(
        'INSERT INTO absence (stagiaire_id, observation_date, absence_type, decision, observation_n1, observation_n2, total_hours_missed, is_justified) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [absence.stagiaire_id, absence.observation_date, absence.absence_type, absence.decision, absence.observation_n1, absence.observation_n2, absence.total_hours_missed, absence.is_justified],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results.insertId);
          }
        }
      );
    });
  },

  update(id, updatedData) {
    return new Promise((resolve, reject) => {
      if (!updatedData) {
        reject(new Error('Updated data is null or undefined'));
        return;
      }

      db.query(
        'UPDATE absence SET stagiaire_id = ?, observation_date = ?, absence_type = ?, decision = ?, observation_n1 = ?, observation_n2 = ?, total_hours_missed = ?, is_justified = ? WHERE observation_id = ?',
        [updatedData.stagiaire_id, updatedData.observation_date, updatedData.absence_type, updatedData.decision, updatedData.observation_n1, updatedData.observation_n2, updatedData.total_hours_missed, updatedData.is_justified, id],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results.affectedRows > 0);
          }
        }
      );
    });
  },

  delete(id) {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM absence WHERE observation_id = ?', [id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.affectedRows > 0);
        }
      });
    });
  },
};

module.exports = AbsenceModel;
