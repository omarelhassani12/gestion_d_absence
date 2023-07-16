const GroupModel = require('../models/groupModel');
const UserModel = require('../models/userModel');

const GroupController = {
  getAllGroups(req, res, next) {
    Promise.all([GroupModel.findAll(), UserModel.findByRole(1)])
      .then(([groups, users]) => {
        res.render('groups', { groups, users });
      })
      .catch(error => {
        console.error('Error retrieving groups:', error);
        next(error);
      });
  },

  getGroupById(req, res, next) {
    const { id } = req.params;

    Promise.all([GroupModel.findById(id), UserModel.findByRole(1)])
      .then(([group, users]) => {
        // Add the formateur_name property to the group object
        const formateur = users.find((user) => user.id === group.user_id);
        group.formateur_name = formateur ? formateur.nom_complete : 'N/A';

        res.render('groups-update', { group, users });
      })
      .catch((error) => {
        console.error('Error retrieving group by ID:', error);
        next(error);
      });
  },


  createGroup(req, res, next) {
    const { name, user_id } = req.body;

    const group = { name, user_id };

    GroupModel.create(group)
      .then(groupId => {
        console.log('Group created successfully with ID:', groupId);
        res.redirect('/groups');
      })
      .catch(error => {
        console.error('Error creating group:', error);
        next(error);
      });
  },


  updateGroup(req, res, next) {
    const { id } = req.params;
    const { name, new_formateur } = req.body; // Add new_formateur here

    const updatedData = { name, user_id: new_formateur }; // Include new_formateur in the updatedData

    GroupModel.update(id, updatedData)
      .then(success => {
        if (success) {
          console.log('Group updated successfully');
          res.redirect('/group');
        } else {
          console.error('Group not found or not updated');
          next(new Error('Group not found or not updated'));
        }
      })
      .catch(error => {
        console.error('Error updating group:', error);
        next(error);
      });
  },

  deleteGroup(req, res, next) {
    const { id } = req.params;

    GroupModel.delete(id)
      .then(success => {
        if (success) {
          console.log('Group deleted successfully');
          res.redirect('/groups');
        } else {
          console.error('Group not found or not deleted');
          next(new Error('Group not found or not deleted'));
        }
      })
      .catch(error => {
        console.error('Error deleting group:', error);
        next(error);
      });
  },
};

module.exports = GroupController;
