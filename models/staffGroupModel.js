const db = require('../config/database');

const StaffGroupModel = {
  findAll() {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT staff_group.*, users.nom_complete AS user_name, groups.name AS group_name
        FROM staff_group
        LEFT JOIN users ON staff_group.user_id = users.id
        LEFT JOIN groups ON staff_group.group_id = groups.id
      `;
      
      db.query(query, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
},

  findByFormateurId(userId) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM staff_group WHERE user_id = ?';
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
        SELECT staff_group.*, users.nom_complete AS formateur_name
        FROM staff_group
        LEFT JOIN users ON staff_group.user_id = users.id
        WHERE staff_group.id = ?
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

  findByGroupIdWithFormateurs(id) {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT staff_group.*, users.nom_complete AS formateur_name
            FROM staff_group
            LEFT JOIN users ON staff_group.user_id = users.id
            WHERE staff_group.group_id = ?
        `;
        db.query(sql, [id], (error, results) => {
            if (error) {
                reject(error);
            } else {
                const groupInfo = results[0];
                if (groupInfo) {
                    groupInfo.formateurs = results.map(row => ({ formateur_name: row.formateur_name }));
                    resolve(groupInfo);
                } else {
                    resolve(null); // Group not found
                }
            }
        });
    });
  },

  // findByUserIdWithGroups(user_id) {
  //   return new Promise((resolve, reject) => {
  //     const sql = `
  //     SELECT staff_group.*, groups.name AS group_name
  //     FROM staff_group
  //     LEFT JOIN groups ON staff_group.group_id = groups.id
  //     WHERE staff_group.user_id = ?
  //     `;
  //     db.query(sql, [user_id], (error, results) => {
  //       if (error) {
  //         reject(error);
  //       } else {
  //         const groupInfo = results.map(row => ({ formateur_name: row.formateur_name }));
  //         resolve(groupInfo);
  //       }
  //     });
  //   });
  // },  
  findByUserIdWithGroups(user_id) {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT staff_group.*, groups.name AS group_name, users.nom_complete AS formateur_name
            FROM staff_group
            LEFT JOIN groups ON staff_group.group_id = groups.id
            LEFT JOIN users ON staff_group.user_id = users.id
            WHERE staff_group.user_id = ?
        `;
        db.query(sql, [user_id], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results); // Return the whole result set
            }
        });
    });
},



  async findGroupByUserId(userId) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT *
        FROM staff_group
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
        'INSERT INTO staff_group (group_id, user_id, created_at) VALUES (?, ?, ?)',
        [group.group_id, group.user_id, created_at], // Use correct keys and order
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
  
      // Perform the update if the user_id exists
      db.query(
        'UPDATE staff_group SET user_id = ?, group_id = ? WHERE id = ?',
        [updatedData.user_id, updatedData.group_id, id], 
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
      db.query('DELETE FROM staff_group WHERE id = ?', [id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.affectedRows > 0);
        }
      });
    });
  },
};

module.exports = StaffGroupModel;
