var express = require('express');
var url = "mongodb://127.0.0.1:27017/";
var mongodb = require('mongodb').MongoClient;


var router = express.Router();

router.post('/carexpense', function (req, res, next) {
  mongodb.connect(url, function (err, next) {
    if (err) console.log(err);
    var dbo = next.db("overhaulin");
    dbo.collection('expenses').insertOne(req.body)
        res.send("0")
  })
});

module.exports = router;
