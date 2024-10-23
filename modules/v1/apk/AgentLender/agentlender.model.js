const { SELECT_Q } = require('../../../../utils/SQLWorker');
const { sendResponse } = require('../../../../middleware/headerValidator');
const { jwt_sign, sendEmail, checkUpdateDeviceInfo, company_details, sendSMS, client_details, employee_details } = require('../../../../utils/common');
const CryptoJS = require('crypto-js');
const moment = require('moment');
const con = require('../../../../config/database');
const { WEBSITE_BASE_URL, PER_PAGE_TEN, PER_PAGE_TWELVE, AGENT_LENDER_PER_PAGE } = require('../../../../config/constants');
const { sendOtpTemplate, sendEmailTemplate, sendEmailTemplateForEdit } = require('../../../../config/common');

//////////////////////////////////////////////////////////////////////
//                            Auth API                              //
//////////////////////////////////////////////////////////////////////

let AgentLender = {

    agentsignUp: async (req, res) => {
        try {
            let { body } = req;

            let sql = `INSERT INTO tbl_agent (name, email, country_code, mobile_number, address,latitude,longitude,profile_image,id_card,license,status,bio) VALUES ($1, $2, $3, $4, $5,$6, $7, $8, $9, $10,$11,$12) RETURNING id`;

            var values = [
                body?.agent_name,
                body?.email,
                body?.country_code_id,
                body?.mobile_number,
                body?.address,
                body?.latitude,
                body?.longitude,
                body?.profile_image,
                body?.id_card,
                body?.license,
                "approved",
                body.bio ? body?.bio : ""
            ]

            let { rows } = await con.query(sql, values);

            // const subject = 'Your Account Has Been Pending';
            // const message = `
            //         <h1>Congratulations, ${body?.agent_name}.</h1>
            //         <p>Your agent request has been successfully submitted. For subscription payments, please contact the admin.</p>
            //     `;

            // const emailSent = await sendEmail(body?.email, subject, message);

            // if (emailSent) {
            return sendResponse(req, res, 200, '1', { keyword: "rest_keywords_agent_signup_success", components: {} });
            // } else {
            //     return sendResponse(req, res, 200, '0', { keyword: "rest_keywords_agent_signup_failed", components: {} }, 'Failed to send welcome email');
            // }

        } catch (e) {
            return sendResponse(req, res, 200, '0', { keyword: "rest_keywords_agent_signup_failed", components: {} }, e?.message);
        }
    },

    agentWebSignUp: async (req, res) => {
        try {
            let { body } = req;
            let user_id = req.loginUser;

            let sql = `INSERT INTO tbl_agent (user_id,name, email, country_code, mobile_number, address,latitude,longitude,profile_image,id_card,license,status,bio) VALUES ($1, $2, $3, $4, $5,$6, $7, $8, $9, $10,$11,$12,$13) RETURNING id`;

            var values = [
                user_id,
                body?.agent_name,
                body?.email,
                body?.country_code_id,
                body?.mobile_number,
                body?.address,
                body?.latitude,
                body?.longitude,
                body?.profile_image,
                body?.id_card,
                body?.license,
                "pending",
                body.bio ? body?.bio : ""
            ]

            let result = await con.query(sql, values);

            if (result?.rows?.[0]) {
                let sql = `INSERT INTO tbl_agent_subscription (agent_id, subscription_id) VALUES ($1, $2) RETURNING id`;

                var values = [
                    result?.rows[0]?.id,
                    body?.subscription_id
                ]

                let { rows } = await con.query(sql, values);

                if (rows?.[0]) {
                    const subject = 'Welcome to Our Platform!';
                    // const message = `
                    // <h1>Welcome, ${body?.agent_name}!</h1>
                    // <p>Thank you for signing up with us. Your account is currently pending approval.</p>
                    // <p>We'll notify you once your account has been approved.</p>
                    // `;

                    const emailTemplate = await sendEmailTemplate({ name: body?.agent_name, type: "Agent Profile" });

                    const emailSent = await sendEmail(body?.email, subject, emailTemplate);

                    if (emailSent) {
                        return sendResponse(req, res, 200, '1', { keyword: "rest_keywords_agent_signup_success", components: {} });
                    } else {
                        return sendResponse(req, res, 200, '0', { keyword: "rest_keywords_agent_signup_failed", components: {} }, 'Failed to send welcome email');
                    }
                }
            }

        } catch (e) {
            return sendResponse(req, res, 200, '0', { keyword: "rest_keywords_agent_signup_failed", components: {} }, e?.message);
        }
    },

    lednersignUp: async (req, res) => {
        try {
            let { body } = req;

            let sql = `INSERT INTO tbl_lender (name, email, country_code, mobile_number, address,latitude,longitude,profile_image,id_card,license,status,bio) VALUES ($1, $2, $3, $4, $5,$6, $7, $8, $9, $10,$11,$12) RETURNING id`;

            var values = [
                body?.lender_name,
                body?.email,
                body?.country_code_id,
                body?.mobile_number,
                body?.address,
                body?.latitude,
                body?.longitude,
                body?.profile_image,
                body?.id_card,
                body?.license,
                "approved",
                body?.bio ? body?.bio : ""
            ]

            let { rows } = await con.query(sql, values);

            return sendResponse(req, res, 200, '1', { keyword: "rest_keywords_lender_signup_success", components: {} });
            
        } catch (e) {
            return sendResponse(req, res, 200, '0', { keyword: "rest_keywords_lender_signup_failed", components: {} }, e?.message);
        }
    },

    lednerWebsignUp: async (req, res) => {
        try {
            let { body } = req;
            let user_id = req.loginUser;

            let sql = `INSERT INTO tbl_lender (user_id,name, email, country_code, mobile_number, address,latitude,longitude,profile_image,id_card,license,status,bio) VALUES ($1, $2, $3, $4, $5,$6, $7, $8, $9, $10,$11,$12,$13) RETURNING id`;

            var values = [
                user_id,
                body?.lender_name,
                body?.email,
                body?.country_code_id,
                body?.mobile_number,
                body?.address,
                body?.latitude,
                body?.longitude,
                body?.profile_image,
                body?.id_card,
                body?.license,
                "pending",
                body?.bio ? body?.bio : ""
            ]

            let result = await con.query(sql, values);

            if (result?.rows?.[0]) {
                let sql = `INSERT INTO tbl_lender_subscription (lender_id, subscription_id) VALUES ($1, $2) RETURNING id`;

                var values = [
                    result?.rows[0]?.id,
                    body?.subscription_id
                ]

                let { rows } = await con.query(sql, values);

                if (rows?.[0]) {
                    const subject = 'Welcome to Our Platform!';

                    const emailTemplate = await sendEmailTemplate({ name: body?.lender_name, type: "Lender Profile" });

                    const emailSent = await sendEmail(body?.email, subject, emailTemplate);

                    if (emailSent) {
                        return sendResponse(req, res, 200, '1', { keyword: "rest_keywords_lender_signup_success", components: {} });
                    } else {
                        return sendResponse(req, res, 200, '0', { keyword: "rest_keywords_lender_signup_failed", components: {} }, 'Failed to send welcome email');
                    }
                }
            }

        } catch (e) {
            return sendResponse(req, res, 200, '0', { keyword: "rest_keywords_lender_signup_failed", components: {} }, e?.message);
        }
    },

    agentListing: async (req, res) => {

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
                search = ` and (u.name ILIKE '%${body?.search}%' or u.mobile_number ILIKE '%${body?.search}%'  or u.email ILIKE '%${body?.search}%' 
                or u.address ILIKE '%${body?.search}%'
                )`;
            }
            if (body?.fieldSort) {
                fieldSort = ` order by u.${body.fieldSort}`;
            }

            const baseURL = process.env.AWS_S3_BASE_URL;

            let AgentDetails = await SELECT_Q(`select u.id, u.name , u.email ,s.price,
            u.country_code ,u.mobile_number ,u.address,u.created_at,
            ${PER_PAGE_TEN} as per_page,u.user_id,u.transaction_id,u.bio,
            (select count(*) from tbl_agent a where a.is_deleted = 0) as agent_count,
            concat('${baseURL}/agent_profile/' , u.profile_image) as profile_image_link,u.profile_image, 
            concat('${baseURL}/agent_id_card/' , u.id_card) as id_card_link,u.id_card, 
            concat('${baseURL}/agent_license/' , u.license) as license_link,u.license,u.status,u.latitude,u.longitude
            from tbl_agent u
            LEFT JOIN  tbl_agent_subscription ags on ags.agent_id = u.id
            LEFT JOIN tbl_subscription s on s.id = ags.subscription_id
            WHERE u.is_deleted = 0 ${search} ${fieldSort} limit ${per_page} OFFSET ${limit}`, false);

            AgentDetails?.map((e) =>
                e.created_at = (moment.utc(e.created_at).local().format('YYYY-MM-DD HH:mm:ss'))
            )

            if (AgentDetails?.length) {
                return sendResponse(req, res, 200, '1', { keyword: "agent_list", components: {} }, AgentDetails);
            } else {
                return sendResponse(req, res, 200, '2', { keyword: "no_data", components: {} }, []);
            }
        } catch (error) {
            return sendResponse(req, res, 200, '0', { keyword: "agent_list_failed", components: {} }, error.message);
        }
    },

    agentWebListing: async (req, res) => {

        try {
            let { body } = req;
            let search = "";

            if (body.page == '0' || body.page == undefined) {
                body.page = 1;
            }

            let per_page = AGENT_LENDER_PER_PAGE;
            let limit = ((body.page - 1) * AGENT_LENDER_PER_PAGE);

            let fieldSort = "";
            if (body?.search) {
                search = ` and (u.name ILIKE '%${body?.search}%' or u.mobile_number ILIKE '%${body?.search}%'  or u.email ILIKE '%${body?.search}%' 
                or u.address ILIKE '%${body?.search}%'
                )`;
            }
            if (body?.fieldSort) {
                fieldSort = ` order by u.${body.fieldSort}`;
            }

            const baseURL = process.env.AWS_S3_BASE_URL;

            let AgentDetails = await SELECT_Q(`select u.id, u.name , u.email ,
            u.country_code ,u.mobile_number ,u.address,created_at,u.bio,
            ${AGENT_LENDER_PER_PAGE} as per_page,
            (select count(id) from tbl_agent where is_deleted = 0 and status ='approved') as agent_count,
            concat('${baseURL}/agent_profile/' , u.profile_image) as profile_image_link,u.profile_image, 
            concat('${baseURL}/agent_id_card/' , u.id_card) as id_card_link,u.id_card, 
            concat('${baseURL}/agent_license/' , u.license) as license_link,u.license,u.status,u.latitude,u.longitude
            from tbl_agent u
            WHERE u.is_deleted = 0 and u.status ='approved' ${search} ${fieldSort} limit ${per_page} OFFSET ${limit}`, false);
            
            AgentDetails?.map((e) =>
                e.created_at = (moment.utc(e.created_at).local().format('YYYY-MM-DD HH:mm:ss'))
            )

            if (AgentDetails?.length) {
                return sendResponse(req, res, 200, '1', { keyword: "agent_list", components: {} }, AgentDetails);
            } else {
                return sendResponse(req, res, 200, '2', { keyword: "no_data", components: {} }, []);
            }
        } catch (error) {
            return sendResponse(req, res, 200, '0', { keyword: "agent_list_failed", components: {} }, error.message);
        }
    },

    lenderListing: async (req, res) => {

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
                search = ` and (u.name ILIKE '%${body?.search}%' or u.mobile_number ILIKE '%${body?.search}%'  or u.email ILIKE '%${body?.search}%' or u.address ILIKE '%${body?.search}%')`;
            }
            if (body?.fieldSort) {
                fieldSort = ` order by u.${body.fieldSort}`;
            }

            const baseURL = process.env.AWS_S3_BASE_URL;

            let LenderDetails = await SELECT_Q(`select u.id, u.name , u.email ,s.price,
            u.country_code,u.mobile_number,u.address,u.created_at,
            ${PER_PAGE_TEN} as per_page,u.user_id,u.transaction_id,u.bio,
            (select count(*) from tbl_lender a where is_deleted = 0 ) lender_count,
            concat('${baseURL}/lender_profile/' , u.profile_image) as profile_image_link,u.profile_image, 
            concat('${baseURL}/lender_id_card/' , u.id_card) as id_card_link,u.id_card, 
            concat('${baseURL}/lender_license/' , u.license) as license_link,u.license,u.status,u.latitude,u.longitude
            from tbl_lender u
            LEFT JOIN tbl_lender_subscription ags on ags.lender_id = u.id
            LEFT JOIN tbl_subscription s on s.id = ags.subscription_id
            WHERE u.is_deleted = 0 ${search} ${fieldSort} limit ${per_page} OFFSET ${limit}`, false);

            LenderDetails?.map((e) =>
                e.created_at = (moment.utc(e.created_at).local().format('YYYY-MM-DD HH:mm:ss'))
            )

            if (LenderDetails?.length) {
                return sendResponse(req, res, 200, '1', { keyword: "lender_list", components: {} }, LenderDetails);
            } else {
                return sendResponse(req, res, 200, '2', { keyword: "no_data", components: {} }, []);
            }
        } catch (error) {
            return sendResponse(req, res, 200, '0', { keyword: "lender_list_failed", components: {} }, error.message);
        }
    },

    lenderWebListing: async (req, res) => {

        try {
            let { body } = req;
            let search = "";

            if (body.page == '0' || body.page == undefined) {
                body.page = 1;
            }

            let per_page = AGENT_LENDER_PER_PAGE;
            let limit = ((body.page - 1) * AGENT_LENDER_PER_PAGE);

            let fieldSort = "";
            if (body?.search) {
                search = ` and (u.name ILIKE '%${body?.search}%' or u.mobile_number ILIKE '%${body?.search}%'  or u.email ILIKE '%${body?.search}%' or u.address ILIKE '%${body?.search}%')`;
            }
            if (body?.fieldSort) {
                fieldSort = ` order by u.${body.fieldSort}`;
            }

            const baseURL = process.env.AWS_S3_BASE_URL;

            let LenderDetails = await SELECT_Q(`select u.id, u.name , u.email ,
            u.country_code,u.mobile_number,u.address,created_at,u.bio,
            ${AGENT_LENDER_PER_PAGE} as per_page,
            (select count(id) from tbl_lender where is_deleted = 0 and status ='approved' ) lender_count,
            concat('${baseURL}/lender_profile/' , u.profile_image) as profile_image_link,u.profile_image, 
            concat('${baseURL}/lender_id_card/' , u.id_card) as id_card_link,u.id_card, 
            concat('${baseURL}/lender_license/' , u.license) as license_link,u.license,u.status,u.latitude,u.longitude
            from tbl_lender u
            WHERE u.is_deleted = 0 and u.status ='approved' ${search} ${fieldSort} limit ${per_page} OFFSET ${limit}`, false);

            LenderDetails?.map((e) =>
                e.created_at = (moment.utc(e.created_at).local().format('YYYY-MM-DD HH:mm:ss'))
            )

            if (LenderDetails?.length) {
                return sendResponse(req, res, 200, '1', { keyword: "lender_list", components: {} }, LenderDetails);
            } else {
                return sendResponse(req, res, 200, '2', { keyword: "no_data", components: {} }, []);
            }
        } catch (error) {
            return sendResponse(req, res, 200, '0', { keyword: "lender_list_failed", components: {} }, error.message);
        }
    },

    editAgent: async (req, res) => {
        try {
            let { body } = req;
            let agent_id = body?.agent_id;

            let query = 'UPDATE tbl_agent SET';
            let values = [];
            let counter = 1;

            if (body.agent_name) {
                query += ` name=$${counter},`;
                values.push(body.agent_name);
                counter++;
            }
            if (body.email) {
                query += ` email=$${counter},`;
                values.push(body.email);
                counter++;
            }
            if (body.country_code_id) {
                query += ` country_code=$${counter},`;
                values.push(body.country_code_id);
                counter++;
            }
            if (body.mobile_number) {
                query += ` mobile_number=$${counter},`;
                values.push(body.mobile_number);
                counter++;
            }
            if (body.address) {
                query += ` address=$${counter},`;
                values.push(body.address);
                counter++;
            }
            if (body.latitude) {
                query += ` latitude=$${counter},`;
                values.push(body.latitude);
                counter++;
            }
            if (body.longitude) {
                query += ` longitude=$${counter},`;
                values.push(body.longitude);
                counter++;
            }
            if (body.profile_image) {
                query += ` profile_image=$${counter},`;
                values.push(body.profile_image);
                counter++;
            }
            if (body.id_card) {
                query += ` id_card=$${counter},`;
                values.push(body.id_card);
                counter++;
            }
            if (body.license) {
                query += ` license=$${counter},`;
                values.push(body.license);
                counter++;
            }
            if (body.status) {
                query += ` status=$${counter},`;
                values.push(body.status);
                counter++;
            }
            if (body.transaction_id) {
                query += ` transaction_id=$${counter},`;
                values.push(body.transaction_id);
                counter++;
            }
            if (body.bio !== undefined) {
                query += ` bio=$${counter},`;
                values.push(body.bio);
                counter++;
            }
            if (body.is_deleted !== undefined) {
                query += ` is_deleted=$${counter},`;
                values.push(body.is_deleted);
                counter++;
            }

            // Remove trailing comma and add the WHERE clause
            query = query.slice(0, -1);
            query += ` WHERE id='${agent_id}' RETURNING *`;

            await con.query(query, values);

            let emailSent = false;

            if (body.status === 'approved') {
                const subject = 'Agent Account';

                const emailTemplate = await sendEmailTemplateForEdit({ name: body?.agent_name, type: "Agent Profile" });

                emailSent = await sendEmail(body?.email, subject, emailTemplate);
            }

            if (emailSent || body.status == "pending") {
                return sendResponse(req, res, 200, '1', { keyword: "agent_list_update", components: {} });
            } 
            else {
                return sendResponse(req, res, 200, '1', { keyword: "agent_list_update", components: {} });
            }

        } catch (error) {
            return sendResponse(req, res, 200, '0', { keyword: "Failed_update_agent", components: {} }, error.message);
        }
    },

    editLender: async (req, res) => {
        try {
            let { body } = req;
            let lender_id = body?.lender_id;

            let query = 'UPDATE tbl_lender SET';
            let values = [];
            let counter = 1;

            if (body.lender_name) {
                query += ` name=$${counter},`;
                values.push(body.lender_name);
                counter++;
            }
            if (body.email) {
                query += ` email=$${counter},`;
                values.push(body.email);
                counter++;
            }
            if (body.country_code_id) {
                query += ` country_code=$${counter},`;
                values.push(body.country_code_id);
                counter++;
            }
            if (body.mobile_number) {
                query += ` mobile_number=$${counter},`;
                values.push(body.mobile_number);
                counter++;
            }
            if (body.address) {
                query += ` address=$${counter},`;
                values.push(body.address);
                counter++;
            }
            if (body.latitude) {
                query += ` latitude=$${counter},`;
                values.push(body.latitude);
                counter++;
            }
            if (body.longitude) {
                query += ` longitude=$${counter},`;
                values.push(body.longitude);
                counter++;
            }
            if (body.profile_image) {
                query += ` profile_image=$${counter},`;
                values.push(body.profile_image);
                counter++;
            }
            if (body.id_card) {
                query += ` id_card=$${counter},`;
                values.push(body.id_card);
                counter++;
            }
            if (body.license) {
                query += ` license=$${counter},`;
                values.push(body.license);
                counter++;
            }
            if (body.status) {
                query += ` status=$${counter},`;
                values.push(body.status);
                counter++;
            }
            if (body.transaction_id) {
                query += ` transaction_id=$${counter},`;
                values.push(body.transaction_id);
                counter++;
            }
            if (body.bio !== undefined) {
                query += ` bio=$${counter},`;
                values.push(body.bio);
                counter++;
            }
            if (body.is_deleted !== undefined) {
                query += ` is_deleted=$${counter},`;
                values.push(body.is_deleted);
                counter++;
            }

            // Remove trailing comma and add the WHERE clause
            query = query.slice(0, -1);
            query += ` WHERE id='${lender_id}' RETURNING *`;

            let { rows } = await con.query(query, values);

            let emailSent = false;

            if (body.status === 'approved') {
                const subject = 'Lender Account';

                const emailTemplate = await sendEmailTemplateForEdit({ name: body?.lender_name, type: "Lender Profile" });

                emailSent = await sendEmail(body?.email, subject, emailTemplate);
            }

            if (emailSent || body.status == "pending") {
            return sendResponse(req, res, 200, '1', { keyword: "lender_list_update", components: {} });
            } else {
                return sendResponse(req, res, 200, '1', { keyword: "lender_list_update", components: {} }, 'Failed to send email notification');
            }

        } catch (error) {
            return sendResponse(req, res, 200, '0', { keyword: "Failed_update_lender", components: {} }, error.message);
        }
    },

}


module.exports = {
    AgentLender
};