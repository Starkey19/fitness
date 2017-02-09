var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.profileRead = function(req, res) {

  //Return error 401 if no user ID exists
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "You are not authorized to access this page"
    });
  } else {
    User
      .findById(req.payload._id)
      .exec(function(err, user) {
        res.status(200).json(user);
    });
  }
  
};
