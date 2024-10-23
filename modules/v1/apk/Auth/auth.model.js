const { SELECT_Q } = require('../../../../utils/SQLWorker');
const { sendResponse, translateMsg } = require('../../../../middleware/headerValidator');
const { jwt_sign, sendEmail, checkUpdateDeviceInfo, company_details, sendSMS, client_details, employee_details } = require('../../../../utils/common');
const CryptoJS = require('crypto-js');
const SECRET = CryptoJS.enc.Utf8.parse(process.env.KEY);
const IV = CryptoJS.enc.Utf8.parse(process.env.KEY);
const moment = require('moment');
const con = require('../../../../config/database');
const common = require('../../../../utils/common');
const { sendOtpTemplate } = require('../../../../config/common');
//////////////////////////////////////////////////////////////////////
//                            Auth API                              //
//////////////////////////////////////////////////////////////////////

let Auth = {

    updateUser: async (setData, submitData, user_id) => {
        return new Promise(async (resolve, reject) => {
            try {
                let { rows } = await con.query(`UPDATE tbl_user SET ${setData} WHERE id = '${user_id}' RETURNING *`, submitData);
                resolve(rows?.[0])
            } catch (e) {
                reject(e);
            }
        })
    },

    updateOtpUser: async (setData, submitData, user_id) => {
        return new Promise(async (resolve, reject) => {
            try {
                let { rows } = await con.query(`UPDATE tbl_otp SET ${setData} WHERE id = '${user_id}' RETURNING *`, submitData);
                resolve(rows?.[0])
            } catch (e) {
                reject(e);
            }
        })
    },

    updateOtpByMobile: async (setData, submitData, country_code_id, mobile_number) => {
        return new Promise(async (resolve, reject) => {
            try {
                let { rows } = await con.query(`UPDATE tbl_otp SET ${setData} WHERE country_code_id = '${country_code_id}' AND mobile_number='${mobile_number}' RETURNING *`, submitData);
                resolve(rows?.[0])
            } catch (e) {
                reject(e);
            }
        })
    },

    updateOtpByEmail: async (setData, submitData, email) => {
        return new Promise(async (resolve, reject) => {
            try {
                let { rows } = await con.query(`UPDATE tbl_otp SET ${setData} WHERE email = '${email}' RETURNING *`, submitData);
                resolve(rows?.[0])
            } catch (e) {
                reject(e);
            }
        })
    },

    sendOtp: async (req, res) => {
        try {
            let { body } = req;
            var insertData = {
                country_code_id: body?.country_code_id,
                mobile_number: body?.mobile_number,
                otp: common.otp(),
                is_otp_verified: false,
                otp_type: body.otp_type,
                email: body.email
            }

            // let sqlQuery = await con.query(`select * from tbl_otp where is_deleted='true' and country_code_id='${body?.country_code_id}' and email='${body?.email}' and mobile_number='${body?.mobile_number}'`)

            // if (sqlQuery) {

            // }
            // else{
                
            // }
            let sql = `INSERT INTO tbl_otp (country_code_id, mobile_number, otp, is_otp_verified,otp_type,email) VALUES ($1, $2, $3, $4,$5,$6) RETURNING id`;
            let values = [insertData.country_code_id, insertData.mobile_number, insertData.otp, insertData.is_otp_verified, insertData.otp_type, insertData.email];

            let { rows } = await con.query(sql, values);

            // send email
            const subject = 'Your Sign-Up OTP Code';
            const emailTemplate = await sendOtpTemplate({ otp: insertData.otp, type: "Sign-Up Otp" });

            const emailSent = await sendEmail(body?.email, subject, emailTemplate);

            if (emailSent) {

                let user_id = rows[0].id;

                let result = await SELECT_Q(`select id as user_id ,country_code_id,mobile_number ,otp,email from tbl_otp where id = ${user_id} and is_deleted = false`)

                return sendResponse(req, res, 200, '1', { keyword: "otp_sent", components: {} }, result[0]);
            } else {
                return sendResponse(req, res, 200, '0', { keyword: "faild_otp_sent", components: {} });
            }

        } catch (e) {
            return sendResponse(req, res, 200, '0', { keyword: "faild_otp_sent", components: {} }, e?.message);
        }
    },

    reSendOtp: async (req, res) => {
        try {
            let { body } = req;
            var insertData = {
                email: body?.email,
                otp: common.otp(),
                is_otp_verified: false,
                otp_type: body?.otp_type
            }

            let userData = [
                insertData?.otp,
                false
            ]

            await Auth.updateOtpByEmail(`otp=$1 ,is_otp_verified=$2`, userData, insertData?.email);

            const subject = 'Resend Otp!';
            const emailTemplate = await sendOtpTemplate({ otp: insertData.otp, type: "ReSend Otp" });

            const emailSent = await sendEmail(body?.email, subject, emailTemplate);

            const result = [
                {
                    country_code_id: body?.country_code_id,
                    mobile_number: body?.mobile_number,
                    otp: insertData?.otp,
                    email: insertData?.email
                }
            ]

            if (emailSent) {
                return sendResponse(req, res, 200, '1', { keyword: "otp_sent", components: {} }, result[0]);
            } else {
                return sendResponse(req, res, 200, '0', { keyword: "faild_otp_sent", components: {} });
            }

        } catch (e) {
            return sendResponse(req, res, 200, '0', { keyword: "faild_otp_sent", components: {} }, e?.message);
        }
    },

    signUp: async (req, res) => {
        try {
            let { body } = req;
            let sql = `select id ,country_code_id,mobile_number,email , otp from tbl_otp where id=$1 and otp=$2 and is_deleted =$3`;
            let values = [body?.user_id, body?.otp, false];

            let { rows } = await con.query(sql, values);

            if (rows.length > 0) {

                let userData = [
                    true
                ]
                await Auth.updateOtpUser(`is_otp_verified=$1`, userData, body?.user_id);

                var insertData = {
                    country_code_id: body?.country_code_id,
                    mobile_number: body?.mobile_number,
                    email: body?.email,
                    password: body?.password ? CryptoJS.AES.encrypt(JSON.stringify(body?.password), SECRET, { iv: IV }).toString() : '',
                    is_step: 1,
                    signup_otp_verify: 1
                }

                let sql = `INSERT INTO tbl_user (country_code_id, mobile_number, password, is_step, signup_otp_verify,email) VALUES ($1, $2, $3, $4, $5,$6) RETURNING id`;

                let values = [insertData.country_code_id, insertData.mobile_number, insertData.password, insertData.is_step, insertData.signup_otp_verify, insertData.email];

                let { rows } = await con.query(sql, values);
                let user_id = rows[0]?.id

                let token = await jwt_sign(user_id);
                body.token = token;
                body.device_token = body?.device_token || null,
                    body.device_name = body?.device_name || '',
                    body.device_type = body?.device_type || null,
                    body.os_version = body?.os_version || '',
                    body.app_version = body?.app_version || ''

                await checkUpdateDeviceInfo(user_id, body);

                let result = await SELECT_Q(`select u.id as user_id ,u.country_code_id,u.mobile_number ,u.first_name,u.last_name,u.email,
                u.address,concat('${process.env.AWS_S3_BASE_URL}/user_profile/' , u.image) as profile_image,u.dob,ud.token from tbl_user u 
            join tbl_user_device ud on ud.user_id = u.id
            where u.id = ${user_id} and u.is_deleted = 0 and u.is_active = 1 and ud.is_deleted = 0`, false)

                return sendResponse(req, res, 200, '1', { keyword: "rest_keywords_user_signup_success", components: {} }, result[0]);
            } else {
                return sendResponse(req, res, 200, '0', { keyword: "invalid_otp", components: {} });
            }

        } catch (e) {
            return sendResponse(req, res, 200, '0', { keyword: "rest_keywords_user_signup_failed", components: {} }, e?.message);
        }
    },

    completeProfile: async (req, res) => {
        try {
            let { body } = req;

            let user_id = req.loginUser;

            let userData = [
                body?.first_name,
                body?.last_name,
                body?.dob,
                body?.address,
                body?.latitude,
                body?.longitude,
                2,
                1
            ]
            await Auth.updateUser(`first_name=$1,last_name=$2,dob=$3,address=$4,latitude=$5,longitude=$6,is_step=$7,is_online=$8`, userData, user_id);

            let result = await SELECT_Q(`select u.id as user_id,u.email ,u.country_code_id,u.mobile_number,concat('${process.env.AWS_S3_BASE_URL}/user_profile/' , u.image) as profile_image ,u.first_name,u.last_name,u.email,u.address,u.dob,ud.token,u.image from tbl_user u 
            join tbl_user_device ud on ud.user_id = u.id
            where u.id = ${user_id} and u.is_deleted = 0 and u.is_active = 1 and ud.is_deleted = 0`)

            return sendResponse(req, res, 200, '1', { keyword: "rest_keywords_user_complete_profile_success", components: {} }, result[0]);

        } catch (e) {
            return sendResponse(req, res, 200, '0', { keyword: "rest_keywords_user_complete_profile_failed", components: {} }, e?.message);
        }
    },

    signIn: async (req, res) => {
        try {
            let { body } = req;
            var finData = {
                email: body?.email,
                country_code_id: body?.country_code_id,
                mobile_number: body?.mobile_number,
                password: body?.password ? CryptoJS.AES.encrypt(JSON.stringify(body?.password), SECRET, { iv: IV }).toString() : '',
                device_token: body?.device_token || null,
                device_name: body?.device_name || '',
                device_type: body?.device_type || null,
                os_version: body?.os_version || '',
                app_version: body?.app_version || ''
            };

            let checkOtp;
            let valuesOtp;

            // Check if OTP exists and is not verified
            if (finData?.email) {
                checkOtp = `SELECT * FROM tbl_otp WHERE email=$1`;
                valuesOtp = [finData.email];
            }
            else {
                checkOtp = `SELECT * FROM tbl_otp WHERE country_code_id = $1 AND mobile_number = $2`;
                valuesOtp = [finData.country_code_id, finData.mobile_number];
            }

            let otpResponse = await con.query(checkOtp, valuesOtp);

            if (otpResponse.rows.length > 0 && otpResponse.rows[0].is_otp_verified === false) {
                // Generate new OTP
                const newOtp = common.otp();

                // Update OTP in database
                let updateOtpSql;
                let updateOtpValues;

                if (finData?.email) {
                    updateOtpSql = `UPDATE tbl_otp SET otp = $1 WHERE email=$2`;
                    updateOtpValues = [newOtp, otpResponse.rows[0].email];
                }
                else {
                    updateOtpSql = `UPDATE tbl_otp SET otp = $1 WHERE country_code_id = $2 AND mobile_number = $3`;
                    updateOtpValues = [newOtp, otpResponse.rows[0].country_code_id, otpResponse.rows[0].mobile_number];
                }

                await con.query(updateOtpSql, updateOtpValues);

                return sendResponse(req, res, 200, '4', { keyword: "otp_not_verified", components: {} }, {
                    user_id: otpResponse.rows[0].id,
                    mobile_number: otpResponse.rows[0].mobile_number,
                    country_code_id: otpResponse.rows[0].country_code_id,
                    is_otp_verified: otpResponse.rows[0].is_otp_verified,
                    otp: newOtp
                });
            }
            else {

                let sql;
                let values;
                let keyword;
                if (finData?.email) {
                    sql = `SELECT * FROM tbl_user WHERE email = $1 AND password = $2`;
                    values = [finData?.email, finData.password];
                    keyword = "rest_keywords_user_invalid_credantioal"
                }
                else {
                    sql = `SELECT * FROM tbl_user WHERE country_code_id = $1 AND mobile_number = $2 AND password = $3`;
                    values = [finData?.country_code_id, finData.mobile_number, finData?.password];
                    keyword = "rest_keywords_user_invalid_credantioal_mobile"
                }

                let { rows } = await con.query(sql, values);

                if (rows.length === 0) {
                    return sendResponse(req, res, 200, '10', { keyword: keyword, components: {} });
                }

                if (rows[0].is_block == 1) {
                    return sendResponse(req, res, 200, '0', { keyword: "rest_keywords_ac_block_by_admin", components: {} });
                }

                if (rows[0].is_step === 1 && rows[0].signup_otp_verify === 1) {
                    let user_id = rows[0]?.id;
                    let token = await jwt_sign(user_id);
                    body.token = token;

                    await checkUpdateDeviceInfo(user_id, body);

                    let result = await SELECT_Q(`SELECT u.id AS user_id, u.country_code_id, u.mobile_number, u.first_name, u.last_name, u.email, u.address, u.dob, ud.token,concat('${process.env.AWS_S3_BASE_URL}/user_profile/' , u.image) as profile_image FROM tbl_user u 
                        JOIN tbl_user_device ud ON ud.user_id = u.id
                        WHERE u.id = ${user_id} AND u.is_deleted = 0 AND u.is_active = 1 AND ud.is_deleted = 0`);

                    return sendResponse(req, res, 200, '5', { keyword: "profile_incompleted", components: {} }, result[0]);
                }

                let user_id = rows?.[0]?.id;
                let userData = [1];
                await Auth.updateUser(`is_online=$1`, userData, user_id);

                let token = await jwt_sign(user_id);
                body.token = token;

                await checkUpdateDeviceInfo(user_id, body);

                let result = await SELECT_Q(`SELECT u.id AS user_id, u.country_code_id, u.mobile_number, u.first_name, u.last_name, u.email, u.address, u.dob, ud.token ,concat('${process.env.AWS_S3_BASE_URL}/user_profile/' , u.image) as profile_image FROM tbl_user u 
                    JOIN tbl_user_device ud ON ud.user_id = u.id
                    WHERE u.id = ${user_id} AND u.is_deleted = 0 AND u.is_active = 1 AND ud.is_deleted = 0`);

                return sendResponse(req, res, 200, 1, { keyword: "rest_keywords_user_login_success", components: {} }, result[0]);
            }
        } catch (error) {
            console.log('error?.message :', error?.message);
            return sendResponse(req, res, 200, '0', { keyword: "rest_keywords_user_login_failed", components: {} }, error?.message);
        }
    },

    forgotPassword: async (req, res) => {
        let { body } = req
        try {

            let otp = common.otp();
            let otp_type = body.otp_type
            let userData = [
                otp,
                otp_type
            ]

            await Auth.updateOtpByEmail(`otp=$1 , otp_type=$2`, userData, body.email);

            const subject = 'Forgot Pasword Otp!';
            const emailTemplate = await sendOtpTemplate({ otp: userData[0], type: "Forgot Otp" });
            const emailSent = await sendEmail(body?.email, subject, emailTemplate);

            if (emailSent) {

                let result = await SELECT_Q(`select id as user_id ,country_code_id,mobile_number,email from tbl_user where email = '${body.email}'`, false)
                result[0].otp = userData[0]

                return sendResponse(req, res, 200, '1', { keyword: "otp_sent_1", components: {} }, result[0]);
            } else {
                return sendResponse(req, res, 200, '0', { keyword: "faild_otp_sent", components: {} });
            }

        } catch (e) {
            return sendResponse(req, res, 200, '0', { keyword: "rest_keywords_user_forgot_failed", components: {} }, e?.message);
        }
    },

    forgotOtpVerify: async (req, res) => {
        try {
            let { body } = req;
            let sql = `select id ,country_code_id,mobile_number,email , otp from tbl_otp where email=$1 and otp=$2 and is_deleted =$3`;
            let values = [body?.email, body?.otp, false];

            let { rows } = await con.query(sql, values);
            if (rows.length > 0) {

                let userData = [
                    true
                ]
                await Auth.updateOtpByEmail(`is_forgot_otp=$1`, userData, body?.email);

                let result = await SELECT_Q(`select u.*  from tbl_user u 
                where email='${body.email}'`)
                let user_id = result[0].id
                let token = await jwt_sign(user_id);
                body.token = token;
                body.device_token = body?.device_token || null,
                    body.device_name = body?.device_name || '',
                    body.device_type = body?.device_type || null,
                    body.os_version = body?.os_version || '',
                    body.app_version = body?.app_version || ''

                await checkUpdateDeviceInfo(user_id, body);

                let result1 = await SELECT_Q(`select u.id as user_id ,u.country_code_id,u.mobile_number ,u.first_name,u.last_name,u.email,u.address,u.dob,ud.token from tbl_user u 
            join tbl_user_device ud on ud.user_id = u.id
            where u.id = ${user_id} and u.is_deleted = 0 and u.is_active = 1 and ud.is_deleted = 0`)

                return sendResponse(req, res, 200, '1', { keyword: "otp_verified", components: {} }, result1[0]);
            } else {
                return sendResponse(req, res, 200, '0', { keyword: "invalid_otp", components: {} });
            }

        } catch (e) {
            return sendResponse(req, res, 200, '0', { keyword: "faild_otp_sent", components: {} }, e?.message);
        }
    },

    resetPassword: async (req, res) => {
        try {
            let { body } = req;

            let findUser = await SELECT_Q(`select * from tbl_user where id = '${body?.user_id}'`);

            let password = CryptoJS.AES.encrypt(JSON.stringify(body?.new_password), SECRET, { iv: IV }).toString()
            let cnf_password = CryptoJS.AES.encrypt(JSON.stringify(body?.confirm_password), SECRET, { iv: IV }).toString()

            if (password == findUser[0].password) return sendResponse(req, res, 200, '0', { keyword: "old_password_same", components: {} });

            else {
                if (password == cnf_password) {
                    let userData = [
                        CryptoJS.AES.encrypt(JSON.stringify(body?.new_password), SECRET, { iv: IV }).toString(),
                    ]
                    await Auth.updateUser(`password=$1`, userData, body?.user_id);

                    return sendResponse(req, res, 200, '1', { keyword: "password_changed", components: {} });
                }
                else {
                    return sendResponse(req, res, 200, '0', { keyword: "new_password_and_confirm_same", components: {} });
                }

            }

        } catch (e) {
            return sendResponse(req, res, 200, '0', { keyword: "rest_keywords_user_reset_failed", components: {} }, e?.message);
        }
    },

    changePassword: async (req, res) => {
        try {
            let { body } = req;
            let user_id = req.loginUser;
            let findUser = await SELECT_Q(`select * from tbl_user where id = '${user_id}'`);

            let old_password = CryptoJS.AES.encrypt(JSON.stringify(body?.old_password), SECRET, { iv: IV }).toString()
            let new_password = CryptoJS.AES.encrypt(JSON.stringify(body?.new_password), SECRET, { iv: IV }).toString()
            let cnf_password = CryptoJS.AES.encrypt(JSON.stringify(body?.confirm_password), SECRET, { iv: IV }).toString()

            if (old_password !== findUser[0].password) return sendResponse(req, res, 200, '0', { keyword: "invalid_old_password", components: {} });

            if (old_password == new_password) return sendResponse(req, res, 200, '0', { keyword: "old_password_same", components: {} });

            else {
                if (new_password == cnf_password) {
                    let userData = [
                        new_password
                    ]
                    await Auth.updateUser(`password=$1`, userData, user_id);

                    return sendResponse(req, res, 200, '1', { keyword: "password_changed", components: {} });
                }
                else {
                    return sendResponse(req, res, 200, '0', { keyword: "new_password_and_confirm_same", components: {} });
                }

            }

        } catch (e) {
            return sendResponse(req, res, 200, '0', { keyword: "rest_keywords_user_reset_failed", components: {} }, e?.message);
        }
    },

    editProfile: async (req, res) => {
        try {
            let { body } = req;
            let user_id = req.loginUser;

            let findUniqueUser = await SELECT_Q(`select *, concat('${process.env.AWS_S3_BASE_URL}/user_profile/' , image) as profile_image from tbl_user where id != '${user_id}'
            AND (email='${body?.email}' OR (country_code_id='${body?.country_code_id}' AND mobile_number='${body?.mobile_number}'))`, false);

            if (findUniqueUser && findUniqueUser.length > 0) {
                return sendResponse(req, res, 200, '7', { keyword: "text_field_already_exist", components: { key: "Email or Mobile Number" } }, []);
            }
            else {
                let findUser = await SELECT_Q(`select * , concat('${process.env.AWS_S3_BASE_URL}/user_profile/' , image) as profile_image from tbl_user where id = '${user_id}'`);

                let submitData = [
                    body?.profile_image ? body?.profile_image : findUser[0]?.image,
                    body?.first_name ? body?.first_name : findUser[0]?.first_name,
                    body?.last_name ? body?.last_name : findUser[0]?.last_name,
                    body?.email ? body?.email : findUser[0]?.email,
                    body?.country_code_id ? body?.country_code_id : findUser[0]?.country_code_id,
                    body?.mobile_number ? body?.mobile_number : findUser[0]?.mobile_number,
                    body?.dob ? body?.dob : findUser[0]?.dob,
                    body?.address ? body?.address : findUser[0]?.address
                ]

                if (body?.mobile_number !== findUser[0]?.mobile_number || body?.country_code_id !== findUser[0]?.country_code_id || body?.email !== findUser[0]?.email) {
                    let otp = common.otp()
                    let userData = [
                        otp,
                        false
                    ]

                    await Auth.updateOtpByEmail(`otp=$1 ,is_otp_verified=$2`, userData, findUser[0]?.email);

                    const subject = 'Update Profile Otp!';
                    const emailTemplate = await sendOtpTemplate({ otp: userData[0], type: "Update Profile" });
                    const emailSent = await sendEmail(body?.email, subject, emailTemplate);

                    if (emailSent) {
                        return sendResponse(req, res, 200, '4', { keyword: "otp_not_verified", components: {} }, { otp, user_id });
                    } else {
                        return sendResponse(req, res, 200, '0', { keyword: "faild_otp_sent", components: {} });
                    }

                }
                else {
                    await Auth.updateUser(`image=$1, first_name=$2, last_name=$3, email=$4, country_code_id=$5, mobile_number=$6, dob=$7, address=$8`, submitData, user_id);

                    let userProfile = await SELECT_Q(`select * ,id as user_id ,concat('${process.env.AWS_S3_BASE_URL}/user_profile/' , image) as profile_image from tbl_user where id = '${user_id}'`);

                    return sendResponse(req, res, 200, '1', { keyword: "rest_keywords_user_profile_edit_success", components: {} }, userProfile);
                }
            }

        } catch (error) {
            return sendResponse(req, res, 200, '0', { keyword: "Failed to edit profile", components: {} }, error.message);
        }
    },

    editProfileByOtpVerification: async (req, res) => {
        try {
            let { body } = req;

            let user_id = req.loginUser;
            let findUser = await SELECT_Q(`select * , concat('${process.env.AWS_S3_BASE_URL}/user_profile/' , image) as profile_image from tbl_user where id = '${user_id}'`);

            let submitData = [
                body?.profile_image ? body?.profile_image : findUser[0]?.image,
                body?.first_name ? body?.first_name : findUser[0]?.first_name,
                body?.last_name ? body?.last_name : findUser[0]?.last_name,
                body?.email ? body?.email : findUser[0]?.email,
                body?.country_code_id ? body?.country_code_id : findUser[0]?.country_code_id,
                body?.mobile_number ? body?.mobile_number : findUser[0]?.mobile_number,
                body?.dob ? body?.dob : findUser[0]?.dob,
                body?.address ? body?.address : findUser[0]?.address
            ]

            let sql = `select id ,country_code_id,mobile_number , otp from tbl_otp where email=$1 and otp=$2 and is_deleted =$3`;

            let values = [findUser[0]?.email, body?.otp, false];

            let { rows } = await con.query(sql, values);

            if (rows.length > 0) {

                let userData = [
                    true,
                    body?.email !== findUser[0]?.email ? body?.email : findUser[0]?.email,
                    body?.country_code_id !== findUser[0]?.country_code_id ? body?.country_code_id : findUser[0]?.country_code_id,
                    body?.mobile_number !== findUser[0]?.mobile_number ? body?.mobile_number : findUser[0]?.mobile_number
                ]

                await Auth.updateOtpUser(`is_otp_verified=$1 , email=$2,country_code_id=$3, mobile_number=$4 `, userData, rows[0]?.id);

                await Auth.updateUser(`image=$1, first_name=$2, last_name=$3, email=$4, country_code_id=$5, mobile_number=$6, dob=$7, address=$8`, submitData, user_id);

                let userProfile = await SELECT_Q(`select *,id as user_id , concat('${process.env.AWS_S3_BASE_URL}/user_profile/' , image) as profile_image from tbl_user where id = '${user_id}'`);
                return sendResponse(req, res, 200, '1', { keyword: "rest_keywords_user_profile_edit_success", components: {} }, userProfile);

            }
            else {
                return sendResponse(req, res, 200, '0', { keyword: "invalid_otp", components: {} });
            }

        } catch (e) {
            return sendResponse(req, res, 200, '0', { keyword: "faild_otp_VERIFIED", components: {} }, e?.message);
        }
    },

    logout: async (req, res) => {
        try {
            let user_id = req.loginUser;
            let submitData = [0]
            await Auth.updateUser(`is_online=$1`, submitData, user_id,);
            await con.query(`update tbl_user_device set token='' where user_id='${user_id}'`);
            return sendResponse(req, res, 200, '1', { keyword: "logout_success", components: {} });

        } catch (e) {
            return sendResponse(req, res, 200, '0', { keyword: "logout_failed", components: {} }, e?.message);
        }
    }
}

