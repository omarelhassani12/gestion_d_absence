// StagiaireController.js
const xlsx = require('xlsx');
const StagaireService = require('../services/StagaireService');
const debug = require('debug')('app:controller');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' }); 

const StagaireController = {
  async getAllStagaire(req, res) {
    try {
      const stagiaires = await StagaireService.getAllStagiaires();
      res.render('stagaire', { stagiaires: stagiaires });
    } catch (error) {
      console.error('An error occurred while fetching the stagiaires:', error);
      res.status(500).send('An error occurred while fetching the stagiaires');
    }
  },

  async getStagiaireById(req, res) {
    try {
      const stagiaireId = req.params.id;
      const stagiaire = await StagaireService.getStagiaireById(stagiaireId);
      if (stagiaire) {
        res.render('stagaire', { stagiaire: stagiaire });
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
      const createdStagiaire = await StagaireService.createStagiaire(stagiaireData);
      res.status(200).send('Stagiaire created successfully');
    } catch (error) {
      console.error('An error occurred while creating the stagiaire:', error);
      res.status(500).send('An error occurred while creating the stagiaire');
    }
  },

  async updateStagaire(req, res) {
    try {
      const stagiaireId = req.params.id;
      const updatedStagiaireData = req.body;
      if (!updatedStagiaireData) {
        throw new Error('Updated stagiaire data is null or undefined');
      }
      const isUpdated = await StagaireService.updateStagiaire(stagiaireId, updatedStagiaireData);
      if (isUpdated) {
        res.status(200).send('Stagiaire updated successfully');
      } else {
        res.status(404).send('Stagiaire not found');
      }
    } catch (error) {
      console.error('An error occurred while updating the stagiaire:', error);
      res.status(500).send('An error occurred while updating the stagiaire');
    }
  },

  async deleteStagaire(req, res) {
    try {
      const stagiaireId = req.params.id;
      const isDeleted = await StagaireService.deleteStagiaire(stagiaireId);
      if (isDeleted) {
        res.status(200).send('Stagiaire deleted successfully');
      } else {
        res.status(404).send('Stagiaire not found');
      }
    } catch (error) {
      console.error('An error occurred while deleting the stagiaire:', error);
      res.status(500).send('An error occurred while deleting the stagiaire');
    }
  },

  uploadStagiaireList: [
    upload.single('file'), // Specify the field name used for file upload
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
  
        const insertCount = await StagaireService.insertStagiaireList(jsonData);
  
        res.status(200).send(`${insertCount} Stagiaire(s) inserted successfully`);
      } catch (error) {
        console.error('An error occurred while uploading the stagiaire list:', error);
        res.status(500).send('An error occurred while uploading the stagiaire list');
      }
    },
  ],  
};

module.exports = StagaireController;
