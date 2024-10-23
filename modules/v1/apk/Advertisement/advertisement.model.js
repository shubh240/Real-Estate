const { SELECT_Q } = require('../../../../utils/SQLWorker');
const { sendResponse } = require('../../../../middleware/headerValidator');
const { jwt_sign, sendEmail, checkUpdateDeviceInfo, company_details, sendSMS, client_details, employee_details } = require('../../../../utils/common');
const CryptoJS = require('crypto-js');
const con = require('../../../../config/database');
const { WEBSITE_BASE_URL, PER_PAGE, PER_PAGE_TEN, PER_PAGE_SIX, AMENITY_IMAGE } = require('../../../../config/constants');
//////////////////////////////////////////////////////////////////////
//                            Property API                              //
//////////////////////////////////////////////////////////////////////

let Advertisement = {

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

    addAdvertisement: async (req, res) => {
        try {
            let { body } = req;
            let customer_id = req.loginUser;

            let fields = ["user_id", "property_id", "options", "start_date", "end_date", "estimation_price"];
            let values = [customer_id, body?.property_id, body?.option, body?.start_date, body?.end_date, body?.total_amount];
            let placeholders = ["$1", "$2", "$3", "$4", "$5", "$6"];

            if (body?.address) {
                fields.push("address");
                values.push(body.address);
                placeholders.push(`$${placeholders.length + 1}`);
            }

            if (body?.latitude) {
                fields.push("latitude");
                values.push(body.latitude);
                placeholders.push(`$${placeholders.length + 1}`);
            }

            if (body?.longitude) {
                fields.push("longitude");
                values.push(body.longitude);
                placeholders.push(`$${placeholders.length + 1}`);
            }

            let sql = `INSERT INTO tbl_advertise (${fields.join(",")}) VALUES (${placeholders.join(",")}) RETURNING id`;
            let { rows } = await con.query(sql, values);
            let ad_id = rows[0]?.id;

            // Insert advertise images
            if (body?.ad_image && body.ad_image.length > 0) {
                await Promise.all(body.ad_image.map(async (image) => {
                    let imgSql = `INSERT INTO tbl_advertise_image (ad_id, ad_image) VALUES ($1, $2) RETURNING id`;
                    let imgvalues = [ad_id, image];
                    await con.query(imgSql, imgvalues);
                }));
            }

            let result = await con.query(`SELECT * FROM tbl_user WHERE id=${customer_id} AND is_deleted=0`);

            if (result?.rows?.length > 0) {
                let fullName = result.rows[0].first_name + ' ' + result.rows[0].last_name;
                const subject = 'Advertise Property!';
                const message = `
                    <h1>Welcome, ${fullName}!</h1>
                    <p>Your Property advertisement request has been successfully submitted. For payments, please contact the admin.</p>
                    <p>Admin Email : bboyorealestate@gmail.com</p>
                    <p>Mobile Numbers:</p>
                    <ul>
                        <li>+1 682 313 9965</li>
                        <li>+237 654 087 072</li>
                    </ul>
                `;

                const emailSent = await sendEmail(result.rows[0]?.email, subject, message);

                if (emailSent) {
                    return sendResponse(req, res, 200, '1', { keyword: "add_advertise", components: {} });
                } else {
                    return sendResponse(req, res, 200, '0', { keyword: "failed_to_add_advertisement", components: {} });
                }
            }

        } catch (error) {
            return sendResponse(req, res, 200, '0', { keyword: "failed_to_add_advertisement", components: {} }, error.message);
        }
    },

    AdvertisementDetails: async (req, res) => {
        try {
            let { body } = req;

            if (body.page === '0' || body.page === undefined) {
                body.page = 1;
            }

            let per_page = PER_PAGE_SIX;
            let limit = (body.page - 1) * PER_PAGE_SIX;

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
                ${PER_PAGE_SIX} AS per_page_six,
                p.name AS property_name,
                to_char(a.start_date, 'DD Mon-YY') AS formatted_start_date,
                to_char(a.end_date, 'DD Mon-YY') AS formatted_end_date,
                pt.property_type,
                (SELECT COUNT(*) FROM tbl_advertise WHERE is_deleted = 0 AND user_id=${req.loginUser}) AS advertise_count
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
                a.is_deleted = 0 AND a.user_id = ${req.loginUser}
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

    AdvertisementLanding: async (req, res) => {
        try {
            let { body } = req;

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
                    p.id AS property_id,
                    ARRAY_AGG(CONCAT('${process.env.AWS_S3_BASE_URL}/property_images/', pi.image)) AS prop_images
                FROM 
                    tbl_properties p
                LEFT JOIN 
                    tbl_properties_image pi ON pi.property_id = p.id
                GROUP BY 
                    p.id
            ),
            property_amenities AS (
                SELECT
                    pam.property_id,
                    JSON_AGG(JSON_BUILD_OBJECT(
                        'amenity_name', pam.amenity_name,
                        'amenity_icon_link', CONCAT('${AMENITY_IMAGE}', pam.amenity_icon)
                    )) AS amenities
                FROM 
                    tbl_property_amenities pam
                GROUP BY 
                    pam.property_id
            ),
            property_attributes AS (
                SELECT
                    pa.property_id,
                    JSON_AGG(JSON_BUILD_OBJECT(
                        'attribute_type', pa.attribute_type,
                        'attribute_value', pa.attribute_value,
                        'attribute_image_link', CONCAT('${process.env.AWS_S3_BASE_URL}/attribute_type_image/', pa.attribute_icon)
                    )) AS attributes
                FROM 
                    tbl_property_attribute pa
                GROUP BY 
                    pa.property_id
            )
            SELECT 
                a.*,
                p.name AS property_name,
                p.price AS property_price,p.location,
                COALESCE(ad_images.ad_images, property_images.prop_images) AS images,
                property_amenities.amenities,
                property_attributes.attributes,
                ${PER_PAGE_SIX} AS per_page_six,
                TO_CHAR(a.start_date, 'DD Mon-YY') AS formatted_start_date,
                TO_CHAR(a.end_date, 'DD Mon-YY') AS formatted_end_date
            FROM 
                tbl_advertise a
            LEFT JOIN 
                ad_images ON ad_images.ad_id = a.id
            LEFT JOIN 
                tbl_properties p ON p.id = a.property_id
            LEFT JOIN 
                property_images ON property_images.property_id = p.id
            LEFT JOIN 
                property_amenities ON property_amenities.property_id = p.id
            LEFT JOIN 
                property_attributes ON property_attributes.property_id = p.id
            WHERE 
                a.is_deleted = 0
                AND a.options = '${body?.options}'
                AND a.status = 'Approved'
                AND a.end_date >= CURRENT_DATE
            ORDER BY 
                a.estimation_price DESC;
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
                body?.is_deleted
            ]
            await con.query(`UPDATE tbl_advertise SET is_deleted=$1 WHERE id = '${body?.advertise_id}' RETURNING *`, submitData);

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
                body?.property_id,
                body?.options,
                body?.address,
                body?.latitude,
                body?.longitude,
            ]
            await con.query(`UPDATE tbl_advertise SET property_id=$1,options=$2,address=$3,latitude=$4 ,longitude=$5 WHERE id = '${advertise_id}' RETURNING *`, submitData);

            if (body?.ad_image) {
                await con.query(`Delete from tbl_advertise_image  WHERE ad_id = '${advertise_id}'`);
                if (body?.ad_image?.length > 0) {
                    await Promise.all(body.ad_image.map(async (image) => {
                        let imgSql = `INSERT INTO tbl_advertise_image (ad_id, ad_image) VALUES ($1, $2) RETURNING id`;
                        let imgvalues = [advertise_id, image];
                        await con.query(imgSql, imgvalues);
                    }));
                }
            }

            return sendResponse(req, res, 200, '1', { keyword: "edit_add", components: {} });

        } catch (error) {
            return sendResponse(req, res, 200, '0', { keyword: "edit_add_failed", components: {} }, error.message);
        }
    },

}

module.exports = {
    Advertisement
};