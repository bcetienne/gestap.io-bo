var express = require('express');
var router = express.Router();
//////////////////////////////////////////////////////////////////////////
var mongoose = require('mongoose');
var objectId = mongoose.objectId;
require('../config/config');
var RecordSchema = require('../models/schemas/RecordSchema');
var Record = mongoose.model('Record', RecordSchema);
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
  res.send('nudes');
});

/**
 * GET all records for one user
 */
router.get('/all/user?', function (req, res, next) {
  res.send('nudes');
});

/**
 * GET all records for one user between dates
 */
router.get('/all/user/dates?', function (req, res, next) {
  res.send('nudes');
});

/**
 * GET all records between dates
 */
router.get('/all/dates?', function (req, res, next) {
  res.send('nudes');
});

/**
 * GET one record
 */
router.get('/one', function (req, res, next) {
  res.send('One record');
});

/**
 * POST one new record
 */
router.post('/add', function (req, res, next) {
  let data = req.body;
  if (data.date !== undefined || data.user !== undefined || data.course !== undefined) {
    let mongoClient = require('mongodb').MongoClient;
    // mongoClient.connect('mongodb://127.0.0.1:27017/gestapio', function(err, db) {
    mongoClient.connect('mongodb://admin:admin1234@ds127854.mlab.com:27854/beep', function(err, db) {
      if (err) throw err;
      // var dbo = db.db("gestapio");
      var dbo = db.db("beep");
      dbo.collection("records").insertOne(data, function (err, response) {
        if (err) throw err;
        if (response.result.ok === 1) {
          let returnMessage = {
            message: 'SUCCESS: New record inserted',
            code: 200
          };
          console.log(returnMessage.message);
          res.send(returnMessage);
        } else {
          let returnMessage = {
            message: 'ERROR',
            code: 500
          };
          console.error(returnMessage.message);
          res.send(returnMessage);
        }
      });
    });
  } else {
    let returnMessage = {
      message: 'ERROR: One or more required fields are not set'
    };
    console.error(returnMessage.message);
    res.send(returnMessage);
  }
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