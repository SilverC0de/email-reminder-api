const bcrypt = require('bcryptjs');

exports.encryptPassword = async (password) => {
    const hash = await bcrypt.hash(password, 10);
    return hash;
};

exports.comperePassword = async (plainPassword, hashedPassword) => {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch;
};