const express = require('express');
const api = express.Router();
const { check } = require('express-validator');

const validatorMiddleware = require('../middlewares/validator.middleware');
const authController = require('../controllers/auth.controller');


api.route('/register').post([
    check('name').notEmpty().isLength({ min: 2 }).escape().withMessage('Enter a valid name'),
    check('email').isEmail().trim().withMessage('Enter valid email address'),
    check('password').isLength({ min: 6 }).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/)
    .withMessage(
      'Please enter a password at least 6 character and contains at least one uppercase, lowercase and a special character',
    )
], validatorMiddleware, authController.registerUser);

api.route('/login').post([
    check('email').isEmail().trim().withMessage('Enter valid email address'),
    check('password').isLength({ min: 6 }).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/)
    .withMessage(
      'Please enter a password at least 6 character and contains at least one uppercase, lowercase and a special character',
    )
], validatorMiddleware, authController.signInUser);

module.exports = api;