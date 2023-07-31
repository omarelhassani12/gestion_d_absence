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
  async getAbsencesByDateAndPeriod(date, period) {
  try {
    const sql = `
      SELECT
        a.id AS absence_id,
        a.stagiaire_id,
        a.date,
        a.period,
        a.first_session_attendance,
        a.second_session_attendance,
        s.CEF,
        s.firstName,
        s.lastName
      FROM absence a
      JOIN stagiaires s ON a.stagiaire_id = s.id
      WHERE a.date = ? AND a.period = ?
    `;

    const results = await db.query(sql, [date, period]);
    return results;
  } catch (error) {
    throw error;
  }
},
};

module.exports = AbsenceModel;
