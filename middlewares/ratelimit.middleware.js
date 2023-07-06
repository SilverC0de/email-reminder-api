const rateLimit = require('express-rate-limit');

exports.limiter = rateLimit({
	windowMs: 60 * 1000, // 1 minute
	max: 40, // 40 requests per minute for a user
	standardHeaders: true,
	legacyHeaders: true,
    message: {
        status: false,
        message: 'Too many requests, take a break!'
    }, 
});