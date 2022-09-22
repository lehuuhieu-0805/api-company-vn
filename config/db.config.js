const mongoose = require('mongoose');

require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('connect database successfully'))
  .catch(err => console.log(err));