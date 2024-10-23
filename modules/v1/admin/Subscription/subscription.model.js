const { SELECT_Q } = require('../../../../utils/SQLWorker');
const { sendResponse } = require('../../../../middleware/headerValidator');
const { jwt_sign, sendEmail, checkUpdateDeviceInfo, company_details, sendSMS, client_details, employee_details } = require('../../../../utils/common');
const CryptoJS = require('crypto-js');
const con = require('../../../../config/database');
const { WEBSITE_BASE_URL, PER_PAGE, PER_PAGE_TEN } = require('../../../../config/constants');

//////////////////////////////////////////////////////////////////////
//                            Property API                              //
//////////////////////////////////////////////////////////////////////

let Subscription = {

    addSubscription: async (req, res) => {
        try {
            let { body } = req;

            let sql = `INSERT INTO tbl_subscription (name,description,premium_features,duration,price) VALUES ($1,$2,$3,$4,$5) RETURNING id`;
            let values = [body?.plan_name, body?.plan_description, body?.premium_features, body?.duration, body?.price];

            await con.query(sql, values);

            return sendResponse(req, res, 200, '1', { keyword: "add_subscription", components: {} });

        } catch (error) {
            return sendResponse(req, res, 200, '0', { keyword: "failed_to_add_subscription", components: {} }, error.message);
        }
    },

    SubscriptionDetails: async (req, res) => {
        try {
            let { body } = req;

            if (body.page == '0' || body.page == undefined) {
                body.page = 1;
            }

            let per_page = PER_PAGE_TEN;
            let limit = ((body.page - 1) * PER_PAGE_TEN);

            let search = "";

            if (body.page == '0' || body.page == undefined) {
                body.page = 1;
            }

            let fieldSort = "";
            if (body?.search) {
                search = ` and (name ILIKE '%${body?.search}%' or premium_features ILIKE '%${body?.search}%')`;
            }

            if (body?.fieldSort) {
                fieldSort = ` order by ${body.fieldSort}`;
            }

            let Active = ""
            if (body?.type === "Website") {
                Active= ` and is_active=1`
            }

            let sql = await SELECT_Q(`select id as subscription_id, name as plan_name,description as plan_description,
            premium_features, EXTRACT(DAY FROM duration) AS duration, price,${PER_PAGE_TEN} as per_page,is_active,is_deleted,created_at,
            (select count(*) from tbl_subscription where is_deleted=0) as subscription_count
            from tbl_subscription where is_deleted=0 ${Active} ${search} ${fieldSort} limit ${per_page} OFFSET ${limit}`, false)
            
            if (sql?.[0]) {
                return sendResponse(req, res, 200, '1', { keyword: "subscription_found", components: {} }, sql);
            } else {
                return sendResponse(req, res, 200, '2', { keyword: "no_data", components: {} }, []);
            }

        } catch (error) {
            return sendResponse(req, res, 200, '0', { keyword: "subscription_list_failed", components: {} }, error.message);
        }
    },

    editSubscription: async (req, res) => {
        try {
            let { body } = req;
            let sql = `update tbl_subscription set name=$1,description=$2,premium_features=$3,is_deleted=$4,is_active=$5,duration=$6,price=$7 where id='${body?.subscription_id}' RETURNING *`

            let values = [body?.plan_name, body?.plan_description, body?.premium_features, body?.is_deleted, body?.is_active,body?.duration, body?.price];

            await con.query(sql, values);

            return sendResponse(req, res, 200, '1', { keyword: "update_subscription", components: {} });

        } catch (error) {
            return sendResponse(req, res, 200, '0', { keyword: "update_subscription_failed", components: {} }, error.message);
        }
    },

}

module.exports = {
    Subscription
};