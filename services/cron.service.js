const cronjob = require('node-cron');
const postmark = require('postmark');
const { POSTMARK } = require('../config');

const client = new postmark.ServerClient(POSTMARK);

exports.setupCronJob = async (cron, recipient, title, body) => {
    cronjob.schedule(cron, async () => {

        client.sendEmailWithTemplate({
            From: 'dev@reblle.live',
            To: 'dev@reblle.live',
            TemplateAlias: 'friendly-reminder',
            TemplateModel: {
              title,
              body
            }
          });
    });
};