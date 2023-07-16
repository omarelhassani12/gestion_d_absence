const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const config = require('./config/config');
const UserRoutes = require('./routes/userRoutes');
const multer = require('multer');
const crypto = require('crypto');




const app = express();
const upload = multer({ dest: 'uploads/' });


const path = require('path');
const serviceRoutes = require('./routes/serviceRoutes');
const StagaireRoutes = require('./routes/stagaireRoutes');
const GroupRoutes = require('./routes/groupRoutes');
const authRoutes = require('./routes/authRoutes');

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

app.use(
  session({
    store: new FileStore(),
    secret: secretKey, 
    resave: false,
    saveUninitialized: true,
  })
);


const checkAuthentication = (req, res, next) => {
  if (req.session && req.session.user) {
    // User is authenticated, proceed to the next middleware or route handler
    next();
  } else {
    // User is not authenticated, redirect to the login view
    res.redirect('/sign-in');
  }
};

app.use('/auth', authRoutes);
// Routes
app.use((req, res, next) => {
  if (req.path === '/sign-in' || req.path === '/auth/login') {
    // Exclude '/sign-in' and '/auth/login' routes from authentication check
    return next();
  }
  // Apply the checkAuthentication middleware to all other routes
  checkAuthentication(req, res, next);
});




app.use('/', serviceRoutes);
app.use('/user', UserRoutes);
app.use('/stagaire', StagaireRoutes);
app.use('/group', GroupRoutes);



// Start the server
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
