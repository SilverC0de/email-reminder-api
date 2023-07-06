const db = require('../config/database');


exports.createReminder = async (uuid, userUUID, email, cron, recipients, emailTitle, emailInfo, schedule, action, previewUrl, status) => {
  const emailArray = { email: recipients };

  const result = await db.query(
    'INSERT INTO reminders (uuid, created_by, creator_email, cron, email_recipient, email_title, email_info, schedule, action, preview, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)',
    [uuid, userUUID, email, cron, emailArray, emailTitle, emailInfo, schedule, action, previewUrl, status]
  );

  return result;
};

exports.fetchReminder = async (uuid) => {
  const result = await db.query('SELECT * FROM reminders WHERE uuid = $1 LIMIT 1', [
    uuid
  ]);

  return result;
};

exports.fetchReminderByUser = async (uuid, userUUID) => {
  const result = await db.query('SELECT * FROM reminders WHERE uuid = $1 AND created_by = $2 LIMIT 1', [
    uuid, userUUID
  ]);

  return result;
};

exports.countReminderByUser = async (userUUID) => {
  const result = await db.query('SELECT COUNT(uuid) FROM reminders WHERE created_by = $1', [
    userUUID
  ]);

  return result;
};

exports.fetchReminderListByUser = async (userUUID, limit, offset) => {
  const result = await db.query('SELECT uuid, email_title, schedule, status, preview, created_at FROM reminders WHERE created_by = $1 ORDER BY id DESC LIMIT $2 OFFSET $3', [
    userUUID, limit, offset
  ]);

  return result;
};

exports.updateReminderStatus = async (uuid, status) => {
  const result = await db.query('UPDATE reminders SET status = $1 WHERE uuid = $2', [
    status, uuid
  ]);

  return result;
};