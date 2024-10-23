const { SELECT_Q } = require('../../../../utils/SQLWorker');
const { sendResponse } = require('../../../../middleware/headerValidator');
const { jwt_sign, sendEmail, checkUpdateDeviceInfo, company_details, sendSMS, client_details, employee_details } = require('../../../../utils/common');
const CryptoJS = require('crypto-js');
const moment = require('moment');
const con = require('../../../../config/database');
const { WEBSITE_BASE_URL, PER_PAGE, PER_PAGE_TEN } = require('../../../../config/constants');
//////////////////////////////////////////////////////////////////////
//                            Property API                              //
//////////////////////////////////////////////////////////////////////

let Customer = {

    CustomerListing: async (req, res) => {

        try {
            let { body } = req;
            let search = "";

            if (body.page == '0' || body.page == undefined) {
                body.page = 1;
            }

            let per_page = PER_PAGE_TEN;
            let limit = ((body.page - 1) * PER_PAGE_TEN);

            let fieldSort = "";
            if (body?.search) {
                search = ` and (u.first_name ILIKE '%${body?.search}%' or u.last_name ILIKE '%${body?.search}%'
                or u.mobile_number ILIKE '%${body?.search}%'  or u.email ILIKE '%${body?.search}%')`;
            }
            if (body?.fieldSort) {
                fieldSort = ` order by u.${body.fieldSort}`;
            }

            const baseURL = process.env.AWS_S3_BASE_URL;

            let CustomerDetails = await SELECT_Q(`select u.id, concat(u.first_name ,' ',u.last_name) as full_name , u.email ,
            concat(u.country_code_id ,'-',u.mobile_number) as mobile_number ,u.dob,u.address,created_at,u.is_step,
            ${PER_PAGE_TEN} as per_page,
            (select count(id) from tbl_user where is_deleted = 0 ) as user_count,
            concat('${baseURL}/user_profile/' , u.image) as profile_image , u.is_block
            from tbl_user u
            WHERE u.is_deleted = 0 ${search} ${fieldSort} limit ${per_page} OFFSET ${limit}`, false);

            CustomerDetails?.map((e) =>
                e.created_at = (moment.utc(e.created_at).local().format('YYYY-MM-DD HH:mm:ss'))
            )

            if (CustomerDetails?.length) {
                return sendResponse(req, res, 200, '1', { keyword: "user_list", components: {} }, CustomerDetails);
            } else {
                return sendResponse(req, res, 200, '2', { keyword: "no_data", components: {} }, []);
            }
        } catch (error) {
            return sendResponse(req, res, 200, '0', { keyword: "user_list_failed", components: {} }, error.message);
        }
    },

    deletedCustomer: async (req, res) => {
        try {
            let { body } = req;
            let user_id = body?.customer_id;
            let submitData1 = [null]

            let { rows } = await con.query(`select email,mobile_number,country_code_id from tbl_user where is_deleted=0 and  id=${user_id}`);

            let submitData = [body?.is_deleted, `delete999${rows[0]?.email}`, '+00', `${rows[0]?.mobile_number}00`];
            let submitData2 = [body?.is_deleted1, `delete999${rows[0]?.email}`, '+00', `${rows[0]?.mobile_number}00`];
            await con.query(`update tbl_user set is_deleted=$1 , email=$2 ,country_code_id=$3,mobile_number=$4  where id='${user_id}' and is_deleted=0 RETURNING *`, submitData);

            await con.query(`update tbl_otp set is_deleted=$1, email=$2 ,country_code_id=$3,mobile_number=$4 where email='${rows[0]?.email}' and mobile_number='${rows[0]?.mobile_number}' and country_code_id='${rows[0]?.country_code_id}'and is_deleted=false RETURNING *`, submitData2);

            if (body?.is_deleted === '1' && body?.is_deleted1 === true) {
                await con.query(`update tbl_user_device set token=$1 where user_id='${user_id}' RETURNING *`, submitData1);
            }

            return sendResponse(req, res, 200, '1', { keyword: 'Customer_deleted', components: {} });

        } catch (e) {
            console.log('e?.message :', e?.message);
            return sendResponse(req, res, 200, '0', { keyword: "something_went_wrong", components: {} }, e?.message);
        }
    },

    blockUnblock: async (req, res) => {
        try {
            let { body } = req;
            let user_id = body?.customer_id;
            let submitData = [body?.is_block]
            let submitData1 = [null]


            await con.query(`update tbl_user set is_block=$1 where id='${user_id}' and is_deleted=0 RETURNING *`, submitData);

            if (body?.is_block == 1) {
                await con.query(`update tbl_user_device set token=$1 where user_id='${user_id}' RETURNING *`, submitData1);
            }

            let keywordKey = body?.is_block === '0' ? "Customer unblock successfully" : "Customer block successfully";

            return sendResponse(req, res, 200, '1', { keyword: keywordKey, components: {} });

        } catch (e) {
            return sendResponse(req, res, 200, '0', { keyword: "something_went_wrong", components: {} }, e?.message);
        }
    },

    AllCustomer: async (req, res) => {
        try {

            const baseURL = process.env.AWS_S3_BASE_URL;

            let CustomerDetails = await SELECT_Q(`select u.id, concat(u.first_name ,' ',u.last_name) as full_name , u.email ,
            concat(u.country_code_id ,'-',u.mobile_number) as mobile_number ,u.dob,u.address,created_at,u.is_step,
            ${PER_PAGE_TEN} as per_page,
            (select count(id) from tbl_user where is_deleted = 0 ) as user_count,
            concat('${baseURL}/user_profile/' , u.image) as profile_image , u.is_block
            from tbl_user u
            WHERE u.is_deleted = 0`, false);

            CustomerDetails?.map((e) =>
                e.created_at = (moment.utc(e.created_at).local().format('YYYY-MM-DD HH:mm:ss'))
            )

            if (CustomerDetails?.length) {
                return sendResponse(req, res, 200, '1', { keyword: "user_list", components: {} }, CustomerDetails);
            } else {
                return sendResponse(req, res, 200, '2', { keyword: "no_data", components: {} }, []);
            }
        } catch (error) {
            return sendResponse(req, res, 200, '0', { keyword: "user_list_failed", components: {} }, error.message);
        }
    }

}

module.exports = {
    Customer
};