const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: String,
  description: String,
  objective: {
    type: mongoose.Schema.Types.ObjectId,
    Ref: 'objectives'
  },
  range: {
    type: String,
    min: Number,
    max: Number,
    current: Number,
  }
});

schema.index({title: 1, department: 1}, {unique: true});

module.exports = mongoose.model('key-results', schema);
