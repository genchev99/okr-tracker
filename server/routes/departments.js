const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Company = require('../models/company');
const Department = require('../models/department');
const passport = require('passport');

router.get('/', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
  res.status(200).json({departments: (await Department.find({company: req.user.company}).populate('company'))});
});

router.post('/', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
  try {
    const department = await Department.create({
      company: req.user.company,
      name: req.body.name.trim().toLowerCase(),
      description: req.body.description.trim().toLowerCase(),
    });

    await Company.findOneAndUpdate({
      _id: req.user.company
    }, {
      $addToSet: {
        department
      }
    });

    res.status(200).json({...department});
  } catch (e) {
    const status = e.code === 11000 ? 409 : 400;
    res.status(status).json({success: false, error: e.toString()});
  }
});

router.put('/:departmentId', passport.authenticate('jwt', {session: false}), async (req, res) => {
  const departmentId = req.params.departmentId;
  try {
    const {name, description} = req.body;
    const departmentById = await Department.findOneAndUpdate({_id: departmentId}, {name, description}, {new: true, runValidators: true});

    if (!departmentById) {
      res.status(404).json({error: `department user ID: ${departmentId}`});
    } else {
      res.json({...departmentById.toObject()});
    }
  } catch (e) {
    if (e.kind === 'ObjectId') {
      res.status(400).json({error: `Invalid department ID: ${departmentId}`});
    } else {
      res.status(400).json({error: e.toString()});
    }
  }
});

router.delete('/:departmentId', passport.authenticate('jwt', {session: false}), async (req, res) => {
  const departmentId = req.params.departmentId;
  try {
    const associatedUser = await User.find({department: departmentId}, '_id');
    if (associatedUser.length) {
      return res.status(400).json({success: false, error: `Users are still associated with this department: ${associatedUser.map(JSON.stringify).join(', ')}`});
    }

    const departmentById = await Department.findOneAndDelete({_id: departmentId}, {strict: true});

    if (!departmentById) {
      res.status(404).json({error: `Invalid department ID: ${departmentId}`});
    } else {
      res.json({...departmentById.toObject()});
    }
  } catch (e) {
    res.status(400).json({error: `Invalid department ID: ${departmentId}`});
  }
});

module.exports = router;
