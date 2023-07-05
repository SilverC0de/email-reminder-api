const { v4 : uuidv4 } = require('uuid');
const openAIService = require('../services/openai.service');
const reminderService = require('../services/reminder.service');


exports.previewReminder = async (req, res) => {
    const { uuid: userUUID, name, email } = req;
    const { actionPrompt, schedulePrompt, recipients } = req.body;
    const uuid = uuidv4();

    try {
        const title = await openAIService.generateEmailTitle(`Generate an email title less than 40 characters from the following: ${actionPrompt}`);
        
        const body = await openAIService.generateEmailContent(name, `Generate an email body less than 500 characters from the following: ${actionPrompt}`);

        const cron = '* * * * *'; // await openAIService.generateCron(schedulePrompt);


        // create reminder
        // (uuid, userUUID, email, cron, recipients, emailTitle, emailInfo, status)
        await reminderService.createReminder(uuid, userUUID, email, cron, recipients, title, body, 'preview');

        return res.status(200).json({
            status: true,
            message: 'Email reminder generated',
            data: {
                title,
                body,
                cron,
                uuid,
                action: actionPrompt,
                schedule: schedulePrompt,
                preview: 's', // url to see what is being sent
                recipients
            }
        });
    } catch (e) {
        return res.status(500).json({
            status: false,
            message: 'Server error, please try again later'
        });
    }
};