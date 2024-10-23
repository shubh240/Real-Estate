var express = require('express');
var router = express.Router();

router.use('/socket', require('./Chat/chat.route'));

module.exports = router;