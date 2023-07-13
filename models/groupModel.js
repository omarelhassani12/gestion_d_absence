const db = require('../config/database');

const GroupModel = {
  findAll() {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM groups', (error, results) => {
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
      db.query('SELECT * FROM groups WHERE id = ?', [id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      });
    });
  },

  create(group) {
    return new Promise((resolve, reject) => {
      if (!group) {
        reject(new Error('Group object is null or undefined'));
        return;
      }

      const created_at = new Date().toLocaleString();
      const updated_at = new Date().toLocaleString();

      db.query('INSERT INTO groups (name, created_at, updated_at, user_id) VALUES (?, ?, ?, ?)', [group.name, created_at, updated_at, group.user_id], (error, results) => {
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

      updatedData.updated_at = new Date().toLocaleString();

      db.query('UPDATE groups SET name = ?, created_at = ?, updated_at = ?, user_id = ? WHERE id = ?', [updatedData.name, updatedData.created_at, updatedData.updated_at, updatedData.user_id, id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.affectedRows > 0);
        }
      });
    });
  },

  delete(id) {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM groups WHERE id = ?', [id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.affectedRows > 0);
        }
      });
    });
  },
};

module.exports = GroupModel;
