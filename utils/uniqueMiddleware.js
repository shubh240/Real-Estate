const con = require('../config/database');
const { sendResponse } = require('../middleware/headerValidator');
const { SELECT_Q } = require('./SQLWorker');

const uniqueCheck = {

    CheckMobile: async (req, res, next) => {
        let { body } = req;
        try {
            let mobileCheck = await SELECT_Q(`Select country_code_id,mobile_number from tbl_user where is_deleted=0 and is_active=1 and mobile_number='${body?.mobile_number}' and country_code_id='${body?.country_code_id}'`);
          
            if (mobileCheck) {
                sendResponse(req, res, 200, '0', { keyword: 'text_field_already_exist', components: { key: (body?.country_code_id + ' ' + body?.mobile_number) } });
            } else {
                await con.query(`delete from tbl_user where signup_otp_verify='0' and mobile_number='${body?.mobile_number}' and country_code_id='${body?.country_code_id}'`)
                next();
            }
        } catch (error) {
            if (error === "no_data") {
                next();
            } else {
                console.error('Error in CheckMobile:', error);
                sendResponse(req, res, 500, '1', { keyword: 'internal_server_error' });
            }
        }
    },

    CheckMobile1: async (req, res, next) => {
        let { body } = req;
        try {
            let mobileCheck = await SELECT_Q(`Select country_code_id,mobile_number from tbl_otp where is_deleted='0' and mobile_number='${body?.mobile_number}' and country_code_id='${body?.country_code_id}'`);
   
            if (mobileCheck) {
                sendResponse(req, res, 200, '10', { keyword: 'text_email__mobile_field_already_exist', components: { key: (body?.country_code_id + ' ' + body?.mobile_number) } });
            } else {
                await con.query(`delete from tbl_otp where is_otp_verified='0' and mobile_number='${body?.mobile_number}' and country_code='${body?.country_code_id}'`)
                next();
            }
        } catch (error) {
            if (error === "no_data") {
                next();
            } else {
                console.error('Error in CheckMobile:', error);
                sendResponse(req, res, 500, '1', { keyword: 'internal_server_error' });
            }
        }
    },

    CheckMobileExist: async (req, res, next) => {
        let { body } = req;
        try {

            let checkForgotPass = `select * from tbl_otp where country_code_id = $1 AND mobile_number = $2 `
            let valuesPass = [body.country_code_id, body.mobile_number];

            let { rows } = await con.query(checkForgotPass, valuesPass);
            if (rows.length > 0) {
                next();
            } else {
                sendResponse(req, res, 200, '0', { keyword: 'mobile_field_not_exist', components: { key: (body?.country_code_id + ' ' + body?.mobile_number) } });
            }

        } catch (error) {
            sendResponse(req, res, 500, '1', { keyword: 'internal_server_error' });
        }
    },

    CheckEmailExist: async (req, res, next) => {
        let { body } = req;
        try {

            let checkForgotPass = `select * from tbl_otp where email = $1 `
            let valuesPass = [body.email];

            let { rows } = await con.query(checkForgotPass, valuesPass);
            if (rows.length > 0) {
                next();
            } else {
                sendResponse(req, res, 200, '0', { keyword: 'email_field_not_exist', components: {} });
            }

        } catch (error) {
            sendResponse(req, res, 500, '1', { keyword: 'internal_server_error' });
        }
    },

    CheckEmail: async (req, res, next) => {
        let { body } = req;
        try {
            let emailCheck = await SELECT_Q(`Select email from tbl_user where is_deleted='0' and email='${body?.email}'`);
            if (emailCheck) {
                sendResponse(req, res, 200, '0', { keyword: 'text_field_already_exist', components: { key: (body?.email) } });
            } else {
                await con.query(`delete from tbl_user where is_otp_verified='0' and email='${body?.email}'`)
                next();
            }
        } catch (error) {
            if (error === "no_data") {
                next();
            } else {
                sendResponse(req, res, 500, '1', { keyword: 'internal_server_error' });
            }
        }
    },

    CheckEmail1: async (req, res, next) => {
        let { body } = req;
        try {
            let emailCheck = await SELECT_Q(`SELECT email FROM tbl_otp WHERE is_deleted='0' AND email='${body?.email}'`);
            if (emailCheck) {
                sendResponse(req, res, 200, '10', { keyword: 'text_email__mobile_field_already_exist', components: { key: (body?.email) } });
            } else {
                await con.query(`delete from tbl_otp where is_otp_verified='0' and email='${body?.email}'`)
                next();
            }
        } catch (error) {
            if (error === "no_data") {
                next();
            } else {
                sendResponse(req, res, 500, '1', { keyword: 'internal_server_error' });
            }
        }
    },

    CheckEmailAgentLender: (tableName) => {
        return async (req, res, next) => {
            let { body } = req;
            try {
                let emailCheck = await SELECT_Q(`Select email from ${tableName} where is_deleted='0' and email='${body?.email}'`);
                if (emailCheck) {
                    sendResponse(req, res, 200, '0', { keyword: 'text_field_already_exist', components: { key: body?.email } });
                }
            } catch (error) {
                if (error === "no_data") {
                    next();
                } else {
                    sendResponse(req, res, 500, '1', { keyword: 'internal_server_error' });
                }
            }
        }
    },

    CheckMobileAgentLender: (tableName) => {
        return async (req, res, next) => {
            let { body } = req;
            try {
                let mobileCheck = await SELECT_Q(`SELECT country_code, mobile_number FROM ${tableName} WHERE is_deleted=0 AND is_active=1 AND mobile_number='${body?.mobile_number}' AND country_code='${body?.country_code_id}'`);
                if (mobileCheck) {
                    sendResponse(req, res, 200, '0', { keyword: 'text_field_already_exist', components: { key: (body?.country_code_id + ' ' + body?.mobile_number) } });
                } else {
                    await con.query(`DELETE FROM tbl_user WHERE signup_otp_verify='0' AND mobile_number='${body?.mobile_number}' AND country_code_id='${body?.country_code_id}'`);
                    next();
                }
            } catch (error) {
                if (error === "no_data") {
                    next();
                } else {
                    console.error('Error in CheckMobile:', error);
                    sendResponse(req, res, 500, '1', { keyword: 'internal_server_error' });
                }
            }
        }
    }
}

module.exports = uniqueCheck;