var express = require('express');
var url = "mongodb://127.0.0.1:27017/";
var mongodb = require('mongodb').MongoClient;


var router = express.Router();

router.post('/ads', function (req, res, next) {
  mongodb.connect(url, function (err, next) {
    if (err) console.log(err);
    var dbo = next.db("overhaulin");
    dbo.collection("posts").find({ make: req.body.make, status: "Approved" }).toArray().then(_ => {
      if (_.length > 0) {
        res.send(_)
      } else {
        dbo.collection("posts").find({ status: "Approved" }).toArray().then(_s => {
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





router.post('/postad', function (req, res, next) {
  mongodb.connect(url, function (err, next) {
    if (err) console.log(err);
    var dbo = next.db("overhaulin");
    dbo.collection("posts").find({ chasisnumber: req.body.chasisnumber }).toArray().then(_ => {
      if (_.length === 0) {
        dbo.collection("posts").find({ registration: req.body.registration }).toArray().then(s_ => {
          if (s_.length === 0) {
            dbo.collection("customers").find({ cnic: req.body.ownercnic }).toArray().then(s_s => {
              if (s_s.length === 1) {
                dbo.collection('posts').insertOne(
                  req.body
                )
                res.send("1")
              }
              else {
                res.send("-2")
              }
            });

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





router.post('/modelads', function (req, res, next) {
  mongodb.connect(url, function (err, next) {
    if (err) console.log(err);
    var dbo = next.db("overhaulin");
    dbo.collection("posts").find({ model: req.body.model, status: "Approved" }).toArray().then(_ => {
      if (_.length > 0) {
        res.send(_)
      } else {
        dbo.collection("posts").find({ status: "Approved" }).toArray().then(_s => {
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




router.post('/pending', function (req, res, next) {
  mongodb.connect(url, function (err, next) {
    if (err) console.log(err);
    var dbo = next.db("overhaulin");
    var arraycars = [];
    dbo.collection("posts").find({ status: "Pending" }).toArray().then(_ => {
      if (_.length > 0) {
        for (i = 0; i < _.length; i++) {
          arraycars.push(_[i])
        }
        dbo.collection("posts").find({ saleoption: "bidding" }).toArray().then(s_s => {
          if (s_s.length > 0) {
            for (i = 0; i < s_s.length; i++) {
              if (s_s[i].bidding != "no") {
                arraycars.push(s_s[i])
              }
            }
            res.send(arraycars)
          } else {

            res.send("-1")
          }
        });
      } else {
        dbo.collection("posts").find({ saleoption: "bidding" }).toArray().then(_s => {
          if (_s.length > 0) {
            for (i = 0; i < _s.length; i++) {
              if (_s[i].bidding != "no") {
                arraycars.push(_s[i])
              }
            }
            res.send(arraycars)
          } else {

            res.send("-1")
          }
        });
      }
    });
  })
});





router.post('/updatead', function (req, res, next) {
  mongodb.connect(url, function (err, next) {
    if (err) console.log(err);
    var dbo = next.db("overhaulin");
    var ObjectID = require('mongodb').ObjectID;
    const filter = { _id: ObjectID(req.body._id) };
    const replacementDocument = {
      $set: {
        status: "Approved",
      },
    };
    dbo.collection("posts").updateOne(filter, replacementDocument, function (err, _result) {
      if (err) {
        res.status(400).send(`Error deleting likes on listing with id ${listingQuery.id}!`);
      } else {
        console.log(req.body._id)
        res.send("1");
      }
    });

  })

});




router.post('/updatecar', function (req, res, next) {
  mongodb.connect(url, function (err, next) {
    if (err) console.log(err);
    var dbo = next.db("overhaulin");
    var ObjectID = require('mongodb').ObjectID;
    const filter = { _id: ObjectID(req.body._id) };
    const replacementDocument = {
      $set: {
        bidding: req.body.bidding,
      },
    };
    dbo.collection("posts").updateOne(filter, replacementDocument, function (err, _result) {
      if (err) {
        res.status(400).send(`Error deleting likes on listing with id ${listingQuery.id}!`);
      } else {
        console.log(req.body._id)
        res.send("1");
      }
    });

  })

});





router.post('/updatewinner', function (req, res, next) {
  mongodb.connect(url, function (err, next) {
    if (err) console.log(err);
    var dbo = next.db("overhaulin");
    var ObjectID = require('mongodb').ObjectID;
    const filter = { _id: ObjectID(req.body._id) };
    const replacementDocument = {
      $set: {
        winnercnic: req.body.bcnic,
        winnername: req.body.bname,
      },
    };
    dbo.collection("posts").updateOne(filter, replacementDocument, function (err, _result) {
      if (err) {
        res.status(400).send(`Error deleting likes on listing with id ${listingQuery.id}!`);
      } else {
        res.send("1");
      }
    });

  })

});

module.exports = router;
