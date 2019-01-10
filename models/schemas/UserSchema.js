let mongoose = require('mongoose');
let Schema = mongoose.Schema;

new Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  birthday: String,
  rfid: Array,
  admin: Boolean
});