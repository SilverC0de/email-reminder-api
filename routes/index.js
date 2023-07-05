const authRoute = require('./auth.route');

module.exports = (api, version) => {
    api.use(`/${version}/auth`, authRoute);
};