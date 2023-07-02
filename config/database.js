// Configuration for database connection
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'gestion_absence_nodejs'
});

module.exports = connection;
