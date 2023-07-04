const express = require('express');

const router = express.Router();
const { check } = require('express-validator');

// const sanitizer = require('../middlewares/sanitizer.middleware.js')

// const auth = require('../controllers/auth.controller.js')


router.route('/register').post([
    check('email').notEmpty().escape().trim().withMessage('Verification token is required')
]);

module.exports = router;