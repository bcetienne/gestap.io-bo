const express = require('express');
const router = express.Router();
//////////////////////////////////////////////////////////////////////////
// const mongoose = require('mongoose');
// const objectId = mongoose.objectId;
require('../config/config');
const Record = require('../models/schemas/RecordSchema');
const User = require('../models/schemas/UserSchema');
const Group = require('../models/schemas/GroupSchema');
const Course = require('../models/schemas/CourseSchema');
const Room = require('../models/schemas/RoomSchema');
// const RecordSchema = require('../models/schemas/RecordSchema');
// const Record = mongoose.model('Record', RecordSchema);
// const UserSchema = require('../models/schemas/UserSchema');
// let User
// try {
//   User = mongoose.model('User')
// } catch (error) {
//   User = mongoose.model('User', UserSchema)
// }
// const GroupSchema = require('../models/schemas/GroupSchema');
// let Group
// try {
//   Group = mongoose.model('Group')
// } catch (error) {
//   Group = mongoose.model('Group', GroupSchema)
// }
// const CourseSchema = require('../models/schemas/CourseSchema');
// let Course
// try {
//   Course = mongoose.model('Course')
// } catch (error) {
//   Course = mongoose.model('Course', CourseSchema)
// }
// const RoomSchema = require('../models/schemas/RoomSchema');
// let Room
// try {
//   Room = mongoose.model('Room')
// } catch (error) {
//   Room = mongoose.model('Room', RoomSchema)
// }
//////////////////////////////////////////////////////////////////////////

/**
 * GET all records
 */
router.get('/all', function (req, res, next) {
  Record.find({}, function (err, response) {
    if (response.length !== 0) {
      let returnMessage = {
        message: 'SUCCESS',
        code: 200,
        data: response
      };
      console.log(returnMessage.message);
      res.send(returnMessage);
    } else {
      let returnMessage = {
        message: 'ERROR: No records found'
      };
      console.error(returnMessage.message);
      res.send(returnMessage);
    }
  });
});

/**
 * GET all records for one user
 */
router.get('/all/user?', function (req, res, next) {
  let data = req.query;

  Record.find({user: data.id}, function (err, response) {
    if (response.length !== 0) {
      let returnMessage = {
        message: 'SUCCESS',
        code: 200,
        data: response
      };
      res.send(returnMessage);
    } else {
      let returnMessage = {
        message: 'ERROR: No records found'
      };
      res.send(returnMessage);
    }
  });
});

/**
 * GET all records for one user between dates
 */
router.get('/all/user/dates?', function (req, res, next) {
  let data = req.query;

  Record.find(
    {
      user: data.id,
      date: { $lte: data.date_end, $gte: data.date_start},
    }, 
    function (err, response) {
      if (response.length !== 0) {
        let returnMessage = {
          message: 'SUCCESS',
          code: 200,
          data: response
        };
        res.send(returnMessage);
      } else {
        let returnMessage = {
          message: 'ERROR: No records found'
        };
        res.send(returnMessage);
      }
  });
});

/**
 * GET all records between dates
 */
router.get('/all/dates?', function (req, res, next) {
  let data = req.query;

  Record.find(
    {
      date: { $lte: data.date_end, $gte: data.date_start},
    }, 
    function (err, response) {
      if (response.length !== 0) {
        let returnMessage = {
          message: 'SUCCESS',
          code: 200,
          data: response
        };
        res.send(returnMessage);
      } else {
        let returnMessage = {
          message: 'ERROR: No records found'
        };
        res.send(returnMessage);
      }
  });
});

/**
 * POST one new record
 */
router.post('/add?', function (req, res, next) {
  let data = req.body;
  if (data.date !== undefined || data.user !== undefined || data.course !== undefined) {
    let mongoClient = require('mongodb').MongoClient;
    // mongoClient.connect('mongodb://127.0.0.1:27017/gestapio', function(err, db) {
    mongoClient.connect('mongodb://admin:admin1234@ds127854.mlab.com:27854/beep', function(err, db) {
      if (err) throw err;
      // var dbo = db.db("gestapio");
      var dbo = db.db("beep");
      dbo.collection("records").insertOne(data, function (err, response) {
        if (err) throw err;
        if (response.result.ok === 1) {
          let returnMessage = {
            message: 'SUCCESS: New record inserted',
            code: 200
          };
          console.log(returnMessage.message);
          res.send(returnMessage);
        } else {
          let returnMessage = {
            message: 'ERROR',
            code: 500
          };
          console.error(returnMessage.message);
          res.send(returnMessage);
        }
      });
    });
  } else {
    let returnMessage = {
      message: 'ERROR: One or more required fields are not set'
    };
    console.error(returnMessage.message);
    res.send(returnMessage);
  }
});

