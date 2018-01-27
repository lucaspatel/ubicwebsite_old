var mongoose = require('mongoose');

var officerSchema = mongoose.Schema({
  name: String,
  title: String,
  img: String,
  email: String,
  email2: String
});

var Officer = mongoose.model('Officer', officerSchema);
module.exports = Officer;