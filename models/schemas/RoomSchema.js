let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const RoomSchema = Schema({
  name: {
    type: String,
    required: true,
    unique: false
  },
  capacity: {
    type: Number,
    required: true,
    unique: false
  },
  busy: {
    type: Boolean,
    required: true,
    unique: false
  },
  end_busy_date: {
    type: String,
    required: true,
    unique: false
  },
  start_busy_date: {
    type: String,
    required: true,
    unique: false
  }
});

const Room = module.exports = mongoose.model('Room', RoomSchema);