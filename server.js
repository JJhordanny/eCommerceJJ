var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var ejs-mate = require('ejs-mate');

var User = require('./models/user')

var app = express();

mongoose.connect('mongodb://root:root@ds040089.mlab.com:40089/ecommerce', function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Conectado a la Base de Datos");
  }
});

//Adding middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/create-user', function(req, res, next){
  var user = new User();
  user.profile.name = req.body.name;
  user.password = req.body.password;
  user.email = req.body.email;

  user.save(function(err){
    if (err) return next(err);
    res.json('Nuevo usuario creado exitosamente!');
  });
});

app.listen(3000, function (err) {
  if (err) throw err;
  console.log("Servidor esta corriendo en el puerto 3000");
});
