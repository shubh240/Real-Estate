require('dotenv').config();
const jwt = require('jsonwebtoken');
const { SELECT_Q, UPDATE_Q, INSERT_Q } = require('../utils/SQLWorker');
const { sendResponse } = require('../middleware/headerValidator');
const nodemailer = require("nodemailer");
const { BASE_URL, PROFILE_IMAGE, APP_NAME, PUSH_KEY, P8_CERTIFICATE, KEY_ID, TEAM_ID, DOCUMENTS } = require('../config/constants');
const con = require('../config/database');

const common = {

    generateToken() {
        var randtoken = require('rand-token').generator();

        var usersession = randtoken.generate(64, "0123456798abcdefghijklmnopqrstuvwxyz")

        return usersession;
    },

    jwt_validate: async (token) => {
        try {
            const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);

            if (verified) {
                return verified;
            } else {
                throw new Error("token_invalid");
            }
        } catch (error) {
            // Access Denied 
            throw new Error("token_invalid");
        }
    },

    jwt_sign: (user_id, expiresIn = "30days") => {
        const enc_data = {
            expiresIn,
            data: { user_id }
        }

        const token = jwt.sign(enc_data, process.env.JWT_SECRET_KEY);
        return token;
    },

    otp: (request, callback) => {
        var OTPCODE = Math.floor(1000 + Math.random() * 9000);

        return OTPCODE;
    },

    sendSMS: function (phone, message, callback) {
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const client = require("twilio")(accountSid, authToken);

        client.messages
            .create({
                body: message,
                from: process.env.TWILLIO_NUMBER,
                to: phone,
            })
            .then((message) => {
                callback(true);
            })
            .catch((e) => {
                callback(false);
            });
    },

    sendEmail: (to_mail, subject, message) => {
        return new Promise((resolve, reject) => {

            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD
                }
            });
            var mailOptions = {
                from: process.env.EMAIL,
                to: to_mail,
                subject: subject,
                html: message
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (!error) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            });

        });
    },

    // sendSMS: function (phone, message) {
    //     return new Promise((resolve, reject) => {
    //         if (phone != '' && phone != undefined) {
    //             resolve(true);
    //         } else {
    //             resolve(false);
    //         }
    //     });
    // },

    checkDeviceInfo: function (user_id) {
        return new Promise(async (resolve, reject) => {
            try {
                let user_device_data = await SELECT_Q(`SELECT * FROM tbl_user_device WHERE user_id = '${user_id}'`);
                resolve(user_device_data);
            } catch {
                resolve(false);
            }
        });
    },

    updateDeviceInfo: function (user_id, params) {
        return new Promise(async (resolve, reject) => {
            try {
                let update_device_data = await con.query(`UPDATE tbl_user_device SET token=$1,device_token=$2,device_name=$3,device_type=$4,os_version=$5,app_version=$6 WHERE user_id = '${user_id}'`, params);
                resolve(update_device_data);
            } catch (e) {
                reject(e)
            }
        });
    },

    addDeviceInformation: function (params) {

        return new Promise(async (resolve, reject) => {
            try {
                let { rows: insert_device_data } = await con.query(`INSERT INTO tbl_user_device (token, device_token,device_name, device_type , os_version , app_version,user_id)
                VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`, params);
                resolve(insert_device_data?.[0]);
            } catch (e) {
                reject(e)
            }
        });
    },

    checkUpdateDeviceInfo: function (user_id, params) {
        return new Promise(async (resolve, reject) => {
            try {
                let DeviceInfo = await common.checkDeviceInfo(user_id);
                let upd_device = [
                    params?.token || DeviceInfo?.token || null,
                    params?.device_token || null,
                    params?.device_name || '',
                    params?.device_type || null,
                    params?.os_version || '',
                    params?.app_version || ''
                ]

                if (DeviceInfo) {
                    let result = await common.updateDeviceInfo(user_id, upd_device);
                    resolve(result);
                } else {
                    upd_device.push(user_id);
                    let result = await common.addDeviceInformation(upd_device);
                    resolve(result);
                }
            } catch (e) {
                reject(e);
            }
        });
    },

    checkAdminDeviceInfo: function (admin_id) {
        return new Promise(async (resolve, reject) => {
            try {
                let admin_device_data = await SELECT_Q(`SELECT * FROM tbl_admin_device WHERE admin_id = '${admin_id}'`);
                resolve(admin_device_data);
            } catch {
                resolve(false);
            }
        });
    },

    updateAdminDeviceInfo: function (admin_id, params) {
        return new Promise(async (resolve, reject) => {
            try {
                let update_device_data = await con.query(`UPDATE tbl_admin_device SET token=$1,device_token=$2,device_name=$3,device_type=$4,os_version=$5,app_version=$6 WHERE admin_id = '${admin_id}'`, params);
                resolve(update_device_data);
            } catch (e) {
                reject(e)
            }
        });
    },

    addAdminDeviceInformation: function (params) {
        return new Promise(async (resolve, reject) => {
            try {``
                let { rows: insert_device_data } = await con.query(`INSERT INTO tbl_admin_device (token, device_token,device_name, device_type , os_version , app_version,admin_id)
                VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`, params);
                resolve(insert_device_data?.[0]);
            } catch (e) {
                reject(e)
            }
        });
    },

    checkAdminDevice: function (admin_id, params) {
        return new Promise(async (resolve, reject) => {
            try {
                let DeviceInfo = await common.checkAdminDeviceInfo(admin_id);
                let upd_device = [
                    params?.token || DeviceInfo?.token || null,
                    params?.device_token || null,
                    params?.device_name || '',
                    params?.device_type || null,
                    params?.os_version || '',
                    params?.app_version || ''
                ]

                
                if (DeviceInfo) {
                    let result = await common.updateAdminDeviceInfo(admin_id, upd_device);
                    resolve(result);
                } else {
                    upd_device.push(admin_id);
                    let result = await common.addAdminDeviceInformation(upd_device);
                    resolve(result);
                }
            } catch (e) {
                reject(e);
            }
        });
    },
}

module.exports = common

