const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = mongoose.Schema({
  label: {
    type: String,
    required: true,
    unique: false
  },
  date_start: {
    type: String,
    required: true,
    unique: false
  },
  date_end: {
    type: String,
    required: true,
    unique: false
  }
});

const Course = module.exports = mongoose.model('Course', CourseSchema);