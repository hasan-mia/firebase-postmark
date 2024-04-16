module.exports.API_PREFIX = process.env.API_PREFIX || '/v1';
module.exports.SMPT_SERVICE = process.env.SMPT_SERVICE ?
  process.env.SMPT_SERVICE :
  'gmail';
module.exports.SMPT_HOST = process.env.SMPT_HOST ?
  process.env.SMPT_HOST :
  'smtp.gmail.com';
module.exports.SMPT_PORT = process.env.SMPT_PORT ? process.env.SMPT_PORT : '465';
module.exports.SMPT_MAIL = process.env.SMPT_MAIL ?
  process.env.SMPT_MAIL :
  'jeff@servicerep.ai';
module.exports.SMPT_PASSWORD = process.env.SMPT_PASSWORD ?
  process.env.SMPT_PASSWORD :
  'password';
module.exports.SMS_TOKEN = process.env.SMS_TOKEN ?
  process.env.SMS_TOKEN :
  'password';
module.exports.APP_PASSWORD = process.env.APP_PASSWORD ?
  process.env.APP_PASSWORD :
  'password';

module.exports.POSTMARK_SERVER_TOKEN = process.env.POSTMARK_SERVER_TOKEN ?
  process.env.POSTMARK_SERVER_TOKEN :
  'a42f371e-666c-45a9-b7b1-0b40e4fc00b4';
