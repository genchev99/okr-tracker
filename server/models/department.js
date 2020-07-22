const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: String,
  description: String,
  company: {
    type: mongoose.Schema.Types.ObjectId,
    Ref: 'companies'
  },
  objectives: [{
    type: mongoose.Schema.Types.ObjectId,
    Ref: 'objectives'
  }],
  employees: [{
    type: mongoose.Schema.Types.ObjectId,
    Ref: 'users'
  }],
});

schema.index({name: 1, company: 1}, {unique: true});

module.exports = mongoose.model('departments', schema);
