// stagaireController.js
const xlsx = require('xlsx');
const StagiaireModel = require('../models/stagaireModel');
const GroupModel = require('../models/groupModel');
const debug = require('debug')('app:controller');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

const StagaireController = {
  async getAllStagiaire(req, res) {
    try {
      const stagiaires = await StagiaireModel.findAll();
      const groups = await GroupModel.findAll();
      res.render('stagaire', { stagiaires, groups }); // Pass both stagiaires and groups to the view
    } catch (error) {
      console.error('An error occurred while fetching the stagiaires:', error);
      res.status(500).send('An error occurred while fetching the stagiaires');
    }
  },

  async getStagiaireById(req, res) {
    try {
      const stagiaireId = req.params.id;
      const stagiaire = await StagiaireModel.findById(stagiaireId);
      if (stagiaire) {
        res.render('stagaire-update', { stagiaire: stagiaire });
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
  
      // Assuming StagiaireModel.create returns the created stagiaire object
      const createdStagiaire = await StagiaireModel.create(stagiaireData);
  
      if (!createdStagiaire) {
        throw new Error('Failed to create the stagiaire');
      }
  
      const groups = await GroupModel.findAll();
  
      // If createdStagiaire is not an array, convert it to an array
      const stagiairesArray = Array.isArray(createdStagiaire) ? createdStagiaire : [createdStagiaire];
  
      // Pass the 'success' flag to the view to display the success alert
      res.render('stagaire', { stagiaires: stagiairesArray, groups: groups, success: true });
    } catch (error) {
      console.error('An error occurred while creating the stagiaire:', error);
      res.status(500).send('An error occurred while creating the stagiaire');
    }
  },

  // async updateStagiaire(req, res) {
  //   try {
  //     const stagiaireId = req.params.id;
  //     const updatedStagiaireData = req.body;
  //     if (!updatedStagiaireData) {
  //       throw new Error('Updated stagiaire data is null or undefined');
  //     }
  //     const isUpdated = await StagiaireModel.update(stagiaireId, updatedStagiaireData);
  //     if (isUpdated) {
  //       res.redirect('/stagaire'); // Redirect to the "stagaire" view
  //     } else {
  //       res.status(404).send('Stagiaire not found');
  //     }
  //   } catch (error) {
  //     console.error('An error occurred while updating the stagiaire:', error);
  //     res.status(500).send('An error occurred while updating the stagiaire');
  //   }
  // } ,
  async updateStagiaire(req, res) {
    try {
      const stagiaireId = req.params.id;
      const updatedStagiaireData = req.body;
      if (!updatedStagiaireData) {
        throw new Error('Updated stagiaire data is null or undefined');
      }
      const isUpdated = await StagiaireModel.update(stagiaireId, updatedStagiaireData);
      if (isUpdated) {
        // Redirect to the "stagaire" view with the success status as a query parameter
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
        res.status(200).json({ success: true }); // Send success flag in the response
      } else {
        res.status(404).json({ success: false }); // Send failure flag in the response
      }
    } catch (error) {
      console.error('An error occurred while deleting the stagiaire:', error);
      res.status(500).send('An error occurred while deleting the stagiaire');
    }
  }  
  ,

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



// // stagaireController.js
// const xlsx = require('xlsx');
// const StagiaireModel = require('../models/stagaireModel');
// const GroupModel = require('../models/groupModel');
// const debug = require('debug')('app:controller');
// const multer = require('multer');

// const upload = multer({ dest: 'uploads/' });

// const StagaireController = {
//   async getAllStagiaire(req, res) {
//     try {
//       const stagiaires = await StagiaireModel.findAll();
//       const groups = await GroupModel.findAll();
//       res.render('stagaire', { stagiaires, groups }); // Pass both stagiaires and groups to the view
//     } catch (error) {
//       console.error('An error occurred while fetching the stagiaires:', error);
//       res.status(500).send('An error occurred while fetching the stagiaires');
//     }
//   },

//   async getStagiaireById(req, res) {
//     try {
//       const stagiaireId = req.params.id;
//       const stagiaire = await StagiaireModel.findById(stagiaireId);
//       if (stagiaire) {
//         res.render('stagaire-update', { stagiaire: stagiaire });
//       } else {
//         res.status(404).send('Stagiaire not found');
//       }
//     } catch (error) {
//       console.error('An error occurred while fetching the stagiaire:', error);
//       res.status(500).send('An error occurred while fetching the stagiaire');
//     }
//   },

//   async createStagaire(req, res) {
//     try {
//       const stagiaireData = req.body;
//       if (!stagiaireData) {
//         throw new Error('Stagiaire data is null or undefined');
//       }
  
//       // Assuming StagiaireModel.create returns the created stagiaire object
//       const createdStagiaire = await StagiaireModel.create(stagiaireData);
  
//       if (!createdStagiaire) {
//         throw new Error('Failed to create the stagiaire');
//       }
  
//       const groups = await GroupModel.findAll();
  
//       // If createdStagiaire is not an array, convert it to an array
//       const stagiairesArray = Array.isArray(createdStagiaire) ? createdStagiaire : [createdStagiaire];
  
//       // Pass the 'success' flag to the view to display the success alert
//       res.render('stagaire', { stagiaires: stagiairesArray, groups: groups, success: true });
//     } catch (error) {
//       console.error('An error occurred while creating the stagiaire:', error);
//       res.status(500).send('An error occurred while creating the stagiaire');
//     }
//   },

  // async updateStagiaire(req, res) {
  //   try {
  //     const stagiaireId = req.params.id;
  //     const updatedStagiaireData = req.body;
  //     if (!updatedStagiaireData) {
  //       throw new Error('Updated stagiaire data is null or undefined');
  //     }
  //     const isUpdated = await StagiaireModel.update(stagiaireId, updatedStagiaireData);
  //     if (isUpdated) {
  //       res.redirect('/stagaire'); // Redirect to the "stagaire" view
  //     } else {
  //       res.status(404).send('Stagiaire not found');
  //     }
  //   } catch (error) {
  //     console.error('An error occurred while updating the stagiaire:', error);
  //     res.status(500).send('An error occurred while updating the stagiaire');
  //   }
  // }
  
  // ,

//   async deleteStagiaire(req, res) {
//     try {
//       const stagiaireId = req.params.id;
//       const isDeleted = await StagiaireModel.delete(stagiaireId);
//       if (isDeleted) {
//         res.status(200).send('Stagiaire deleted successfully');
//       } else {
//         res.status(404).send('Stagiaire not found');
//       }
//     } catch (error) {
//       console.error('An error occurred while deleting the stagiaire:', error);
//       res.status(500).send('An error occurred while deleting the stagiaire');
//     }
//   },

//   uploadStagiaireList: [
//     upload.single('file'), // Specify the field name used for file upload
//     async (req, res) => {
//       try {
//         const file = req.file;
//         if (!file) {
//           throw new Error('No file uploaded');
//         }

//         const workbook = xlsx.readFile(file.path);
//         const worksheet = workbook.Sheets[workbook.SheetNames[0]];
//         const jsonData = xlsx.utils.sheet_to_json(worksheet);

//         if (!jsonData || jsonData.length === 0) {
//           throw new Error('Invalid or empty data in the uploaded file');
//         }

//         const insertCount = await StagiaireModel.insertList(jsonData);

//         res.status(200).send(`${insertCount} Stagiaire(s) inserted successfully`);
//       } catch (error) {
//         console.error('An error occurred while uploading the stagiaire list:', error);
//         res.status(500).send('An error occurred while uploading the stagiaire list');
//       }
//     },
//   ],
// };

// module.exports = StagaireController;
