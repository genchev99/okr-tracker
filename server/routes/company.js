const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Company = require('../models/company');
const passport = require('passport');

router.get('/departments', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
  res.status(200).json({departments: (await Company.findOne({_id: req.user.company})).toObject().departments});
});

router.post('/departments', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
  try {
    await Company.findOneAndUpdate({
      _id: req.user.company
    }, {
      $addToSet: {
        departments: {
          name: req.body.name.trim().toLowerCase(),
          description: req.body.description.trim().toLowerCase()
        }
      }
    });

    res.status(200).json({departments: (await Company.findOne({_id: req.user.company})).toObject().departments});
  } catch (e) {
    const status = e.code === 11000 ? 409 : 400;
    res.status(status).json({success: false, error: e.toString()});
  }
});


module.exports = router;
