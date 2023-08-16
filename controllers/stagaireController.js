// stagaireController.js
const xlsx = require('xlsx');
const StagiaireModel = require('../models/stagaireModel');
const GroupModel = require('../models/groupModel');
const multer = require('multer');
const AbsenceModel = require('../models/absenceModel');
const { getAllByStagiaireId } = require('../models/pdfModel');

const upload = multer({ dest: 'uploads/' });

const StagaireController = {
  async getAllStagiaire(req, res) {
    try {
      const stagiaires = await StagiaireModel.findAll();
      const groups = await GroupModel.findAll();
      const user = req.session.user || null;
      res.render('stagaire', { stagiaires, groups , activeRoute: 'stagaire',user }); 
    } catch (error) {
      console.error('An error occurred while fetching the stagiaires:', error);
      res.status(500).send('An error occurred while fetching the stagiaires');
    }
  },

  async getStagiaireDetails(req, res) {
    try {
        const stagiaireId = req.params.id;

        // Fetch the stagiaire details and absence data based on the stagiaireId
        const stagiaireDetails = await StagiaireModel.findById(stagiaireId);
        const absenceData = await AbsenceModel.getByStagiaireId(stagiaireId);
        const pdfStagaire = await getAllByStagiaireId(stagiaireId);

        console.log(absenceData);
        pdfStagaire.forEach((pdf) => {

        console.log("pdf " + pdf.pdf_type);
        }); 

        // Calculate the total absence hours for the stagiaire
        let totalHours = 0;
        for (const absence of absenceData) {
            totalHours += (absence.first_session_attendance * 2.5 + absence.second_session_attendance * 2.5); // Assuming you have an 'hours' field in the absenceData
        }

        console.log("the total number of absent sessions" + totalHours)

        const groups = await GroupModel.findAll();
        const user = req.session.user || null;

        // Render a new page (e.g., "stagiaire-details") and pass the fetched data
        res.render('stagiaire-details', {
            stagiaire: stagiaireDetails,
            absence: absenceData,
            totalHours: totalHours,
            groups,
            user,
            activeRoute: "stagaire",
            pdfStagaire,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
  },

  async getStagiaireById(req, res) {
    try {
      const stagiaireId = req.params.id;
      const stagiaire = await StagiaireModel.findById(stagiaireId);
      const groups = await GroupModel.findAll();
      const user = req.session.user || null;
      if (stagiaire) {
        res.render('stagaire-update', { stagiaire: stagiaire, groups : groups, activeRoute: 'stagaire' ,user });
      } else {
        res.status(404).send('Stagiaire not found');
      }
    } catch (error) {
      console.error('An error occurred while fetching the stagiaire:', error);
      res.status(500).send('An error occurred while fetching the stagiaire');
    }
  },

  async createStagaire(req, res) {
    try {
      const stagiaireData = req.body;
      if (!stagiaireData) {
        throw new Error('Stagiaire data is null or undefined');
      }
  
      const createdStagiaire = await StagiaireModel.create(stagiaireData);
  
      if (!createdStagiaire) {
        throw new Error('Failed to create the stagiaire');
      }
  
      const groups = await GroupModel.findAll();
  
      const stagiairesArray = Array.isArray(createdStagiaire) ? createdStagiaire : [createdStagiaire];
  
      res.render('stagaire', { stagiaires: stagiairesArray, groups: groups, success: true });
    } catch (error) {
      console.error('An error occurred while creating the stagiaire:', error);
      res.status(500).send('An error occurred while creating the stagiaire');
    }
  },


  async updateStagiaire(req, res) {
    try {
      const stagiaireId = req.params.id;
      const updatedStagiaireData = req.body;
      if (!updatedStagiaireData) {
        throw new Error('Updated stagiaire data is null or undefined');
      }
      const isUpdated = await StagiaireModel.update(stagiaireId, updatedStagiaireData);
      if (isUpdated) {
        res.redirect('/stagaire?updateSuccess=true');
      } else {
        res.status(404).send('Stagiaire not found');
      }
    } catch (error) {
      console.error('An error occurred while updating the stagiaire:', error);
      res.status(500).send('An error occurred while updating the stagiaire');
    }
  }
  
,  
  
  async deleteStagiaire(req, res) {
    try {
      const stagiaireId = req.params.id;
      const isDeleted = await StagiaireModel.delete(stagiaireId);
      if (isDeleted) {
        res.status(200).json({ success: true }); 
      } else {
        res.status(404).json({ success: false });
      }
    } catch (error) {
      console.error('An error occurred while deleting the stagiaire:', error);
      res.status(500).send('An error occurred while deleting the stagiaire');
    }
  }  
  ,

  uploadStagiaireList: [
    upload.single('file'), 
    async (req, res) => {
      try {
        const file = req.file;
        if (!file) {
          throw new Error('No file uploaded');
        }

        const workbook = xlsx.readFile(file.path);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = xlsx.utils.sheet_to_json(worksheet);

        if (!jsonData || jsonData.length === 0) {
          throw new Error('Invalid or empty data in the uploaded file');
        }

        const insertCount = await StagiaireModel.insertList(jsonData);

        res.status(200).send(`${insertCount} Stagiaire(s) inserted successfully`);
      } catch (error) {
        console.error('An error occurred while uploading the stagiaire list:', error);
        res.status(500).send('An error occurred while uploading the stagiaire list');
      }
    },
  ],
};

module.exports = StagaireController;
