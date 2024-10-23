const { decryption, checkValidationRules, checkBodyInline, checkToken, checkApiKey } = require('../../../../middleware/headerValidator');
const express = require('express');
const router = express.Router();
const advertisementModel = require('./advertisement.model');
const advertisement_rules = require('./rules/advertisement.rules.json');

//////////////////////////////////////////////////////////////////////
//                              Advertisement                          //
//////////////////////////////////////////////////////////////////////

router.post("/advertise/estimation-price", checkApiKey,checkToken, decryption,checkBodyInline(advertisement_rules["estimation_price"]), advertisementModel?.Advertisement?.estimationPrice);

// router.post("/advertise/add-payment", checkApiKey,checkToken, decryption,checkBodyInline(advertisement_rules["add-payment"]), advertisementModel?.Advertisement?.addPaymentApi);

router.post("/advertise/add-advertise", checkApiKey,checkToken, decryption,checkBodyInline(advertisement_rules["add-advertise"]), advertisementModel?.Advertisement?.addAdvertisement);

router.post("/advertise/advertise-details", checkApiKey,checkToken, decryption, advertisementModel?.Advertisement?.AdvertisementDetails);

router.post("/advertise/advertise-landing", checkApiKey, decryption, advertisementModel?.Advertisement?.AdvertisementLanding);

router.post("/advertise/delete-advertise", checkApiKey,checkToken, decryption, advertisementModel?.Advertisement?.deleteAdvertise);

router.post("/advertise/edit-advertise", checkApiKey,checkToken,decryption,checkBodyInline(advertisement_rules["edit-advertise"]), advertisementModel?.Advertisement?.editAdvertise);

module.exports = router;