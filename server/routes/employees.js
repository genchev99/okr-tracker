const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Department = require('../models/department');
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

router.put('/:employeeId', passport.authenticate('jwt', {session: false}), async (req, res) => {
  const employeeId = req.params.employeeId;
  try {
    const {firstName, lastName, email, role, department: departmentName} = req.body;
    const department = await Department.findOne({name: departmentName, company: req.user.company});

    if (!department) {
      return res.status(400).json({error: `Invalid department name: ${departmentName}`});
    }

    const employeeById = await User.findOneAndUpdate({_id: employeeId}, {firstName, lastName, department: department._id, email, role}, {new: true, runValidators: true});

    if (!employeeById) {
      res.status(404).json({error: `Invalid employee ID: ${employeeId}`});
    } else {
      res.json({...employeeById.toObject()});
    }
  } catch (e) {
    console.log(e);
    if (e.kind === 'ObjectId') {
      res.status(400).json({error: `Invalid employee ID: ${employeeId}`});
    } else {
      res.status(400).json({error: e.toString()});
    }
  }
});

router.delete('/:employeeId', passport.authenticate('jwt', {session: false}), async (req, res) => {
  const employeeId = req.params.employeeId;
  try {
    const user = User.findOne({_id: employeeId}, {strict: true});
    if (user.role === 'root') {
      return res.status(400).json({error: `The root user cannot be deleted!`});
    }

    const departmentById = await User.findOneAndDelete({_id: employeeId}, {strict: true});

    if (!departmentById) {
      res.status(404).json({error: `Invalid user ID: ${employeeId}`});
    } else {
      res.json({...departmentById.toObject()});
    }
  } catch (e) {
    res.status(400).json({error: `Invalid user ID: ${employeeId}`});
  }
});

module.exports = router;
