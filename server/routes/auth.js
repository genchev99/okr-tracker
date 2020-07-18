const mongoose = require('mongoose');
const router = require('express').Router();
const User = require('../models/user');
const passport = require('passport');
const utils = require('../lib/utils');

router.get('/protected', passport.authenticate('jwt', {session: false}), (req, res, next) => {
  res.status(200).json({success: true, msg: 'You are successfully authenticated to this route!', ...req.user});
});

// Validate an existing user and issue a JWT
router.post('/sign-in', function (req, res, next) {
  User.findOne({email: req.body.email})
    .then((user) => {

      if (!user) {
        res.status(401).json({success: false, msg: 'User could not be found!'});
      }

      // Function defined at bottom of app.js
      const isValid = utils.validPassword(req.body.password, user.hash, user.salt);

      if (isValid) {
        const tokenObject = utils.issueJWT(user);

        res.status(200).json({success: true, token: tokenObject.token, expiresIn: tokenObject.expires});
      } else {
        res.status(401).json({success: false, msg: "you entered the wrong password"});
      }
    })
    .catch((err) => {
      next(err);
    });
});

// Register a new user
router.post('/sign-up', function (req, res, next) {
  const saltHash = utils.genPassword(req.body.password);

  const salt = saltHash.salt;
  const hash = saltHash.hash;
  delete req.body.password;

  const newUser = new User({
    ...req.body,
    hash: hash,
    salt: salt
  });

  try {
    newUser.save()
      .then((user) => {
        res.json({success: true, user: user});
      });
  } catch (err) {
    res.json({success: false, msg: err});
  }
});

module.exports = router;
