const postmark = require('postmark');
const logger = require('firebase-functions/logger');
const {POSTMARK_SERVER_TOKEN} = require('../constant');

const client = new postmark.ServerClient(POSTMARK_SERVER_TOKEN);


exports.sendMessage = async (req, res, next) => {
  const {recipient, subject, message} = req.body;
  try {
    const response = await client.sendEmail({
      'From': 'jeff@servicerep.ai',
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

exports.postmarkWebhook = async (req, res)=>{
  const email = req.body['Message'];

  if (email['TextBody'].includes('order')) {
    client.sendEmail({
      From: 'jeff@servicerep.ai',
      To: email['From'],
      Subject: 'Automated Response',
      TextBody: 'This is an automated response to your email.',
    }).then((response) => {
      console.log('Automated response sent successfully', response.data);
      logger.success(response.data, {structuredData: true});
    }).catch((error) => {
      logger.error(error.message, {structuredData: true});
      console.error('Error sending automated response:', error.message);
    });
  }

  res.status(200).send('Webhook received successfully');
};

