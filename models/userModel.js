// userModel.js
const db = require('../config/database');

const UserModel = {
  findAll() {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users', (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },

  findById(id) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE id = ?', [id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      });
    });
  },
  
  findByRole(role) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE role = ?', [role], (error, results) => {
        if (error) {
          console.error('Error retrieving users by role:', error);
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },

  findByUsername(username) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE username = ?', [username], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      });
    });
  },

  create(user) {
    return new Promise((resolve, reject) => {
      if (!user) {
        reject(new Error('User object is null or undefined'));
        return;
      }

      const newUser = {
        ...user,
        password: user.nom_complete,
      };

      db.query('INSERT INTO users SET ?', [newUser], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.insertId);
        }
      });
    });
  },
  update(id, updatedData) {
    return new Promise((resolve, reject) => {
      if (!updatedData) {
        reject(new Error('Updated data is null or undefined'));
        return;
      }

      db.query('UPDATE users SET ? WHERE id = ?', [updatedData, id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.affectedRows > 0);
        }
      });
    });
  },

  delete(id) {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM users WHERE id = ?', [id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.affectedRows > 0);
        }
      });
    });
  },

  findByEmailAndPassword(email, password) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      });
    });
  },

  createUserWithRole(user) {
    return new Promise((resolve, reject) => {
      if (!user) {
        reject(new Error('User object is null or undefined'));
        return;
      }

      const newUser = {
        ...user,
        password: user.password, 
      };

      db.query('INSERT INTO users SET ?', [newUser], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.insertId);
        }
      });
    });
  },
};

module.exports = UserModel;