/**
 * UPDATE one record
 */
router.put('/update?', function (req, res, next) {
  let id = req.query.id;
  let dataFromRequest = req.body;

  if (userId === undefined || userId === '') {
    let returnMessage = {
      message: "ERROR Record id is not set"
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
      dbo.collection("records").updateOne({ _id: new ObjectID(id) }, { $set: dataFromRequest }, { upsert: true }, function (err, response) {
        if (response.ok !== 0) {
          let returnMessage = {
            message: 'SUCCESS Record updated',
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
  }
});

/**
 * DELETE one record
 */
router.delete('/delete?', function (req, res, next) {
  let id = req.query.id;
  if (id === undefined) {
    let returnMessage = {
      message: "ERROR One or more fields required are not filled"
    };
    res.send(returnMessage);
  } else {
    User.deleteOne({_id: id}, function(err, response) {
    if (err) return handleError(err);
    if (response.ok === 1) {
      let returnMessage = {
        message: "SUCCESS Record deleted",
        code: 200
      };
      res.send(returnMessage);
    } else {
      let returnMessage = {
        message: "ERROR Record not found or already deleted",
        code: 404
      };
      res.send(returnMessage);
    }
  });
  }
});

/**
 * DELETE records between dates
 */
router.delete('/delete/dates?', function (req, res, next) {
  let data = req.query;

  if (data.date_end === undefined || data.date_start === undefined) {
    let returnMessage = {
      message: "ERROR One or more fields required are not filled"
    };
    res.send(returnMessage);
  } else {
    User.deleteOne({date: { $lte: data.date_end, $gte: data.date_start}}, function(err, response) {
    if (err) return handleError(err);
    if (response.ok === 1) {
      let returnMessage = {
        message: "SUCCESS Record deleted",
        code: 200
      };
      res.send(returnMessage);
    } else {
      let returnMessage = {
        message: "ERROR Record not found or already deleted",
        code: 404
      };
      res.send(returnMessage);
    }
  });
  }
});


/**
 * Authentification sur scan de la carte
 * Crée une entrée dans la collection records si autorisé
 * 
 */
router.post('/authenticate?', function (req, res, next) {
  let rfidId = req.query.id;;
  console.log('Searching...');
  if (rfidId !== undefined || rfidId !== '') {
    User.findOne({rfid: rfidId}, function (err, responseUser) {
      if (responseUser.length !== 0) {
        let infosUser = responseUser._doc;
        let idUser = String(infosUser._id);

        Group.findOne({users : idUser}, function (err, responseGroup) {
          if (responseGroup.length !== 0) {
            let idGroup = String(responseGroup._id);
            let newDate = new Date();
            let currentDate = newDate.toISOString();
            Course.findOne(
            {
              group : {id: idGroup}, 
              date_start: { $lte: currentDate },
              date_end: { $gte: currentDate }
            }, function (err, responseCourse) {
              if (responseCourse.length !== 0) {
                let idRoom = "";

                Room.findOne(
                {
                  id: idRoom,
                }, function (err, responseRoom) {
                  let nameRoom;

                  if(responseRoom != null && responseRoom.length > 0)
                    nameRoom = responseRoom.name;

                  let mongoClient = require('mongodb').MongoClient;
                  // mongoClient.connect('mongodb://127.0.0.1:27017/gestapio', function(err, db) {
                  mongoClient.connect('mongodb://admin:admin1234@ds127854.mlab.com:27854/beep', function(err, db) {
                    if (err) throw err;
                    // var dbo = db.db("gestapio");
                    var dbo = db.db("beep");
                    let data = {date: currentDate, user: idUser, course: responseCourse._id};
                    dbo.collection("records").insertOne(data, function (err, response) {
                      if (err) throw err;
                      
                      if (response.result.ok === 1) {
                        let returnMessage = {
                          message: 'SUCCESS',
                          code: 200,
                          authorized: true,
                          firstname: infosUser.firstname,
                          lastname: infosUser.lastname,
                          room: nameRoom
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
                });
              }
              else
              {
                let returnMessage = {
                  message: 'ERROR: Access denied',
                  code: 403,
                  authorized: false,
                };
                res.send(returnMessage);
              }
            });
          } else {
            let returnMessage = {
              message: 'ERROR: No groups found for this user',
              code: 404
            };
            res.send(returnMessage);
          }
        });
      } else {
        let returnMessage = {
          message: 'ERROR: No user found',
          code: 200
        };
        res.send(returnMessage);
      }
    });
  } else {
    let returnMessage = {
      message: 'ERROR: Please set a RFID id',
      code: 404
    };
    console.error(returnMessage.message);
    res.send(returnMessage);
  }
});

module.exports = router;