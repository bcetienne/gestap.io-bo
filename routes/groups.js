const express = require('express');
const router = express.Router();
//////////////////////////////////////////////////////////////////////////
const mongoose = require('mongoose');
// const objectId = mongoose.objectId;
const ObjectId = mongoose.Types.ObjectId;
require('../config/config');
const Group = require('../models/schemas/GroupSchema');
const User = require('../models/schemas/UserSchema');
//////////////////////////////////////////////////////////////////////////

/**
 * GET list of groups
 */
router.get('/all', function (req, res, next) {
  Group.find({}, function (err, response) {
    if (response.length !== 0) {
      let returnMessage = {
        message: 'SUCCESS',
        code: 200,
        data: response
      };
      res.json(returnMessage);
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
router.get('/one/:groupId', function (req, res, next) {
  let groupId = req.params.groupId;
  console.log('Searching for group with id ' + groupId + '...');
  if (groupId !== undefined || groupId !== '') {
    Group.find({_id: groupId}, function (err, response) {
      if (response.length !== 0) {
        let returnMessage = {
          message: 'SUCCESS',
          code: 200,
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
 * GET users of one group
 */
router.get('/users-of/:id', function (req, res, next) {
  let tempUser = [];
  let groupId = req.params.id;
  if (groupId !== undefined || groupId !== '') {
    Group.aggregate([
      {$match: {_id: ObjectId(groupId)}},
      {$unwind: "$users"}
    ], function (err, response) {
      // Push all users id in temp array
      response.forEach(function (element) {
        tempUser.push(mongoose.Types.ObjectId(element.users));
      });
      User.find({_id: {$in: tempUser}}, function (errUser, respUser) {
        if (errUser) throw errUser;
        if (respUser.length !== 0) {
          let returnMessage = {
            message: 'SUCCESS',
            code: 200,
            data: respUser
          };
          res.send(returnMessage);
        } else {
          let returnMessage = {
            message: 'ERROR: No users found',
            code: 404
          };
          res.send(returnMessage);
        }
      });
    });
  } else {
    let returnMessage = {
      message: 'ERROR: The group ID cannot be empty'
    };
    res.send(returnMessage);
  }
});

/**
 * ADD one group
 */
router.post('/add', function (req, res, next) {
  let data = req.body;
  if (data.name !== undefined || data.name !== '') {
    let mongoClient = require('mongodb').MongoClient;
    // mongoClient.connect('mongodb://127.0.0.1:27017/gestapio', function (err, db) {
    mongoClient.connect('mongodb://admin:admin1234@ds127854.mlab.com:27854/beep', function (err, db) {
      if (err) throw err;
      // const dbo = db.db("gestapio");
      const dbo = db.db("beep");
      dbo.collection("groups").insertOne(data, function (err, response) {
        if (err) throw err;
        if (response.result.ok === 1) {
          let returnMessage = {
            message: 'Group ' + data.name + ' added successfully',
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
      message: 'Error, please set at least a name for the group',
      code: 404
    };
    console.error(returnMessage.message);
    res.send(returnMessage);
  }
});

/**
 * UPDATE one group
 */
router.put('/update?', function (req, res, next) {
  let groupId = req.query.id;
  let data = req.body;
  console.log('Searching for group with id ' + groupId + '...');
  if (groupId !== undefined || groupId !== '') {
    if (data.name !== undefined || data.name !== '') {
      let ObjectID = require('mongodb').ObjectID;
      let mongoClient = require('mongodb').MongoClient;
      // mongoClient.connect('mongodb://127.0.0.1:27017/gestapio', function (err, db) {
      mongoClient.connect('mongodb://admin:admin1234@ds127854.mlab.com:27854/beep', function (err, db) {
        if (err) throw err;
        // const dbo = db.db("gestapio");
        const dbo = db.db("beep");
        dbo.collection("groups").updateOne({_id: new ObjectID(groupId)}, {$set: data}, {upsert: true}, function (err, response) {
          if (response.ok !== 0) {
            let returnMessage = {
              message: 'SUCCESS',
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
        message: 'No name set',
        code: 404
      };
      console.error(returnMessage.message);
      res.send(returnMessage);
    }
  } else {
    let returnMessage = {
      message: 'ERROR: Pleaser, set a group id to update',
      code: 404
    };
    console.error(returnMessage.message);
    res.send(returnMessage);
  }
});

/**
 * DELETE one group
 */
router.delete('/delete?', function (req, res, next) {
  let groupId = req.query.id;
  console.log('Searching for a group with id ' + groupId + '...');
  if (groupId !== undefined || groupId !== '') {
    Group.deleteOne({_id: groupId}, function (err, response) {
      if (err) return handleError(err);
      if (response.ok === 1) {
        let returnMessage = {
          message: 'SUCCESS',
          code: 200,
        };
        console.log(returnMessage.message);
        res.send(returnMessage);
      } else {
        let returnMessage = {
          message: 'ERROR: Group not found or already deleted',
          code: 404
        };
        console.error(returnMessage.message);
        res.send(returnMessage);
      }
    });
  } else {
    let returnMessage = {
      message: 'ERROR: The group id is not set',
      code: 404
    };
    console.error(returnMessage.message);
    res.send(returnMessage);
  }
});

module.exports = router;