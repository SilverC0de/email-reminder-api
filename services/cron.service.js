const cronjob = require('node-cron');

exports.setupCronJob = async (cron) => {

    // eslint-disable-next-line no-console
    console.log('cron ok');
    cronjob.schedule(cron, () => {

        // send email lol
        // check is mail status is active
        // eslint-disable-next-line no-console
        console.log('running a task every minute');
    });
};