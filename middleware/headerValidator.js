const { SELECT_Q } = require('../utils/SQLWorker');
const { ENCRYPTION_BYPASS } = require('../config/constants.js');
const en = require('../languages/en.js');
const CryptoJS = require('crypto-js');
const SECRET = CryptoJS.enc.Utf8.parse(process.env.KEY);
const IV = CryptoJS.enc.Utf8.parse(process.env.IV);
const cryptoLib = require('cryptlib');
const shaKey = cryptoLib.getHashSha256(process.env.KEY, 32);

const { default: localizify } = require('localizify');
const { t } = require('localizify');
const jwt = require('jsonwebtoken');
const fr = require('../languages/fr.js');

const checkApiKey = function (req, res, next) {
    if (req.headers['api-key']) {
        let apiKey = CryptoJS.AES.decrypt(req.headers['api-key'], SECRET, { iv: IV }).toString(CryptoJS.enc.Utf8)
        apiKey = apiKey.replace(/"/g, '');
        if (apiKey && apiKey == process.env.API_KEY) {
            next();
        } else {
            sendResponse(req, res, 401, '-1', { keyword: 'invalid_api_key', components: {} });
        }
    } else {
        sendResponse(req, res, 401, '-1', { keyword: 'invalid_api_key', components: {} });
    }

}

const checkToken = async function (req, res, next) {
    let encrypt_token = encryption(req.headers['token']);

    try {
        req.loginUser = {};
        let token = ''

        token = CryptoJS.AES.decrypt(encrypt_token, SECRET, { iv: IV }).toString(CryptoJS.enc.Utf8)
        token = token.replace(/^"|"$/g, '');

        const { data } = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.loginUser = data.user_id;

        const is_block = await SELECT_Q(`select * from tbl_user_device where token = '${token}' `, false);

        if (is_block.length > 0) {
            next();
        }
        else {
            sendResponse(req, res, 401, '-1', { keyword: "user_blocked_by_admin", components: {} }, {});
        }

    } catch (e) {
        let keyword = 'token_invalid';

        if (e.message == 'user_inactive_by_admin') {
            keyword = 'user_inactive_by_admin'
        } else if (e.message == 'user_blocked_by_admin') {
            keyword = 'user_blocked_by_admin'
        }

        sendResponse(req, res, 401, '-1', { keyword: keyword, components: {} }, {});
    }
}

const checkTokenAdmin = async function (req, res, next) {
    let encrypt_token = encryption(req.headers['token']);

    try {
        req.loginUser = {};
        let token = ''

        token = CryptoJS.AES.decrypt(encrypt_token, SECRET, { iv: IV }).toString(CryptoJS.enc.Utf8)
        token = token.replace(/^"|"$/g, '');

        const { data } = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.loginUser = data.user_id;

        const is_block = await SELECT_Q(`select * from tbl_admin_device where token = '${token}' `, false);

        if (is_block.length > 0) {
            next();
        }
        else {
            sendResponse(req, res, 401, '-1', { keyword: "unauthorized", components: {} }, {});
        }


    } catch (e) {
        let keyword = 'token_invalid';

        if (e.message == 'user_inactive_by_admin') {
            keyword = 'user_inactive_by_admin'
        } else if (e.message == 'user_blocked_by_admin') {
            keyword = 'user_blocked_by_admin'
        }

        sendResponse(req, res, 401, '-1', { keyword: keyword, components: {} }, {});
    }
}

// Function to check validation rules for all api's 
const checkBodyInline = (rules, messages = {}, keywords = {}) => {
    return (req, res, next) => {
        let v = require('Validator').make(req.body, rules, messages, keywords);
        if (v.fails()) {
            let Validator_errors = v.getErrors();

            for (let key in Validator_errors) {
                error = Validator_errors[key][0];
                break;
            }

            res.status(200);
            res.json(encryption({ code: '0', message: error }, req));
        } else {
            next();
        }
    };
};

const checkValidationRules = function (req, res, rules) {
    let v = require('Validator').make(req.body, rules, {}, {});
    if (v.fails()) {
        let Validator_errors = v.getErrors();

        for (let key in Validator_errors) {
            error = Validator_errors[key][0];
            break;
        }

        res.status(200);
        res.json(encryption({ code: '0', message: error }, req));
        return false;
    } else {
        return true;
    }
}

// Function to return response for any api
const sendResponse = function (req, res, statuscode, responsecode, { keyword, components }, responsedata) {
    const language = req.headers['accept-language'] || 'en';
    let formatmsg = getMessage(language, keyword, components);
    let encrypted_data = ''
    if (req?.headers['app'] == 'content') {
        encrypted_data = { code: responsecode, message: formatmsg, data: responsedata };
    } else {
        encrypted_data = encryption({ code: responsecode, message: formatmsg, data: responsedata }, req);
    }

    res.status(statuscode);
    res.send(encrypted_data);
}

const decryption = function (req, res, next) {
    if (!ENCRYPTION_BYPASS) {
        try {
            if (req.body != undefined && Object.keys(req.body).length !== 0) {
                req.body = JSON.parse(CryptoJS.AES.decrypt(req.body, SECRET, { iv: IV }).toString(CryptoJS.enc.Utf8));
                next();
            } else {
                next();
            }
        } catch (error) {
            res.status(200);
            res.json({ code: 0, message: "badEncrypt" });
        }
    } else {
        next();
    }
}

// Function to encrypt the response body before sending response
const encryption = function (response_data) {
    if (!ENCRYPTION_BYPASS) {
        return CryptoJS.AES.encrypt(JSON.stringify(response_data), SECRET, { iv: IV }).toString();
    } else {
        return response_data;
    }
}

// Function to send users language from any place
const getMessage = function (requestLanguage, key, value) {
    // req.language = requestLanguage
    try {
        localizify
            .add('en', en)
             .add("fr", fr)
            .setLocale(requestLanguage);

        let message = t(key, value);

        return message;
    } catch (e) {
        return "Something went wrong";
    }
}


const decryptionjs = (encrypted_text, callback) => {
    try {
        if (typeof encrypted_text === 'object' && Object.keys(encrypted_text).length === 0) {
            callback({});
        } else if (typeof encrypted_text === 'object' && Object.keys(encrypted_text).length !== 0) {
            var decrypted = JSON.parse(CryptoJS.AES.decrypt(encrypted_text, SECRET, { iv: IV }).toString(CryptoJS.enc.Utf8));
            callback(decrypted);
        } else if (encrypted_text != undefined && encrypted_text != null && encrypted_text != '' && typeof encrypted_text !== 'object') {
            var decrypted = CryptoJS.AES.decrypt(encrypted_text, SECRET, { iv: IV }).toString(CryptoJS.enc.Utf8);
            callback(decrypted);
        } else {
            callback({});
        }
    } catch (error) {
        callback('encryption is in correct Please check', error);
    }
}

const encryptionjs = (response_data, callback) => {
    var data;
    try {
        data = JSON.parse(response_data);
    } catch (error) {
        data = response_data
    }
    let encrypted = CryptoJS.AES.encrypt(data, SECRET, { iv: IV }).toString();

    callback(encrypted);
}

const translateMsg = function (language, message) {
    
    localizify
    .add("en", en)
    .add("fr", fr)
    .setLocale(language);
    
    return t(message.keyword, message.content)
}

module.exports = {
    checkApiKey,
    checkToken,
    sendResponse,
    checkValidationRules,
    decryption,
    encryption,
    checkBodyInline,
    decryptionjs,
    encryptionjs,
    checkTokenAdmin,
    translateMsg
};
