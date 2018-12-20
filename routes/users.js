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
  let username = req.query.name;
  let userfirstname = req.query.firstname;
  User.find({ name: username, firstname: userfirstname }, function (err, response) {
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
});

/* POST insert user */
router.post('/add?', function (req, res, next) {
  let data = {
    name: req.query.name,
    firstname: req.query.firstname
  };

  var mongoClient = require('mongodb').MongoClient;
  mongoClient.connect('mongodb://127.0.0.1:27017/gestapio', function(err, db) {
    if (err) throw err;
    var dbo = db.db("gestapio");
    dbo.collection("users").insertOne(data, function (err, response) {
      if (err) throw err;
      if (response.result.ok === 1) {
        console.log('User' + data.name + ' ' + data.firstname + ' added');
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
});

/* PUT update user */
// router.put();

/* DELETE user */
// router.delete();

module.exports = router;
