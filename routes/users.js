var express = require('express');
var url = "mongodb://127.0.0.1:27017/";
var mongodb = require('mongodb').MongoClient;

mongodb.connect(url, function (err, db) {
  if (err) console.log(err);
  var dbo = db.db("overhaulin");
  dbo.createCollection("customers", function (err, res) {
    if (err) console.log(err);
    console.log("Collection created!");
    db.close();
  });
});

var router = express.Router();



router.post('/signup', function (req, res, next) {
  mongodb.connect(url, function (err, next) {
    if (err) console.log(err);
    var dbo = next.db("overhaulin");
    dbo.collection("customers").find({ cnic: req.body.cnic }).toArray().then(_ => {
      if (_.length === 0) {
        dbo.collection("customers").find({ phone: req.body.phone }).toArray().then(s_ => {
          if (s_.length === 0) {
            dbo.collection('customers').insertOne(
              req.body
            )
            res.send("1")
          } else {
            res.send("0")
          }
        });
      } else {
        res.send("-1")
      }
    });
  })
});

router.post('/login', function (req, res, next) {
  mongodb.connect(url, function (err, next) {
    if (err) console.log(err);
    var dbo = next.db("overhaulin");
    dbo.collection("customers").find({ cnic: req.body.cnic, password: req.body.password }).toArray().then(_ => {
      if (_.length === 1) {
        res.send("0")
      } else {
        res.send("-1")
      }
    });
  })
});



router.post('/contact', function (req, res, next) {
  mongodb.connect(url, function (err, next) {
    if (err) console.log(err);
    var dbo = next.db("overhaulin");
    dbo.collection("customers").find({ cnic: req.body.cnic}).toArray().then(_ => {
      if (_.length === 1) {
        res.send(_)
      } else {
        res.send("-1")
      }
    });
  })
});

module.exports = router;
