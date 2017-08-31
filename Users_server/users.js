const mongoose = require ('mongoose');

const Users = new mongoose.Schema({
  name: String,
  email: String,
});

module.exports = mongoose.model('Users', Users);
