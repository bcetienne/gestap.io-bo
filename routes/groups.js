var express = require('express');
var router = express.Router();
//////////////////////////////////////////////////////////////////////////
var mongoose = require('mongoose');
var objectId = mongoose.objectId;
require('../config/config');
var GroupSchema = require('../models/schemas/GroupSchema');
var Group = mongoose.model('Group', GroupSchema);
//////////////////////////////////////////////////////////////////////////

/**
 * GET list of groups
 */
router.get('/all', function (req, res, next) {
  Group.find({}, function(err, response) {
    if (response.length !== 0) {
      let returnMessage = {
        message: 'SUCCESS',
        code: 202,
        data: response
      };
      res.send(returnMessage);
    } else {
      let returnMessage = {
        message: 'ERROR: No groups found',
        code: 404
      };
      res.send(returnMessage);
    }
  });
});

/**
 * GET one group
 */
router.get('/:groupId', function (req, res, next) {
  let groupId = req.params.groupId;
  console.log('Searching for group with id ' + groupId + '...');
  if (groupId !== undefined || groupId !== '') {
    Group.find({ _id: groupId }, function (err, response) {
      if (response.length !== 0) {
        let returnMessage = {
          message: '',
          code: 000
        };
        res.send(returnMessage);
      } else {
        let returnMessage = {
          message: '',
          code: 000
        };
        res.send(returnMessage);
      }
    });
  } else {
    console.error('Please, set a group id');
    let returnMessage = {
      message: 'Error, please set a group id',
      code: 404
    };
    res.send(returnMessage);
  }
});

/**
 * UPDATE one group
 */

/**
 * DELETE one group
 */

module.exports = router;