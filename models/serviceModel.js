const db = require('../config/database');

const ServiceModel = {
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
      
    //for the navbar
    getNonActiveCompetesCount() {
        return new Promise((resolve, reject) => {
          const query = 'SELECT COUNT(*) AS NonActiveCompetesCount FROM users WHERE role = 1 AND isApproved = 0';
          db.query(query, (error, results) => {
            if (error) {
              console.error('Error in getNonActiveCompetesCount:', error);
              reject(error);
            } else {
              if (results && results[0] && results[0].NonActiveCompetesCount !== undefined) {
                const count = results[0].NonActiveCompetesCount;
                resolve(count);
              } else {
                console.log('No valid result returned from the database');
                resolve(0);
              }
            }
          });
        });
    },
    
    
    async getCountOfStagiairesWithNonZeroAbsenceHours() {
        try {
            const query = 'SELECT COUNT(DISTINCT stagiaire_id) AS StagiairesCount FROM absence WHERE IFNULL(first_session_attendance, 0) + IFNULL(second_session_attendance, 0) > 0';
    
            const result = await new Promise((resolve, reject) => {
                db.query(query, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
            });
    
            console.log('Query Result:', result);
            console.log('StagiairesCount:', result[0].StagiairesCount);
    
            if (result && result[0] && result[0].StagiairesCount !== undefined) {
                const count = result[0].StagiairesCount;
                return count;
            } else {
                return 0;
            }
        } catch (error) {
            console.error('Error in getCountOfStagiairesWithNonZeroAbsenceHours:', error);
            throw error;
        }
    }
    


};

module.exports = ServiceModel;
