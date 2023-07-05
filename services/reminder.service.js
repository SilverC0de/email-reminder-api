const db = require('../config/database');


exports.createReminder = async (uuid, userUUID, email, cron, recipients, emailTitle, emailInfo, status) => {
  const result = await db.query('INSERT INTO reminders (uuid, created_by, creator_email, cron, email_recipient, title, info, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [
    uuid, userUUID, email, cron, recipients, emailTitle, emailInfo, status]
  );

  return result;
};