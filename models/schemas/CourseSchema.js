const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = Schema({
  label: {
    type: String,
    required: true,
    unique: false
  }
});

const Course = module.exports = mongoose.model('Course', CourseSchema);