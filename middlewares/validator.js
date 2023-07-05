const { validationResult } = require('express-validator');

module.exports = (req, res, next) => {
    const e = validationResult(req);

    if(e.errors.length > 0){
        return res.status(422).json({
            status: false,
            message: e.errors[e.errors.length - 1].msg
        });
    }

    next();
};