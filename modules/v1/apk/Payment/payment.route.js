const { decryption, checkValidationRules, checkBodyInline, checkToken, checkApiKey } = require('../../../../middleware/headerValidator');
const express = require('express');
const router = express.Router();
const paymentModel = require('./payment.model');
const payment_rules = require('./rules/payment.rules.json');

//////////////////////////////////////////////////////////////////////
//                              Advertisement                          //
//////////////////////////////////////////////////////////////////////

router.post("/advertise/estimation-price", checkApiKey,checkToken, decryption,checkBodyInline(advertisement_rules["estimation_price"]), advertisementModel?.Advertisement?.estimationPrice);

router.post("/advertise/add-advertise", checkApiKey,checkToken, decryption,checkBodyInline(advertisement_rules["add-advertise"]), advertisementModel?.Advertisement?.addAdvertisement);

router.post("/advertise/advertise-details", checkApiKey, decryption, advertisementModel?.Advertisement?.AdvertisementDetails);

router.post("/advertise/delete-advertise", checkApiKey,checkToken, decryption, advertisementModel?.Advertisement?.deleteAdvertise);

router.post("/advertise/edit-advertise/:id", checkApiKey,checkToken,decryption,checkBodyInline(advertisement_rules["add-advertise"]), advertisementModel?.Advertisement?.editAdvertise);

module.exports = router;