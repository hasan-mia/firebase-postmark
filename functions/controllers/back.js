/* eslint-disable require-jsdoc */
const logger = require('firebase-functions/logger');
const axios = require('axios');
const {POSTMARK_SERVER_TOKEN} = require('../constant');

exports.postmarkWebhook = async (req, res, next) => {
  const {textBody, threadID, recipients, subject, message} = req.body;
  try {
    const isFirstEmail = threadID === null;
    const containsString = textBody.includes('specified_string');

    if (isFirstEmail && containsString) {
      const recipientList = recipients || [];
      await sendBatchResponse(recipientList, subject, message);
    }

    res.status(200).send('Webhook received and processed successfully.');
  } catch (error) {
    logger.error(error.message, {structuredData: true});
    res.status(500).send('Internal server error');
  }
};

// Function to send batch response using Postmark API
async function sendBatchResponse(recipients, subject, message) {
  try {
    const response = await axios.post(
        'https://api.postmarkapp.com/email/batch',
        {
          Messages: recipients.map((recipient) => ({
            From: 'jeff@servicerep.ai',
            To: recipient,
            Subject: subject,
            TextBody: message,
          })),
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Postmark-Server-Token': POSTMARK_SERVER_TOKEN,
          },
        },
    );

    console.log('Batch response sent successfully:', response.data);
    // logger.info(response.data, {structuredData: true});
  } catch (error) {
    logger.error(error.message, {structuredData: true});
  }
}

// Function to send single response using Postmark API
// async function sendSingleResponse(recipient, subject, message) {
//   try {
//     const response = await axios.post(
//         'https://api.postmarkapp.com/email',
//         {
//           From: 'jeff@servicerep.ai',
//           To: recipient,
//           Subject: subject,
//           TextBody: message,
//           MessageStream: 'outbound',
//         },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             'X-Postmark-Server-Token': POSTMARK_SERVER_TOKEN,
//           },
//         },
//     );

//     console.log('Single response sent successfully:', response.data);
//     // logger.info(response.data, { structuredData: true });
//   } catch (error) {
//     logger.error(error.message, {structuredData: true});
//   }
// }

exports.sendReply = async (req, res) => {
  try {
    const messageData = req.body;

    // Check if the incoming email is the first in its thread
    if ((!messageData && !messageData.MessageInfo) || !messageData.MessageInfo.ThreadId) {
      return respondAndLog(res, false, 'Not part of any conversation.');
    }

    const threadId = messageData.MessageInfo.ThreadId;

    // Fetch previous messages within the same thread
    const previousMessages = await getPreviousMessagesFromPostmarkApi(threadId);
    const lastMessage = previousMessages[previousMessages.length - 1];
    const lastMessageBody = lastMessage.Content.Body;
    const targetString = '<PREDEFINED_STRING>';

    // Compare the latest message body against the predefined string
    if (lastMessageBody && lastMessageBody.includes(targetString)) {
      await sendResponseViaPostmarkApi(lastMessage.MessageStream.Id, true);
      return respondAndLog(res, true, 'Response sent successfully.');
    } else {
      return respondAndLog(res, false, 'The body does not match the predefined string.');
    }
  } catch (error) {
    logger.error('Error processing webhook:', error);
    res.status(500).send('Internal server error');
  }
};

// Function to fetch previous messages from Postmark API
async function getPreviousMessagesFromPostmarkApi(threadId) {
  try {
    const response = await axios.get(`https://api.postmarkapp.com/messages?apikey=${POSTMARK_SERVER_TOKEN}&thread_id=${threadId}`);
    return response.data.Messages;
  } catch (error) {
    throw new Error(`Failed to retrieve previous messages: ${error.message}`);
  }
}

// Function to send response using Postmark API
async function sendResponseViaPostmarkApi(messageId, success) {
  try {
    await axios.post(
        'https://api.postmarkapp.com/outbound/send-response',
        {MessageID: messageId, Status: success ? 'Delivered' : 'Deferred'},
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-PM-ApiKey': POSTMARK_SERVER_TOKEN,
          },
        },
    );
  } catch (error) {
    throw new Error(`Failed to send response: ${error.message}`);
  }
}

function respondAndLog(res, success, message) {
  logger.info(message);
  res.status(success ? 200 : 400).json({success, message});
}
