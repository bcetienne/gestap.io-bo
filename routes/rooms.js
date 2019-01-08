var express = require('express');
var router = express.Router();
//////////////////////////////////////////////////////////////////////////
var mongoose = require('mongoose');
var objectId = mongoose.objectId;
require('../config/config');
var RoomSchema = require('../models/schemas/RoomSchema');
var Room = mongoose.model('Room', RoomSchema);
//////////////////////////////////////////////////////////////////////////

/* GET list of rooms */
router.get('/all', function (req, res, next) { 
  Room.find({}, function(err, response) {
    if(response.length === 0) {
      let errorMessage = {
        message: 'ERROR : No rooms found',
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

/**
 * GET one room
 */
router.get('/:roomName?', function (req, res, next) { 
  let data = {
    roomName: req.query.name,
    roomId: req.query.id
  }

});

/**
 * ADD one
 */
router.post('/add', function(req, res, next) {
  // Retrieve JSON data
  let data = req.body;
  data.end_busy_date = null;
  let returnMessage = {};
  if (data.name !== undefined && data.name !== "") {
    if (data.capacity !== undefined) {
      if (data.busy !== undefined) {
        let mongoClient = require('mongodb').MongoClient;
        mongoClient.connect('mongodb://127.0.0.1:27017/gestapio', function(err, db) {
          if (err) throw err;
          var dbo = db.db("gestapio");
          dbo.collection("rooms").insertOne(data, function (err, response) {
            if (err) throw err;
            if (response.result.ok === 1) {
              console.log('Room ' + data.name + ' added successfully.');
              returnMessage = {
                message: 'SUCCESS',
                code: 200
              };
            }
          });
        });
      } else {
        returnMessage = {
          message: 'ERROR 01',
          code: 000
        };
      }
    } else {
      returnMessage = {
        message: 'ERROR 02',
        code: 000
      };
    }
  } else {
    returnMessage = {
      message: 'ERROR 03',
      code: 000
    };
  }
  res.send(returnMessage);
  db.close();
});

/**
 * DELETE one room
 */

/**
 * UPDATE one room
 */

module.exports = router;