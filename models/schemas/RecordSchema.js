const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecordSchema = Schema({
  date: {
    type: String,
    required: false,
    unique: false
  },
  user: {
    type: Object,
    required: false,
    unique: false
  },
  course: {
    type: Object,
    required: false,
    unique: false
  }
});

const Record = module.exports = mongoose.model('Record', RecordSchema);