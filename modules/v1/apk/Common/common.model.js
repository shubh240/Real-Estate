const { SELECT_Q } = require('../../../../utils/SQLWorker');
const { sendResponse } = require('../../../../middleware/headerValidator');
const { jwt_sign, sendEmail, checkUpdateDeviceInfo, company_details, sendSMS, client_details, employee_details } = require('../../../../utils/common');
const CryptoJS = require('crypto-js');
const con = require('../../../../config/database');
const { BUCKET_NAME, BUCKET_KEY_ID, BUCKET_SECRET_KEY, BUCKET_REGION_NAME, BASE_URL, BASE_URL_WITHOUT_API } = require('../../../../config/constants');
const { generateContactUsTemplate } = require('../../../../config/common');

//////////////////////////////////////////////////////////////////////
//                           Common API                             //
//////////////////////////////////////////////////////////////////////
let Common = {

    addContactUs: async (req, res) => {
        try {
            let { body } = req

            let sql = `insert into tbl_contact_us (first_name,last_name,country_code,mobile_number,email,subject,description,status) 
            values($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id`;

            let values = [
                body?.first_name,
                body?.last_name,
                body?.country_code,
                body?.mobile_number,
                body?.email,
                body?.subject,
                body?.description ? body?.description : "",
                body?.status
            ]

            let { row } = await con.query(sql, values);
            let name = ` ${body?.first_name} ${body?.last_name}`

            const emailTemplate = await generateContactUsTemplate(body?.subject, name, body?.description, body?.email);

            const emailSent = await sendEmail(body?.email, body?.subject, emailTemplate);

            if (emailSent) {
                return sendResponse(req, res, 200, '1', { keyword: "Your_query_has_been_saved", components: {} },[]);
            } else {
                return sendResponse(req, res, 200, '0', { keyword: "Failed_To_add_this_query", components: {} });
            }

        } catch (e) {
            return sendResponse(req, res, 200, '0', { keyword: "Failed_To_add_this_query", components: {} }, e?.message);
        }
    }
}
module.exports = {
    Common
};