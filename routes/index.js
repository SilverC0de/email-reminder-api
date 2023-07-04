const authRoute = require('./auth.route');

module.exports = (api) => {
    api.use('/auth', authRoute);
};