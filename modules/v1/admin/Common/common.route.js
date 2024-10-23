const { decryption, checkValidationRules, checkBodyInline, checkToken, checkApiKey, checkTokenAdmin } = require('../../../../middleware/headerValidator');
const express = require('express');
const router = express.Router();
const commonModel = require('./common.model');
const common_rules = require('./rules/common.rules.json');

//////////////////////////////////////////////////////////////////////
//                             Common                               //
//////////////////////////////////////////////////////////////////////

router.get("/country_list", checkApiKey, decryption, commonModel?.Common?.countryList);

router.post("/app_content", checkApiKey, decryption, commonModel?.Common?.appContent);

router.post("/edit_app_content", checkApiKey, checkTokenAdmin, decryption, commonModel?.Common?.editAppContent);

router.post("/contact-us",checkApiKey,checkTokenAdmin,decryption,commonModel?.Common?.listContactUs);

router.post("/edit-contact-us",checkApiKey,checkTokenAdmin,decryption,commonModel?.Common?.changeContactStatus);

router.post("/add_faq", checkApiKey,checkTokenAdmin,decryption, commonModel?.Common?.addFAQ);

router.post("/edit_faq", checkApiKey,checkTokenAdmin,decryption, commonModel?.Common?.editFAQ);

router.post("/faq_list", checkApiKey,decryption, commonModel?.Common?.faqList);

router.post("/add-resource", checkApiKey,checkTokenAdmin,decryption, commonModel?.Common?.addResource);

router.post("/edit-resource", checkApiKey,checkTokenAdmin,decryption, commonModel?.Common?.editResource);

router.post("/list-resource-admin", checkApiKey,checkTokenAdmin,decryption, commonModel?.Common?.listResourceAdmin);

router.post("/list-resource", checkApiKey,decryption, commonModel?.Common?.listResource);

router.post("/list-notification", checkApiKey,decryption,checkTokenAdmin, commonModel?.Common?.listNotificationn);

router.post("/delete-notification", checkApiKey,decryption,checkTokenAdmin, commonModel?.Common?.deleteNotification);

router.post("/list-web-notification", checkApiKey,decryption,checkToken, commonModel?.Common?.listWebNotificationn);


module.exports = router;