//TODO - This could be moved to user.js model possibly
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

//Local strategy for checking passwords
passport.use(new LocalStrategy({
    usernameField: 'email'      //Overrides the default usernamefield from 'username' to 'email'
  },
  function(username, password, done) {
    User.findOne({ email: username }, function (err, user) {
      if (err) { return done(err); }
      // Return if user not found in database
      if (!user) {
        return done(null, false, {
          message: 'User not found'
        });
      }
      // Return if invalid password
      if (!user.validatePassword(password)) {
        return done(null, false, {
          message: 'Incorrect password'
        });
      }
      // If password is correct, return the user
      return done(null, user);
    });
  }
));
