var express = require('express');
var url = "mongodb://127.0.0.1:27017/";
var mongodb = require('mongodb').MongoClient;


var router = express.Router();

router.post('/bids', function (req, res, next) {
    mongodb.connect(url, function (err, next) {
        if (err) console.log(err);
        var dbo = next.db("overhaulin");
        dbo.collection("carbids").find({ carchasisnumber: req.body.carchasisnumber, carownercnic: req.body.carownercnic }).toArray().then(_ => {
            if (_.length > 0) {

                dbo.collection("customers").find({ cnic: req.body.bcnic }).toArray().then(_s => {
                    if (_s.length === 1) {
                        var arraybids = []
                        for (i = 0; i < _.length; i++) {
                            arraybids.push(_[i].bprice)
                        }
                        if (req.body.bprice > Math.max.apply(null, arraybids)) {
                            dbo.collection('carbids').insertOne(
                                req.body
                            )
                            res.send("1")
                        }
                        else {
                            for (i = 0; i < _.length; i++) {
                                if (_[i].bprice == Math.max.apply(null, arraybids)) {
                                    res.send(_[i])
                                }
                            }
                        }
                    }
                    else {
                        res.send("-1")
                    }
                })



            } else {
                dbo.collection("customers").find({ cnic: req.body.bcnic }).toArray().then(_s => {
                    if (_s.length === 1) {
                        dbo.collection('carbids').insertOne(
                            req.body
                        )
                        res.send("0")
                    }
                    else {
                        res.send("-1")
                    }

                })
            }
        });
    })
});


router.post('/view', function (req, res, next) {
    mongodb.connect(url, function (err, next) {
        if (err) console.log(err);
        var dbo = next.db("overhaulin");
        dbo.collection("carbids").find({ carchasisnumber: req.body.carchasisnumber, carownercnic: req.body.carownercnic }).toArray().then(_ => {
            if (_.length > 0) {
                res.send(_)
            } else {
                res.send("-1")
            }
        });
    })
});









router.post('/winner', function (req, res, next) {
    mongodb.connect(url, function (err, next) {
        if (err) console.log(err);
        var dbo = next.db("overhaulin");
        dbo.collection("carbids").find({ carchasisnumber: req.body.chasisnumber }).toArray().then(_ => {
            if (_.length > 0) {
                var arraybids = []
                for (i = 0; i < _.length; i++) {
                    arraybids.push(_[i].bprice)
                }
                for (i = 0; i < _.length; i++) {
                    if (_[i].bprice == Math.max.apply(null, arraybids)) {
                        res.send(_[i])
                    }
                }
            } else {
                res.send("-1")
            }
        });
    })
});


module.exports = router;
