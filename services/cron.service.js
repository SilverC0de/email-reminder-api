const cronjob = require('node-cron');

exports.setupCronJob = async (cron, recipient, title, body) => {
    cronjob.schedule(cron, async () => {

        // send email lol
        // check is mail status is active
        // eslint-disable-next-line no-console
        console.log(`running a task every minute${ recipient } ${ title } ${ body }`);
    });
};