const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: String,
  description: String,
  objective: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'objectives'
  },
  range: {
    min: {
      type: Number,
      default: 0,
    },
    max: Number,
    current: {
      type: Number,
      default: 0,
    },
  }
});

schema.index({title: 1, objective: 1}, {unique: true});

module.exports = mongoose.model('key-results', schema);
