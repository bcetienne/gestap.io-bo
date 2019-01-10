var express = require('express');
var router = express.Router();
//////////////////////////////////////////////////////////////////////////
var mongoose = require('mongoose');
var ObjectId = mongoose.ObjectId;
require('../config/config');
var UserSchema = require('../models/schemas/UserSchema');
var User = mongoose.model('User', UserSchema);
//////////////////////////////////////////////////////////////////////////

/* BEGIN For testing */
router.get('/test/:user?', function(req, res, next) {
  // Retrieve the value of :user (eg for /test/max in URI: {user: "max"})
  console.log(req.params);
  res.send({message: "User found", code: 202, userName: req.params});
  // Retrieve each values after ? (eg for /test/max?id=3 in URI: {id: "3"})
  console.log(req.query);
});
/* END For testing */

/**
 * GET all users
 */
router.get('/all', function(req, res, next) {
  User.find({}, function(err, response) {
    if (response.length === 0) {
      let returnMessage = {
        message: 'ERROR : No users found',
        code: 404,
        url: req.url,
        method: req.method
      };
      console.error(errorMessage);
      res.send(returnMessage);
    } else {
      let returnMessage = {
        message: 'SUCCESS',
        code: 202,
        list_of_users : response
      };
      res.send(returnMessage);
    }
  });
});

/**
 * GET user with his id and RFID card id
 */
router.get('/:userId?', function (req, res, next) {
  let userId = req.params.userId;
  let rfidId = req.query.rfid;
  console.log('Searching for concordance...');
  if (userId !== undefined || userId !== '') {
    if (rfidId !== undefined || rfid !== '') {
      User.find({_id: userId, rfid_id: rfidId}, function (err, response) {
        if (response.length !==0) {
          let returnMessage = {
            message: 'SUCCESS',
            code: 202,
            data: response
          };
          res.send(returnMessage);
        } else {
          let returnMessage = {
            message: 'ERROR: No user found with this id and this RFID id',
            code: 404
          };
          res.send(returnMessage);
        }
      });
    } else {
      let returnMessage = {
        message: 'Error: User id is set but, please set a RFID id',
        code: 404
      };
      res.send(returnMessage);
    }
  } else {
    let returnMessage = {
      message: 'Error: Please set an user id',
      code: 404
    };
    res.send(returnMessage);
  }
});

/**
 * GET user with RFID card id
 */
router.get('/rfid?', function (req, res, next) {
  let rfidId = req.params.id;
});

/**
 * GET user with login
 */
router.get('/login', function (req, res, next) {
  let data = req.body;
  console.log('Searching for user...');
  if (data.email !== undefined || data.email !== '') {
    if (data.password !== undefined || data.password !== '') {
      User.find({email: data.email, password: data.password}, function (err, response) {
        if (response.length !== 0) {
          let returnMessage = {
            message: 'SUCCESS',
            code: 202
          };
          console.log('SUCCESS, login...');
          res.send(returnMessage);
        } else {
          let returnMessage = {
            message: 'ERROR: No match',
            code: 404
          };
          console.error(returnMessage.message);
          res.send(returnMessage);
        }
      });
    } else {
      let returnMessage = {
        message: 'ERROR: No password set'
      };
      console.error(returnMessage.message);
      res.send(returnMessage);
    }
  } else {
    let returnMessage = {
      message: 'ERROR: No email set'
    };
    console.error(returnMessage.message);
    res.send(returnMessage);
  }
});

/* GET user */
router.get('/:userId', function (req, res, next) {
  let userId = req.params.userId;
  console.log('Searching for an user with id ' + userId + '...');
  if (userId !== undefined || userId !== '') {
    User.find({_id: userId}, function (err, response) { 
      if (response.length !== 0) {
        let returnMessage = {
          message: 'SUCCESS',
          code: 202,
          data: response
        };
        res.send(returnMessage);
      } else {
        let returnMessage = {
          message: 'ERROR: No user found',
          code: 404
        };
        res.send(returnMessage);
      }
    });
  } else {
    let returnMessage = {
      message: 'Error, please set an user id',
      code: 404
    };
    console.error('Error, please set an user id');
    res.send(returnMessage);
  }
});

/**
 * POST add a new user
 */
router.post('/add', function (req, res, next) {
  let data = req.body;
  if (data.lastname === undefined || data.firstname === undefined || data.email === undefined || data.password === undefined || data.birthday === undefined || data.rfid === undefined || data.admin === undefined) {
    let returnMessage = {
      message: "ERROR One or more fields required are not filled"
    };
    res.send(returnMessage);
  } else {
    var mongoClient = require('mongodb').MongoClient;
    // mongoClient.connect('mongodb://127.0.0.1:27017/gestapio', function(err, db) {
    mongoClient.connect('mongodb://admin:admin1234@ds127854.mlab.com:27854/beep', function(err, db) {
    if (err) throw err;
    // var dbo = db.db("gestapio");
    var dbo = db.db("beep");
    dbo.collection("users").insertOne(data, function (err, response) {
      if (err) throw err;
      if (response.result.ok === 1) {
        console.log('User ' + data.name + ' ' + data.firstname + ' added');
        let returnMessage = {
          message: 'SUCCESS User added',
          code: 200,
        };
        res.send(returnMessage);
      } else {
        let returnMessage = {
          message: 'ERROR User not added',
          code: 500,
        };
        res.send(returnMessage);
      }
      db.close();
    });
  });
  }
});

/* PUT update user */
router.put('/update?', function(req, res, next) {
  let userId = req.query.id;
  let dataFromRequest = req.body;
  console.log('to update : ', dataFromRequest);

  if (userId === undefined || userId === '') {
    let returnMessage = {
      message: "ERROR User id is not set"
    };
    res.send(returnMessage);
  } else {
    let ObjectID = require('mongodb').ObjectID;
    let mongoClient = require('mongodb').MongoClient;
    // mongoClient.connect('mongodb://127.0.0.1:27017/gestapio', function (err, db) {
    mongoClient.connect('mongodb://admin:admin1234@ds127854.mlab.com:27854/beep', function(err, db) {
      if (err) throw err;
      // var dbo = db.db("gestapio");
      var dbo = db.db("beep");
      dbo.collection("users").updateOne({ _id: new ObjectID(userId) }, { $set: dataFromRequest }, { upsert: true }, function (err, response) {
        if (response.ok !== 0) {
          let returnMessage = {
            message: 'SUCCESS User updated',
            code: 202
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
  }
});

/* DELETE user */
router.delete('/delete?', function(req, res, next) {
  let userId = req.query.id;
  if (userId === undefined) {
    let returnMessage = {
      message: "ERROR One or more fields required are not filled"
    };
    res.send(returnMessage);
  } else {
    User.deleteOne({_id: userId}, function(err, response) {
    if (err) return handleError(err);
    if (response.ok === 1) {
      let returnMessage = {
        message: "SUCCESS User deleted",
        code: 200
      };
      res.send(returnMessage);
    } else {
      let returnMessage = {
        message: "ERROR User not found or already deleted",
        code: 404
      };
      res.send(returnMessage);
    }
  });
  }
});

module.exports = router;
