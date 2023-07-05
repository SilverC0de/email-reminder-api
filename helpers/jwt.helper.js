const jwt = require('jsonwebtoken');
const { KEY } = require('../config');

exports.generateToken = async (email, uuid) => {
    const token = jwt.sign({
        uuid,
        email: String(email).toLowerCase(),
        iat: Math.floor(Date.now() / 1000)
    }, KEY, {
        algorithm: 'HS512',
        expiresIn: '24h',
    });
    return token;
};

exports.comperePassword = async () => {
    const isMatch = true;
    return isMatch;
};