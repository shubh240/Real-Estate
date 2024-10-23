const { SELECT_Q } = require('../../../../utils/SQLWorker');
const { sendResponse } = require('../../../../middleware/headerValidator');
const { jwt_sign, sendEmail, checkUpdateDeviceInfo, company_details, sendSMS, client_details, employee_details } = require('../../../../utils/common');
const CryptoJS = require('crypto-js');
const SECRET = CryptoJS.enc.Utf8.parse(process.env.KEY);
const IV = CryptoJS.enc.Utf8.parse(process.env.KEY);
const randtoken = require('rand-token').generator();
const moment = require('moment');
const forgot_pass_template = require('../../../../views/templates/forgot_pass');
const con = require('../../../../config/database');
const jwt = require('jsonwebtoken');
const randomstring = require('randomstring');
const { WEBSITE_BASE_URL, PER_PAGE, PER_PAGE_TEN } = require('../../../../config/constants');
const common = require('../../../../utils/common');
const { t } = require('localizify');

//////////////////////////////////////////////////////////////////////
//                            Property API                              //
//////////////////////////////////////////////////////////////////////

let Payment = {

    estimationPrice: async (req, res) => {
        try {
            let { body } = req;
            const listingType = body?.listing_type;
            const dayDiff = body?.day_diff;
        
            const query = `
            WITH price_calculation AS (
                SELECT 
                    listing_type,
                    price::numeric,
                    per_day_price::numeric,
                    (per_day_price::numeric * $2) AS total_price,
                    $2 AS day_diff
                FROM 
                    tbl_add_details
                WHERE 
                    listing_type = $1
            )
            SELECT
                listing_type,
                day_diff,
                per_day_price,
                total_price
            FROM 
                price_calculation;
        `;

            let sql = await con.query(query, [listingType, dayDiff]);

            return sendResponse(req, res, 200, '1', { keyword: "to_show_price", components: {} }, sql.rows[0]);

        } catch (error) {
            return sendResponse(req, res, 200, '0', { keyword: "failed_to_show_price", components: {} }, error.message);
        }
    },

    addPaymentApi : async (req,res)=>{
        try {
            let payUnitCredential = con.query(`select * from tbl_payunit_credential where is_deleted=0`);

        } catch (error) {
            return sendResponse(req, res, 200, '0', { keyword: "payment_failed", components: {} }, error.message);
        }
    },

    addAdvertisement: async (req, res) => {
        try {
            let { body } = req;

            let sql = `INSERT INTO tbl_advertise (property_id , options , address , latitude ,longitude , start_date , end_date,estimation_price) 
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id`;

            let values = [body?.property_id, body?.option, body?.address, body?.latitude, body?.longitude, body?.start_date, body?.end_date, body?.estimation_price];

            let { rows } = await con.query(sql, values);
            let ad_id = rows[0]?.id;

            // Insert advertise images
            if (body?.ad_image) {
                await Promise.all(body.ad_image.map(async (image) => {
                    let imgSql = `INSERT INTO tbl_advertise_image (ad_id, ad_image) VALUES ($1, $2) RETURNING id`;
                    let imgvalues = [ad_id, image];
                    await con.query(imgSql, imgvalues);
                }));
            }

            return sendResponse(req, res, 200, '1', { keyword: "add_advertise", components: {} });

        } catch (error) {
            return sendResponse(req, res, 200, '0', { keyword: "failed_to_add_advertisemnet", components: {} }, error.message);
        }
    },

    AdvertisementDetails: async (req, res) => {
        try {
            let { body } = req;

            if (body.page == '0' || body.page == undefined) {
                body.page = 1;
            }

            let per_page = PER_PAGE_TEN;
            let limit = ((body.page - 1) * PER_PAGE_TEN);

            let fieldSort = "";

            if (body?.fieldSort) {
                fieldSort = ` order by ${body.fieldSort}`;
            }

            let sql = await SELECT_Q(`select id as advertise_id, image , concat('${process.env.AWS_S3_BASE_URL}/advertise_image/' , image) as advertise_image_link ,
            (select count(*) from tbl_advertise where is_deleted=0) as advertise_count
            from tbl_advertise where is_deleted=0 ${fieldSort} limit ${per_page} OFFSET ${limit}`, false)

            return sendResponse(req, res, 200, '1', { keyword: "advertise_found", components: {} }, sql);
        } catch (error) {
            return sendResponse(req, res, 200, '0', { keyword: "advertise_list_failed", components: {} }, error.message);
        }
    },

    deleteAdvertise: async (req, res) => {
        try {
            let { body } = req;
            let submitData = [
                body?.is_delete
            ]
            let { rows } = await con.query(`UPDATE tbl_advertise SET is_deleted=$1 WHERE id = '${body?.advertise_id}' RETURNING *`, submitData);

            return sendResponse(req, res, 200, '1', { keyword: "add_deleted", components: {} });

        } catch (error) {
            return sendResponse(req, res, 200, '0', { keyword: "add_deleted_failed", components: {} }, error.message);
        }
    },

    editAdvertise: async (req, res) => {
        try {
            let { body } = req;
            let advertise_id = req.params.id;
            let submitData = [
                body?.advertise_image
            ]
            let { rows } = await con.query(`UPDATE tbl_advertise SET image=$1 WHERE id = '${advertise_id}' RETURNING *`, submitData);

            return sendResponse(req, res, 200, '1', { keyword: "edit_add", components: {} });

        } catch (error) {
            return sendResponse(req, res, 200, '0', { keyword: "edit_add_failed", components: {} }, error.message);
        }
    },

}

module.exports = {
    Payment
};