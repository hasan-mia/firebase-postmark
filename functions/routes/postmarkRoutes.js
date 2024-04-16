const express = require('express');
const {sendMessage, postmarkWebhook} = require('../controllers/postmarkController');

const router = express.Router();

router.post('/postmark/message', sendMessage);

router.post('/postmarkhook', postmarkWebhook);

module.exports = router;
