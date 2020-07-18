const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const collection = 'users';

const schema = new mongoose.Schema({
  firstName: {
    type: String,
    default: null,
  },
  lastName: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    default: null,
  },
  hash: {
    type: String,
    default: null,
  },
  salt: {
    type: String,
    default: null,
  },
  company: {
    type: String,
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

// schema.methods = {
//   checkPassword: password => bcrypt.compareSync(password, this.password),
//   hashPassword: textPassword => bcrypt.hashSync(textPassword, 10),
// };
//
// schema.pre('save', function (next) {
//   console.log(this);
//   if (!this.password)
//     throw 'Password cannot be empty';
//   else
//     this.password = this.hashPassword(this.password);
//
//   next();
// });


module.exports = mongoose.model(collection, schema);
