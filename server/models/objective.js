const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: String,
  description: String,
  department: {
    type: mongoose.Schema.Types.ObjectId,
    Ref: 'departments'
  },
  keyResults: [{
    type: mongoose.Schema.Types.ObjectId,
    Ref: 'key-results'
  }]
});

schema.index({title: 1, department: 1}, {unique: true});

module.exports = mongoose.model('objectives', schema);
