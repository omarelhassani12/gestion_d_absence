const GroupModel = require('../models/groupModel');
const ServiceModel = require('../models/serviceModel');
const UserModel = require('../models/userModel');

const UserController = {
  async getAllUsers(req, res) {
    try {
      const users = await UserModel.findAll();
      const user = req.session.user || null;
      const userConnected = req.session.user ? req.session.user.email : null; // Get the email of the logged-in user
      res.render('users', { users: users, activeRoute: 'users',user , userConnected });
    } catch (error) {
      console.error('An error occurred while fetching the users:', error);
      res.status(500).send('An error occurred while fetching the users');
    }
  },

  async getUserById(req, res) {
    try {
      const userId = req.params.id;
      const users = await UserModel.findById(userId);
      const user = req.session.user || null;
      if (users) {
        res.render('user-update', { users: users , activeRoute: 'users', user });
      } else {
        res.status(404).send('User not found');
      }
    } catch (error) {
      console.error('An error occurred while fetching the user:', error);
      res.status(500).send('An error occurred while fetching the user');
    }
  },


  async createUser(req, res) {
    try {
      const userData = req.body;
      if (!userData) {
        throw new Error('User data is null or undefined');
      }

      // Set the password to the value of the full name
      userData.password = userData.nom_complete;

      const createdUserId = await UserModel.create(userData);
      res.status(200).send('User created successfully');
    } catch (error) {
      console.error('An error occurred while creating the user:', error);
      res.status(500).send('An error occurred while creating the user');
    }
  },

  async updateUser(req, res) {
    try {
      const userId = req.params.id;
      const updatedUserData = req.body;
      if (!updatedUserData) {
        throw new Error('Updated user data is null or undefined');
      }
      const isUpdated = await UserModel.update(userId, updatedUserData);
      if (isUpdated) {
        res.redirect('/user'); 
      } else {
        res.status(404).send('User not found');
      }
    } catch (error) {
      console.error('An error occurred while updating the user:', error);
      res.status(500).send('An error occurred while updating the user');
    }
  },

  async deleteUser(req, res) {
    try {
      const userId = req.params.id;
      const isDeleted = await UserModel.delete(userId);
      if (isDeleted) {
        res.status(200).send('User deleted successfully');
      } else {
        res.status(404).send('User not found');
      }
    } catch (error) {
      console.error('An error occurred while deleting the user:', error);
      res.status(500).send('An error occurred while deleting the user');
    }
  },

  async register(req, res) {
    try {
      const userData = req.body;
      if (!userData) {
        throw new Error('User data is null or undefined');
      }

      // Create a new user with role 1 (Formateur)
      const newUser = {
        ...userData,
      };

      const createdUserId = await UserModel.createUserWithRole(newUser);
      res.status(200).send('User registered successfully');
    } catch (error) {
      console.error('An error occurred while registering the user:', error);
      res.status(500).send('An error occurred while registering the user');
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw new Error('Email or password is missing');
      }
  
      console.log('Received login request:', email, password);
      const nonActiveCompetesCount = await ServiceModel.getNonActiveCompetesCount();
      const countStagiairesWithNonZeroAbsence = await ServiceModel.getCountOfStagiairesWithNonZeroAbsenceHours();

      console.log('Received abs stagiaires:', countStagiairesWithNonZeroAbsence);
 
      const user = await UserModel.findByEmailAndPassword(email, password);
      console.log('Found user:', user);
  
      if (user) {
        if (user.isApproved) {
  
          // let groupId = null;
          // let groupName = null;
          // const groupData = await GroupModel.findGroupByUserId(user.id);
  
          // if (groupData) {
          //   groupId = groupData.id;
          //   groupName = groupData.name;
          // }
            
          req.session.user = {
            id: user.id,
            name: user.nom_complete,
            email: user.email,
            role: user.role,
            // groupId: groupId,
            // groupName: groupName,
            nonActiveCompetesCount: nonActiveCompetesCount,
            countStagiairesWithNonZeroAbsence: countStagiairesWithNonZeroAbsence,
          };
  
          res.cookie(
            'userid', user.id,
            'userName', user.nom_complete,
            'userEmail', user.email,
            'userRole', user.role,
            // 'userGroupId', groupId,
            // 'userGroupName', groupName,
            'nonActiveCompetesCount', nonActiveCompetesCount,
            'countStagiairesWithNonZeroAbsence', countStagiairesWithNonZeroAbsence,
          );
          res.status(200).json(user);
        } else {
          // If user is found but isApproved is false, deny login
          res.status(401).json({ error: 'User not approved for login' });
        }
      } else {
        // If user is not found, deny login
        res.status(401).json({ error: 'Invalid username or password' });
      }
    } catch (error) {
      console.error('An error occurred while logging in:', error);
      res.status(500).json({ error: 'An error occurred while logging in' });
    }
  },
   

  async logout(req, res) {
      try {
        // Destroy the session to log the user out
        req.session.destroy((err) => {
          if (err) {
            console.error('Error while destroying the session:', err);
            return res.status(500).json({ error: 'An error occurred while logging out' });
          }

          // Clear the user email cookie
          res.clearCookie('userEmail');

          // Redirect the user to the login page after successful logout
          res.redirect('/sign-in'); 
        });
      } catch (error) {
        console.error('An error occurred while logging out:', error);
        res.status(500).json({ error: 'An error occurred while logging out' });
      }
  },


};

module.exports = UserController;
