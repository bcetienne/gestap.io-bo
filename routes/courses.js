const express = require('express');
const router = express.Router();
//////////////////////////////////////////////////////////////////////////
const Course = require('../models/schemas/CourseSchema');
//////////////////////////////////////////////////////////////////////////

/**
 * GET all courses
 */
router.get('/all', function (req, res, next) {
  Course.find({}, function (err, response) {
    if (err) throw err;
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
 * GET one course
 */
router.get('/one/:courseId', function (req, res, next) {
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
 * POST add a new course
 */
router.post('/add', function (req, res, next) {
  const db = require('./config/database');
let information = db.getInformations();
  let data = req.body;
  if (data.label !== undefined || data.label !== '' || data.date_start !== undefined || data.date_start !== '' || data.date_end !== undefined || data.date_end !== '') {
    let mongoClient = require('mongodb').MongoClient;
    mongoClient.connect(information.mongo.dbUrl, function (err, db) {
      if (err) throw err;
      let dbo = db.db(information.mongo.dbName);
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
            message: 'An error as occured while adding the new course',
            code: 500
          };
          console.error(returnMessage.message);
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
router.put('/update?', function (req, res, next) {
  const db = require('./config/database');
let information = db.getInformations();
  let courseId = req.query.id;
  let data = req.body;

  if (courseId !== undefined || courseId !== '') {
    let ObjectId = require('mongodb').ObjectId;
    let mongoClient = require('mongodb').MongoClient;
    mongoClient.connect(information.mongo.dbUrl, function (err, db) {
      if (err) throw err;
      let dbo = db.db(information.mongo.dbName);
      dbo.collection("users").updateOne({_id: new ObjectID(courseId)}, {$set: data}, {upsert: true}, function (err, response) {
        if (response.ok !== 0) {
          let returnMessage = {
            message: 'SUCCESS: Course updated',
            code: 200
          };
          res.send(returnMessage)
        } else {
          let returnMessage = {
            message: 'ERROR',
            code: 500
          };
          res.send(returnMessage)
        }
      });
    });
  } else {
    let returnMessage = {
      message: 'ERROR: Please, set a course id',
      code: 404
    };
    res.send(returnMessage);
  }
});

/**
 * DELETE one course
 */
router.delete('/delete?', function (req, res, next) {
  let courseId = req.query.id;
  if (courseId !== undefined || courseId !== '') {
    Course.deleteOne({_id: courseId}, function (err, response) {
      if (err) throw err;
      if (response.ok === 1) {
        let retunMessage = {
          message: 'SUCCESS Course deleted',
          code: 200
        };
        res.send(retunMessage);
      } else {
        let returnMessage = {
          message: 'ERROR: Course not found or already deleted',
          code: 404
        };
        res.send(returnMessage);
      }
    });
  } else {
    let returnMessage = {
      message: 'ERROR: One or more required fields are not set'
    };
    res.send(returnMessage);
  }
});

module.exports = router;