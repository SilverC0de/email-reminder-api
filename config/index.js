require('dotenv').config();

module.exports = {
    PORT: process.env.PORT,
    KEY: process.env.KEY,
    TREBLLE_API_KEY: process.env.TREBLLE_API_KEY,
    TREBLLE_PROJECT_ID: process.env.TREBLLE_PROJECT_ID,
    OPENAI: process.env.OPENAI,
    POSTGRES: process.env.POSTGRES
};