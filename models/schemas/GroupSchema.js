let mongoose = require('mongoose');
let Schema = mongoose.Schema;

new Schema({
  name: String,
  users: Array
});