var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');

var app = express();

mongoose.connect('mongodb://root:root@ds040089.mlab.com:40089/ecommerce', function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to the database");
  }
});

//Adding middleware
app.use(morgan('dev'));

app.get('/', function (req, res) {
  var name = "Batman";
  res.json("My name is " + name);
});

app.get('/jj', function (req, res){
  res.json("My name is JJ!")
})

app.listen(3000, function (err) {
  if (err) throw err;
  console.log("Server is running on port 3000");
});
