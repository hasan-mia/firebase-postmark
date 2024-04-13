module.exports.API_PREFIX = process.env.API_PREFIX || '/v1';
module.exports.PORT = process.env.PORT || 5000;
module.exports.MONGO_URI =
  process.env.NODE_ENV == 'production' ?
    process.env.MONGO_URI :
    'mongodb+srv://todo:prithila23@cluster0.xnn0u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

module.exports.JWT_SECRET = process.env.JWT_SECRET ?
  process.env.JWT_SECRET :
  'fjhhIOHfjkflsjagju0fujljldfglse';
module.exports.JWT_EXPIRE = process.env.JWT_EXPIRE ?
  process.env.JWT_EXPIRE :
  '5d';
module.exports.COOKIE_EXPIRE = process.env.COOKIE_EXPIRE ?
  process.env.COOKIE_EXPIRE :
  '2';
module.exports.SMPT_SERVICE = process.env.SMPT_SERVICE ?
  process.env.SMPT_SERVICE :
  'gmail';
module.exports.SMPT_HOST = process.env.SMPT_HOST ?
  process.env.SMPT_HOST :
  'smtp.gmail.com';
module.exports.SMPT_PORT = process.env.SMPT_PORT ? process.env.SMPT_PORT : '465';
module.exports.SMPT_MAIL = process.env.SMPT_MAIL ?
  process.env.SMPT_MAIL :
  'example@gmail.com';
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
