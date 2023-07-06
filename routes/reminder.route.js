const express = require('express');
const api = express.Router();
const { check } = require('express-validator');

const validatorMiddleware = require('../middlewares/validator.middleware');
const jwtMiddleware = require('../middlewares/jwt.middleware');
const webhookAuthMiddleware = require('../middlewares/hookauth.middleware');
const reminderController = require('../controllers/reminder.controller');


api.route('/generate').post([
    check('action_prompt')
      .notEmpty().withMessage('Action prompt is required e.g Tell Emeka to buy gala')
      .isLength({ max: 50 }).withMessage('Action prompt needs to be short e.g Remind pastor to pray')
      .escape().trim(),
    check('schedule_prompt')
      .notEmpty().withMessage('Action prompt is required e.g Every monday by 10am')
      .isLength({ max: 40 }).withMessage('Schedule prompt needs to be short e.g Tomorrow by 6pm')
      .escape().trim(),
    check('recipient').isEmail().trim().withMessage('Recipient must be a valid email address')
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


api.route('/webhook').post(webhookAuthMiddleware, reminderController.webhookUpdateReadStatus);

module.exports = api;