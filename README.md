## Email reminder API
Email reminder API allows you to send emails to yourself or others as a reminder using prompts. The prompts are in basic English that can be typed e.g. Remind Emeka to clear the imported goods by 7 am tomorrow.

#
#### 🚀 What this software does (Use cases)

1. Use text prompts and schedules to set reminders e.g Remind Ivy to pay for data every month ✨
2. Setup continuous reminders that can run periodically e.g Every Monday morning 🎯
3. Emails delivery that delivers on time 
4. Know if your email reminder was opened or not 💀

#
#### ⚡️ Basic features
- `Register` ... For basic user registrations i.e name, email, and password
- `Login` ... To authenticate any user with provided email and password
- `Generate Reminder` ... To generate a reminder with different action and schedule prompts
- `Start Reminder` ... This will tell the system to send an email at the scheduled time
- `Stop Reminder` ... This will tell the system to stop sending emails to a recipient
- `Reminder info` ... Get details of a reminder e.g email title, body, recipient, status, if the email was opened e.t.c
- `Reminder list` ... Get a paginated list of reminders
- `Reminder preview` ... Show a preview of what a reminder will look like when delivered
- `Reminder webhook` ... For our email provider to notify us when an email has been opened

#
#### 🔐 Environment Variable
Environment variables are provided to make local faster, on production, we would be using AWS key management service
```
PORT = "2000 or any port of your choice"
KEY = "Any random key for JWT and Webhook authentication"
TREBLLE_API_KEY = "Treblle API key"
TREBLLE_PROJECT_ID = "Treblle project ID"
OPENAI = "OpenAI server key"
POSTMARK = "Postmark server key"
POSTGRES = "Postgres database URL"
```
#
#### 🕸️ Backend installation guide

This repository can be installed on your local machine. Please make sure you have Node.js running on your local machine.

1. Open your VSCode terminal and run the next commands
2. ``git clone https://github.com/SilverC0de/email-reminder-api``
3. ``cd email-reminder-api``
4. ``npm i``
5. Rename .env.development to just .env
6. ``npm start``
7. API Documentation can be found on Treblle
