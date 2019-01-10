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
router.post('/add', function (req, res, next) {
  res.send('Add one record');
});

/**
 * UPDATE one record
 */
router.put('/update', function (req, res, next) {
  res.send('Update one record');
});

/**
 * DELETE one record
 */
router.delete('/delete', function (req, res, next) {
  res.send('Delete one record');
});

module.exports = router;