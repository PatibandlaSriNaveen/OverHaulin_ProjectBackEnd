var express = require('express');
var url = "mongodb://127.0.0.1:27017/";
var mongodb = require('mongodb').MongoClient;


var router = express.Router();



router.post('/repair', function (req, res, next) {
    mongodb.connect(url, function (err, next) {
    if (err) console.log(err);
    var dbo = next.db("overhaulin");
    dbo.collection('repairlog').insertOne(req.body)
    res.send("0")
    })
  });


  router.post('/maintain', function (req, res, next) {
    mongodb.connect(url, function (err, next) {
    if (err) console.log(err);
    var dbo = next.db("overhaulin");
    dbo.collection("repairlog").find({ chasis: req.body.chasis}).toArray().then(_ => {
      if (_.length > 0) {
        res.send(_)
      } else {
        res.send("-1")
      }
    });
  });
})

module.exports = router;
