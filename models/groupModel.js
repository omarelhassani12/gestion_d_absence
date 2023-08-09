const db = require('../config/database');

const GroupModel = {
  findAll() {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT groups.*, users.nom_complete AS user_name FROM groups LEFT JOIN users ON groups.user_id = users.id',
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

  async findByFormateurId(userId) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM groups WHERE user_id = ?';
      console.log('Executing query:', query, 'with userId:', userId);
  
      db.query(query, [userId], (error, results) => {
        if (error) {
          console.error('Error executing query:', error);
          reject(error);
        } else {
          console.log('Query executed successfully. Results:', results);
          resolve(results);
        }
      });
    });
  },
  
  findById(id) {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT groups.*, users.nom_complete AS formateur_name
        FROM groups
        LEFT JOIN users ON groups.user_id = users.id
        WHERE groups.id = ?
      `;
      db.query(sql, [id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      });
    });
  },

  async findGroupByUserId(userId) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT *
        FROM groups
        WHERE user_id = ?
      `;
  
      db.query(query, [userId], (error, results) => {
        if (error) {
          return reject(error);
        }
  
        if (results.length > 0) {
          const groupData = results[0]; // Assuming there's only one group per user
          resolve(groupData);
        } else {
          resolve(null); // User not found or no group data
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
  
      const created_at = new Date().toISOString(); // Use ISO 8601 format for created_at
  
      db.query(
        'INSERT INTO groups (name, created_at, user_id) VALUES (?, ?, ?)',
        [group.name, created_at, group.user_id],
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
  
      // Get the current timestamp for updated_at
      updatedData.updated_at = new Date().toISOString();
  
      // Check if the user_id exists in the users table
      db.query('SELECT id FROM users WHERE id = ?', [updatedData.user_id], (error, results) => {
        if (error) {
          reject(error);
        } else if (results.length === 0) {
          // User with the specified user_id doesn't exist in the users table
          reject(new Error('User with the specified user_id does not exist'));
        } else {
          // Perform the update if the user_id exists
          db.query(
            'UPDATE groups SET name = ?, created_at = ?, updated_at = ?, user_id = ? WHERE id = ?',
            [updatedData.name, updatedData.created_at, updatedData.updated_at, updatedData.user_id, id],
            (error, results) => {
              if (error) {
                reject(error);
              } else {
                resolve(results.affectedRows > 0);
              }
            }
          );
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
