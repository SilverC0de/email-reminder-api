const { Configuration, OpenAIApi } = require('openai');
const fs = require('fs');
const path = require('path');

const { OPENAI } = require('../config');

const configuration = new Configuration({
    apiKey: OPENAI
});

const openai = new OpenAIApi(configuration);


exports.generateEmailTitle = async (prompt) => {
    const completion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt,
        temperature: 0.4,
        presence_penalty: 0.4,
        max_tokens: 100
    });

    return String(completion.data.choices[0].text).replace(/(\r\n|\n|\r)/gm, '').replace(/['"]+/g, '').replace(/\[.*?\]/g, '');
};


exports.generateEmailContent = async (name, prompt) => {
    const completion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [{role: 'user', content: prompt}]
    });

    return String(completion.data.choices[0].message.content).replace('[Your Name]', name).replace(/\[.*?\]/g, '');
};


exports.generateCron = async (prompt) => {
    let cronprompt = fs.readFileSync(path.resolve(__dirname, '../cronprompt.txt'));
    cronprompt += prompt;
    cronprompt += '\nGPT:';
       
    const completion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: cronprompt,
        temperature: 0,
        presence_penalty: 0,
        max_tokens: 40
    });


    return String(completion.data.choices[0].text).replace(/(\r\n|\n|\r)/gm, '').trim();
};