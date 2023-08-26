const GroupModel = require('../models/groupModel');
const StaffGroupModel = require('../models/staffGroupModel');
const UserModel = require('../models/userModel');

const StaffGroupController = {
  async getAllGroups(req, res) {
    try {
      const user = req.session.user || null;
  
      const [groups, users, allGroups] = await Promise.all([
        StaffGroupModel.findAll(),
        UserModel.findByRole(1),
        GroupModel.findAll()
      ]);
  
      res.render('group-staffs', { groups, users, allGroups, activeRoute: 'staffgroups', user });
    } catch (error) {
      console.error('Error fetching groups:', error);
      res.status(500).json({ error: 'Failed to fetch groups' });
    }
  },
  
  async findGroupByIdWithFormateurs(req, res) {
    const groupId = req.params.groupId;

    try {
        const groupWithFormateurs = await StaffGroupModel.findByGroupIdWithFormateurs(groupId);

        if (groupWithFormateurs) {
            res.status(200).json({ group: groupWithFormateurs });
        } else {
            res.status(404).json({ error: 'Group not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
},

  async getGroupsByFormateurId(req, res) {
    const userId = req.params.userId;

    try {
      const groups = await StaffGroupModel.findByFormateurId(userId);
      res.status(200).json(groups);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async getGroupById(req, res) {
    const groupId = req.params.groupId;

    try {
      const group = await StaffGroupModel.findById(groupId);
      if (!group) {
        return res.status(404).json({ error: 'Group not found' });
      }
      res.status(200).json(group);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async createGroup(req, res) {
    const { group_id, user_id } = req.body; // Use correct keys

    if (!group_id || !user_id) {
        return res.status(400).json({ error: 'Group and user are required' });
    }

    const group = {
        group_id, // Use correct key
        user_id,  // Use correct key
    };

    try {
        const groupId = await StaffGroupModel.create(group);
        res.status(201).json({ id: groupId });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
  },


  async updateGroup(req, res) {
    const groupId = req.params.groupId;
    const updatedData = req.body;

    try {
      const updated = await StaffGroupModel.update(groupId, updatedData);
      if (!updated) {
        return res.status(404).json({ error: 'Group not found' });
      }
      res.status(200).json({ message: 'Group updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async deleteGroup(req, res) {
    const groupId = req.params.groupId;

    try {
      const deleted = await StaffGroupModel.delete(groupId);
      if (!deleted) {
        return res.status(404).json({ error: 'Group not found' });
      }
      res.status(200).json({ message: 'Group deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};

module.exports = StaffGroupController;
