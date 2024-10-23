const { SELECT_Q } = require('../../../../utils/SQLWorker');
const { sendResponse } = require('../../../../middleware/headerValidator');
const { jwt_sign, sendEmail, checkUpdateDeviceInfo, company_details, sendSMS, client_details, employee_details, checkAdminDeviceInfo, checkAdminDevice } = require('../../../../utils/common');
const CryptoJS = require('crypto-js');
const SECRET = CryptoJS.enc.Utf8.parse(process.env.KEY);
const IV = CryptoJS.enc.Utf8.parse(process.env.KEY);
const con = require('../../../../config/database');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');

//////////////////////////////////////////////////////////////////////
//                            Auth API                              //
//////////////////////////////////////////////////////////////////////
let Auth = {

    updateAdmin: async (setData, submitData, admin_id) => {
        return new Promise(async (resolve, reject) => {
            try {
                let { rows } = await con.query(`UPDATE tbl_admin SET ${setData} WHERE id = '${admin_id}' RETURNING *`, submitData);
                resolve(rows?.[0])
            } catch (e) {
                reject(e);
            }
        })
    },

    login: async (req, res) => {
        try {
            let { body } = req;
            var findData = {
                email: body?.email,
                password: body?.password ? CryptoJS.AES.encrypt(JSON.stringify(body?.password), SECRET, { iv: IV }).toString() : '',
                device_token: body?.device_token || null,
                device_name: body?.device_name || '',
                device_type: body?.device_type || null,
                os_version: body?.os_version || '',
                app_version: body?.app_version || ''

            }
            let sql = `SELECT * FROM tbl_admin WHERE email = $1 AND password = $2 AND is_deleted = $3`;
            let values = [findData.email, findData.password, 0];

            let { rows } = await con.query(sql, values);

            if (rows.length > 0) {
                let admin_id = rows?.[0]?.id;
                let adminData = [
                    1
                ]
                
                await Auth.updateAdmin(`is_online=$1`, adminData, admin_id);

                let token = await jwt_sign(admin_id);
                body.token = token;

                await checkAdminDevice(admin_id, body);

                const secret = speakeasy.generateSecret({ name: 'BBOYO-REAL-ESTATE' });

                const qrCodeUrl = await qrcode.toDataURL(secret.otpauth_url);

                let result = await SELECT_Q(`select u.id as user_id ,u.country_code,u.mobile_number ,u.full_name,u.email,ud.token,u.profile_image from tbl_admin u 
                join tbl_admin_device ud on ud.admin_id = u.id
                where u.id = ${admin_id} and u.is_deleted = 0 and ud.is_deleted = 0`)
                result[0].image_link = `https://bboyorealestate-pord.s3.af-south-1.amazonaws.com/admin_profile/${result[0].profile_image}`;
                result[0].qrCodeUrl = qrCodeUrl;
                result[0].secret = secret.base32;

                return sendResponse(req, res, 200, 1, { keyword: "rest_keywords_user_login_success", components: {} }, result[0]);

            }
            else {
                return sendResponse(req, res, 200, '10', { keyword: "rest_keywords_user_invalid_credantioal", components: {} });
            }
        } catch (error) {
            return sendResponse(req, res, 200, '0', { keyword: error.message, components: {} }, error?.message);
        }
    },

    generateMFA: async (req, res) => {
        try {
            const secret = speakeasy.generateSecret({ name: 'MyApp' });

            const qrCodeUrl = await qrcode.toDataURL(secret.otpauth_url);

            return sendResponse(req, res, 200, 1, { keyword: "Generate MFA Succesfully", components: {} }, {
                qrCodeUrl,
                secret: secret.base32,
            });

        } catch (error) {
            return sendResponse(req, res, 200, '0', { keyword: "Failed to Generate MFA", components: {} }, error?.message);
        }
    },

    verifyMFA: async (req, res) => {
        try {
            const { token, secret } = req.body;

            const isValid = speakeasy.totp.verify({
                secret,
                encoding: 'base32',
                token,
            });

            if (isValid) {
                return sendResponse(req, res, 200, 1, { keyword: "MFA verification successful", components: {} });
            }
            else{
                return sendResponse(req, res, 200, 0, { keyword: "Invalid Mfa token", components: {} }); 
            }

        } catch (error) {
            return sendResponse(req, res, 500, '0', { keyword: error.message, components: {} }, error?.message);
        }
    },

    changePassword: async (req, res) => {
        try {
            let { body } = req;
            let admin_id = req.loginUser;
            let findUser = await SELECT_Q(`select * from tbl_admin where id = '${admin_id}'`);
            
            let old_password = CryptoJS.AES.encrypt(JSON.stringify(body?.old_password), SECRET, { iv: IV }).toString()
            let new_password = CryptoJS.AES.encrypt(JSON.stringify(body?.new_password), SECRET, { iv: IV }).toString()
            let cnf_password = CryptoJS.AES.encrypt(JSON.stringify(body?.confirm_password), SECRET, { iv: IV }).toString()

            if (old_password !== findUser[0].password) return sendResponse(req, res, 200, '0', { keyword: "invalid_old_password", components: {} });

            if (old_password == new_password) return sendResponse(req, res, 200, '0', { keyword: "old_password_same", components: {} });

            else {
                if (new_password == cnf_password) {
                    let adminData = [
                        new_password
                    ]
                    await Auth.updateAdmin(`password=$1`, adminData, admin_id);

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

    editProfile:async(req,res)=>{
        try {
            const {body} = req;
            let admin_id = req.loginUser;
            let adminData = [
                body?.full_name,
                body?.email,
                body?.profile_image
            ]
            await Auth.updateAdmin(`full_name=$1,email=$2,profile_image=$3`, adminData, admin_id);

            let result = await SELECT_Q(`select * from tbl_admin where id = '${admin_id}'`)
            result[0].image_link = `https://bboyorealestate-pord.s3.af-south-1.amazonaws.com/admin_profile/${result[0].profile_image}`;

            return sendResponse(req, res, 200, '1', { keyword: "rest_keywords_user_profile_edit_success", components: {} },result[0]);
        } catch (e) {
            return sendResponse(req, res, 200, '0', { keyword: "rest_keywords_user_edit_profile_failed", components: {} }, e?.message);
        }
    },

    logout: async (req, res) => {
        try {
            let admin_id = req.loginUser;
            let submitData = [0]
            await Auth.updateAdmin(`is_online=$1`, submitData, admin_id,);
            await con.query(`update tbl_admin_device set token='' where admin_id='${admin_id}'`);
            return sendResponse(req, res, 200, '1', { keyword: "logout_success", components: {} });
        } catch (e) {
            return sendResponse(req, res, 200, '0', { keyword: "logout_failed", components: {} }, e?.message);
        }
    },

    forgotPassword: async (req, res) => {
        let { body } = req
        try {
            let adminData = await SELECT_Q(`Select * from tbl_admin where email='${body?.email}' and is_active='1' and is_delete='0'`, "S");

            if (adminData) {
                
                return sendResponse(req, res, 200, '1', { keyword: "mail_sent_1", components: {} }, {});
            }
            else{
                return sendResponse(req, res, 200, '0', { keyword: "invalid_email_details", components: {} });
            }
            var randtoken = require('rand-token').generator();
            var orgPassword = randtoken.generate(12, "0123456789abcdefghijklmnopqrstuvwxyz+=%$&^_()#@!~");
            
            let password = CryptoJS.AES.encrypt(JSON.stringify(orgPassword), SECRET, { iv: IV }).toString();

            let otp = common.otp();
            let userData = [
                password
            ]
            
            await con.query(`update tbl_admin set password=$1 where email='${body?.email}' and is_deleted=0 RETURNING *`, userData);

            let result = await SELECT_Q(`select id as user_id ,country_code_id,mobile_number from tbl_user where country_code_id = '${body.country_code_id}' AND mobile_number='${body.mobile_number}' and is_deleted = 0`)
            result[0].otp = otp

            // var insertData = {
            //     user_id: result[0]?.user_id,
            //     token: common.generateToken(),
            // }


            // let sql = `INSERT INTO tbl_forget_pass (user_id, token) VALUES ($1, $2) RETURNING id`;

            // let values = [insertData.user_id, insertData.token];

            // let { rows } = await con.query(sql, values);

            return sendResponse(req, res, 200, '1', { keyword: "otp_sent_1", components: {} }, result[0]);

        } catch (e) {
            return sendResponse(req, res, 200, '0', { keyword: "rest_keywords_user_forgot_failed", components: {} }, e?.message);
        }
    },


}
module.exports = {
    Auth
};