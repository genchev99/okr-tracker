const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: String,
  description: String,
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'departments'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  archived: {
    type: Boolean,
    default: false,
  }
});

schema.index({title: 1, department: 1}, {unique: true});

module.exports = mongoose.model('objectives', schema);
