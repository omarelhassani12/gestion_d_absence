const express = require('express');
const session = require('express-session');
const config = require('./config/config');
const UserRoutes = require('./routes/userRoutes');
const multer = require('multer');
const crypto = require('crypto');
const connection = require('./config/database');
const MySQLStore = require('express-mysql-session')(session); // Require express-mysql-session package

const app = express();
const upload = multer({ dest: 'uploads/' });

const path = require('path');
const serviceRoutes = require('./routes/serviceRoutes');
const StagaireRoutes = require('./routes/stagaireRoutes');
const GroupRoutes = require('./routes/groupRoutes');
const authRoutes = require('./routes/authRoutes');
const AbsenceRoutes = require('./routes/absenceRoutes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Serve static files from the 'public' folder
app.use(express.static('public'));
// Set the views directory
app.set('views', path.join(__dirname, 'views'));
// Set the view engine
app.set('view engine', 'ejs');
// Define a helper function to include static assets in EJS templates
app.locals.asset = function (assetPath) {
  return path.join('/', assetPath);
};

const generateSecretKey = () => {
  return crypto.randomBytes(32).toString('hex');
};

const secretKey = generateSecretKey();
console.log('Generated Secret Key:', secretKey);

// Create a new MySQL session store
const sessionStore = new MySQLStore(
  {
    expiration: 24 * 60 * 60 * 1000, // Set session expiration to 24 hours
    createDatabaseTable: true, // Automatically create the session table if it doesn't exist
    schema: {
      tableName: 'sessions', // Name of the table to store sessions
      columnNames: {
        session_id: 'session_id',
        expires: 'expires',
        data: 'data',
      },
    },
  },
  connection // Pass the MySQL connection
);

app.use(
  session({
    store: sessionStore,
    secret: secretKey,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // Set session expiration to 24 hours
    },
  })
);

// Define the checkAuthentication middleware
const checkAuthentication = (req, res, next) => {
  // Exclude '/sign-in', '/auth/login', and '/auth/register' routes from authentication check
  if (req.path === '/sign-in' || req.path === '/sign-up') {
    return next();
  }
  

  // Check if the user is authenticated based on your logic
  // For example, you might check if 'req.session.user' exists and contains valid user information
  if (req.session && req.session.user) {
    // User is authenticated, proceed to the next middleware or route handler
    console.log('User is authenticated.');
    next();
  } else {
    // User is not authenticated, but we will allow access to all other routes
    console.log('User is not authenticated.');
    next();
  }
};


app.use(checkAuthentication);

app.use('/auth', authRoutes);
app.use('/', serviceRoutes);
app.use('/user', UserRoutes);
app.use('/stagaire', StagaireRoutes);
app.use('/group', GroupRoutes);
app.use('/absence', AbsenceRoutes);

// Start the server
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});


// const express = require('express');
// const session = require('express-session');
// const config = require('./config/config');
// const UserRoutes = require('./routes/userRoutes');
// const multer = require('multer');
// const crypto = require('crypto');
// const connection = require('./config/database');
// const MySQLStore = require('express-mysql-session')(session); // Require express-mysql-session package

// const app = express();
// const upload = multer({ dest: 'uploads/' });

// const path = require('path');
// const serviceRoutes = require('./routes/serviceRoutes');
// const StagaireRoutes = require('./routes/stagaireRoutes');
// const GroupRoutes = require('./routes/groupRoutes');
// const authRoutes = require('./routes/authRoutes');

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// // Serve static files from the 'public' folder
// app.use(express.static('public'));
// // Set the views directory
// app.set('views', path.join(__dirname, 'views'));
// // Set the view engine
// app.set('view engine', 'ejs');
// // Define a helper function to include static assets in EJS templates
// app.locals.asset = function (assetPath) {
//   return path.join('/', assetPath);
// };

// const generateSecretKey = () => {
//   return crypto.randomBytes(32).toString('hex');
// };

// const secretKey = generateSecretKey();
// console.log('Generated Secret Key:', secretKey);

// // Create a new MySQL session store
// const sessionStore = new MySQLStore(
//   {
//     expiration: 24 * 60 * 60 * 1000, // Set session expiration to 24 hours
//     createDatabaseTable: true, // Automatically create the session table if it doesn't exist
//     schema: {
//       tableName: 'sessions', // Name of the table to store sessions
//       columnNames: {
//         session_id: 'session_id',
//         expires: 'expires',
//         data: 'data',
//       },
//     },
//   },
//   connection // Pass the MySQL connection
// );

// app.use(
//   session({
//     store: sessionStore,
//     secret: secretKey,
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//       maxAge: 24 * 60 * 60 * 1000, // Set session expiration to 24 hours
//     },
//   })
// );





// // Define the checkAuthentication middleware
// const checkAuthentication = (req, res, next) => {
//   // Exclude '/sign-in', '/auth/login', and '/auth/register' routes from authentication check
//   if (req.path === '/sign-in' || req.path === '/auth/login' || req.path === '/auth/register') {
//     return next();
//   }

//   // Check if the user is authenticated based on your logic
//   // For example, you might check if 'req.session.user' exists and contains valid user information
//   if (req.session && req.session.user) {
//     // User is authenticated, proceed to the next middleware or route handler
//     next();
//   } else {
//     // User is not authenticated, redirect to the login view
//     res.redirect('/sign-in');
//   }
// };

// // Apply the checkAuthentication middleware to all routes
// app.use(checkAuthentication);

// app.use('/auth', authRoutes);
// app.use('/', serviceRoutes);
// app.use('/user', UserRoutes);
// app.use('/stagaire', StagaireRoutes);
// app.use('/group', GroupRoutes);



// // Start the server
// app.listen(config.port, () => {
//   console.log(`Server running on port ${config.port}`);
// });







// // const checkAuthentication = (req, res, next) => {
// //   // Exclude '/sign-in' route from authentication check
// //   if (req.path === '/sign-in') {
// //     return next();
// //   }

// //   if (req.session && req.session.user) {
// //     // User is authenticated, proceed to the next middleware or route handler
// //     next();
// //   } else {
// //     // User is not authenticated, redirect to the login view
// //     res.redirect('/sign-in');
// //   }
// // };


// // // Routes
// // app.use((req, res, next) => {
// //   if (req.path === '/sign-in' || req.path === '/auth/login') {
// //     // Exclude '/sign-in' and '/auth/login' routes from authentication check
// //     return next();
// //   }
// //   // Apply the checkAuthentication middleware to all other routes
// //   checkAuthentication(req, res, next);
// // });
