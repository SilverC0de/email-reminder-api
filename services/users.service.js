const db = require('../config/database');

exports.fetchUser = async (email) => {
  const result = await db.query('SELECT uuid, password, email, name FROM users WHERE email = $1 LIMIT 1', [
    String(email).toLowerCase()
  ]);

  return result;
};

exports.registerUser = async (email, uuid, hashedPassword, name) => {
  const result = await db.query('INSERT INTO users (email, uuid, password, name) VALUES ($1, $2, $3, $4)', [
    String(email).toLowerCase(), uuid, hashedPassword, name]
  );

  return result;
};