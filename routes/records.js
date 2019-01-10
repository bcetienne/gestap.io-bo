var express = require('express');
var router = express.Router();

/**
 * GET all records
 */
router.get('/all', function (req, res, next) {
  res.send('List of records');
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

/**
 * UPDATE one record
 */

/**
 * DELETE one record
 */

module.exports = router;