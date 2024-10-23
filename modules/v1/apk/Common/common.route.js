const { decryption, checkValidationRules, checkBodyInline, checkToken, checkApiKey } = require('../../../../middleware/headerValidator');
const express = require('express');
const router = express.Router();
const commonModel = require('./common.model');
const common_rules = require('./rules/common.rules.json');

//////////////////////////////////////////////////////////////////////
//                             Common                               //
//////////////////////////////////////////////////////////////////////
router.post("/add-contact-us", checkApiKey, decryption, commonModel?.Common?.addContactUs);


module.exports = router;