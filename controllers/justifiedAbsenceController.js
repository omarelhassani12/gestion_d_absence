const JustifiedAbsenceModel = require('../models/justifiedAbsenceModel');
const StagiaireModel = require('../models/stagaireModel');

const JustifiedAbsenceController = {
  async getAllJustifiedAbsences(req, res) {
    try {
      const justifiedAbsences = await JustifiedAbsenceModel.findAll();
  
      const user = req.session.user || null;
  
      res.render('absences-justified', {
        justifiedAbsences,
        user,
        activeRoute: 'absencesJustified',
      });
    } catch (error) {
      console.error('Error retrieving justified absences:', error);
      res.status(500).json({ error: 'Failed to fetch justified absences' });
    }
  },
   
  getJustifiedAbsenceById(req, res) {
    const id = req.params.id;

    JustifiedAbsenceModel.findById(id)
      .then((justifiedAbsence) => {
        if (justifiedAbsence) {
          res.status(200).json(justifiedAbsence);
        } else {
          res.status(404).json({ message: 'Justified absence not found' });
        }
      })
      .catch((error) => {
        res.status(500).json({ error: 'Failed to fetch justified absence' });
      });
  },

  createJustifiedAbsence(req, res) {
    console.log('Received request to create justified absence');
    const justifiedAbsenceData = req.body;
    console.log('Data received:', justifiedAbsenceData);

    JustifiedAbsenceModel.create(justifiedAbsenceData)
      .then((insertedId) => {
        console.log('Justified absence inserted with ID:', insertedId);
        res.status(201).json({ id: insertedId, message: 'Justified absence created successfully' });
      })
      .catch((error) => {
        console.error('Error creating justified absence:', error);
        res.status(500).json({ error: 'Failed to create justified absence' });
      });
  },
  

  updateJustifiedAbsence(req, res) {
    const id = req.params.id;
    const justifiedAbsenceData = req.body;

    JustifiedAbsenceModel.update(id, justifiedAbsenceData)
      .then((success) => {
        if (success) {
          res.status(200).json({ message: 'Justified absence updated successfully' });
        } else {
          res.status(404).json({ message: 'Justified absence not found or not updated' });
        }
      })
      .catch((error) => {
        res.status(500).json({ error: 'Failed to update justified absence' });
      });
  },
  deleteJustifiedAbsence(req, res) {
    const id = req.params.id;
  
    JustifiedAbsenceModel.delete(id)
      .then((success) => {
        if (success) {
          res.redirect('/absences-justified?message=Justified%20absence%20deleted%20successfully');
        } else {
          res.redirect('/absences-justified?message=Justified%20absence%20not%20found%20or%20not%20deleted');
        }
      })
      .catch((error) => {
        res.redirect('/absences-justified?message=Failed%20to%20delete%20justified%20absence');
      });
  },  
};

module.exports = JustifiedAbsenceController;
