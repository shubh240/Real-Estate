const { decryption, checkValidationRules, checkBodyInline, checkToken, checkApiKey, checkTokenAdmin } = require('../../../../middleware/headerValidator');
const express = require('express');
const router = express.Router();
const customerModel = require('./customer.model');
const customer_rules = require('./rules/customer.rules.json');

//////////////////////////////////////////////////////////////////////
//                              Properties                          //
//////////////////////////////////////////////////////////////////////

router.post("/customer/customerlist", checkApiKey,checkTokenAdmin, decryption, customerModel?.Customer?.CustomerListing);

router.post("/customer/allcustomerlist", checkApiKey,checkTokenAdmin, decryption, customerModel?.Customer?.AllCustomer);

router.post("/customer/block-unblock", checkApiKey,checkTokenAdmin, decryption, customerModel?.Customer?.blockUnblock);

router.post("/customer/deletedCustomer", checkApiKey,checkTokenAdmin, decryption, customerModel?.Customer?.deletedCustomer);






module.exports = router;