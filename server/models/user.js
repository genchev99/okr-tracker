const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const collection = 'users';

const schema = new mongoose.Schema({
  firstName: {
    type: mongoose.Schema.String,
    default: null,
  },
  lastName: {
    type: mongoose.Schema.String,
    default: null,
  },
  email: {
    type: mongoose.Schema.String,
    default: null,
  },
  password: {
    type: mongoose.Schema.String,
    default: null,
  },
  company: {
    type: mongoose.Schema.String,
    default: null,
  },
  invitedBy: {
    type: String,
    default: null,
  },
  status: {
    type: String,
    default: null,
  },
  activated: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
  collection,
});

schema.methods = {
  checkPassword: password => bcrypt.compareSync(password, this.password),
  hashPassword: textPassword => bcrypt.hashSync(plainTextPassword, 10),
};

schema.pre('save', next => {
  if (!this.password)
    throw 'Password cannot be empty';
  else
    this.password = this.hashPassword(this.password);

  next();
});


module.exports = mongoose.model(collection, schema);
