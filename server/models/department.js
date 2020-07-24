const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: String,
  description: String,
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'companies'
  },
  objectives: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'objectives'
  }],
  employees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  }],
});

schema.index({name: 1, company: 1}, {unique: true});

module.exports = mongoose.model('departments', schema);
