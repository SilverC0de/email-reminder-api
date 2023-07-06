const cronjob = require('node-cron');
const postmark = require('postmark');
const reminderService = require('./reminder.service'); 
const { POSTMARK } = require('../config');

const client = new postmark.ServerClient(POSTMARK);

exports.setupCronJob = async (cron, uuid, recipient, title, body) => {
    cronjob.schedule(cron, async () => {

        // check status to make sure we should still send email
        const reminder = await reminderService.fetchReminder(uuid);

        // check if email even exist
        if(reminder.rowCount > 0) {
            const { status } = reminder.rows[0];

            // only send mails if status is set to running
            if(status === 'running') {
                const mailer = await client.sendEmailWithTemplate({
                    From: 'dev@reblle.live',
                    To: 'dev@reblle.live',
                    TemplateAlias: 'friendly-reminder',
                    TemplateModel: {
                      title,
                      body
                    }
                });

                // eslint-disable-next-line no-console
                console.log('mail sent');
        
                // get message ID and update it then wait for callback when recipient opens the message
                const messageID = mailer.MessageID;
                await reminderService.updateReminderMessageID(uuid, messageID);
            }
        }
    });
};