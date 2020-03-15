const mongoose = require('mongoose');
const collection = 'users';

const schema = new mongoose.Schema({
  firstName: {
    type: mongoose.Schema.String,
    default: null,
  },
  lastName: {
    type: mongoose.Schema.String,
    default: null,
  },
  email: {
    type: mongoose.Schema.String,
    default: null,
  },
  password: {
    type: mongoose.Schema.String,
    default: null,
  },
}, {
  timestamps: true,
  collection,
});


module.exports = mongoose.model(collection, schema);
