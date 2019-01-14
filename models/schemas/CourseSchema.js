let mongoose = require('mongoose');
let Schema = mongoose.Schema;

new Schema({
  label: String,
  date_start: String,
  date_end: String
});