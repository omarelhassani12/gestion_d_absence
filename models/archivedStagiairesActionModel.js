const db = require('../config/database');

const ArchivedStagiaireActionModel = {

  getAll: () => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT a.*, s.CEF, s.firstName, s.lastName, s.groupId FROM archived_stagiaire_actions a JOIN stagiaires s ON a.stagiaire_id = s.id';
      db.query(query, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },

  getById: (id) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT a.*, s.CEF, s.firstName, s.lastName, s.groupId FROM archived_stagiaire_actions a JOIN stagiaires s ON a.stagiaire_id = s.id WHERE a.id = ?';
      db.query(query, [id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      });
    });
  },

  getLatestByStagiaireId: (stagiaireId) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT a.*, s.CEF, s.firstName, s.lastName, s.groupId
        FROM archived_stagiaire_actions a
        JOIN stagiaires s ON a.stagiaire_id = s.id
        WHERE a.stagiaire_id = ?
        ORDER BY a.action_timestamp DESC
        LIMIT 1
      `;
      db.query(query, [stagiaireId], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      });
    });
  },
  

  create: (action) => {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO archived_stagiaire_actions (stagiaire_id, motif, action_type, action_date, action_timestamp) VALUES (?, ?, ?, ?, ?)';
      db.query(query, [action.stagiaire_id, action.motif, action.action_type, action.action_date, new Date()], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.insertId);
        }
      });
    });
  },


  update: (id, updatedAction) => {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE archived_stagiaire_actions SET stagiaire_id = ?, motif = ?, action_type = ?, action_date = ?, action_timestamp = ? WHERE id = ?';
      db.query(query, [updatedAction.stagiaire_id, updatedAction.motif, updatedAction.action_type, updatedAction.action_date, new Date(), id], (error, results) => {
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
      const query = 'DELETE FROM archived_stagiaire_actions WHERE id = ?';
      db.query(query, [id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.affectedRows > 0);
        }
      });
    });
  }
};

module.exports = ArchivedStagiaireActionModel;
