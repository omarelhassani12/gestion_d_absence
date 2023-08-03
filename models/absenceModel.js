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

  async findAllByDate(date) {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT * FROM absence WHERE date = ?',
        [date],
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

  async findAllByPeriod(period) {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT * FROM absence WHERE period = ?',
        [period],
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
  
  async findAllByDateAndPeriod(date, period) {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT * FROM absence WHERE date = ? AND period = ?',
        [date, period],
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

  async getTotalHoursOfAbsenceByStagiaire(stagiaireId) {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT SUM((first_session_attendance + second_session_attendance) * 2.5) AS totalHours FROM absence WHERE stagiaire_id = ? ',
        [stagiaireId],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results[0].totalHours || 0);
          }
        }
      );
    });
  },
  
  async getTotalHoursOfAbsenceByStagiaireForToday(stagiaireId, selectedDate) {
    try {
      // Convert the selected date to the "YYYY-MM-DD" format
      const formattedDate = new Date(selectedDate).toISOString().slice(0, 10);

      return new Promise((resolve, reject) => {
        db.query(
          'SELECT SUM((first_session_attendance + second_session_attendance) * 2.5) AS totalHours FROM absence WHERE stagiaire_id = ? AND date = ?',
          [stagiaireId, formattedDate],
          (error, results) => {
            if (error) {
              reject(error);
            } else {
              resolve(results[0].totalHours || 0);
            }
          }
        );
      });
    } catch (error) {
      console.error('Error fetching total hours of absence:', error);
      throw error;
    }
  },


  async findAllUniqueDates() {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT DISTINCT date FROM absence', // Assuming the date column in the absence table is called "date"
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            const uniqueDates = results.map((result) => result.date);
            resolve(uniqueDates);
          }
        }
      );
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

  async findAllByStagiaireId(stagiaireId) {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT * FROM absence WHERE stagiaire_id = ?',
        [stagiaireId],
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
 

  async updateAbsence(id, sessionNumber, updatedAttendance, is_justified) {
    try {
      // Check if updatedAttendance is null or undefined
      if (updatedAttendance === null || updatedAttendance === undefined) {
        throw new Error('Updated attendance data is null or undefined');
      }
  
      // Determine which attendance column to update based on the session number
      const columnToUpdate = sessionNumber === 1 ? 'first_session_attendance' : 'second_session_attendance';
  
      // Convert the boolean to a number (0 or 1)
      const valueToSet = updatedAttendance ? 1 : 0;
  
      // Construct the SQL query for updating the attendance and is_justified
      const query = `
        UPDATE absence 
        SET ${columnToUpdate} = ?,
            is_justified = ?
        WHERE id = ?
      `;
  
      const values = [
        valueToSet,
        is_justified === '1' ? 1 : 0,
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

// AbsenceModel.main();
AbsenceModel.startScheduler();
module.exports = AbsenceModel;
