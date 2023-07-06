const express = require('express');
const api = express.Router();
const { check } = require('express-validator');

const validatorMiddleware = require('../middlewares/validator.middleware');
const jwtMiddleware = require('../middlewares/jwt.middleware');
const reminderController = require('../controllers/reminder.controller');


api.route('/generate').post([
    check('action_prompt')
      .notEmpty().withMessage('Action prompt is required e.g Tell Emeka to buy gala')
      .isLength({ max: 50 }).withMessage('Action prompt too long')
      .escape().trim(),
    check('schedule_prompt')
      .notEmpty().withMessage('Action prompt is required e.g Tomorrow by 6pm')
      .isLength({ max: 40 }).withMessage('Schedule prompt too long')
      .escape().trim(),
    check('recipients')
      .isArray({ min: 1, max: 4 }).withMessage('Email recipients cannot be more than 4'),
    check('recipients.*')
      .isEmail().withMessage('At least one of the recipient email is invalid'),
], validatorMiddleware, jwtMiddleware, reminderController.generateReminder);


api.route('/info/:uuid').get([
  check('uuid').matches(/[0-9a-zA-Z]{8}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{12}/).withMessage('Reminder UUID is required').trim()
], validatorMiddleware, jwtMiddleware, reminderController.fetchReminder);


api.route('/start').patch([
  check('reminder_uuid').matches(/[0-9a-zA-Z]{8}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{12}/).withMessage('Reminder UUID is required').trim()
], validatorMiddleware, jwtMiddleware, reminderController.startReminder);


api.route('/stop').patch([
  check('reminder_uuid').matches(/[0-9a-zA-Z]{8}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{12}/).withMessage('Reminder UUID is required').trim()
], validatorMiddleware, jwtMiddleware, reminderController.stopReminder);


api.route('/list').get([
  [
    check('page')
      .isNumeric()
      .isInt({ min: 1 })
      .withMessage('Enter a valid page number')
  ]
], validatorMiddleware, jwtMiddleware, reminderController.listReminders);


api.route('/interface/:uuid').get([
  check('uuid').matches(/[0-9a-zA-Z]{8}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{4}-[0-9a-zA-Z]{12}/).withMessage('Reminder UUID is required').trim()
], validatorMiddleware, reminderController.previewReminderHTML);

module.exports = api;