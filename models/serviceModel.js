const db = require('../config/database');

const OverviewAdminModel = {
  getStagiairesCount() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT COUNT(*) AS StagairesCount FROM stagiaires';
      db.query(query, (error, results) => {
        if (error) {
          console.error('Error in getStagiairesCount:', error);
          reject(error);
        } else {
          if (results && results[0] && results[0].StagairesCount !== undefined) {
            const count = results[0].StagairesCount;
            resolve(count);
          } else {
            console.log('No valid result returned from the database');
            resolve(0);
          }
        }
      });
    });
  },

  getUsersCountWithRole() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT COUNT(*) AS UsersCount FROM users WHERE role = 1';
      db.query(query, (error, results) => {
        if (error) {
          console.error('Error in getUsersCountWithRole:', error);
          reject(error);
        } else {
          if (results && results[0] && results[0].UsersCount !== undefined) {
            const count = results[0].UsersCount;
            resolve(count);
          } else {
            console.log('No valid result returned from the database');
            resolve(0);
          }
        }
      });
    });
  },

  getAbsencesCount() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT COUNT(*) AS AbsencesCount FROM absence';
      db.query(query, (error, results) => {
        if (error) {
          console.error('Error in getAbsencesCount:', error);
          reject(error);
        } else {
          if (results && results[0] && results[0].AbsencesCount !== undefined) {
            const count = results[0].AbsencesCount;
            resolve(count);
          } else {
            console.log('No valid result returned from the database');
            resolve(0);
          }
        }
      });
    });
  },
  
  getJustifiedAbsencesCount() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT COUNT(*) AS JustifiedAbsencesCount FROM justified_absence';
      db.query(query, (error, results) => {
        if (error) {
          console.error('Error in getJustifiedAbsencesCount:', error);
          reject(error);
        } else {
          if (results && results[0] && results[0].JustifiedAbsencesCount !== undefined) {
            const count = results[0].JustifiedAbsencesCount;
            resolve(count);
          } else {
            console.log('No valid result returned from the database');
            resolve(0);
          }
        }
      });
    });
  },

  //for the formateur
 
    getStagiairesCountByGroupId(groupId) {
        return new Promise((resolve, reject) => {
        const query = 'SELECT COUNT(*) AS StagairesCount FROM stagiaires WHERE groupId = ?';
        db.query(query, [groupId], (error, results) => {
            if (error) {
            console.error('Error in getStagiairesCount:', error);
            reject(error);
            } else {
            if (results && results[0] && results[0].StagairesCount !== undefined) {
                const count = results[0].StagairesCount;
                resolve(count);
            } else {
                console.log('No valid result returned from the database');
                resolve(0);
            }
            }
        });
        });
    },

    getAbsencesCountByGroupId(groupId) {
        return new Promise((resolve, reject) => {
          const query = 'SELECT COUNT(*) AS AbsencesCount FROM absence WHERE stagiaire_id IN (SELECT id FROM stagiaires WHERE groupId = ?)';
          db.query(query, [groupId], (error, results) => {
            if (error) {
              console.error('Error in getAbsencesCountByGroupId:', error);
              reject(error);
            } else {
              if (results && results[0] && results[0].AbsencesCount !== undefined) {
                const count = results[0].AbsencesCount;
                resolve(count);
              } else {
                console.log('No valid result returned from the database');
                resolve(0);
              }
            }
          });
        });
      },
      


};

module.exports = OverviewAdminModel;
