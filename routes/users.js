var express = require('express');
var router = express.Router();
// var MongoClient = require('mongodb').MongoClient;

/* For testing */
router.get('/test/:user?', function(req, res, next) {
  // Retrieve the value of :user (eg for /test/max in URI: {user: "max"})
  console.log(req.params);
  // Retrieve each values after ? (eg for /test/max?id=3 in URI: {id: "3"})
  console.log(req.query);
});

/* GET list of users */
router.get('/', function (req, res, next) { 
  res.send('List of users');
});

/* POST insert user */
// router.post();

/* PUT update user */
// router.put();

/* DELETE user */
// router.delete();

module.exports = router;
