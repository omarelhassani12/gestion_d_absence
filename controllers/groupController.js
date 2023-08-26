const GroupModel = require('../models/groupModel');
const StaffGroupModel = require('../models/staffGroupModel');
const StagiaireModel = require('../models/stagaireModel');
const UserModel = require('../models/userModel');

const GroupController = {
  getAllGroups(req, res, next) {
    Promise.all([GroupModel.findAll(), UserModel.findByRole(1)])
      .then(([groups, users]) => {
        const user = req.session.user || null;
        res.render('groups', { groups, users, activeRoute: 'groups',user });
      })
      .catch(error => {
        console.error('Error retrieving groups:', error);
        next(error);
      });
  },

  getAllGroupsForGroupsDetails(req, res, next) {
    Promise.all([GroupModel.findAll(), UserModel.findByRole(1)])
      .then(([groups, users]) => {
        const user = req.session.user || null;
        res.render('groups-details.ejs', { groups, users, activeRoute: 'groupsDetails',user });
      })
      .catch(error => {
        console.error('Error retrieving groups:', error);
        next(error);
      });
  },


  async getGroupDetails(req, res) {
    try {
        const groupId = req.params.id;
        const stagaires = await StagiaireModel.findAllByGroupId(groupId);
        const group = await GroupModel.findById(groupId);
        const groupWithFormateurs = await StaffGroupModel.findByGroupIdWithFormateurs(groupId);

        if (!stagaires) {
            return res.status(404).send('stagiaires not found');
        }
        
        const user = req.session.user || null;
        
        res.render('groups-details-stg', {
            stagaires,
            group,
            activeRoute: 'groupsDetails',
            user,
            groupWithFormateurs 
        });
    } catch (error) {
        console.error('Error getting group details:', error);
        res.status(500).send('Internal Server Error');
    }
  },

  getGroupById(req, res, next) {
    const { id } = req.params;

    Promise.all([GroupModel.findById(id), UserModel.findByRole(1)])
      .then(([group, users]) => {
        const user = req.session.user || null;
        
      const formateur = users.find((user) => user.id === group.user_id);
        group.formateur_name = formateur ? formateur.nom_complete : 'N/A';

        res.render('groups-update', { group, users , activeRoute: 'groups',user });
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
