const mongoose = require('mongoose');
const collection = 'companies';

const schema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  departments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'departments'
  }],
});

module.exports = mongoose.model(collection, schema);