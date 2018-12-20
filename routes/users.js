var express = require('express');
var router = express.Router();

//////////////////////////////////////////////////////////////////////////
var mongoose = require('mongoose');
require('../config/config');
var UserSchema = require('../Models/Schemas/UserSchema');
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

/* GET list of users */
router.get('/:username', function (req, res, next) { 
  // res.send('List of users');

  var username = req.params.username;
  console.log(username);

  var testGet = User.find({name: username}, function (err, response) { 
    // if (err) {
    //   console.log(err);
    // }
    if (response) {
      res.send(response);
      // returnedData = response;
    }
   });
});

// function getUsers(callback) {
//   db.users.find({ name: "Maxime" }, function (err, objs) {
//     var returnable_name;
//     if (objs.length == 1) {
//       returnable_name = objs[0].name;
//       // console.log(returnable_name); // this prints "Renato", as it should
//       callback(returnable_name);
//     }
//   });
// }

/* POST insert user */
// router.post();

/* PUT update user */
// router.put();

/* DELETE user */
// router.delete();

module.exports = router;
