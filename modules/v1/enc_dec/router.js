const express = require('express');
const { sendResponse } = require('../../../middleware/headerValidator');
const router = express.Router();
const model = require('./model');

/*==================================================== 
   encryption api                                                                               
====================================================== */

router.post('/encryption', (req, res) => {

    let request = req.body;
    model.reactEncryption(request, res, (responseCode, responseMsg, responseData) => {
        sendResponse(req, res, 200, responseCode, responseMsg, responseData);
    });

})

router.post('/decryption', (req, res) => {

    let request = req.body;
    model.reactDecryption(request, res, (responseCode, responseMsg, responseData) => {
        sendResponse(req, res, 200, responseCode, responseMsg, responseData);
    });

})

module.exports = router;