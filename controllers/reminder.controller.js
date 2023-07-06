const { v4 : uuidv4 } = require('uuid');
const openAIService = require('../services/openai.service');
const reminderService = require('../services/reminder.service');
const cronService = require('../services/cron.service');
const { PORT } = require('../config');


exports.generateReminder = async (req, res) => {
    // eslint-disable-next-line no-unused-vars
    const { uuid: userUUID, name, email } = req;
    const { protocol, hostname }  = req;
    const { action_prompt : actionPrompt, schedule_prompt : schedulePrompt, recipients } = req.body;
    const uuid = uuidv4();
    const previewURL = `${protocol}://${(hostname === 'localhost' ? `localhost:${PORT}` : hostname)}/api/v1/reminder/interface/${uuid}`;

    try {
        const title = await openAIService.generateEmailTitle(`Generate an email title less than 50 characters from the following: ${actionPrompt}`);
        
        const body = await openAIService.generateEmailContent(name, `Generate an email body less than 1000 characters from the following: ${actionPrompt} ${schedulePrompt}`);

        const cron = await openAIService.generateCron(schedulePrompt);


        // create reminder
        // (uuid, userUUID, email, cron, recipients, emailTitle, emailInfo, schedule, action, status)
        await reminderService.createReminder(uuid, userUUID, email, cron, recipients, title, body, schedulePrompt, actionPrompt, previewURL, 'preview');


        // create cron job
        await cronService.setupCronJob(cron);

        return res.status(201).json({
            status: true,
            message: 'Email reminder generated, please activate/start reminder for it to start running',
            data: {
                email_title: title,
                email_body: body,
                action_prompt: actionPrompt,
                schedule_prompt: schedulePrompt,
                cron,
                preview: previewURL,
                reminder_uuid: uuid,
                open_count: 0,
                status: 'preview',
                recipients
            }
        });
    } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);

        return res.status(500).json({
            status: false,
            message: 'Reminder GPT may be handling a lot of requests at the moment, please try again later'
        });
    }
};

exports.fetchReminder = async (req, res) => {
    const { uuid: userUUID } = req;
    const { uuid } = req.params;

    try {
        const reminder = await reminderService.fetchReminderByUser(uuid, userUUID);

        if(reminder.rowCount === 0) {
            return res.status(404).json({
                status: false,
                message: 'Email reminder not found on your account'
            });
        }

        // get reminder info
        const { 
            cron,
            action,
            schedule,
            preview,
            status,
            open_count: counter,
            email_title: title,
            email_info: body,
            email_recipient: recipients,
         } = reminder.rows[0];

        return res.status(200).json({
            status: true,
            message: 'Email reminder fetched',
            data: {
                email_title: title,
                email_body: body,
                action_prompt: action,
                schedule_prompt: schedule,
                cron,
                preview,
                reminder_uuid: uuid,
                status,
                open_count: counter,
                recipients: recipients.email
            }
        });
    } catch (e) {
        return res.status(500).json({
            status: false,
            message: 'Unable to fetch email reminder'
        });
    }
};

exports.startReminder = async (req, res) => {
    const { uuid: userUUID } = req;
    const { reminder_uuid: uuid } = req.body;

    try {
        const reminder = await reminderService.fetchReminderByUser(uuid, userUUID);

        if(reminder.rowCount === 0) {
            return res.status(404).json({
                status: false,
                message: 'Email reminder not found on your account'
            });
        }


        await reminderService.updateReminderStatus(uuid, 'running');

        return res.status(200).json({
            status: true,
            message: 'Email reminder is now running!'
        });
    } catch (e) {
        return res.status(500).json({
            status: false,
            message: 'Unable to fetch email reminder'
        });
    }
};


exports.stopReminder = async (req, res) => {
    const { uuid: userUUID } = req;
    const { reminder_uuid: uuid } = req.body;

    try {
        const reminder = await reminderService.fetchReminderByUser(uuid, userUUID);

        if(reminder.rowCount === 0) {
            return res.status(404).json({
                status: false,
                message: 'Email reminder not found on your account'
            });
        }


        await reminderService.updateReminderStatus(uuid, 'stopped');

        return res.status(200).json({
            status: true,
            message: 'Email reminder stopped!'
        });
    } catch (e) {
        return res.status(500).json({
            status: false,
            message: 'Unable to fetch email reminder'
        });
    }
};


exports.previewReminderHTML = async (req, res) => {
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
        res.render('email', { title, body }, (error, html) => {
            res.setHeader('Content-Type', 'text/html');
            res.status(200).send(html);
        });
    } catch (e) {
        return res.status(500).json({
            status: false,
            message: 'Unable to preview email reminder'
        });
    }
};
