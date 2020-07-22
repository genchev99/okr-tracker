const mongoose = require('mongoose');
const router = require('express').Router();
const User = require('../models/user');
const Company = require('../models/company');
const passport = require('passport');
const utils = require('../lib/utils');
const Department = require('../models/department');

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

      if (!user.activated) {
        return res.status(401).json({
          success: false,
          msg: 'The account is not activated! Please fallow the link in your email inbox.'
        })
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
router.post('/sign-up', async function (req, res, next) {
  const saltHash = utils.genPassword(req.body.password);

  const salt = saltHash.salt;
  const hash = saltHash.hash;
  delete req.body.password;


  try {
    if (await User.findOne({email: req.body.email, activated: true})) {
      res.status(400).json({success: false, msg: 'Account already exists'});
    }

    let company = await Company.findOne({name: req.body.company}).populate('departments');

    if (company) {
      if (!await User.findOne({email: req.body.email, activated: false,})) {
        res.status(400).json({success: false, msg: 'This company name is already taken'});
      }
    } else {
      company = await Company.create({name: req.body.company});
    }

    let department;
    if (!company.departments.length) {
      department = await Department.create({
        name: 'executives',
        description: 'Executive managers hold executive powers delegated to them with and by authority of a board of directors.',
        company: company,
      });

      company.departments.push(department._id);
      await company.save();
    } else {
      department = company.departments.filter(({name}) => req.body.department || 'executives')[0];
    }

    const user = await User.findOneAndUpdate({
      email: req.body.email,
    }, {
      ...req.body,
      hash: hash,
      salt: salt,
      activated: true,
      department: department._id,
      company: company._id,
    }, {
      upsert: true,
      new: true,
    });

    department.employees.push(user._id);
    await department.save();

    res.json({success: true, user: user});
  } catch (e) {
    console.error(e);
    res.json({success: false, msg: e.toString()});
  }
});

router.post('/pre-registered', async (req, res) => {
  try {
    const user = (await User.findOne({_id: req.body.id, activated: false})).toObject();

    if (user) {
      user.company = (await Company.findOne({_id: user.company})).name;
      res.json({success: true, user});
    } else {
      res.json({success: false, msg: 'User cannot be found!'})
    }
  } catch (e) {
    res.json({success: false, msg: 'Invalid id!'});
  }
});

module.exports = router;
