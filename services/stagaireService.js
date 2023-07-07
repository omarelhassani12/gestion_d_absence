const StagaireModel = require('../models/StagaireModel');

const StagaireService = {
  async getAllStagiaires() {
    try {
      const stagiaires = await StagaireModel.findAll();
      return stagiaires;
    } catch (error) {
      console.error('An error occurred while fetching the stagiaires:', error);
      throw new Error('An error occurred while fetching the stagiaires');
    }
  },

  async createStagaire(stagiaireData) {
    try {
      if (!stagiaireData) {
        throw new Error('Stagiaire data is null or undefined');
      }
      const createdStagiaire = await StagaireModel.create(stagiaireData);
      return createdStagiaire;
    } catch (error) {
      console.error('An error occurred while creating the stagiaire:', error);
      throw new Error('An error occurred while creating the stagiaire');
    }
  },

  async getStagiaireById(stagiaireId) {
    try {
      const stagiaire = await StagaireModel.findById(stagiaireId);
      return stagiaire;
    } catch (error) {
      console.error('An error occurred while fetching the stagiaire:', error);
      throw new Error('An error occurred while fetching the stagiaire');
    }
  },

  async updateStagiaire(stagiaireId, updatedStagiaireData) {
    try {
      if (!updatedStagiaireData) {
        throw new Error('Updated stagiaire data is null or undefined');
      }
      // Fetch the existing stagiaire data from the database
      const existingStagiaireData = await StagaireModel.findById(stagiaireId);
      if (!existingStagiaireData) {
        throw new Error('Stagiaire not found');
      }

      // Merge the existing stagiaire data with the updated data
      const mergedStagiaireData = {
        ...existingStagiaireData,
        ...updatedStagiaireData,
      };

      // Update the stagiaire in the database
      const isUpdated = await StagaireModel.update(stagiaireId, mergedStagiaireData);
      return isUpdated;
    } catch (error) {
      console.error('An error occurred while updating the stagiaire:', error);
      throw new Error('An error occurred while updating the stagiaire');
    }
  },

  async deleteStagiaire(stagiaireId) {
    try {
      const isDeleted = await StagaireModel.delete(stagiaireId);
      return isDeleted;
    } catch (error) {
      console.error('An error occurred while deleting the stagiaire:', error);
      throw new Error('An error occurred while deleting the stagiaire');
    }
  },

  async insertStagiaireList(stagiaireList) {
    try {
      if (!stagiaireList || stagiaireList.length === 0) {
        throw new Error('Stagiaire list is null or empty');
      }

      const insertCount = await StagaireModel.insertList(stagiaireList);
      return insertCount;
    } catch (error) {
      console.error('An error occurred while inserting the stagiaire list:', error);
      throw new Error('An error occurred while inserting the stagiaire list');
    }
  },
};

module.exports = StagaireService;
