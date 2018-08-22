var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var http = require('http');
var app = express();
var mongoose = require ('mongoose');

var local = require("./routes/local");

//connect data
mongoose.connect('mongodb://vinhyenvodoi98:vinhyenvodoi98@ds125602.mlab.com:25602/hackathon2018',{ useNewUrlParser: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended :false}));
app.use(morgan('dev'));

app.use('/api',local);
app.get('/',(req,res)=>{
    res.json({title: "Hello"});
});

http.createServer(app).listen(80, '0.0.0.0',
  function(){
    console.log("Express server listening on port " + app.get('port'));
});