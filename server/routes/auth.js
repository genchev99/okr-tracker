const express = require("express");
const router = express.Router();
const passport = require("passport");
const user = require('../models/user');

router.post('/sign-in', (req, res, next) => {
  // res.json(req.body);
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return res.status(400).json({errors: err});
    }
    if (!user) {
      return res.status(400).json({errors: "No user found"});
    }

    req.logIn(user, function (err) {
      if (err) {
        return res.status(400).json({errors: err});
      }

      return res.status(200).json({success: `logged in ${user.email}`});
    });
  })(req, res, next);
});

router.post('/sign-up', async (req, res) => {
  try {
    const {_id} = await user.create({...req.body, activated: true});
    res.status(201).location(`/users/${_id}`).json({id: _id});
  } catch (e) {
    const status = e.code === 11000 ? 409 : 400;
    res.status(status).json({error: e.toString()});
  }
});

module.exports = router;
