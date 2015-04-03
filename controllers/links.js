var express = require('express');
var router = express.Router();
var db = require('../models');
var bodyParser = require('body-parser');
var Hashids = require('hashids');
var hashid = new Hashids("'Machines take me by surprise with great frequency.' -- Alan Turing");

router.use(bodyParser.urlencoded({extended:false}));

// route: /links
router.post('/',function(req,res){
    var myurl = req.body.url;
    if(myurl.indexOf('http://') === -1 && myurl.indexOf('https://') === -1) {
        myurl = 'http://'+myurl;
    }
    db.url.create({link:myurl,count:0}).then(function(myl){
        // console.log(myl.link);
        res.redirect('/links/'+hashid.encode(myl.id));
    });
});

router.get('/links',function(req,res){
    db.url.findAll({order: "count DESC"}).then(function(urls){
        var urlArray = urls.map(function(item) {
            return [item.link,item.count,hashid.encode(item.id)];
        })
        res.render('links',{links:urlArray});
    });
});

// route /links/:id
router.get('/:id',function(req,res) {
    var myId = parseInt(hashid.decode(req.params.id));
    if (typeof myId === 'number') {
        db.url.find({where:{id:myId}}).then(function(myl){
            res.render('preview',{url:myl.link,hash:req.params.id,count:myl.count});
        }).catch(function(error){
            // console.log("Database error:",error);
            res.render('error',{error:"Your url does not exist!"});
        });
    }
    else {
        // console.log("hash error");
        res.render('error',{error:"Your url does not exist!"});
    }
});

module.exports = router;