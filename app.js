const express = require('express');
const config = require('./config/config');
const userRoutes = require('./routes/userRoutes');
const multer = require('multer');

const app = express();
const upload = multer({ dest: 'uploads/' });


const path = require('path');
const serviceRoutes = require('./routes/serviceRoutes');
const StagaireRoutes = require('./routes/stagaireRoutes');

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



// Routes
app.use('/', serviceRoutes);
app.use('/user', userRoutes);
app.use('/stagaire', StagaireRoutes);

// Start the server
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
