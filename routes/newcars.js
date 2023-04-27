var express = require('express');
var url = "mongodb://127.0.0.1:27017/";
var mongodb = require('mongodb').MongoClient;


var router = express.Router();



router.post('/newcar', function (req, res, next) {
    mongodb.connect(url, function (err, next) {
        if (err) console.log(err);
        var dbo = next.db("overhaulin");
        dbo.collection('showroomcars').insertOne(req.body)
        res.send("0")
    })
});



router.post('/getnewcar', function (req, res, next) {
    mongodb.connect(url, function (err, next) {
        if (err) console.log(err);
        var dbo = next.db("overhaulin");
        dbo.collection("showroomcars").find({ newmake: req.body.make,status:"Available" }).toArray().then(_ => {
            if (_.length > 0) {
                res.send(_)
            } else {
                dbo.collection("showroomcars").find({status:"Available"}).toArray().then(_s => {
                    if (_s.length > 0) {
                        res.send(_s)
                    } else {
                        res.send("-2")
                    }
                });
            }
        });
    });
})






router.post('/getmodelcar', function (req, res, next) {
    mongodb.connect(url, function (err, next) {
        if (err) console.log(err);
        var dbo = next.db("overhaulin");
        dbo.collection("showroomcars").find({ newmodel: req.body.model,status:"Available" }).toArray().then(_ => {
            if (_.length > 0) {
                res.send(_)
            } else {
                dbo.collection("showroomcars").find({status:"Available"}).toArray().then(_s => {
                    if (_s.length > 0) {
                        res.send(_s)
                    } else {
                        res.send("-1")
                    }
                });
            }
        });
    })
});









router.post('/getrecommend', function (req, res, next) {
    mongodb.connect(url, function (err, next) {
        if (err) console.log(err);
        var dbo = next.db("overhaulin");
        var arraycars = [];
        dbo.collection("showroomcars").find({ newfuel: req.body.fueltype, cartype: req.body.cartype, engine: req.body.enginetype, gear: req.body.geartype,status:"Available"}).toArray().then(_ => {
            if (_.length > 0) {
                for (i = 0; i < _.length; i++) {
                    if (parseInt(_[i].price, 10) <= parseInt(req.body.price, 10) + 100000) {
                        if (parseInt(_[i].mileage, 10) >= (parseInt(req.body.mileage, 10) - 1) && parseInt(_[i].mileage, 10) <= (parseInt(req.body.mileage, 10) + 1)) {
                            arraycars.push(_[i])
                        }
                    }
                }
                res.send(arraycars)
            } else {
                res.send(arraycars)
            }
        });
    })
});








router.post('/updatenewcar', function (req, res, next) {
    mongodb.connect(url, function (err, next) {
      if (err) console.log(err);
      var dbo = next.db("overhaulin");
      var ObjectID = require('mongodb').ObjectID;
      const filter = { newchasisnumber: req.body.chasisnumber };
      const replacementDocument = {
        $set: {
          status: "Sold",
        },
      };
      dbo.collection("showroomcars").updateOne(filter, replacementDocument, function (err, _result) {
        if (err) {
          res.status(400).send(`Error deleting likes on listing with id ${listingQuery.id}!`);
        } else {
          console.log(req.body._id)
          res.send("1");
        }
      });
  
    })
  
  });
module.exports = router;
