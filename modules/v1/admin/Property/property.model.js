const { SELECT_Q } = require('../../../../utils/SQLWorker');
const { sendResponse } = require('../../../../middleware/headerValidator');
const { jwt_sign, sendEmail, checkUpdateDeviceInfo, company_details, sendSMS, client_details, employee_details } = require('../../../../utils/common');
const CryptoJS = require('crypto-js');
const con = require('../../../../config/database');
const { WEBSITE_BASE_URL, PER_PAGE, PER_PAGE_TEN } = require('../../../../config/constants');
const common = require('../../../../utils/common');

//////////////////////////////////////////////////////////////////////
//                            Property API                          //
//////////////////////////////////////////////////////////////////////

let Property = {

    getDashboardCount: async (req, res) => {
        try {
            let sql = await SELECT_Q(`SELECT 
            COUNT(u.id) AS customer_count,
            (SELECT COUNT(u1.*) FROM tbl_user u1 WHERE u1.is_deleted = 0 and u1.is_active = 1) AS active_customer,
            (SELECT COUNT(DISTINCT(p1.user_id)) FROM tbl_properties p1 WHERE p1.is_deleted = 0) AS property_owner_count,
            (SELECT COUNT(p.*) FROM tbl_properties p join tbl_user u on u.id = p.user_id WHERE p.is_deleted = 0 and u.is_deleted=0) AS property_count,
            (SELECT COUNT(p3.*) FROM tbl_properties p3 WHERE p3.is_deleted = 0 and p3.is_active=1) AS property_active,
            (SELECT COUNT(DISTINCT(p2.user_id)) FROM tbl_properties p2 WHERE p2.is_deleted = 0 and p2.is_active = 1) AS active_property_owner,
            (SELECT COUNT(pc.*) FROM tbl_properties_categories pc WHERE pc.is_deleted = 0) AS property_category_count,
            (SELECT COUNT(pc1.*) FROM tbl_properties_categories pc1 WHERE pc1.is_deleted = 0 and pc1.is_active=1) AS property_category_active,
            (SELECT COUNT(pt.*) FROM tbl_properties_type pt WHERE pt.is_deleted = 0) AS property_type_count,
            (SELECT COUNT(pt1.*) FROM tbl_properties_type pt1 WHERE pt1.is_deleted = 0 and pt1.is_active=1) AS property_type_active,
            (SELECT COUNT(s.*) FROM tbl_subscription s WHERE s.is_deleted = 0) AS subscription_count,
            (SELECT COUNT(s1.*) FROM tbl_subscription s1 WHERE s1.is_deleted = 0 and s1.is_active = 1) AS subscription_active,
            (SELECT COUNT(r.*) FROM tbl_resource r WHERE r.is_deleted = 0) AS resource_count,
            (SELECT COUNT(r1.*) FROM tbl_resource r1 WHERE r1.is_deleted = 0 and r1.is_active=1) AS resource_active,
            (SELECT COUNT(ag.*) FROM tbl_agent ag WHERE ag.is_deleted = 0) AS agent_count,
            (SELECT COUNT(ag1.*) FROM tbl_agent ag1 WHERE ag1.is_deleted = 0 and ag1.is_active=1) AS agent_active,
            (SELECT COUNT(l.*) FROM tbl_lender l WHERE l.is_deleted = 0) AS lender_count,
            (SELECT COUNT(l1.*) FROM tbl_lender l1 WHERE l1.is_deleted = 0 and l1.is_active=1) AS lender_active,
            (SELECT COUNT(a.*) FROM tbl_advertise a WHERE a.is_deleted = 0) AS advertise_count,
            (SELECT COUNT(a1.*) FROM tbl_advertise a1 WHERE a1.is_deleted = 0 and a1.is_active=1) AS advertise_active
        FROM 
            tbl_user u 
        WHERE 
            u.is_deleted = 0
        `)
            return sendResponse(req, res, 200, '1', { keyword: "fetch_dashboard_count", components: {} }, sql[0]);
        } catch (error) {
            return sendResponse(req, res, 200, '0', { keyword: "Failed_to_fetch_dashboard_count", components: {} }, error.message);
        }
    },

    addCategory: async (req, res) => {
        try {
            let { body } = req;
            let sql = `INSERT INTO tbl_properties_categories (name, image, about) VALUES ($1, $2, $3) RETURNING id`;
            let values = [body?.name, body?.image, body?.about];

            let { row } = await con.query(sql, values);

            return sendResponse(req, res, 200, '1', { keyword: "add_category", components: {} });

        } catch (error) {
            return sendResponse(req, res, 200, '0', { keyword: "add_category_failed", components: {} }, error.message);
        }
    },

    CategoryListing: async (req, res) => {
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
                search = ` and name ILIKE '%${body?.search}%'`;
            }

            if (body?.fieldSort) {
                fieldSort = ` order by ${body.fieldSort}`;
            }

            let categoryDetails = await SELECT_Q(`select id as category_id,name as category_name ,image as category_image,about ,is_active,
            (SELECT COUNT(*) FROM tbl_properties_categories WHERE is_deleted = 0) AS category_count ,${PER_PAGE_TEN} as per_page
            from tbl_properties_categories 
            where is_deleted = 0 ${search} ${fieldSort} limit ${per_page} OFFSET ${limit}`, false);

            if (categoryDetails?.length) {
                const baseURL = process.env.AWS_S3_BASE_URL;
                categoryDetails = categoryDetails.map(category => ({
                    ...category,
                    category_image_link: `${baseURL}/category_image/${category.category_image}`
                }));
                return sendResponse(req, res, 200, '1', { keyword: "category_list_found", components: {} }, categoryDetails);
            } else {
                return sendResponse(req, res, 200, '2', { keyword: "no_data", components: {} }, []);
            }
        } catch (error) {
            return sendResponse(req, res, 200, '0', { keyword: "category_list_failed", components: {} }, error.message);
        }
    },

    editCategory: async (req, res) => {
        try {
            let { body } = req;
            let category_id = req.params.id;
            let submitData = [
                body?.name,
                body?.image,
                body?.about
            ]
            let { rows } = await con.query(`UPDATE tbl_properties_categories SET name=$1,image=$2,about=$3 WHERE id = '${category_id}' RETURNING *`, submitData);

            return sendResponse(req, res, 200, '1', { keyword: "edit_category", components: {} });

        } catch (error) {
            return sendResponse(req, res, 200, '0', { keyword: "edit_category_failed", components: {} }, error.message);
        }
    },

    deleteCategory: async (req, res) => {
        try {
            let { body } = req;
            let submitData = [
                body?.is_delete
            ]
            let { rows } = await con.query(`UPDATE tbl_properties_categories SET is_deleted=$1 WHERE id = '${body?.category_id}' RETURNING *`, submitData);

            return sendResponse(req, res, 200, '1', { keyword: "delete_category", components: {} });
        } catch (error) {
            return sendResponse(req, res, 200, '0', { keyword: "delete_category_failed", components: {} }, error.message);
        }
    },

    propetiesTypeListing: async (req, res) => {
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
                search = ` and (pt.property_type ILIKE '%${body?.search}%' or pc.name ILIKE '%${body?.search}%')`;
            }

            if (body?.fieldSort) {
                fieldSort = ` order by pt.${body.fieldSort}`;
            }

            const baseURL = process.env.AWS_S3_BASE_URL;
            let categoryDetails = await SELECT_Q(`select pc.id as category_id, pc.name as category_name, pt.id as properties_type_id, pt.property_type, pt.icon as property_type_image, concat('${baseURL}/property_type_image/' , pt.icon ) as propetiestype_image_link,
            (SELECT COUNT(*) FROM tbl_properties_type WHERE is_deleted = 0) AS properties_type_count,${PER_PAGE_TEN} as per_page
            from tbl_properties_categories pc
            join tbl_properties_type pt on pt.category_id = pc.id
            where pc.is_deleted = 0 and pt.is_deleted = 0 ${search} ${fieldSort} limit ${per_page} OFFSET ${limit}`, false)

            return sendResponse(req, res, 200, '1', { keyword: "property_type_list_found", components: {} }, categoryDetails);
        } catch (error) {
            return sendResponse(req, res, 200, '0', { keyword: "property_type_list_failed", components: {} }, error.message);
        }
    },

    addPropertiesType: async (req, res) => {
        try {
            let { body } = req;
            let sql = `INSERT INTO tbl_properties_type (category_id, property_type, icon) VALUES ($1, $2, $3) RETURNING id`;
            let values = [body?.category_id, body?.property_type, body?.property_type_image];

            let { row } = await con.query(sql, values);

            return sendResponse(req, res, 200, '1', { keyword: "add_property_type", components: {} });

        } catch (error) {
            return sendResponse(req, res, 200, '0', { keyword: "add_property_type_failed", components: {} }, error.message);
        }
    },

    editPropertiesType: async (req, res) => {
        try {
            let { body } = req;
            let properties_type_id = req.params.id;
            let submitData = [
                body?.category_id,
                body?.property_type,
                body?.property_type_image
            ]
            let { rows } = await con.query(`UPDATE tbl_properties_type SET category_id=$1,property_type=$2,icon=$3 WHERE id = '${properties_type_id}' RETURNING *`, submitData);

            return sendResponse(req, res, 200, '1', { keyword: "edit_property_type", components: {} });

        } catch (error) {
            return sendResponse(req, res, 200, '0', { keyword: "edit_property_type_failed", components: {} }, error.message);
        }
    },

    deletePropertyType: async (req, res) => {
        try {
            let { body } = req;
            let submitData = [
                body?.is_delete
            ]
            let { rows } = await con.query(`UPDATE tbl_properties_type SET is_deleted=$1 WHERE id = '${body?.properties_type_id}' RETURNING *`, submitData);

            return sendResponse(req, res, 200, '1', { keyword: "delete_property_type", components: {} });

        } catch (error) {
            return sendResponse(req, res, 200, '0', { keyword: "delete_property_type_failed", components: {} }, error.message);
        }
    },

    PropertyListing: async (req, res) => {
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
                search = ` and p.name ILIKE '%${body?.search}%'`;
            }

            if (body?.fieldSort) {
                fieldSort = ` order by p.${body.fieldSort}`;
            }

            let query = `select p.id as property_id, p.name as property_name, p.location, p.status, p.about, p.price,
            (SELECT COUNT(p.*) FROM tbl_properties p join tbl_user u on u.id = p.user_id WHERE p.is_deleted = 0 and u.is_deleted=0) AS property_count
            , p.is_active, p.property_status,
            ${PER_PAGE_TEN} as per_page,pc.name as category_name,pt.property_type,p.latitude,p.longitude,
            p.category_id,p.property_type_id,concat(u.first_name, ' ', u.last_name) as owner_name , u.id as user_id
            from tbl_properties p 
            join tbl_properties_categories pc on pc.id = p.category_id
            join tbl_properties_type pt on pt.id = p.property_type_id
            join tbl_user u on u.id = p.user_id
            where p.is_deleted = 0 and u.is_deleted=0 ${search} ${fieldSort} limit ${per_page} OFFSET ${limit}`;

            let propertyDetails = await SELECT_Q(query, false);
            if (propertyDetails?.length) {
                await Promise.all(propertyDetails?.map(async item => {
                    let sql = await SELECT_Q(`select attribute_type , attribute_value,attribute_icon as attribute_icon_name, concat('${process.env.AWS_S3_BASE_URL}/attribute_type_image/' , attribute_icon) as attribute_image_link from tbl_property_attribute where property_id = '${item?.property_id}'`, false);

                    item.attribute = sql;

                    let amenitiesSql = await SELECT_Q(`SELECT amenity_name , amenity_icon,
                    concat('${process.env.AWS_S3_BASE_URL}/amenity_image/' , amenity_icon) as amenity_icon_link
                    FROM tbl_property_amenities WHERE property_id = '${item?.property_id}'`, false);

                    item.amenities = amenitiesSql

                    let imageSql = await SELECT_Q(`SELECT image ,concat('${process.env.AWS_S3_BASE_URL}/property_images/',image) as property_images FROM tbl_properties_image WHERE is_deleted = 0 AND property_id = '${item?.property_id}'`, false);

                    item.property_images = imageSql;
                }));

                return sendResponse(req, res, 200, '1', { keyword: "property_found_1", components: {} }, propertyDetails);
            } else {
                return sendResponse(req, res, 200, '2', { keyword: "no_data", components: {} }, []);
            }
        } catch (error) {
            return sendResponse(req, res, 200, '0', { keyword: "property_list_failed", components: {} }, error.message);
        }
    },

    activeInActiveProperty: async (req, res) => {
        try {
            let { body } = req;
            let property_id = body?.property_id;
            let submitData = [body?.is_active]

            const keywordKey = body?.is_active === '0' ? "Property De-Active successfully" : "Property Active successfully";

            await con.query(`update tbl_properties set is_active=$1 where id='${property_id}' and is_deleted=0 RETURNING *`, submitData);

            return sendResponse(req, res, 200, '1', { keyword: keywordKey, components: {} });

        } catch (e) {
            return sendResponse(req, res, 200, '0', { keyword: keywordKey, components: {} }, e?.message);
        }
    },

    changePropertyStatus: async (req, res) => {
        try {
            let { body } = req;
            let property_id = body?.property_id;
            let submitData = [body?.property_status]

            await con.query(`update tbl_properties set property_status=$1 where id='${property_id}' and is_deleted=0 RETURNING *`, submitData);

            return sendResponse(req, res, 200, '1', { keyword: "property_status", components: {} });

        } catch (e) {
            return sendResponse(req, res, 200, '0', { keyword: "failed_to_property_status", components: {} }, e?.message);
        }
    },

    deleteProperty: async (req, res) => {
        try {
            let { body } = req;
            let submitData = [
                body?.is_delete
            ]
            let { rows } = await con.query(`UPDATE tbl_properties SET is_deleted=$1 WHERE id = '${body?.property_id}' RETURNING *`, submitData);

            return sendResponse(req, res, 200, '1', { keyword: "property_deleted", components: {} });

        } catch (error) {
            return sendResponse(req, res, 200, '0', { keyword: "property_deleted_failed", components: {} }, error.message);
        }
    },

    AttributeType: async (req, res) => {
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
                search = ` and a.name ILIKE '%${body?.search}%'`;
            }

            if (body?.fieldSort) {
                fieldSort = ` order by ${body?.fieldSort}`;
            }

            let attributeDetails = await SELECT_Q(`select a.id as attribute_type_id , a.name as attribute_type , a.icon as attribute_icon ,
            concat('${process.env.AWS_S3_BASE_URL}/attribute_type_image/' , a.icon) as attribute_type_icon_link , is_deleted,
            (select count(*) from tbl_attribute where is_deleted=0) as attribute_type_count,${PER_PAGE_TEN} as per_page
            from tbl_attribute a 
            where a.is_deleted = 0 ${search} ${fieldSort} limit ${per_page} OFFSET ${limit}`, false);

            return sendResponse(req, res, 200, '1', { keyword: "att_type_list_found", components: {} }, attributeDetails);

        } catch (error) {
            return sendResponse(req, res, 200, '0', { keyword: "att_type_list_failed", components: {} }, error.message);
        }
    },

    addAttributeType: async (req, res) => {
        try {
            let { body } = req;
            let sql = `INSERT INTO tbl_attribute (name, icon) VALUES ($1, $2) RETURNING id`;
            let values = [body?.attribute_type, body?.attribute_icon];

            let { row } = await con.query(sql, values);

            return sendResponse(req, res, 200, '1', { keyword: "add_att_type", components: {} });

        } catch (error) {
            return sendResponse(req, res, 200, '0', { keyword: "failed_to_add_att_type", components: {} }, error.message);
        }
    },

    editAttributeType: async (req, res) => {
        try {
            let { body } = req;
            let attribute_type_id = req.params.id;
            let submitData = [
                body?.attribute_type,
                body?.attribute_icon
            ]
            let { rows } = await con.query(`UPDATE tbl_attribute SET name=$1,icon=$2 WHERE id = '${attribute_type_id}' RETURNING *`, submitData);

            return sendResponse(req, res, 200, '1', { keyword: "edit_att_type", components: {} });

        } catch (error) {
            return sendResponse(req, res, 200, '0', { keyword: "failed_edit_att_type", components: {} }, error.message);
        }
    },

    deleteAttributeType: async (req, res) => {
        try {
            let { body } = req;
            let submitData = [
                body?.is_delete
            ]
            let { rows } = await con.query(`UPDATE tbl_attribute SET is_deleted=$1 WHERE id = '${body?.attribute_type_id}' RETURNING *`, submitData);

            return sendResponse(req, res, 200, '1', { keyword: "delete_att_type", components: {} });

        } catch (error) {
            return sendResponse(req, res, 200, '0', { keyword: "failed_delete_att_type", components: {} }, error.message);
        }
    },

    AmenityCategory: async (req, res) => {
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
                search = ` and a.name ILIKE '%${body?.search}%'`;
            }

            if (body?.fieldSort) {
                fieldSort = ` order by ${body?.fieldSort}`;
            }

            let amenityCategoryDetails = await SELECT_Q(`select a.id as amenity_category_id , a.name as amenity_category , a.icon as amenity_category_icon ,
            concat('${process.env.AWS_S3_BASE_URL}/amenity_category_image/' , a.icon) as amenity_category_icon_link , is_deleted,
            (select count(*) from tbl_amenities_category where is_deleted=0) as amenity_category_count,${PER_PAGE_TEN} as per_page
            from tbl_amenities_category a 
            where a.is_deleted = 0 ${search} ${fieldSort} limit ${per_page} OFFSET ${limit}`, false);

            return sendResponse(req, res, 200, '1', { keyword: "amenity_category_list_found", components: {} }, amenityCategoryDetails);

        } catch (error) {
            return sendResponse(req, res, 200, '0', { keyword: "amenity_category_list_failed", components: {} }, error.message);
        }
    },

    addAmenityCategory: async (req, res) => {
        try {
            let { body } = req;
            let sql = `INSERT INTO tbl_amenities_category (name, icon) VALUES ($1, $2) RETURNING id`;
            let values = [body?.amenity_category, body?.amenity_category_icon];

            let { row } = await con.query(sql, values);

            return sendResponse(req, res, 200, '1', { keyword: "add_amenity_category", components: {} });

        } catch (error) {
            return sendResponse(req, res, 200, '0', { keyword: "failed_to_add_amenity_category", components: {} }, error.message);
        }
    },

    editAmenityCategory: async (req, res) => {
        try {
            let { body } = req;
            let amenity_category_id = req.params.id;
            let submitData = [
                body?.amenity_category,
                body?.amenity_category_icon
            ]
            let { rows } = await con.query(`UPDATE tbl_amenities_category SET name=$1,icon=$2 WHERE id = '${amenity_category_id}' RETURNING *`, submitData);

            return sendResponse(req, res, 200, '1', { keyword: "edit_amenity_category", components: {} });

        } catch (error) {
            return sendResponse(req, res, 200, '0', { keyword: "failed_edit_amenity_category", components: {} }, error.message);
        }
    },

    deleteAmenityCategory: async (req, res) => {
        try {
            let { body } = req;
            let submitData = [
                body?.is_delete
            ]
            let { rows } = await con.query(`UPDATE tbl_amenities_category SET is_deleted=$1 WHERE id = '${body?.amenity_category_id}' RETURNING *`, submitData);

            return sendResponse(req, res, 200, '1', { keyword: "delete_amenity_category", components: {} });

        } catch (error) {
            return sendResponse(req, res, 200, '0', { keyword: "failed_delete_amenity_category", components: {} }, error.message);
        }
    },

    AmenityDetails: async (req, res) => {
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
                search = ` and (a.name ILIKE '%${body?.search}%' or ac.name ILIKE '%${body?.search}%')`;
            }

            if (body?.fieldSort) {
                fieldSort = ` order by a.${body?.fieldSort}`;
            }

            let amenityDetails = await SELECT_Q(`select a.id as amenity_id , a.name as amenity_name, a.icon as amenity_icon ,
            concat('${process.env.AWS_S3_BASE_URL}/amenity_image/' , a.icon) as amenity_icon_link , a.is_deleted,
            (select count(*) from tbl_amenities where is_deleted=0) as amenity_count , ac.name as category_name , a.category_id,${PER_PAGE_TEN} as per_page
            from tbl_amenities a 
            join tbl_amenities_category ac on ac.id = a.category_id
            where a.is_deleted = 0 ${search} ${fieldSort} limit ${per_page} OFFSET ${limit}`, false);

            return sendResponse(req, res, 200, '1', { keyword: "amenity_category_list_found", components: {} }, amenityDetails);

        } catch (error) {
            return sendResponse(req, res, 200, '0', { keyword: "amenity_category_list_failed", components: {} }, error.message);
        }
    },

    addAmenity: async (req, res) => {
        try {
            let { body } = req;
            let sql = `INSERT INTO tbl_amenities (category_id , name, icon) VALUES ($1, $2 ,$3) RETURNING id`;
            let values = [body?.category_id, body?.amenity_name, body?.amenity_icon];

            let { row } = await con.query(sql, values);

            return sendResponse(req, res, 200, '1', { keyword: "add_amenity", components: {} });

        } catch (error) {
            return sendResponse(req, res, 200, '0', { keyword: "failed_to_add_amenity", components: {} }, error.message);
        }
    },

    editAmenity: async (req, res) => {
        try {
            let { body } = req;
            let amenity_id = req.params.id;
            let submitData = [
                body?.category_id,
                body?.amenity_name,
                body?.amenity_icon
            ]
            let { rows } = await con.query(`UPDATE tbl_amenities SET category_id=$1, name=$2,icon=$3 WHERE id = '${amenity_id}' RETURNING *`, submitData);

            return sendResponse(req, res, 200, '1', { keyword: "edit_amenity_category", components: {} });

        } catch (error) {
            return sendResponse(req, res, 200, '0', { keyword: "failed_edit_amenity_category", components: {} }, error.message);
        }
    },

    deleteAmenity: async (req, res) => {
        try {
            let { body } = req;
            let submitData = [
                body?.is_delete
            ]
            let { rows } = await con.query(`UPDATE tbl_amenities SET is_deleted=$1 WHERE id = '${body?.amenity_id}' RETURNING *`, submitData);

            return sendResponse(req, res, 200, '1', { keyword: "delete_amenity", components: {} });

        } catch (error) {
            return sendResponse(req, res, 200, '0', { keyword: "failed_delete_amenity", components: {} }, error.message);
        }
    }
}

module.exports = {
    Property
};