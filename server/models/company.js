const mongoose = require('mongoose');
const collection = 'companies';

const schema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  departments: {
    type: Array,
    default: [{
      name: 'executives',
      description: 'Executive managers hold executive powers delegated to them with and by authority of a board of directors.'
    }],
  },
  objectives: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model(collection, schema);