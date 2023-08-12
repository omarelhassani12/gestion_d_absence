const ArchivedStagiaireModel = require("../models/archivedStagiaireModel");
const GroupModel = require("../models/groupModel");
const StagiaireModel = require("../models/stagaireModel");

const ArchivedStagiairesController = {
  getAll: async (req, res) => {
    try {
      const ArchivedStagiaires = await ArchivedStagiaireModel.getAll();
      const groups = await GroupModel.findAll();
      const user = req.session.user || null;
      res.render('archived_stagiaires', { ArchivedStagiaires, groups , activeRoute: 'archivedstagaire',user }); 
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  archiveStagire: async (req, res) => {
        try {
            const stagiaireId = req.params.id;

            // Retrieve stagiaire data from the database
            const stagiaire = await StagiaireModel.findById(stagiaireId);

            if (!stagiaire) {
                return res.status(404).json({ message: 'Stagiaire not found' });
            }
            console.log('the controller called');

            // Insert stagiaire data into archived_stagiaire table
            const archivedStagiaire = {
                id: stagiaire.id,
                CEF: stagiaire.CEF,
                firstName: stagiaire.firstName,
                lastName: stagiaire.lastName,
                groupId: stagiaire.groupId,
                motif: req.body.motif, // Retrieve this from the form
                archived_at: req.body.archived_at // Retrieve this from the form
            };

            await ArchivedStagiaireModel.create(archivedStagiaire);

            // Delete stagiaire from stagiaires table
            await StagiaireModel.delete(stagiaireId);

             res.redirect('/archived_stagiaires'); // Redirect to your stagiaires route
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'An error occurred' });
        }
    },

    retierveStagire: async (req, res) => {
        try {
            const stagiaireId = req.params.id;
    
            // Retrieve stagiaire data from the database
            const Archivedstagiaire = await ArchivedStagiaireModel.findById(stagiaireId);
    
        
            console.log('the controller called to retrieve satagaire' + JSON.stringify(Archivedstagiaire));
            
            console.log('Archivedstagiaire:', Archivedstagiaire);
            const stagiaireCEF = Archivedstagiaire.CEF;
            const stagiairefirstName = Archivedstagiaire.firstName;
            const stagiairelastName = Archivedstagiaire.lastName;
            const stagiaireGroupId = Archivedstagiaire.groupId;

            // Construct retrieveStagiaire object
            const retrieveStagiaire = {
                id: stagiaireId,
                CEF: stagiaireCEF,
                firstName: stagiairefirstName,
                lastName: stagiairelastName,
                groupId: stagiaireGroupId,
                motif: req.body.motif,
                retrieved_at: req.body.retrieved_at
            };
            

            console.log('retrieveStagiaire:', retrieveStagiaire);

    
            // Insert into the stagiaires table
            const insertId = await StagiaireModel.create(retrieveStagiaire);
    
            // Delete stagiaire from archived_stagiaires table
            await ArchivedStagiaireModel.delete(stagiaireId);
    
            console.log('Inserted ID:', insertId);
    
            res.redirect('/archived_stagiaires'); // Redirect to your archived_stagiaires route
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'An error occurred' });
        }
    }
    ,    


  create: async (req, res) => {
    const newStagiaire = {
      CEF: req.body.CEF,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      groupId: req.body.groupId,
      motif: req.body.motif,
      archived_at: new Date()
    };

    try {
      const insertId = await ArchivedStagiaireModel.create(newStagiaire);
      res.json({ message: 'Archived Stagiaire created successfully', id: insertId });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  getById: async (req, res) => {
    const id = req.params.id;

    try {
      const results = await ArchivedStagiaireModel.getById(id);
      if (results.length === 0) {
        res.status(404).json({ message: 'Archived Stagiaire not found' });
      } else {
        res.json(results[0]);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  update: async (req, res) => {
    const id = req.params.id;
    const updatedData = {
      CEF: req.body.CEF,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      groupId: req.body.groupId,
      motif: req.body.motif,
      archived_at: new Date()
    };

    try {
      const success = await ArchivedStagiaireModel.update(id, updatedData);
      if (success) {
        res.json({ message: 'Archived Stagiaire updated successfully' });
      } else {
        res.status(404).json({ message: 'Archived Stagiaire not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  delete: async (req, res) => {
    const id = req.params.id;

    try {
      const success = await ArchivedStagiaireModel.delete(id);
      if (success) {
        res.json({ message: 'Archived Stagiaire deleted successfully' });
      } else {
        res.status(404).json({ message: 'Archived Stagiaire not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
};

module.exports = ArchivedStagiairesController;
