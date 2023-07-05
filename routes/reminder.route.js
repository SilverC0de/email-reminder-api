const express = require('express');
const api = express.Router();
const { check } = require('express-validator');

const validatorMiddleware = require('../middlewares/validator.middleware');
const jwtMiddleware = require('../middlewares/jwt.middleware');
const reminderController = require('../controllers/reminder.controller');


api.route('/preview').post([
    check('action_prompt')
      .notEmpty().withMessage('Action prompt is required e.g Tell Emeka to buy gala')
      .isLength({ max: 32 }).withMessage('Action prompt too long')
      .escape().trim(),
    check('schedule_prompt')
      .notEmpty().withMessage('Action prompt is required e.g Tomorrow by 6pm')
      .isLength({ max: 32 }).withMessage('Schedule prompt too long')
      .escape().trim(),
    check('recipients')
      .isArray({ min: 1, max: 4 }).withMessage('Email recipients cannot be more than 4'),
    check('recipients.*')
      .isEmail().withMessage('At least one of the recipient email is invalid'),
], validatorMiddleware, jwtMiddleware, reminderController.previewReminder);


module.exports = api;