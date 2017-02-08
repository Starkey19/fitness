var mongoose = require('mongoose');

var dbURI = 'mongodb://localhost/fitness';

//MongoDB setup - returns 'connection successful' if connected
mongoose.connect(dbURI)
  .then(() => console.log('Connection successful'))
    .catch((err) => console.error(err));

//Handle any connection errors
mongoose.connection.on('error', function(err) {
  console.log('Mongoose connection error: ' + err);
});
