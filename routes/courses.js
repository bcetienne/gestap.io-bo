var express = require('express');
var router = express.Router();
//////////////////////////////////////////////////////////////////////////
var mongoose = require('mongoose');
var objectId = mongoose.objectId;
require('../config/config');
var CourseSchema = require('../models/schemas/CourseSchema');
var Course = mongoose.model('Course', CourseSchema);
//////////////////////////////////////////////////////////////////////////

/**
 * GET one course
 */
router.get('/:courseId', function (req, res, next) {
  let courseId = req.params.courseId;
  console.log('Searching for group with id ' + courseId + '...');
  if (courseId !== undefined || courseId !== '') {
    Course.find({_id: courseId}, function (err, response) {
      if (response.length !== 0) {
        let returnMessage = {
          message: 'SUCCESS',
          code: 200,
          data: response
        };
        res.send(returnMessage);
      } else {
        let returnMessage = {
          message: 'ERROR: No courses found',
          code: 404
        };
        res.send(returnMessage);
      }
    })
  } else {
    let returnMessage = {
      message: 'ERROR: No courses found',
      code: 404
    };
    res.send(returnMessage);
  }
});

/**
 * GET all courses
 */
router.get('/all', function (req, res, next) {
  Course.find({}, function (err, response) {
    if (response.length !== 0) {
      let returnMessage = {
        message: 'SUCCESS',
        code: 200,
        data: response
      };
      res.send(returnMessage);
    } else {
      let returnMessage = {
        message: 'ERROR: No courses found',
        code: 404
      };
      res.send(returnMessage);
    }
  });
});

/**
 * POST add a new course
 */
router.post('/add', function (req, res, next) {
  let data = req.body;
  if (data.label !== undefined || data.label !== '' || data.date_start !== undefined || data.date_start !== '' || data.date_end !== undefined || data.date_end !== '') {
    let mongoClient = require('mongodb').MongoClient;
    // mongoClient.connect('mongodb://127.0.0.1:27017/gestapio', function (err, db) {
    mongoClient.connect('mongodb://admin:admin1234@ds127854.mlab.com:27854/beep', function (err, db) {
      if (err) throw err;
      // var dbo = db.db("gestapio");
      var dbo = db.db("beep");
      dbo.collection("courses").insertOne(data, function (err, response) {
        if (err) throw err;
        if (response.result.ok === 1) {
          let returnMessage = {
            message: 'Course ' + data.label + ' added successfully, it begins ' + data.date_start + ' and end at ' + data.date_end,
            code: 200
          };
          console.log(returnMessage.message);
          res.send(returnMessage);
        } else {
          let returnMessage = {
            message: 'An error as occured while adding the new group',
            code: 404
          };
          console.log(returnMessage.message);
          res.send(returnMessage);
        }
      });
    });
  } else {
    let returnMessage = {
      message: "ERROR: Some required field are not set",
      code: 404
    };
    res.send(returnMessage);
  }
});

/**
 * PUT update one course
 */
router.put('/', function (req, res, next) {

});

/**
 * DELETE course
 */
router.delete('/', function (req, res, next) {

});

module.exports = router;