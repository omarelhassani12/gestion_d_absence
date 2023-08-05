const db = require('../config/database');


const JustifiedAbsence = {
  findAll() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT justified_absence.*, stagiaires.CEF, stagiaires.firstName, stagiaires.lastName FROM justified_absence LEFT JOIN stagiaires ON justified_absence.stagiaire_id = stagiaires.id';
      db.query(query, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },

  findAllByStagiaireIdAndDateRange(stagiaireId) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT justified_absence.*, stagiaires.CEF, stagiaires.firstName, stagiaires.lastName FROM justified_absence LEFT JOIN stagiaires ON justified_absence.stagiaire_id = stagiaires.id WHERE justified_absence.stagiaire_id = ?';
      const values = [stagiaireId];
      db.query(query, values, (error, results) => {
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
      const query = 'SELECT * FROM justified_absence WHERE id = ?';
      db.query(query, [id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      });
    });
  },

 create(justifiedAbsenceData) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO justified_absence (stagiaire_id, start_date, end_date) VALUES (?, ?, ?)';
      const values = [
        justifiedAbsenceData.stagiaireId,
        justifiedAbsenceData.startDate,
        justifiedAbsenceData.endDate,
      ];

      db.query(query, values, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.insertId);
        }
      });
    });
  },

  update(id, justifiedAbsenceData) {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE justified_absence SET absence_id = ?, start_date = ?, end_date = ? WHERE id = ?';
      const values = [justifiedAbsenceData.absence_id, justifiedAbsenceData.start_date, justifiedAbsenceData.end_date, id];

      db.query(query, values, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.affectedRows > 0);
        }
      });
    });
  },

  delete(id) {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM justified_absence WHERE id = ?';
      db.query(query, [id], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.affectedRows > 0);
        }
      });
    });
  },  

};


module.exports = JustifiedAbsence;
