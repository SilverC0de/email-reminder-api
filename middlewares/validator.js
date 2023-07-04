const { validationResult } = require('express-validator');

module.exports = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty){
        return res.status(422).json({
            status: false,
            message: errors.errors[errors.errors.length - 1].msg
        });
    }

    next();
};