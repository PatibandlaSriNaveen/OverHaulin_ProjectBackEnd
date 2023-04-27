var express = require('express');
var url = "mongodb://127.0.0.1:27017/";
var mongodb = require('mongodb').MongoClient;


var router = express.Router();

router.post('/maintainlogin', function (req, res, next) {
  mongodb.connect(url, function (err, next) {
    if (err) console.log(err);
    var dbo = next.db("overhaulin");
    dbo.collection("maintainence").find({ maintainadminId: req.body.maintainadminId,password:req.body.password }).toArray().then(_ => {
      if (_.length === 1) {
        res.send("0")
      }else{
        res.send("-1")
      }
    });
  })
});

module.exports = router;
