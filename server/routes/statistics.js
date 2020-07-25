const express = require('express');
const router = express.Router();
const Department = require('../models/department');
const KeyResult = require('../models/keyResult');
const Objective = require('../models/objective');
const passport = require('passport');


router.get('/tasks-between-departments', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
  const departments = (await Department.find({company: req.user.company}, '_id name')).map(object => object.toObject());

  const alteredObjectives = await Promise.all(departments.map(async department => ({
    ...department,
    totalKeyResults: (await KeyResult.find().populate({
      path: 'objective',
      match: {department: department._id}
    })).map(object => object.toObject()).filter(o => o.objective).length,
    totalObjectives: (await Objective.countDocuments({department: department._id})),
  })));

  res.status(200).json({
    alteredObjectives,
  });
});

const average = arr => arr.length ? arr.reduce((p, c) => p + c, 0) / arr.length : 0;

router.get('/results-by-department', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
  const departments = (await Department.find({company: req.user.company}, '_id name')).map(object => object.toObject());

  const alteredObjectives = (await Promise.all(departments.map(async department => ({
    ...department,
    totalKeyResults: (await KeyResult.find().populate({
      path: 'objective',
      match: {department: department._id}
    })).map(object => object.toObject()).filter(o => o.objective),
    totalObjectives: (await Objective.countDocuments({department: department._id})),
  })))).map(res => ({
    ...res,
    totalProgress: average(res.totalKeyResults.map(kr => kr.range.current / kr.range.max)) * res.totalKeyResults.length,
    totalKeyResults: res.totalKeyResults.length,
  }));

  res.status(200).json({
    alteredObjectives,
  });
});

router.get('/total-progress', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
  const departments = (await Department.find({company: req.user.company}, '_id name')).map(object => object.toObject());

  let progress = 0;
  let total = 0;

  const alteredObjectives = (await Promise.all(departments.map(async department => ({
    ...department,
    totalKeyResults: (await KeyResult.find().populate({
      path: 'objective',
      match: {department: department._id}
    })).map(object => object.toObject()).filter(o => o.objective),
  })))).forEach(res => {
    progress += average(res.totalKeyResults.map(kr => kr.range.current / kr.range.max)) * res.totalKeyResults.length;
    total += res.totalKeyResults.length;
  });


  res.status(200).json({
    totalProgress: (progress / total) * 100,
  });
});

module.exports = router;
