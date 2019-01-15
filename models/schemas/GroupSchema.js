const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: false
  },
  users: {
    type: Array,
    required: false,
    unique: false
  },
  courses: {
    type: Array,
    required: false,
    unique: false
  }
});

const Group = module.exports = mongoose.model('Group', GroupSchema);