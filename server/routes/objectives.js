const express = require('express');
const router = express.Router();
const Department = require('../models/department');
const KeyResult = require('../models/keyResult');
const Objective = require('../models/objective');
const passport = require('passport');


router.get('/', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
  const objectives = await Objective.find({archived: false})
    .populate({
      path: 'department',
      match: {
        company: req.user.company,
      }
    });

  res.status(200).json({
    objectives,
  });
});

router.post('/', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
  try {
    const {department: departmentName} = req.body;

    const department = await Department.findOne({name: departmentName, company: req.user.company});

    if (!department) {
      return res.status(400).json({error: `Invalid department name: ${departmentName}`});
    }

    console.log(req.body);

    const objective = await Objective.create({
      ...req.body,
      department: department._id,
      createdBy: req.user._id,
    });

    res.status(200).json({objective: objective});
  } catch (e) {
    const status = e.code === 11000 ? 409 : 400;
    res.status(status).json({success: false, error: e.toString()});
  }
});


router.get('/:objectiveId/key-results', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
  const objectiveId = req.params.objectiveId;

  const objective = await Objective.findOne({_id: objectiveId});

  if (!objective) {
    return res.status(400).json({success: false, error: 'The objective could not be found'});
  }

  const keyResults = (await KeyResult.find({objective: objectiveId})).map(res => res.toObject());

  res.status(200).json({
    keyResults,
  });
});

router.post('/:objectiveId/key-results', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
  const objectiveId = req.params.objectiveId;
  try {
    const objective = await Objective.findOne({_id: objectiveId});

    if (!objective) {
      return res.status(400).json({success: false, error: 'The objective could not be found'});
    }

    const keyResult = await KeyResult.create({
      title: req.body.title,
      description: req.body.description,
      objective: objectiveId,
      range: {
        max: req.body.quantity,
      }
    });

    res.status(200).json({
      ...keyResult,
    });
  } catch (e) {
    const status = e.code === 11000 ? 409 : 400;
    res.status(status).json({success: false, error: e.toString()});
  }
});

router.delete('/:objectiveId/key-results/:keyResultId', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
  const objectiveId = req.params.objectiveId;
  const keyResultId = req.params.keyResultId;

  try {
    const objective = await Objective.findOne({_id: objectiveId});

    if (!objective) {
      return res.status(400).json({success: false, error: 'The objective could not be found'});
    }

    const keyResult = await KeyResult.findOne({_id: keyResultId});

    if (!keyResult) {
      return res.status(400).json({success: false, error: 'The key result could not be found'});
    }

    await KeyResult.findOneAndDelete({_id: keyResultId}, {strict: true});

    res.status(200).json({
      ...keyResult,
    });
  } catch (e) {
    const status = e.code === 11000 ? 409 : 400;
    res.status(status).json({success: false, error: e.toString()});
  }
});

router.delete('/:objectiveId/', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
  const objectiveId = req.params.objectiveId;

  try {
    const objective = await Objective.findOne({_id: objectiveId});

    if (!objective) {
      return res.status(400).json({success: false, error: 'The objective could not be found'});
    }

    await Objective.findOneAndDelete({_id: objectiveId}, {strict: true});

    res.status(200).json({
      ...objective,
    });
  } catch (e) {
    const status = e.code === 11000 ? 409 : 400;
    res.status(status).json({success: false, error: e.toString()});
  }
});

router.put('/:objectiveId', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
  const objectiveId = req.params.objectiveId;

  try {
    const objective = await Objective.findOne({_id: objectiveId});

    if (!objective) {
      return res.status(400).json({success: false, error: 'The objective could not be found'});
    }

    await Objective.findOneAndUpdate({_id: objectiveId}, {archived: true}, {strict: true});

    res.status(200).json({
      ...objective,
    });
  } catch (e) {
    const status = e.code === 11000 ? 409 : 400;
    res.status(status).json({success: false, error: e.toString()});
  }
});

router.put('/:objectiveId/key-results/:keyResultId', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
  const objectiveId = req.params.objectiveId;
  const keyResultId = req.params.keyResultId;

  try {
    const objective = await Objective.findOne({_id: objectiveId});

    if (!objective) {
      return res.status(400).json({success: false, error: 'The objective could not be found'});
    }

    const keyResult = await KeyResult.findOne({_id: keyResultId});

    if (!keyResult) {
      return res.status(400).json({success: false, error: 'The key result could not be found'});
    }

    const newCurrent = req.body.newValue;
    if (newCurrent < keyResult.range.min || newCurrent > keyResult.range.max) {
      return res.status(400).json({success: false, error: 'The new value is not in the allowed range'});
    }

    await KeyResult.findOneAndUpdate({_id: keyResultId}, {'range.current': newCurrent}, {strict: true});

    res.status(200).json({
      ...keyResult,
    });
  } catch (e) {
    const status = e.code === 11000 ? 409 : 400;
    res.status(status).json({success: false, error: e.toString()});
  }
});

module.exports = router;
