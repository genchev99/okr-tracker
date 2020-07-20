const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const collection = 'users';

const schema = new mongoose.Schema({
  firstName: {
    type: String,
    default: null,
  },
  lastName: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    default: null,
  },
  hash: {
    type: String,
    default: null,
  },
  salt: {
    type: String,
    default: null,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'companies',
  },
  department: {
    type: String,
    default: 'Executives'
  },
  activated: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
  collection,
});

module.exports = mongoose.model(collection, schema);
