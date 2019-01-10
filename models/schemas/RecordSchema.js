let mongoose = require('mongoose');
let Schema = mongoose.Schema;

new Schema({
  date: String,
  user: Object,
  course: Object
});