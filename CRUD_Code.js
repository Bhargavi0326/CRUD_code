const express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
const app=express();
var {Film} = require('./film');
//change mongoose path if need to change another db. eg:new db called 'ABC' then ("mongodb://localhost:27017/ABC")
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/myFilm');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));


// POST Method
app.post('/createFilm',function(req,res){
    var word = req.body;
    var feed = new Film(word);
    feed.save().then(function(data){ res.json({message : "Success" })})
               .catch(function(err){ res.status(500).json({ message:"Error" }) })
});

// GET Method
app.get('/getFilm/',function(req,res){
    Film.find().then(function(word) {  res.json({word}) })
               .catch(function(err){res.status(500).json({message : "Error"}) })
});


//UPDATE method
app.put('/update/:_id',function(req,res){
  var _id= req.body._id; 
  var word=req.body; 
  var feed = new Film(word);
  Film.findByIdAndUpdate(_id,feed,function( err,word){ if(err){ throw err; } res.json(word);});
        
});

//DELETE method
app.delete('/delete/:Id',function(req,res){
    Film.findOneAndDelete({_id:{ $in :req.params.Id}})
    .then(function(Data){ res.json({message:"updated"}) })
    .catch(function(err){ res.json({message:"error"}) })
})

app.listen(3000);
