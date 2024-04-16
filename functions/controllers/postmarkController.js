const postmark = require('postmark');
const logger = require('firebase-functions/logger');
const {POSTMARK_SERVER_TOKEN, SMPT_MAIL} = require('../constant');

const client = new postmark.ServerClient(POSTMARK_SERVER_TOKEN);


// =========Send Automated Email Webhook=================
exports.postmarkWebhook = async (req, res)=>{
  console.log('Data:', req.body);
  const email = req.body['Message'];

  if (email['TextBody'].includes('auto')) {
    client.sendEmail({
      From: SMPT_MAIL,
      To: email['From'],
      Subject: 'Automated Response',
      TextBody: 'This is an automated response to your email.',
    }).then((response) => {
      console.log('Response sent successfully', response.data);
      logger.success(response.data, {structuredData: true});
    }).catch((error) => {
      logger.error(error.message, {structuredData: true});
      console.error('Error sending automated response:', error.message);
    });
  }

  res.status(200).send('Webhook received successfully');
};


// =========Send Email=================
exports.sendMessage = async (req, res, next) => {
  const {recipient, subject, message} = req.body;
  try {
    const response = await client.sendEmail({
      'From': SMPT_MAIL,
      'To': recipient,
      'Subject': subject,
      'HtmlBody': '<strong>Hello</strong> dear user.',
      'TextBody': message,
      'MessageStream': 'replies',
    });

    console.log(response);

    res.send('Email sent successfully:', response);
  } catch (error) {
    res.send('Error sending email:', error);
  }
};
