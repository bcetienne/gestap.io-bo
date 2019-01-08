let mongoose = require('mongoose');
let Schema = mongoose.Schema;

new Schema({
  name: String,
  capacity: Number,
  busy: Boolean,
  // end_busy_date: ?Date?
  // begin_busy_date: ?Date?
});