const rateLimit = require('express-rate-limit');

exports.limiter = rateLimit({
	windowMs: 10 * 60 * 1000,
	max: 2,
	standardHeaders: true,
	legacyHeaders: true,
    message: {
        status: false,
        message: 'Too many requests, take a break!'
    }, 
});