const { decryption, checkValidationRules, checkBodyInline, checkToken, checkApiKey, checkTokenAdmin } = require('../../../../middleware/headerValidator');
const express = require('express');
const router = express.Router();
const advertisementModel = require('./advertisement.model');
const advertisement_rules = require('./rules/advertisement.rules.json');

//////////////////////////////////////////////////////////////////////
//                              Advertisement                          //
//////////////////////////////////////////////////////////////////////

router.post("/advertise/add-advertise", checkApiKey,checkTokenAdmin, decryption,checkBodyInline(advertisement_rules["add-advertise"]), advertisementModel?.Advertisement?.addAdvertisement);

router.post("/advertise/advertise-details", checkApiKey,checkTokenAdmin, decryption, advertisementModel?.Advertisement?.AdvertisementDetails);

router.post("/advertise/delete-advertise", checkApiKey,checkTokenAdmin, decryption, advertisementModel?.Advertisement?.deleteAdvertise);

router.post("/advertise/edit-advertise", checkApiKey,checkTokenAdmin,decryption,checkBodyInline(advertisement_rules["edit-advertise"]), advertisementModel?.Advertisement?.editAdvertise);

module.exports = router;