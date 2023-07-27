const db = require('../config/database');

const AbsenceModel = {
  findAll() {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT * FROM absences', // Updated table name from "absence" to "absences"
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
      const sql = 'SELECT * FROM absences WHERE id = ?'; // Updated column name from "observation_id" to "id"
      db.query(sql, [id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      });
    });
  },

  async  createAbsence(absenceData) {
    try {
      // Perform the database insertion using your chosen database connection or ORM
      // This is just an example using raw SQL syntax, adjust it based on your database setup
      const query = `
        INSERT INTO absences (
          stagiaire_id,
          absence_type,
          start_date,
          end_date,
          decision,
          decision_date,
          matin_1ere_seance,
          matin_2eme_seance,
          apres_midi_3eme_seance,
          apres_midi_4eme_seance,
          total_heures_manquees,
          absence_justifiee
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const values = [
        absenceData.stagiaire_id,
        absenceData.absence_type,
        absenceData.start_date,
        absenceData.end_date,
        absenceData.decision,
        absenceData.decision_date,
        absenceData.matin_1ere_seance,
        absenceData.matin_2eme_seance,
        absenceData.apres_midi_3eme_seance,
        absenceData.apres_midi_4eme_seance,
        absenceData.total_heures_manquees,
        absenceData.absence_justifiee,
      ];
  
      // Execute the query and return the result
      const result = await db.query(query, values);
  
      // Fetch the ID of the newly inserted record
      const insertedId = result.insertId;
  
      // Fetch the newly created absence from the database using the ID
      const createdAbsence = await db.query('SELECT * FROM absences WHERE id = ?', [insertedId]);
  
      // The newly created absence will be available in createdAbsence[0]
      return createdAbsence[0];
    } catch (error) {
      console.error('Error creating absence in the database:', error);
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
        'UPDATE absences SET stagiaire_id = ?, absence_type = ?, start_date = ?, end_date = ?, decision = ?, decision_date = ?, matin_1ere_seance = ?, matin_2eme_seance = ?, apres_midi_3eme_seance = ?, apres_midi_4eme_seance = ?, total_heures_manquees = ?, absence_justifiee = ? WHERE id = ?',
        [updatedData.stagiaire_id, updatedData.absence_type, updatedData.start_date, updatedData.end_date, updatedData.decision, updatedData.decision_date, updatedData.matin_1ere_seance, updatedData.matin_2eme_seance, updatedData.apres_midi_3eme_seance, updatedData.apres_midi_4eme_seance, updatedData.total_heures_manquees, updatedData.absence_justifiee, id],
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
      db.query('DELETE FROM absences WHERE id = ?', [id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.affectedRows > 0);
        }
      });
    });
  },
};

module.exports = AbsenceModel;
