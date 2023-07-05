const jwt = require('jsonwebtoken');
const { KEY } = require('../config');


exports.generateToken = async (email, name, uuid) => {
    const token = jwt.sign({
        uuid,
        name,
        email: String(email).toLowerCase(),
        iat: Math.floor(Date.now() / 1000)
    }, KEY, {
        algorithm: 'HS512',
        expiresIn: '24h',
    });
    return token;
};


exports.verifyToken = (token) => new Promise((resolve, reject) => {
        jwt.verify(token, KEY, {algorithm: 'HS512'}, (error) => {
            if(error) reject(error);
            else resolve(true);
        });
    });    
;


exports.decodeToken = (token) => {
    const data = jwt.verify(token, KEY, {algorithm: 'HS512'});
    return data;
};