const countryList = async (req, res) => {
    try {
        let countryListData = await SELECT_Q(`select MAX(id) AS country_id, MAX(name) AS name, country_code, MAX(sortname) AS iso2 from tbl_country where is_active= true and is_deleted = false GROUP BY country_code order by country_code asc`, false);
        if (countryListData?.[0]) {
            return sendResponse(req, res, 200, '1', { keyword: "country_list_found", components: {} }, countryListData);
        } else {
            return sendResponse(req, res, 200, '2', { keyword: "no_data", components: {} }, countryListData);
        }
    } catch (e) {
        return sendResponse(req, res, 200, '0', { keyword: "country_list_failed", components: {} }, e?.message);
    }
}

const UserDetails = async (req, res) => {
    try {
        let user_id = req.loginUser;

        let UserDetails = await SELECT_Q(`select u.id as user_id,u.first_name ,u.last_name,u.email,u.mobile_number,u.dob,u.address,u.image,u.latitude,u.longitude,u.country_code_id,u.signup_otp_verify,ud.token ,u.is_block from tbl_user u 
        join tbl_user_device ud on ud.user_id = u.id 
        where u.is_deleted = 0 and u.is_active = 1 and u.id = '${user_id}'`, false);

        if (UserDetails?.[0]) {
            UserDetails[0].dob = moment(UserDetails[0].dob).utc().format('YYYY-MM-DD');
            UserDetails[0].image_link = `https://bboyorealestate-pord.s3.af-south-1.amazonaws.com/user_profile/${UserDetails[0].image}`;
            return sendResponse(req, res, 200, '1', { keyword: "Data_found", components: {} }, UserDetails[0]);
        } else {
            return sendResponse(req, res, 200, '2', { keyword: "no_data", components: {} }, UserDetails[0]);
        }
    } catch (e) {
        return sendResponse(req, res, 200, '0', { keyword: "user_list_failed", components: {} }, e?.message);
    }
}

module.exports = {
    Auth,
    countryList,
    UserDetails
};