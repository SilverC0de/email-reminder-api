const { Configuration, OpenAIApi } = require('openai');
const { OPENAI } = require('../config');

const configuration = new Configuration({
    apiKey: OPENAI
});

const openai = new OpenAIApi(configuration);


exports.generateEmailTitle = async (prompt) => {
    const completion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt,
        temperature: 0.1,
        presence_penalty: 0.2,
        max_tokens: 80
    });

    return String(completion.data.choices[0].text).replace(/(\r\n|\n|\r)/gm, '').replace(/['"]+/g, '');
};


exports.generateEmailContent = async (name, prompt) => {
    const completion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [{role: 'user', content: prompt}]
    });

    return String(completion.data.choices[0].message.content).replace('[Your Name]', name).replace('[Recipient]', '').replace('[Name]', '');
};


exports.generateCron = async (prompt) => {
    const completion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt,
        temperature: 0,
        presence_penalty: 0,
        max_tokens: 40
    });

    return String(completion.data.choices[0].text).replace(/(\r\n|\n|\r)/gm, '').replace(/['"]+/g, '');
};