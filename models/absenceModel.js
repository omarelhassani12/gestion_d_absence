const db = require('../config/database');
const { format } = require('date-fns');
const cron = require('node-cron');

const AbsenceModel = {
  // findAll() {
  //   return new Promise((resolve, reject) => {
  //     db.query(
  //       'SELECT * FROM absence',
  //       (error, results) => {
  //         if (error) {
  //           reject(error);
  //         } else {
  //           resolve(results);
  //         }
  //       }
  //     );
  //   });
  // },
 
  findAll() {
    return new Promise((resolve, reject) => {
      const today = format(new Date(), 'yyyy-MM-dd');
      db.query(
        'SELECT * FROM absence WHERE date = ?',
        [today],
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
      const sql = 'SELECT * FROM absence WHERE id = ?';
      db.query(sql, [id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      });
    });
  },

  async createAbsence(absenceDataArray) {
    try {
      for (const data of absenceDataArray) {
        const query = `
          INSERT INTO absence (
            stagiaire_id,
            date,
            period,
            first_session_attendance,
            second_session_attendance
          )
          VALUES (?, ?, ?, ?, ?)
        `;
        const values = [
          data.stagiaire_id,
          data.date,
          data.period,
          data.first_session_attendance ? 1 : 0,
          data.second_session_attendance ? 1 : 0,
        ];

        // Execute the query using the database connection
        await db.query(query, values);
      }

      // No need to fetch inserted rows, since we're inserting in bulk

      // Optionally, you can return a success message or any other response
      return {
        success: true,
        message: 'Absences inserted successfully.',
      };
    } catch (error) {
      console.error('Error inserting absences:', error);
      throw error;
    }
  },

  update(id, updatedData) {
    return new Promise((resolve, reject) => {
      if (!updatedData) {
        reject(new Error('Updated data is null or undefined'));
        return;
      }

      db.query(
        'UPDATE absence SET stagiaire_id = ?, date = ?, period = ?, first_session_attendance = ?, second_session_attendance = ? WHERE id = ?',
        [
          updatedData.stagiaire_id,
          updatedData.date,
          updatedData.period,
          updatedData.first_session_attendance,
          updatedData.second_session_attendance,
          id
        ],
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
      db.query('DELETE FROM absence WHERE id = ?', [id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.affectedRows > 0);
        }
      });
    });
  },
 
  async updateAbsence(id, sessionNumber, updatedAttendance) {
    try {
      // Check if updatedAttendance is null or undefined
      if (updatedAttendance === null || updatedAttendance === undefined) {
        throw new Error('Updated attendance data is null or undefined');
      }
  
      // Determine which attendance column to update based on the session number
      const columnToUpdate = sessionNumber === 1 ? 'first_session_attendance' : 'second_session_attendance';
  
      // Convert the boolean to a number (0 or 1)
      const valueToSet = updatedAttendance ? 1 : 0;
  
      // Construct the SQL query for updating the attendance
      const query = `
        UPDATE absence 
        SET ${columnToUpdate} = ?
        WHERE id = ?
      `;
  
      const values = [
        valueToSet,
        id
      ];
  
      // Execute the query using the database connection
      const result = await db.query(query, values);
  
      // Check if any rows were affected by the update operation
      const success = result.affectedRows > 0;
  
      // Optionally, you can return a success message or any other response
      return {
        success,
        message: success ? 'Absence updated successfully.' : 'Absence not found or not updated.',
      };
    } catch (error) {
      console.error('Error updating absence:', error);
      throw error;
    }
  },
  

 fetchStagiaires(db) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM stagiaires';
    db.query(query, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
},

insertAbsencesForToday(db, stagiaires) {
  const currentDate = format(new Date(), 'yyyy-MM-dd');

  return new Promise((resolve, reject) => {
    // Create an array to hold the values for all stagiaires
    const values = stagiaires.flatMap((stagiaire) => [
      [stagiaire.id, currentDate, "AM", 0, 0],
      [stagiaire.id, currentDate, "PM", 0, 0],
    ]);

    // Create the SQL query with multiple placeholders for each stagiaire
    const insertQuery = 'INSERT IGNORE INTO absence (stagiaire_id, date, period, first_session_attendance, second_session_attendance) VALUES ?';

    // Execute the query using the database connection
    db.query(insertQuery, [values], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
},


async main() {
  try {
    const stagiaires = await AbsenceModel.fetchStagiaires(db);
    await AbsenceModel.insertAbsencesForToday(db, stagiaires);
    console.log('Absences inserted successfully.');
  } catch (error) {
    console.error('Failed to insert absences:', error);
  }
},
  // Schedule the main function to run every day at midnight (00:00)
startScheduler() {
  cron.schedule('0 0 * * *', () => {
    this.main();
  });
},

};

AbsenceModel.main();
AbsenceModel.startScheduler();
module.exports = AbsenceModel;
