const { SELECT_Q } = require('../../../../utils/SQLWorker');
const { sendResponse } = require('../../../../middleware/headerValidator');
const { jwt_sign, sendEmail, checkUpdateDeviceInfo, company_details, sendSMS, client_details, employee_details } = require('../../../../utils/common');
const CryptoJS = require('crypto-js');
const con = require('../../../../config/database');
const { WEBSITE_BASE_URL, PER_PAGE, PER_PAGE_TEN } = require('../../../../config/constants');

//////////////////////////////////////////////////////////////////////
//                            Property API                              //
//////////////////////////////////////////////////////////////////////

let Advertisement = {

    addAdvertisement : async (req,res)=>{
        try {
            let { body } = req;
            let sql = `INSERT INTO tbl_advertise (image) VALUES ($1) RETURNING id`;
            let values = [body?.advertise_image];

            await con.query(sql, values);

            return sendResponse(req, res, 200, '1', { keyword: "add_advertise", components: {} });

        } catch (error) {
            return sendResponse(req, res, 200, '0', { keyword: "failed_to_add_advertisemnet", components: {} }, error.message);
        }
    },

    AdvertisementDetails : async (req, res) => {
        try {
            let { body } = req;
            let search = "";

            if (body.page === '0' || body.page === undefined) {
                body.page = 1;
            }
    
            let per_page = PER_PAGE_TEN;
            let limit = (body.page - 1) * PER_PAGE_TEN;
    
            if (body?.search) {
                search = ` and (p.name ILIKE '%${body?.search}%' or a.options ILIKE '%${body?.search}%')`;
            }

            let fieldSort = "";
            if (body?.fieldSort) {
                fieldSort = ` ORDER BY a.${body.fieldSort}`;
            }
    
            let sql = await SELECT_Q(`
            WITH ad_images AS (
                SELECT 
                    ai.ad_id,
                    ARRAY_AGG(CONCAT('${process.env.AWS_S3_BASE_URL}/advertise_banners/', ai.ad_image)) AS ad_images
                FROM 
                    tbl_advertise_image ai
                GROUP BY 
                    ai.ad_id
            ),
            property_images AS (
                SELECT 
                    pi.property_id,
                    ARRAY_AGG(CONCAT('${process.env.AWS_S3_BASE_URL}/property_images/', pi.image)) AS property_images
                FROM 
                    tbl_properties_image pi
                GROUP BY 
                    pi.property_id
            )
            SELECT 
                a.*, 
                COALESCE(ad_images.ad_images, property_images.property_images) AS images,
                ${PER_PAGE_TEN} AS per_page_ten,
                p.name AS property_name,
                to_char(a.start_date, 'DD Mon-YY') AS formatted_start_date,
                to_char(a.end_date, 'DD Mon-YY') AS formatted_end_date,
                pt.property_type,
                (SELECT COUNT(*) FROM tbl_advertise WHERE is_deleted = 0) AS advertise_count
            FROM 
                tbl_advertise a
            LEFT JOIN 
                ad_images ON ad_images.ad_id = a.id
            LEFT JOIN 
                tbl_properties p ON p.id = a.property_id
            LEFT JOIN 
                property_images ON property_images.property_id = p.id
            LEFT JOIN 
                tbl_properties_categories pc ON p.category_id = pc.id
            LEFT JOIN 
                tbl_properties_type pt ON pt.category_id = pc.id
            WHERE 
                a.is_deleted = 0
            GROUP BY 
                a.id, p.name, pt.property_type, ad_images.ad_images, property_images.property_images
            ${fieldSort}
            LIMIT 
                ${per_page} OFFSET ${limit}
        `, false);

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
            let advertise_id = body?.advertise_id;
            let submitData = [
                body?.status,
                body?.transaction_id
            ]
            let { rows } = await con.query(`UPDATE tbl_advertise SET status=$1,transaction_id=$2 WHERE id = '${advertise_id}' RETURNING *`, submitData);

            return sendResponse(req, res, 200, '1', { keyword: "edit_add", components: {} });

        } catch (error) {
            return sendResponse(req, res, 200, '0', { keyword: "edit_add_failed", components: {} }, error.message);
        }
    },

}

module.exports = {
    Advertisement
};