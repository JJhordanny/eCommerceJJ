var router = require('express').Router();
var User = require('../models/user');

router.get('/signup', function(req, res){
  res.render('accounts/signup', {
    errors: req.flash('errors')
  });
});

router.post('/signup', function(req, res, next){
  var user = new User();

  user.profile.name = req.body.name;
  user.password = req.body.password;
  user.email = req.body.email;

  User.findOne({ email: req.body.email}, function(err, existUser){
    if (existUser) {
      req.flash('errors', 'Existe una cuenta con este correo!');
      return res.redirect('/signup')
    }
    else {
      user.save(function(err, user){
        if (err) return next(err);
        return res.redirect('/');
      });
    }
  });
});

module.exports = router;
