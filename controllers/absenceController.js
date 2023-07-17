const AbsenceModel = require('../models/absenceModel');

const AbsenceController = {
  getAllAbsences(req, res, next) {
    AbsenceModel.findAll()
      .then(absences => {
        const user = req.session.user || null;
        res.render('absences', { absences, activeRoute: 'absences',user });
      })
      .catch(error => {
        console.error('Error retrieving absences:', error);
        next(error);
      });
  },

  getAbsenceById(req, res, next) {
    const { id } = req.params;

    AbsenceModel.findById(id)
      .then(absence => {
        res.render('absence-update', { absence, activeRoute: 'absences' });
      })
      .catch(error => {
        console.error('Error retrieving absence by ID:', error);
        next(error);
      });
  },

  createAbsence(req, res, next) {
    const { stagiaire_id, observation_date, absence_type, decision, observation_n1, observation_n2, total_hours_missed, is_justified } = req.body;

    const absence = {
      stagiaire_id,
      observation_date,
      absence_type,
      decision,
      observation_n1,
      observation_n2,
      total_hours_missed,
      is_justified,
    };

    AbsenceModel.create(absence)
      .then(observation_id => {
        console.log('Absence created successfully with ID:', observation_id);
        res.redirect('/absences');
      })
      .catch(error => {
        console.error('Error creating absence:', error);
        next(error);
      });
  },

  updateAbsence(req, res, next) {
    const { id } = req.params;
    const { stagiaire_id, observation_date, absence_type, decision, observation_n1, observation_n2, total_hours_missed, is_justified } = req.body;

    const updatedData = {
      stagiaire_id,
      observation_date,
      absence_type,
      decision,
      observation_n1,
      observation_n2,
      total_hours_missed,
      is_justified,
    };

    AbsenceModel.update(id, updatedData)
      .then(success => {
        if (success) {
          console.log('Absence updated successfully');
          res.redirect('/absences');
        } else {
          console.error('Absence not found or not updated');
          next(new Error('Absence not found or not updated'));
        }
      })
      .catch(error => {
        console.error('Error updating absence:', error);
        next(error);
      });
  },

  deleteAbsence(req, res, next) {
    const { id } = req.params;

    AbsenceModel.delete(id)
      .then(success => {
        if (success) {
          console.log('Absence deleted successfully');
          res.redirect('/absences');
        } else {
          console.error('Absence not found or not deleted');
          next(new Error('Absence not found or not deleted'));
        }
      })
      .catch(error => {
        console.error('Error deleting absence:', error);
        next(error);
      });
  },
};

module.exports = AbsenceController;
