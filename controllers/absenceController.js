const AbsenceModel = require('../models/absenceModel');
const StagiaireModel = require('../models/stagaireModel');

const AbsenceController = {
  async getAllAbsences(req, res, next) {
    try {
      const absences = await AbsenceModel.findAll();
      
      // Fetch the stagiaire information for each absence
      for (const absence of absences) {
        const stagiaire = await StagiaireModel.findById(absence.stagiaireId);
        absence.stagiaire = stagiaire;
      }
  
      const user = req.session.user || null;
      const stagiaires = await StagiaireModel.findAll(); // Fetch all stagiaires separately
      res.render('absences', { absences, activeRoute: 'absences', user, stagiaires });
    } catch (error) {
      console.error('Error retrieving absences:', error);
      next(error);
    }
  },
  
  async getStagiaireById(req, res) {
    try {
      const stagiaireId = req.params.id;
      const stagiaire = await StagiaireModel.findById(stagiaireId);
      const user = req.session.user || null;
      if (stagiaire) {
        res.render('new-absence', { stagiaire, activeRoute: 'absences', user }); // Pass activeRoute and user to the template
      } else {
        res.status(404).send('Stagiaire not found');
      }
    } catch (error) {
      console.error('An error occurred while fetching the stagiaire:', error);
      res.status(500).send('An error occurred while fetching the stagiaire');
    }
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



  async createAbsence(req, res, next) {
    try {
      // Get the form data from the request body
      const {
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
        absence_justifiee,
      } = req.body;
  
      // Create the absence in the database using the AbsenceModel
      const newAbsence = await AbsenceModel.createAbsence({
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
        absence_justifiee,
      });
  
      // Optionally, you can send a response back to the frontend indicating success or redirect to a different page
      res.redirect('/absence');    
     } catch (error) {
      console.error('Error creating absence:', error);
      next(error);
    }
  },
  

  updateAbsence(req, res, next) {
    const { id } = req.params;
    const { stagiaire_id, absence_type, start_date, end_date, decision, decision_date, matin_1ere_seance, matin_2eme_seance, apres_midi_3eme_seance, apres_midi_4eme_seance, total_heures_manquees, absence_justifiee } = req.body;

    const updatedData = {
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
      absence_justifiee,
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
