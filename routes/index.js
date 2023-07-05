const authRoute = require('./auth.route');
const reminderRoute = require('./reminder.route');

module.exports = (api, version) => {
    api.use(`/${version}/auth`, authRoute);
    api.use(`/${version}/reminder`, reminderRoute);
};