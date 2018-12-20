var express = require('express');
var router = express.Router();

//////////////////////////////////////////////////////////////////////////
var mongoose = require('mongoose');
// var options = {
//   useNewUrlParser: true
// };
// mongoose.connect('mongodb://127.0.0.1:27017/gestapio', options);
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'Erreur lors de la connexion'));
// db.once('open', function () {
//   console.log("Connexion à la base OK");
// });
require('../config/config');
var UserSchema = require('../Models/Schemas/UserSchema');
var User = mongoose.model('User', UserSchema);
//////////////////////////////////////////////////////////////////////////

/* For testing */
router.get('/test/:user?', function(req, res, next) {
  // Retrieve the value of :user (eg for /test/max in URI: {user: "max"})
  console.log(req.params);
  // Retrieve each values after ? (eg for /test/max?id=3 in URI: {id: "3"})
  console.log(req.query);
});

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

  //  if (returnedData !== null) {
  //    res.send(returnedData);
  //  }

  // var name = '';
  // getUsers(function (data) {
  //   res.send(data);
  // });
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
