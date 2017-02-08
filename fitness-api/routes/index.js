var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');

//config for secret file
fs = require("fs")
var fileName = "../secret-config.json";
var secretConfig;

//Get secret from config file
try {
  secretConfig = require(fileName);
}
catch (err) {
  secretConfig = {};
  console.log("Unable to read secret config file");
}


var auth = jwt({
  secret: secretConfig.Secret,
  userProperty: 'payload' //Holds the JWT
});

//Profile and authentication controllers:
var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');

//Route authentication - users must have a valid JWT to access profile page
router.get('/profile', auth, ctrlProfile.profileRead);

//Register and login authentication
router.post('/register', ctrlAuth.register);

module.exports = router;
