const { SELECT_Q } = require('../../../../utils/SQLWorker');
const { sendResponse } = require('../../../../middleware/headerValidator');
const con = require('../../../../config/database');
const moment = require('moment');
const { PER_PAGE_TEN, PER_PAGE_SIXTY, PER_PAGE_FOURTINE } = require('../../../../config/constants');
const { generateContactUsTemplate, sendContactUsForEdit } = require('../../../../config/common');
const { sendEmail } = require('../../../../utils/common');

//////////////////////////////////////////////////////////////////////
//                           Common API                             //
//////////////////////////////////////////////////////////////////////
let Common = {

    countryList: async (req, res) => {
        try {
            let countryListData = await SELECT_Q(`select MAX(id) AS country_id, MAX(name) AS name, country_code, MAX(iso2) AS iso2 from tbl_country where is_active='1' and is_delete='0' GROUP BY country_code order by country_code asc`, "M", false);
            if (countryListData?.[0]) {
                return sendResponse(req, res, 200, '1', { keyword: "country_list_found", components: {} }, countryListData);
            } else {
                return sendResponse(req, res, 200, '2', { keyword: "no_data", components: {} }, countryListData);
            }
        } catch (e) {
            return sendResponse(req, res, 200, '0', { keyword: "country_list_failed", components: {} }, e?.message);
        }
    },

    appContent: async (req, res) => {
        try {
            let { body } = req;
            let content = await SELECT_Q(`select * from tbl_cms where page_id=${body?.page_id}`, false);
            return sendResponse(req, res, 200, '1', { keyword: "success", components: {} }, content[0]);
        } catch (e) {
            return sendResponse(req, res, 200, '0', { keyword: "Failed_To_show_this_page", components: {} }, e?.message);
        }
    },

    editAppContent: async (req, res) => {
        try {
            let { body } = req.body;
            let data = [
                body.content,
                body.french_content
            ]
            let content = await con.query(`update tbl_cms set content=$1 ,french_content=$2 where id=${body?.page_id}`, data);
            return sendResponse(req, res, 200, '1', { keyword: "success", components: {} }, content);
        } catch (e) {
            return sendResponse(req, res, 200, '0', { keyword: "Failed_To_Edit_This_Content", components: {} }, e?.message);
        }
    },

    listContactUs: async (req, res) => {
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
                search = ` and (first_name ILIKE '%${body?.search}%' or last_name ILIKE '%${body?.search}%' or country_code ILIKE '%${body?.search}%'
                or mobile_number ILIKE '%${body?.search}%'  or email ILIKE '%${body?.search}%' or subject ILIKE '%${body?.search}%')`;
            }
            if (body?.fieldSort) {
                fieldSort = ` order by ${body.fieldSort}`;
            }

            let contactList = await SELECT_Q(`select *,${PER_PAGE_TEN} as per_page,
            (SELECT COUNT(*) FROM tbl_contact_us WHERE is_deleted = 0) AS count
            from tbl_contact_us where is_deleted = 0 ${search} ${fieldSort} limit ${per_page} OFFSET ${limit}`, false);

            contactList?.map((e) =>
                e.created_at = (moment.utc(e.created_at).local().format('YYYY-MM-DD HH:mm:ss'))
            )

            if (contactList?.[0]) {
                return sendResponse(req, res, 200, '1', { keyword: "success", components: {} }, contactList);
            }
            else {
                return sendResponse(req, res, 200, '2', { keyword: "no_data", components: {} }, contactList);
            }
        } catch (e) {
        console.log('e :', e);
            return sendResponse(req, res, 200, '0', { keyword: "Failed_To_show_this_page", components: {} }, e?.message);
        }
    },

    changeContactStatus: async (req, res) => {
        try {
            let { body } = req;
            let contact_id = body?.contact_id;
            let submitData = [body?.contact_status];

            await con.query(`update tbl_contact_us set status=$1 where id='${contact_id}' and is_deleted=0 RETURNING *`, submitData);
            let emailSent = false

            if (body?.contact_status === "resolved") {
                const subject = `Regarding Your Query`
                const emailTemplate = await sendContactUsForEdit();
    
                emailSent = await sendEmail(body?.email, subject, emailTemplate);
            }

            if (emailSent || body?.contact_status == "awaiting" || body?.contact_status == "opened") {
                return sendResponse(req, res, 200, '1', { keyword: "contact_status", components: {} });
            } else {
                return sendResponse(req, res, 200, '0', { keyword: "Failed_To_change_status", components: {} });
            }
            

        } catch (e) {
            return sendResponse(req, res, 200, '0', { keyword: "Failed_To_change_status", components: {} }, e?.message);
        }
    },

    addFAQ: async (req, res) => {
        try {
            let { body } = req;
            let sql = `insert into tbl_faq (question , answer,frenchquestion,frenchanswer) values ($1,$2,$3,$4)  RETURNING id`
            let values = [body?.question, body?.answer,body?.frenchquestion, body?.frenchanswer];

            let { row } = con.query(sql, values);

            return sendResponse(req, res, 200, '1', { keyword: "add_faq", components: {} });

        } catch (error) {
            return sendResponse(req, res, 200, '0', { keyword: "add_faq_failed", components: {} }, error.message);
        }
    },

    editFAQ: async (req, res) => {
        try {
            let { body } = req;
            let faq_id = body?.faq_id;
            let fields = [];
            let values = [];
            let paramIndex = 1;

            if (body?.question !== undefined) {
                fields.push(`question=$${paramIndex++}`);
                values.push(body?.question);
            }

            if (body?.answer !== undefined) {
                fields.push(`answer=$${paramIndex++}`);
                values.push(body?.answer);
            }

            if (body?.frenchquestion !== undefined) {
                fields.push(`frenchquestion=$${paramIndex++}`);
                values.push(body?.frenchquestion);
            }

            if (body?.frenchanswer !== undefined) {
                fields.push(`frenchanswer=$${paramIndex++}`);
                values.push(body?.frenchanswer);
            }

            if (body?.is_active !== undefined) {
                fields.push(`is_active=$${paramIndex++}`);
                values.push(body?.is_active);
            }

            if (body?.is_deleted !== undefined) {
                fields.push(`is_deleted=$${paramIndex++}`);
                values.push(body?.is_deleted);
            }

            if (fields.length === 0) {
                return sendResponse(req, res, 400, '0', { keyword: "edit_faq_failed", components: {} }, 'No valid fields to update');
            }

            values.push(faq_id);

            let query = `UPDATE tbl_faq SET ${fields.join(', ')} WHERE id=$${paramIndex} AND is_deleted=0 RETURNING *`;
            let result = await con.query(query, values);

            if (result.rowCount === 0) {
                return sendResponse(req, res, 404, '0', { keyword: "edit_faq_failed", components: {} }, 'FAQ not found or already deleted');
            }

            return sendResponse(req, res, 200, '1', { keyword: "edit_faq", components: {} });

        } catch (error) {
            return sendResponse(req, res, 500, '0', { keyword: "edit_faq_failed", components: {} }, error.message);
        }
    },

    faqList: async (req, res) => {
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
                search = ` and (question ILIKE '%${body?.search}%' or answer ILIKE '%${body?.search}%')`;
            }
            let type="";
            if (body?.type === "website") {
                type = ` and is_active=1`;
            }
            if (body?.fieldSort) {
                fieldSort = ` order by ${body.fieldSort}`;
            }

            let faqList = await SELECT_Q(`select * from tbl_faq where is_deleted=0 ${type} ${search} ${fieldSort} limit ${per_page} OFFSET ${limit}`, false);

            if (faqList?.[0]) {
                return sendResponse(req, res, 200, '1', { keyword: "success", components: {} }, faqList);
            } else {
                return sendResponse(req, res, 200, '2', { keyword: "no_data", components: {} }, faqList);
            }
        } catch (e) {
            return sendResponse(req, res, 200, '0', { keyword: "Failed_To_show_this_page", components: {} }, e?.message);
        }
    },

    addResource: async (req, res) => {
        try {
            let { body } = req;
            let sql = `insert into tbl_resource (title , eng_content,french_content) values ($1,$2,$3)  RETURNING id`
            let values = [body?.title, body?.eng_content, body?.french_content];

            con.query(sql, values);

            return sendResponse(req, res, 200, '1', { keyword: "add_resource", components: {} });

        } catch (error) {
            return sendResponse(req, res, 200, '0', { keyword: "add_resource_failed", components: {} }, error.message);
        }
    },

    editResource: async (req, res) => {
        try {
            let { body } = req;
            let sql = `update tbl_resource set title=$1 , eng_content=$2,french_content=$3,is_deleted=$4,is_active=$5 where id='${body?.resource_id}' RETURNING *`

            let values = [body?.title, body?.eng_content, body?.french_content, body?.is_deleted, body?.is_active];

            await con.query(sql, values);

            return sendResponse(req, res, 200, '1', { keyword: "update_resource", components: {} });

        } catch (error) {
            return sendResponse(req, res, 200, '0', { keyword: "update_resource_failed", components: {} }, error.message);
        }
    },

    listResourceAdmin: async (req, res) => {
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
                search = ` and (title ILIKE '%${body?.search}%')`;
            }
            if (body?.fieldSort) {
                fieldSort = ` order by ${body.fieldSort}`;
            }

            let resourceList = await SELECT_Q(`select * ,${PER_PAGE_SIXTY} as per_page_sixty ,${PER_PAGE_TEN} as per_page_ten ,
            (SELECT COUNT(*) FROM tbl_resource WHERE is_deleted = 0) AS count
            from tbl_resource where is_deleted=0 ${search} ${fieldSort} limit ${per_page} OFFSET ${limit}`, false);

            if (resourceList?.[0]) {
                return sendResponse(req, res, 200, '1', { keyword: "success", components: {} }, resourceList);
            } else {
                return sendResponse(req, res, 200, '2', { keyword: "no_data", components: {} }, []);
            }
        } catch (e) {
            return sendResponse(req, res, 200, '0', { keyword: "Failed_To_show_this_page", components: {} }, e?.message);
        }
    },

    listResource: async (req, res) => {
        try {
            let { body } = req;
            let search = "";

            if (body.page == '0' || body.page == undefined) {
                body.page = 1;
            }

            let per_page = PER_PAGE_SIXTY;
            let limit = ((body.page - 1) * PER_PAGE_SIXTY);

            let fieldSort = "";
            if (body?.search) {
                search = ` and (title ILIKE '%${body?.search}%')`;
            }
            if (body?.fieldSort) {
                fieldSort = ` order by ${body.fieldSort}`;
            }

            let resourceList = await SELECT_Q(`select * ,${PER_PAGE_SIXTY} as per_page_sixty ,${PER_PAGE_TEN} as per_page_ten ,
            (SELECT COUNT(*) FROM tbl_resource WHERE is_deleted = 0) AS count
            from tbl_resource where is_deleted=0 and is_active=1 ${search} ${fieldSort} limit ${per_page} OFFSET ${limit}`, false);

            if (resourceList?.[0]) {
                return sendResponse(req, res, 200, '1', { keyword: "success", components: {} }, resourceList);
            } else {
                return sendResponse(req, res, 200, '2', { keyword: "no_data", components: {} }, []);
            }
        } catch (e) {
            return sendResponse(req, res, 200, '0', { keyword: "Failed_To_show_this_page", components: {} }, e?.message);
        }
    },

    listNotificationn: async (req, res) => {
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
                search = ` and (title ILIKE '%${body?.search}%')`;
            }
            if (body?.fieldSort) {
                fieldSort = ` order by ${body.fieldSort}`;
            }

            let resourceList = await SELECT_Q(`select * ,${PER_PAGE_TEN} as per_page_ten ,
            (SELECT COUNT(*) FROM tbl_notification WHERE is_deleted = 0) AS count
            from tbl_notification where is_deleted=0 ${search} ${fieldSort} limit ${per_page} OFFSET ${limit}`, false);

            if (resourceList?.[0]) {
                return sendResponse(req, res, 200, '1', { keyword: "success", components: {} }, resourceList);
            } else {
                return sendResponse(req, res, 200, '2', { keyword: "no_data", components: {} }, []);
            }
        } catch (e) {
            return sendResponse(req, res, 200, '0', { keyword: "Failed_To_show_this_page", components: {} }, e?.message);
        }
    },

    deleteNotification: async (req, res) => {
        try {
            let { body } = req;
            let submitData = [
                body?.is_delete
            ]
            await con.query(`UPDATE tbl_notification SET is_deleted=$1 WHERE id = '${body?.notification_id}' RETURNING *`, submitData);

            return sendResponse(req, res, 200, '1', { keyword: "delete_notification", components: {} });

        } catch (error) {
            return sendResponse(req, res, 200, '0', { keyword: "failed_delete_notification", components: {} }, error.message);
        }
    },

    listWebNotificationn: async (req, res) => {
        try {
            let { body } = req;
            let search = "";

            if (body.page == '0' || body.page == undefined) {
                body.page = 1;
            }

            let per_page = PER_PAGE_FOURTINE;
            let limit = ((body.page - 1) * PER_PAGE_FOURTINE);

            let fieldSort = "";
            if (body?.search) {
                search = ` and (title ILIKE '%${body?.search}%')`;
            }
            if (body?.fieldSort) {
                fieldSort = ` order by ${body.fieldSort}`;
            }

            let resourceList = await SELECT_Q(`select * ,${PER_PAGE_FOURTINE} as per_page_fortine,
            (SELECT COUNT(*) FROM tbl_notification WHERE is_deleted = 0 and receiver_id=${req.loginUser}) AS count
            from tbl_notification where is_deleted=0 and receiver_id=${req.loginUser} ${search} ${fieldSort} limit ${per_page} OFFSET ${limit}`, false);
            
            if (resourceList?.[0]) {
                return sendResponse(req, res, 200, '1', { keyword: "success", components: {} }, resourceList);
            } else {
                return sendResponse(req, res, 200, '2', { keyword: "no_data", components: {} }, []);
            }
        } catch (e) {
            return sendResponse(req, res, 200, '0', { keyword: "Failed_To_show_this_page", components: {} }, e?.message);
        }
    },

}
module.exports = {
    Common
};