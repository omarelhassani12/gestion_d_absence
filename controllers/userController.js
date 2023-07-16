const UserModel = require('../models/userModel');

const UserController = {
  async getAllUsers(req, res) {
    try {
      const users = await UserModel.findAll();
      res.render('users', { users: users });
    } catch (error) {
      console.error('An error occurred while fetching the users:', error);
      res.status(500).send('An error occurred while fetching the users');
    }
  },

  async getUserById(req, res) {
    try {
      const userId = req.params.id;
      const user = await UserModel.findById(userId);
      if (user) {
        res.render('user-update', { user: user });
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
        res.redirect('/user'); // Redirect to the "users" view
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
  
      const user = await UserModel.findByEmailAndPassword(email, password);
      console.log('Found user:', user);
  
      if (user) {
        // Create a session and store user data in it
        req.session.user = {
          name: user.nom_complete,
          email: user.email,
        };

         // Set a cookie with the user's email
      res.cookie('userEmail', user.email);
      // Store the cookies object in res.locals
      res.locals.cookies = req.cookies;

  
        res.status(200).json(user); // Send the user data back as a response
      } else {
        res.status(401).send('Invalid username or password');
      }
    } catch (error) {
      console.error('An error occurred while logging in:', error);
      res.status(500).send('An error occurred while logging in');
    }
    },


  // async login(req, res) {
  //   try {
  //     const { email, password } = req.body;
  //     if (!email || !password) {
  //       throw new Error('Email or password is missing');
  //     }
  
  //     console.log('Received login request:', email, password);
  
  //     const user = await UserModel.findByEmailAndPassword(email, password);
  //     console.log('Found user:', user);
  
  //     if (user) {
  //       // You can use sessions or tokens to manage user authentication after login
  //       res.status(200).json(user); // Send the user data back as a response
  //     } else {
  //       res.status(401).send('Invalid username or password');
  //     }
  //   } catch (error) {
  //     console.error('An error occurred while logging in:', error);
  //     res.status(500).send('An error occurred while logging in');
  //   }
  // },
  
};

module.exports = UserController;
