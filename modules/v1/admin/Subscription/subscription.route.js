const { decryption, checkValidationRules, checkBodyInline, checkToken, checkApiKey, checkTokenAdmin } = require('../../../../middleware/headerValidator');
const express = require('express');
const router = express.Router();
const subscriptionModel = require('./subscription.model');
const subscription_rules = require('./rules/subscription.rules.json');

//////////////////////////////////////////////////////////////////////
//                              Advertisement                          //
//////////////////////////////////////////////////////////////////////

router.post("/add-subscription", checkApiKey,checkTokenAdmin, decryption,checkBodyInline(subscription_rules["add-subscription"]), subscriptionModel?.Subscription?.addSubscription);

router.post("/subscription-details", checkApiKey, decryption, subscriptionModel?.Subscription?.SubscriptionDetails);

router.post("/edit-subscription", checkApiKey,checkTokenAdmin,decryption,checkBodyInline(subscription_rules["edit-subscription"]), subscriptionModel?.Subscription?.editSubscription);

module.exports = router;