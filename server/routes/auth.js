'use strict';
const passport = require('passport');
const router = require('express').Router();

router.post('/sign-in', (req, res) => {

});

router.post('/sign-in', passport.authenticate('local'), (req, res) => {
  // res.redirect('/');
});