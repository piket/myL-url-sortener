var express = require('express');
var linksCtrl = require('./controllers/links');
var app = express();
var db = require('./models');
var Hashids = require('hashids');
var hashid = new Hashids ("'Machines take me by surprise with great frequency.' -- Alan Turing");


app.use('/links',linksCtrl);
app.use(express.static(__dirname+'/public'));


app.set("view engine","ejs");

app.get('/',function(req,res){
    res.render('index');
});

app.get('/:hash',function(req,res){
    db.url.find({where:{id:parseInt(hashid.decode(req.params.hash))}}).then(function(url){
        url.count = url.count + 1;
        url.save();
        res.redirect(url.link);
    }).catch(function(error){
            console.log(error);
            res.render('error',{error:"Your url does not exist!"});
        });
});

app.listen(process.env.PORT || 3000,function(){
    console.log("Server connected...");
})