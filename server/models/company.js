const mongoose = require('mongoose');
const collection = 'companies';

const schema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  departments: {
    type: Array,
    default: ['Executives'],
  },
});

module.exports = mongoose.model(collection, schema);