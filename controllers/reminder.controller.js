const { v4 : uuidv4 } = require('uuid');
const path = require('path');
const openAIService = require('../services/openai.service');
const reminderService = require('../services/reminder.service');
const { PORT } = require('../config');


exports.previewReminder = async (req, res) => {
    // eslint-disable-next-line no-unused-vars
    const { uuid: userUUID, name, email } = req;
    const { protocol, hostname, originalUrl }  = req;
    const { action_prompt : actionPrompt, schedule_prompt : schedulePrompt, recipients } = req.body;
    const uuid = uuidv4();

    try {
        const title = await openAIService.generateEmailTitle(`Generate an email title less than 50 characters from the following: ${actionPrompt}`);
        
        const body = await openAIService.generateEmailContent(name, `Generate an email body less than 1000 characters from the following: ${actionPrompt}`);

        const cron = await openAIService.generateCron(schedulePrompt);


        // create reminder
        // (uuid, userUUID, email, cron, recipients, emailTitle, emailInfo, schedule, action, status)
        await reminderService.createReminder(uuid, userUUID, email, cron, recipients, title, body, schedulePrompt, actionPrompt, 'preview');


        // create cron job

        return res.status(200).json({
            status: true,
            message: 'Email reminder generated',
            data: {
                title,
                body,
                cron,
                action: actionPrompt,
                schedule: schedulePrompt,
                preview: `${protocol}://${(hostname === 'localhost' ? `localhost:${PORT}` : hostname)}${originalUrl}/${uuid}`,
                uuid,
                recipients
            }
        });
    } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);

        return res.status(500).json({
            status: false,
            message: 'Server error, please try again later'
        });
    }
};


exports.previewHTML = async (req, res) => {
    const { uuid } = req.params;

    try {
        // check server and fetch reminder by UUID
        const reminder = await reminderService.fetchReminder(uuid);

        if(reminder.rowCount === 0) {
            return res.status(404).json({
                status: false,
                message: 'Email preview not found'
            });
        }

        // get reminder info
        const { email_title: title, email_info: body } = reminder.rows[0];

        // render HTML
        res.render(path.join(__dirname, '../views/email'), { title, body });
    } catch (e) {
        return res.status(500).json({
            status: false,
            message: 'Unable to preview email'
        });
    }
};
