const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
  firstname: {
    type: String,
    required: true,
    unique: false
  },
  lastname: {
    type: String,
    required: true,
    unique: false
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    unique: false
  },
  birthday: {
    type: String,
    required: false,
    unique: false
  },
  rfid: {
    type: Array,
    required: false,
    unique: true
  },
  admin: {
    type: Number,
    required: true,
    unique: false
  }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function (userId, callback) {
  User.findOne({_id: userId}, callback);
};