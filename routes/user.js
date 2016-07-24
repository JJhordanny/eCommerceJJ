var router = require('express').Router();
var User = require('../models/user');

router.get('/signup', function(req, res){
  res.render('accounts/signup');
});

router.post('/signup', function(req, res, next){
  var user = new User();

  user.profile.name = req.body.name;
  user.password = req.body.password;
  user.email = req.body.email;

  User.findOne({ email: req.body.email}, function(err, existUser){
    if (existUser) {
      console.log(req.body.email + " existe!");
      return res.redirect('/signup')
    }
    else {
      user.save(function(err, user){
        if (err) return next(err);

        res.json("Nuevo usuario creado exitosamente!");
      });
    }
  });
});

module.exports = router;
