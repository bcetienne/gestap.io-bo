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
router.get('/', function (req, res, next) {

});

/**
 * GET all courses
 */
router.get('/all', function (req, res, next) {
  Course.find({}, function (err, response) {
    if (response.length !== 0) {
      let returnMessage = {
        message: 'SUCCESS',
        code: 200
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
router.post('/', function (req, res, next) {

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