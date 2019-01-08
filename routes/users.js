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
  // Retrieve each values after ? (eg for /test/max?id=3 in URI: {id: "3"})
  console.log(req.query);
});
/* END For testing */

/* GET user */
router.get('/one?', function (req, res, next) {
  let data = {
    name: req.query.name,
    firstname: req.query.firstname
  };

  if (data.name === undefined || data.firstname === undefined) {
    let returnMessage = {
      message: "ERROR One or more fields required are not filled"
    };
    res.send(returnMessage);
  } else {
    User.find(data, function (err, response) {
    if(response.length === 0) {
      let errorMessage = {
        message: 'ERROR : No user found',
        code: 404,        
        url: req.url,
        method: req.method
      };
      console.error(errorMessage);
      res.send(errorMessage)
    } else {
      res.send(response);
    }
   });
  }
});

/* POST insert user */
router.post('/add?', function (req, res, next) {
  let data = {
    name: req.query.name,
    firstname: req.query.firstname
  };

  if (data.name === undefined || data.firstname === undefined) {
    let returnMessage = {
      message: "ERROR One or more fields required are not filled"
    };
    res.send(returnMessage);
  } else {
    var mongoClient = require('mongodb').MongoClient;
  mongoClient.connect('mongodb://127.0.0.1:27017/gestapio', function(err, db) {
    if (err) throw err;
    var dbo = db.db("gestapio");
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
      message: "ERROR One or more fields required are not filled"
    };
    res.send(returnMessage);
  } else {
    // User.updateOne({_id: userId}, dataFromRequest, function(err, response) {
    //   if (err) return handleError(err);
    //   console.log(response);
    // });
    User.findOneAndUpdate({ _id: userId }, { name: "Maxime", firstname: "Lajaijsijd" }, {new: true}, function(err, response) {
      if (err) return handleError(err);
      console.log('what s found : ', response);
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
    User.deleteOne({ _id: userId}, function(err, response) {
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
