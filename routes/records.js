var express = require('express');
var router = express.Router();
//////////////////////////////////////////////////////////////////////////
var mongoose = require('mongoose');
var objectId = mongoose.objectId;
require('../config/config');
var RecordSchema = require('../models/schemas/RecordSchema');
var Record = mongoose.model('Room', RecordSchema);
//////////////////////////////////////////////////////////////////////////

/**
 * GET all records
 */
router.get('/all', function (req, res, next) {
  Record.find({}, function (err, response) {
    if (response.length !== 0) {
      let returnMessage = {
        message: 'SUCCESS',
        code: 200,
        data: response
      };
      console.log(returnMessage.message);
      res.send(returnMessage);
    } else {
      let returnMessage = {
        message: 'ERROR: No records found'
      };
      console.error(returnMessage.message);
      res.send(returnMessage);
    }
  });
});

/**
 * GET all records for one rfid card
 */
router.get('/all/rfid?', function (req, res, next) {
  res.send();
});

/**
 * GET all records for one user
 */
router.get('/all/user?', function (req, res, next) {
  res.send();
});

/**
 * GET all records for one user between dates
 */
router.get('/all/user/dates?', function (req, res, next) {
  res.send();
});

/**
 * GET all records between dates
 */
router.get('/all/dates?', function (req, res, next) {
  res.send();
});

/**
 * GET one record
 */
router.get('/one', function (req, res, next) {
  res.send('One record');
});

/**
 * ADD one record
 */
router.post('/add', function (req, res, next) {
  res.send('Add one record');
});

/**
 * UPDATE one record
 */
router.put('/update?', function (req, res, next) {
  res.send('Update one record');
});

/**
 * DELETE one record
 */
router.delete('/delete?', function (req, res, next) {
  res.send('Delete one record');
});

/**
 * DELETE records between dates
 */
router.delete('/delete/dates?', function (req, res, next) {
  res.send('Delete records between two dates');
});

module.exports = router;