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
    if (response.length === 0) {
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
router.get('/:roomId', function (req, res, next) { 
  let roomId = req.params.roomId;
  console.log('Searching for room with id ' + roomId + '...');
  if (roomId !== undefined || roomId !== '') {
    Room.find({_id: roomId}, function (err, response) { 
      if (response.length !== 0) {
        let returnMessage = {
          message: 'SUCCESS',
          code: 202,
          data: response
        };
        res.send(returnMessage);
      } else {
        let returnMessage = {
          message: 'ERROR: No room found with this id',
          code: 404
        };
        res.send(returnMessage);
      }
    });
  } else {
    let returnMessage = {
      message: 'Error, please set a room id',
      code: 404
    };
    console.error('Error, please set a room id');
    res.send(returnMessage);
  }
});

/**
 * ADD one
 */
router.post('/add', function(req, res, next) {
  // Retrieve JSON data
  let data = req.body;
  if (data.name !== undefined && data.name !== "") {
    if (data.capacity !== undefined) {
      if (data.busy !== undefined) {
        data.end_busy_date = null;
        data.begin_busy_date = null;
        let mongoClient = require('mongodb').MongoClient;
        mongoClient.connect('mongodb://127.0.0.1:27017/gestapio', function (err, db) {
        // mongoClient.connect('mongodb://admin:admin1234@ds127854.mlab.com:27854/beep', function(err, db) {
          if (err) throw err;
          var dbo = db.db("beep");
          dbo.collection("rooms").insertOne(data, function (err, response) {
            if (err) throw err;
            if (response.result.ok === 1) {
              console.log('Room ' + data.name + ' added successfully.');
              let returnMessage = {
                message: 'SUCCESS Room added',
                code: 200
              };
              res.send(returnMessage);
            }
          });
          db.close();
        });
      } else {
        returnMessage = {
          message: 'ERROR 01',
          code: 000
        };
        res.send(returnMessage);
      }
    } else {
      returnMessage = {
        message: 'ERROR 02',
        code: 000
      };
      res.send(returnMessage);
    }
  } else {
    returnMessage = {
      message: 'ERROR 03',
      code: 000
    };
    res.send(returnMessage);
  }
});

/**
 * DELETE one room
 */
router.delete('/delete?', function(req, res, next) {
  let roomId = req.query.id;
  if(roomId === undefined || roomId === '') {
    let returnMessage = {
      message: "ERROR One or more fields required are not filled"
    };
    res.send(returnMessage);
  } else {
    Room.deleteOne({_id: roomId}, function (err, response) { 
      if (err) return handleError(err);
      if (response.ok === 1) {
        let returnMessage = {
          id_deleted: roomId,
          message: "SUCCESS Room deleted",
          code: 200
        };
        res.send(returnMessage);
      } else {
        let returnMessage = {
          message: "ERROR Room not found or already deleted",
          code: 404
        };
        res.send(returnMessage);
      } 
    });
  }
});

/**
 * UPDATE one room
 */
router.put('/update?', function(req, res, next) {
  let roomId = req.query.id;
  let data = req.body;

  if (roomId != undefined || roomId != '') {
    if (data.name !== undefined || data.name !== "") {
      let returnMessage = {
        message: "SUCCESS The room has been updated",
        code: 202
      }
      res.send(returnMessage);
    } else {
      let returnMessage = {
        message: "ERROR The name cannot be empty"
      };
      res.send(returnMessage);
    }
  } else {
    let returnMessage = {
      message: "ERROR One or more fields required are not filled"
    };
    res.send(returnMessage);
  }
});

module.exports = router;