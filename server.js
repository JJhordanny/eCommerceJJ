var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var engine = require('ejs-mate');

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
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.engine('ejs', engine);
app.set('view engine', 'ejs');

var mainRoutes = require('./routes/main');
var userRoutes = require('./routes/user');

app.use(mainRoutes);
app.use(userRoutes);

app.listen(3000, function (err) {
  if (err) throw err;
  console.log("Servidor esta corriendo en el puerto 3000");
});
