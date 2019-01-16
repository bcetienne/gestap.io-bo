const express = require('express');
const mongoose = require('mongoose');
const db = require('../config/database');
const Group = require('../models/schemas/GroupSchema');
const User = require('../models/schemas/UserSchema');
const router = express.Router();
const ObjectId = mongoose.Types.ObjectId;

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
 * POST add one group
 */
router.post('/add', function (req, res, next) {
  let data = req.body;
  if (data.name !== undefined || data.name !== '') {
    if (data.users === undefined) {
      data.users = [];
    }

    if (data.courses === undefined) {
      data.courses = [];
    }

    Group.create(data, function (err, response) {
      if (err) throw err;
      if (response.length !== 0) {
        let returnMessage = {
          message: 'SUCCESS: Group added',
          code: 200,
          data: response
        };
        res.send(returnMessage);
      } else {
        let returnMessage = {
          message: 'ERROR',
          code: 500
        };
        res.send(returnMessage);
      }
    });
  } else {
    let returnMessage = {
      message: 'ERROR: Please set at least a name for the group',
      code: 404
    };
    console.error(returnMessage.message);
    res.send(returnMessage);
  }
});

/**
 * PUT add user to a group
 */
router.put('/add-user-to/:groupId', function (req, res, next) {
  let groupId = req.params.groupId;
  let data = req.body;
  let oldData = [];
  if (groupId !== undefined || groupId !== '') {
    Group.aggregate([
      {$match: {_id: ObjectId(groupId)}},
      {$unwind: "$users"}
    ], function (err, response) {
      if (err) throw err;
      // Push all users id in the old array of users
      response.forEach(function (element) {
        oldData.push(element.users);
      });

      // For each new users, push them into the old array of users
      data.forEach(function (element) {
        oldData.push(element);
      });

      // Then, set the array (oldData) with new users in the group
      Group.findOneAndUpdate({_id: ObjectId(groupId)}, {users: oldData}, {upsert: true}, function (errUpdate, respUpdate) {
        if (errUpdate) throw errUpdate;
        if (respUpdate.length !== 0) {
          let returnMessage = {
            message: 'SUCCESS: User(s) added to the group',
            code: 200,
            data: respUpdate
          };
          res.send(returnMessage);
        } else {
          let returnMessage = {
            message: 'ERROR: Something goes wrong',
            code: 500
          };
          res.send(returnMessage);
        }
      });
    });
  } else {
    let returnMessage = {
      message: 'ERROR: Please set a group id to update'
    };
    res.send(returnMessage);
  }
});

/**
 * PUT remove user to a group
 */
router.put('/remove-user-to/:groupId', function (req, res, next) {
  let arrayForDb = [];
  let elementToDelete = null;
  let groupId = req.params.groupId;
  let dataReceived = req.body;

  if (groupId !== undefined || groupId !== '') {

    Group.aggregate([
      {$match: {_id: ObjectId(groupId)}},
      {$unwind: "$users"}
    ], function (err, response) {
      if (err) throw err;
      // Push all users id in the array for users
      response.forEach(function (element) {
        arrayForDb.push(element.users);
      });

      // For each users to delete, find them in the array of users and delete them.
      dataReceived.forEach(function (element) {
        elementToDelete = null;
        elementToDelete = arrayForDb.indexOf(element);
        if (elementToDelete >= 0) {
          arrayForDb.splice(elementToDelete, 1);
        } else {
          console.log('Element not found at index : ', elementToDelete);
        }
        elementToDelete = null;
      });

      // Then, set the array (arrayForDb) with the remaining users
      Group.findOneAndUpdate({_id: ObjectId(groupId)}, {users: arrayForDb}, {upsert: true}, function (errUpdate, respUpdate) {
        if (errUpdate) throw errUpdate;
        if (respUpdate.length !== 0) {
          let returnMessage = {
            message: 'SUCCESS: User(s) removed from group',
            code: 200,
            data: respUpdate
          };
          res.send(returnMessage);
        } else {
          let returnMessage = {
            message: 'ERROR: Something goes wrong',
            code: 500
          };
          res.send(returnMessage);
        }
      });
    });
  } else {
    let returnMessage = {
      message: 'ERROR: Please set a group id to update'
    };
    res.send(returnMessage);
  }
});

/**
 * PUT add course to a group
 */
router.put('/add-course-to/:groupId', function (req, res, next) {
  let groupId = req.params.groupId;
  let data = req.body;
  console.log('Send me nudes instead of data you stupid');
  if (groupId !== undefined || groupId !== '') {
    // Ajouter un objet au tableau des cours du groupe, chaque objet aura un id généré par l'objectId de mongo
    data._id = new ObjectId;
    Group.findOneAndUpdate({_id: ObjectId(groupId)}, {$push: {'courses': data}}, function (err, response) {
      if (err) throw err;
      if (response.length !== 0) {
        let returnMessage = {
          message: 'SUCCESS: Lesson added to the group',
          code: 200,
          data: response
        };
        res.send(returnMessage);
      } else {
        let returnMessage = {
          message: 'ERROR',
          code: 500
        };
        res.send(returnMessage);
      }
    });
  } else {
    let returnMessage = {
      message: 'ERROR: Please, set a group id'
    };
    res.send(returnMessage);
  }
});

/**
 * PUT remove course to a group
 */
router.put('/remove-course-to/:groupId', function (req, res, next) {
  let groupId = req.params.groupId;
  let data = req.body;

  if (groupId !== undefined || groupId !== '') {
    data.forEach(function (element) {
      Group.findByIdAndUpdate(
        ObjectId(groupId),
        {
          $pull:
            {"courses": {_id: ObjectId(element)}}
        }, function (err, response) {
          if (err) throw err;
          if (response.length !== 0) {
            console.log('SUCCESS');
            console.log(response);
          } else {
            console.log('ERROR');
          }
        }
      );
    });
  } else {
    let returnMessage = {
      message: 'ERROR: Please, set a group id'
    };
    res.send(returnMessage);
  }

});

/**
 * UPDATE one group
 */
router.put('/update?', function (req, res, next) {
  let information = db.getInformations();
  let groupId = req.query.id;
  let data = req.body;
  console.log('Searching for group with id ' + groupId + '...');
  if (groupId !== undefined || groupId !== '') {
    if (data.name !== undefined || data.name !== '') {
      let ObjectID = require('mongodb').ObjectID;
      let mongoClient = require('mongodb').MongoClient;
      mongoClient.connect(information.mongo.dbUrl, function (err, db) {
        if (err) throw err;
        const dbo = db.db(information.mongo.dbName);
        dbo.collection("groups").updateOne({_id: new ObjectID(groupId)}, {$set: data}, {upsert: true}, function (err, response) {
          if (response.ok !== 0) {
            let returnMessage = {
              message: 'SUCCESS',
              code: 200,
              data: response
            };
            res.send(returnMessage);
          } else {
            let returnMessage = {
              message: 'ERROR',
              code: 500
            };
            res.send(returnMessage);
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