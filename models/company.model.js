const mongoose = require('mongoose');

const { Schema } = mongoose;

const company = new Schema({
  name: String,
  description: String,
  address: String
});

module.exports = mongoose.model('company', company);