const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const utils = require('../lib/utils');

router.get('/', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
  res.status(200).json({employees: await User.find({company: req.user.company})});
});

router.post('/', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
  try {
    const newUser = await User.create({...req.body, company: req.user.company, activated: false});
    res.status(201).json({newUser});
  } catch (e) {
    const status = e.code === 11000 ? 409 : 400;
    res.status(status).json({success: false, error: e.toString()});
  }
});

module.exports = router;
