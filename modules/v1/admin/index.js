var express = require('express');
var router = express.Router();

router.use('/auth', require('./Auth/auth.route'));
router.use('/properties', require('./Property/property.route'));
router.use('/common', require('./Common/common.route'));
router.use('/customer', require('./Customer/customer.route'));
router.use('/advertisement', require('./Advertisement/advertisement.route'));
router.use('/subscription', require('./Subscription/subscription.route'));

module.exports = router;