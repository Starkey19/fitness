var mongoose = require('mongoose');
var crypto = require('crypto');
var token = require('jsonwebtoken');

//config for secret file
fs = require("fs")
var fileName = "../secret-config.json";
var secretConfig;

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  //TODO - maybe remove salting and hashing for passwords
  hash: String,
  salt: String
});

//User schema method to salt and hash the passwords:
userSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

//Validate the password by hashing the password and checking against stored password:
userSchema.methods.validatePassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
};

//Create a jsonwebtoken when a user registers or logs in
//Uses the secret from secret-config.json file
//TODO - Could do this in a route e.g /api/authenticate - https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens
try {
  secretConfig = require(fileName);
}
catch (err) {
  secretConfig = {};
  console.log("Unable to read secret config file");
}

userSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return token.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    exp: parseInt(expiry.getTime() / 1000),
  }, secretConfig.Secret);
};

mongoose.model('User', userSchema);
