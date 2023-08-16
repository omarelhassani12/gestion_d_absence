const ArchivedStagiaireActionModel = require("../models/archivedStagiairesActionModel");
const GroupModel = require("../models/groupModel");
const StagiaireModel = require("../models/stagaireModel");

const archivedStagiaireActionController = {
  getAll: async (req, res) => {
    try {
      const ArchivedStagiaires = await ArchivedStagiaireActionModel.getAll();
      const groups = await GroupModel.findAll();
      const user = req.session.user || null;
      res.render('archived_stagiaires', { ArchivedStagiaires, groups, activeRoute: 'archivedstagaire',user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred' });
    }
  },

  getById: async (req, res) => {
    try {
      const actionId = req.params.id;
      const action = await ArchivedStagiaireActionModel.getById(actionId);
      if (!action) {
        return res.status(404).json({ message: 'Action not found' });
      }
      res.json(action);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred' });
    }
  },

  create: async (req, res) => {
    try {
      const newAction = {
        stagiaire_id: req.body.stagiaire_id,
        motif: req.body.motif,
        action_type: req.body.action_type,
        action_date: req.body.action_date
      };
      const insertedId = await ArchivedStagiaireActionModel.create(newAction);
      res.json({ id: insertedId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred' });
    }
  },

  update: async (req, res) => {
    try {
      const actionId = req.params.id;
      const updatedAction = {
        stagiaire_id: req.body.stagiaire_id,
        motif: req.body.motif,
        action_type: req.body.action_type,
        action_date: req.body.action_date
      };
      const success = await ArchivedStagiaireActionModel.update(actionId, updatedAction);
      if (!success) {
        return res.status(404).json({ message: 'Action not found' });
      }
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred' });
    }
  },

  delete: async (req, res) => {
    try {
      const actionId = req.params.id;
      const success = await ArchivedStagiaireActionModel.delete(actionId);
      if (!success) {
        return res.status(404).json({ message: 'Action not found' });
      }
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred' });
    }
  },


  ///
  
  archiveStagire: async (req, res) => {
    try {
        const stagiaireId = req.params.id;

        // Retrieve stagiaire data from the database
        const stagiaire = await StagiaireModel.findById(stagiaireId);

        if (!stagiaire) {
            return res.status(404).json({ message: 'Stagiaire not found' });
        }
        console.log('the controller called');


             // Insert action data into archived_stagiaire_actions table for deletion
             const deletionAction = {
              stagiaire_id: stagiaireId,
              motif: req.body.motif,
              action_type: 'archived', 
              action_date: req.body.archived_at,
          };
          await ArchivedStagiaireActionModel.create(deletionAction);
  

        // Update stagiaire status
         const newStatus = 'archived'; // Set the new status here
        await StagiaireModel.updateStatus(stagiaireId, newStatus);

        res.redirect('/archived_stagiaires'); // Redirect to your stagiaires route
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred' });
    }
},

retrieveStagire: async (req, res) => {
  try {
    const stagiaireId = req.params.id;
    console.log("req.params.id: " + req.params.id);
    console.log("req.body.id: " + req.body.stagiaireId);

    // Retrieve archived stagiaire data from the database
    const archivedStagiaire = await ArchivedStagiaireActionModel.getLatestByStagiaireId(stagiaireId);

    if (!archivedStagiaire) {
      return res.status(404).json({ message: 'Archived Stagiaire not found' });
    }

    console.log("inside retrieving");

    // Insert action data into archived_stagiaire_actions table for restoration
    const restorationAction = {
      stagiaire_id: stagiaireId,
      motif: req.body.motif, // Retrieve motif from the archivedStagiaire
      action_type: 'restored',
      action_date: req.body.restored_at, // Get this from the form
    };

    try {
      const createdActionId = await ArchivedStagiaireActionModel.create(restorationAction);
      console.log("Created action ID:", createdActionId);

      // Update stagiaire status to 'active' since it's being restored
      const newStatus = 'active';
      await StagiaireModel.updateStatus(stagiaireId, newStatus);
      console.log("after updateStatus " + newStatus);

      res.redirect('/archived_stagiaires'); // Redirect to your archived_stagiaires route
    } catch (error) {
      console.error("Error creating restoration action:", error);
      return res.status(500).json({ message: 'An error occurred during restoration' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred' });
  }
},



};

module.exports = archivedStagiaireActionController;
