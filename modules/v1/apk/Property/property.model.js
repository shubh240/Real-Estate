const { SELECT_Q } = require('../../../../utils/SQLWorker');
const { sendResponse } = require('../../../../middleware/headerValidator');
const CryptoJS = require('crypto-js');
const con = require('../../../../config/database');
const { WEBSITE_BASE_URL, PER_PAGE_TEN, PER_PAGE_TWELVE, ATTRIBUTE_TYPE_IMAGE, AMENITY_IMAGE, PER_PAGE_SIXTEEN } = require('../../../../config/constants');
const common = require('../../../../config/common');
const { t } = require('localizify');
//////////////////////////////////////////////////////////////////////
//                            Property API                              //
//////////////////////////////////////////////////////////////////////

let Property = {

    propertyCategoryListing: async (req, res) => {
        try {
            let { body } = req;

            if (body.page == '0' || body.page == undefined) {
                body.page = 1;
            }

            let per_page = PER_PAGE_TWELVE;
            let limit = ((body.page - 1) * PER_PAGE_TWELVE);

            let categoryDetails = await SELECT_Q(`select pc.id as category_id,pc.name as category_name ,pc.image as category_image,pc.about,
            concat('${process.env.AWS_S3_BASE_URL}/category_image/',pc.image) as category_image_link,
            (select count(id) from  tbl_properties_categories where is_deleted = 0) as category_count,${PER_PAGE_TWELVE} as per_page,
            (select count(p.*) from tbl_properties p where p.category_id = pc.id and p.property_status = 'approved' and p.is_deleted=0 and pc.is_deleted = 0) as count
            from tbl_properties_categories pc
            where pc.is_deleted = 0 limit ${per_page} OFFSET ${limit}`, false);
            if (`categoryDetails`?.[0]) {
                // categoryDetails[0].image_link = `https://parth-bucket-hlis.s3.eu-west-1.amazonaws.com/real-estate/property_category/${categoryDetails[0].image}`;
                return sendResponse(req, res, 200, '1', { keyword: "category_list_found", components: {} }, categoryDetails);
            } else {
                return sendResponse(req, res, 200, '2', { keyword: "no_data", components: {} }, categoryDetails);
            }
        } catch (error) {
            return sendResponse(req, res, 200, '0', { keyword: "category_list_failed", components: {} }, error.message);
        }
    },

    propertyTypeListing: async (req, res) => {
        try {
            let propertyTypeDetails = await SELECT_Q(`select id as type_id,category_id,property_type ,icon as property_type_image,
            concat('${process.env.AWS_S3_BASE_URL}/property_type_image/',icon) as property_type_image_link
            from tbl_properties_type 
            where is_deleted = 0`);
            if (propertyTypeDetails?.[0]) {
                // categoryDetails[0].image_link = `https://parth-bucket-hlis.s3.eu-west-1.amazonaws.com/real-estate/property_category/${categoryDetails[0].image}`;
                return sendResponse(req, res, 200, '1', { keyword: "property_type_list_found", components: {} }, propertyTypeDetails);
            } else {
                return sendResponse(req, res, 200, '2', { keyword: "no_data", components: {} }, propertyTypeDetails);
            }
        } catch (error) {
            return sendResponse(req, res, 200, '0', { keyword: "property_type_list_failed", components: {} }, error.message);
        }
    },

    attributeTypeListing: async (req, res) => {
        try {
            let attributeTypeDetails = await SELECT_Q(`select id as attribute_type_id,name as attribute_type ,icon as attribute_icon,
            concat('${process.env.AWS_S3_BASE_URL}/attribute_type_image/' , icon) as attribute_type_image
            from tbl_attribute 
            where is_deleted = 0`);
            if (attributeTypeDetails?.[0]) {
                return sendResponse(req, res, 200, '1', { keyword: "att_type_list_found", components: {} }, attributeTypeDetails);
            } else {
                return sendResponse(req, res, 200, '2', { keyword: "no_data", components: {} }, attributeTypeDetails);
            }
        } catch (error) {
            return sendResponse(req, res, 200, '0', { keyword: "att_type_list_failed", components: {} }, error.message);
        }
    },


    

    amenitiesListing: async (req, res) => {
        try {
            let attributeTypeDetails = await SELECT_Q(`select id as category_id,name as category_name ,icon as category_icon from tbl_amenities_category 
            where is_deleted = 0`);
            if (attributeTypeDetails?.[0]) {
                Promise.all(attributeTypeDetails.map(async item => {
                    let sql = await SELECT_Q(`select id as sub_category_id , name as sub_category_name , icon as amenity_icon,
                    concat('${process.env.AWS_S3_BASE_URL}/amenity_image/' , icon) as amenity_image
                    from tbl_amenities where is_deleted = 0 and category_id = '${item?.category_id}'`)
                    item.sub_amenities = sql;
                })).then(() => {
                    return sendResponse(req, res, 200, '1', { keyword: "att_type_list_found", components: {} }, attributeTypeDetails);
                }).catch((e) => {
                    return sendResponse(req, res, 200, '1', { keyword: "att_type_list_found", components: {} }, attributeTypeDetails);
                })
            } else {
                return sendResponse(req, res, 200, '2', { keyword: "no_data", components: {} }, sql);
            }
        } catch (error) {
            return sendResponse(req, res, 200, '0', { keyword: "att_type_list_failed", components: {} }, error.message);
        }
    },

    addProperty: async (req, res) => {
        try {
            const { body } = req;
            let user_id = req.loginUser;
            let propertyPrice = parseFloat(body?.property_price?.replace(/,/g, ''));
            let sql = `INSERT INTO tbl_properties (user_id, category_id, property_type_id, name, location, latitude, longitude, status, about, price) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id`;
            let values = [user_id, body?.category_id, body?.property_type_id, body?.property_name, body?.address, body?.latitude, body?.longitude, body?.status, body?.about, propertyPrice];

            let { rows } = await con.query(sql, values);
            let property_id = rows[0]?.id;

            // Insert attribute types
            if (body?.attribute_type) {
                await Promise.all(body.attribute_type.map(async (item) => {
                    let attSql = `INSERT INTO tbl_property_attribute (property_id, attribute_type, attribute_value ,attribute_icon) VALUES ($1, $2, $3,$4) RETURNING id`;
                    let attvalues = [property_id, item?.attribute_type, item?.attribute_value, item?.attribute_icon_name];
                    await con.query(attSql, attvalues);
                }));
            }

            // Insert amenities
            if (body?.amenity_name) {
                await Promise.all(body.amenity_name.map(async (item) => {
                    let ameSql = `INSERT INTO tbl_property_amenities (property_id, amenity_name,amenity_icon) VALUES ($1, $2 ,$3) RETURNING id`;
                    let amevalues = [property_id, item?.amenity_name, item?.amenity_icon];
                    await con.query(ameSql, amevalues);
                }));
            }

            // Insert property images
            if (body?.property_image) {
                await Promise.all(body.property_image.map(async (image) => {
                    let imgSql = `INSERT INTO tbl_properties_image (property_id, image) VALUES ($1, $2) RETURNING id`;
                    let imgvalues = [property_id, image];
                    await con.query(imgSql, imgvalues);
                }));
            }

            return sendResponse(req, res, 200, '1', { keyword: "add_properties", components: {} });
        } catch (e) {
            return sendResponse(req, res, 200, '0', { keyword: "something_went_wrong", components: {} }, e?.message);
        }
    },

    editProperty: async (req, res) => {
        try {
            const { body } = req;
            let user_id = req.loginUser;
            let property_id = req.params.id;
            const propertyPrice = body?.property_price;

            // Convert to a string before calling replace
            const numericValue = parseFloat(String(propertyPrice).replace(/,/g, ''));

            if (isNaN(numericValue)) {
                console.error("Invalid price value");
            } else {
                console.log("Valid price:", numericValue);
            }

            let sql = `UPDATE tbl_properties SET category_id = $1,property_type_id = $2,name = $3,location = $4,
            latitude = $5,longitude = $6,status = $7,about = $8,price = $9,property_status=$10
            WHERE user_id = '${user_id}' AND id = '${property_id}'
            RETURNING id`;

            values = [body?.category_id, body?.property_type_id, body?.property_name, body?.address, body?.latitude, body?.longitude, body?.status, body?.about, propertyPrice, "pending"];

            await con.query(sql, values);

            // Insert attribute types
            if (body?.attribute_type) {
                await con.query(`Delete from tbl_property_attribute  WHERE property_id = '${property_id}'`);
                if (body.attribute_type.length > 0) {
                    await Promise.all(body.attribute_type.map(async (item) => {
                        let attSql = `INSERT INTO tbl_property_attribute (property_id, attribute_type, attribute_value ,attribute_icon) VALUES ($1, $2, $3,$4) RETURNING id`;
                        let attvalues = [property_id, item?.attribute_type, item?.attribute_value, item?.attribute_icon_name];
                        await con.query(attSql, attvalues);
                    }));
                }
            }

            // Insert amenities
            if (body?.amenity_name) {
                await con.query(`Delete from tbl_property_amenities  WHERE property_id = '${property_id}'`);
                if (body.amenity_name.length > 0) {
                    await Promise.all(body.amenity_name.map(async (item) => {
                        let ameSql = `INSERT INTO tbl_property_amenities (property_id, amenity_name,amenity_icon) VALUES ($1, $2 ,$3) RETURNING id`;
                        let amevalues = [property_id, item?.amenity_name, item?.amenity_icon];
                        await con.query(ameSql, amevalues);
                    }));
                }
            }

            // Insert property images
            if (body?.property_image) {
                await con.query(`Delete from tbl_properties_image  WHERE property_id = '${property_id}'`);
                if (body?.property_image?.length > 0) {
                    await Promise.all(body.property_image.map(async (image) => {
                        let imgSql = `INSERT INTO tbl_properties_image (property_id, image) VALUES ($1, $2) RETURNING id`;
                        let imgvalues = [property_id, image];
                        await con.query(imgSql, imgvalues);
                    }));
                }
            }

            return sendResponse(req, res, 200, '1', { keyword: "update_properties", components: {} });
        } catch (e) {
            console.log('e?.message :', e?.message);
            return sendResponse(req, res, 200, '0', { keyword: "something_went_wrong", components: {} }, e?.message);
        }
    },

    editPropertyByAdmin: async (req, res) => {
        try {
            const { body } = req;
            let property_id = req.params.id;
            const propertyPrice = body?.property_price;

            // Convert to a string before calling replace
            const numericValue = parseFloat(String(propertyPrice).replace(/,/g, ''));

            if (isNaN(numericValue)) {
                console.error("Invalid price value");
            } else {
                console.log("Valid price:", numericValue);
            }
            let sql = `UPDATE tbl_properties SET category_id = $1,property_type_id = $2,name = $3,location = $4,
            latitude = $5,longitude = $6,status = $7,about = $8,price = $9,property_status=$10
            WHERE id = '${property_id}'
            RETURNING id`;

            values = [body?.category_id, body?.property_type_id, body?.property_name, body?.address, body?.latitude, body?.longitude, body?.status, body?.about, propertyPrice, "pending"];

            await con.query(sql, values);

            // Insert attribute types
            if (body?.attribute_type) {
                await con.query(`Delete from tbl_property_attribute  WHERE property_id = '${property_id}'`);
                if (body.attribute_type.length > 0) {
                    await Promise.all(body.attribute_type.map(async (item) => {
                        let attSql = `INSERT INTO tbl_property_attribute (property_id, attribute_type, attribute_value ,attribute_icon) VALUES ($1, $2, $3,$4) RETURNING id`;
                        let attvalues = [property_id, item?.attribute_type, item?.attribute_value, item?.attribute_icon_name];
                        await con.query(attSql, attvalues);
                    }));
                }
            }

            // Insert amenities
            if (body?.amenity_name) {
                await con.query(`Delete from tbl_property_amenities  WHERE property_id = '${property_id}'`);
                if (body.amenity_name.length > 0) {
                    await Promise.all(body.amenity_name.map(async (item) => {
                        let ameSql = `INSERT INTO tbl_property_amenities (property_id, amenity_name,amenity_icon) VALUES ($1, $2 ,$3) RETURNING id`;
                        let amevalues = [property_id, item?.amenity_name, item?.amenity_icon];
                        await con.query(ameSql, amevalues);
                    }));
                }
            }

            // Insert property images
            if (body?.property_image) {
                await con.query(`Delete from tbl_properties_image  WHERE property_id = '${property_id}'`);
                if (body?.property_image?.length > 0) {
                    await Promise.all(body.property_image.map(async (image) => {
                        let imgSql = `INSERT INTO tbl_properties_image (property_id, image) VALUES ($1, $2) RETURNING id`;
                        let imgvalues = [property_id, image];
                        await con.query(imgSql, imgvalues);
                    }));
                }
            }

            return sendResponse(req, res, 200, '1', { keyword: "update_properties", components: {} });
        } catch (e) {
            console.log('e?.message :', e?.message);
            return sendResponse(req, res, 200, '0', { keyword: "something_went_wrong", components: {} }, e?.message);
        }
    },

    myProperties: async (req, res) => {
        try {
            let user_id = req.loginUser;
            let { page } = req.query;

            if (page == '0' || page == undefined) {
                page = 1;
            }

            let per_page = PER_PAGE_TWELVE;
            let limit = ((page - 1) * PER_PAGE_TWELVE);

            let sql = await SELECT_Q(`select p.id as property_id,p.latitude,p.longitude, COUNT(p.id) OVER() as property_count,
            ${PER_PAGE_TWELVE} as per_page,p.user_id,p.category_id,p.property_type_id ,p.name as property_name,p.location ,p.status,
            (select a.property_id from tbl_advertise a where a.property_id = p.id and a.is_deleted = 0 and p.is_deleted = 0 and a.status='Approved'
            and a.end_date >= NOW()) as ads,
            p.about,p.price,pc.name as category_name,pc.image as category_image from tbl_properties p 
            join tbl_properties_categories pc on pc.id = p.category_id
            join tbl_user u on u.id = p.user_id
            where pc.is_deleted = 0 and p.is_deleted = 0 and p.user_id='${user_id}' and u.is_deleted=0 limit ${per_page} OFFSET ${limit}`, false);

            if (sql?.[0]) {
                Promise.all(sql?.map(async item => {
                    let sql = await SELECT_Q(`select attribute_type , attribute_value,attribute_icon as attribute_icon_name, concat('${process.env.AWS_S3_BASE_URL}/attribute_type_image/' , attribute_icon) as attribute_image_link from tbl_property_attribute where property_id = '${item?.property_id}' and is_deleted=0`, false);

                    item.attribute = sql;

                    let imageSql = await SELECT_Q(`SELECT image ,concat('${process.env.AWS_S3_BASE_URL}/property_images/',image) as property_images FROM tbl_properties_image WHERE is_deleted = 0 AND property_id = '${item?.property_id}'`, false);

                    item.property_images = imageSql;

                    let amenitiesSql = await SELECT_Q(`SELECT amenity_name , amenity_icon,
                    concat('${process.env.AWS_S3_BASE_URL}/amenity_image/' , amenity_icon) as amenity_icon_link
                    FROM tbl_property_amenities WHERE property_id = '${item?.property_id}' and is_deleted=0`, false);

                    item.amenities = amenitiesSql;

                })).then(() => {
                    return sendResponse(req, res, 200, '1', { keyword: "property_found", components: {} }, sql);
                }).catch((e) => {
                    return sendResponse(req, res, 200, '0', { keyword: "something_went_wrong", components: {} }, e?.message);
                })
            } else {
                return sendResponse(req, res, 200, '2', { keyword: "no_data", components: {} }, sql);
            }
        } catch (e) {
            return sendResponse(req, res, 200, '0', { keyword: "something_went_wrong", components: {} }, e?.message);
        }
    },

    myPropertiesDetails: async (req, res) => {
        try {
            let user_id = req.loginUser;
            let { body } = req
            let property_id = body?.property_id
            let sql = await SELECT_Q(`select p.id as property_id,p.latitude,p.longitude,p.user_id,p.category_id,p.property_type_id ,p.name as property_name,p.location ,p.status,p.about,p.price,pc.name as category_name,pc.image as category_image from tbl_properties p 
            join tbl_properties_categories pc on pc.id = p.category_id
            join tbl_user u on u.id = p.user_id
            where pc.is_deleted = 0 and p.is_deleted = 0 and p.user_id='${user_id}' and u.is_deleted=0 and p.id = '${property_id}'`);

            if (sql?.[0]) {
                Promise.all(sql?.map(async item => {
                    let sql = await SELECT_Q(`select attribute_type , attribute_value,attribute_icon, concat('${process.env.AWS_S3_BASE_URL}/attribute_type_image/' , attribute_icon) as attribute_image_link from tbl_property_attribute where property_id = '${item?.property_id}' and is_deleted=0`, false);
                    item.attribute = sql;
                    let imageSql = await SELECT_Q(`SELECT image ,concat('${process.env.AWS_S3_BASE_URL}/property_images/',image) as property_images FROM tbl_properties_image WHERE is_deleted = 0 AND property_id = '${item?.property_id}'`, false);

                    item.property_images = imageSql;

                    let amenitiesSql = await SELECT_Q(`SELECT amenity_name , amenity_icon,
                    concat('${process.env.AWS_S3_BASE_URL}/amenity_image/' , amenity_icon) as amenity_icon_link
                    FROM tbl_property_amenities WHERE property_id = '${item?.property_id}' and is_deleted=0`, false);

                    item.amenities = amenitiesSql

                })).then(() => {
                    return sendResponse(req, res, 200, '1', { keyword: "property_found", components: {} }, sql[0]);
                }).catch((e) => {
                    return sendResponse(req, res, 200, '0', { keyword: "something_went_wrong", components: {} }, e?.message);
                })
            } else {
                return sendResponse(req, res, 200, '2', { keyword: "no_data", components: {} }, sql);
            }
        } catch (e) {
            return sendResponse(req, res, 200, '0', { keyword: "something_went_wrong", components: {} }, e?.message);
        }
    },

    deleteMyProperty: async (req, res) => {
        try {
            let { body } = req;
            let property_id = body?.property_id;

            await con.query(`UPDATE tbl_properties SET is_deleted = 1 WHERE id = $1 RETURNING *`, [property_id]);
            await con.query(`UPDATE tbl_properties_image SET is_deleted = 1 WHERE property_id = $1 RETURNING *`, [property_id]);
            await con.query(`UPDATE tbl_property_amenities SET is_deleted = 1 WHERE property_id = $1 RETURNING *`, [property_id]);
            await con.query(`UPDATE tbl_property_attribute SET is_deleted = 1 WHERE property_id = $1 RETURNING *`, [property_id]);
            await con.query(`UPDATE tbl_fav_property SET is_deleted = 1 WHERE property_id = $1 RETURNING *`, [property_id]);

            return sendResponse(req, res, 200, '1', { keyword: "delete_property", components: {} });
        } catch (e) {
            return sendResponse(req, res, 200, '0', { keyword: "failed_to_delete_property", components: {} }, e?.message);
        }
    },

    landingPageProperties: async (req, res) => {

        try {
            let { body } = req;
            let { selectedStatus, property_type_id, search, page, sortBy, minPrice, maxPrice, property_category_id, address, searchproperty } = await req.query;

            let status = "";
            let searching = ""
            let sortingByPrice = ""
            let minmax = ""
            let property_category = ""
            let propertySearch = ""

            if (search !== undefined) {
                searching = ` and p.location ILIKE '%${search}%'`;
                if (selectedStatus) {
                    searching += ` and p.status = '${selectedStatus}'`
                    if (property_type_id) {
                        searching += ` and p.property_type_id = ${property_type_id}`;
                    } 
                }
                else if (address) {
                    searching += ` and p.location ILIKE '%${search}%' and p.status = '${selectedStatus}'`;
                }
            }

            if (page == '0' || page == undefined) {
                page = 1;
            }

            if (searchproperty) {
                propertySearch = ` and p.name ILIKE '%${searchproperty}%'`;
            }

            if (selectedStatus !== undefined) {
                status = ` and p.status = '${selectedStatus}'`;
                if (property_type_id) {
                    status += ` and p.property_type_id = ${property_type_id}`;
                }
            }

            if (property_type_id) {
                status = ` and p.property_type_id = ${property_type_id}`;
                if (selectedStatus) {
                    status += ` and p.status = '${selectedStatus}'`;
                }
            }

            if (property_category_id) {
                property_category = ` and p.category_id = '${property_category_id}'`
            }

            if (sortBy !== undefined || sortBy !== "") {
                if (sortBy === "high_to_low") {
                    sortingByPrice = ` order by p.price desc`
                }
                else {
                    sortingByPrice = ` order by p.price asc`
                }
            }

            if (minPrice && maxPrice) {
                minmax = ` AND (p.price BETWEEN ${minPrice} AND ${maxPrice})`;
            }

            let per_page = PER_PAGE_SIXTEEN;
            let limit = ((page - 1) * PER_PAGE_SIXTEEN);

            let sql = await SELECT_Q(`select p.id as property_id, COUNT(p.id) OVER() as property_count,p.user_id,p.category_id,
            p.property_type_id ,p.name as property_name,p.location ,p.status,p.about,p.price,pc.name as category_name,${PER_PAGE_SIXTEEN} as per_page,
            (select a.property_id from tbl_advertise a where a.property_id = p.id and a.is_deleted = 0 and p.is_deleted = 0 and a.status='Approved'
            and a.end_date >= NOW()) as ads,
            pc.image as category_image from tbl_properties p 
            join tbl_properties_categories pc on pc.id = p.category_id
            join tbl_user u on u.id = p.user_id
            where pc.is_deleted = 0 and p.is_deleted = 0 and u.is_deleted=0 and p.is_active=1 and p.property_status = 'approved' ${status} ${property_category} ${minmax} ${searching} ${propertySearch} ${sortingByPrice}  limit ${per_page} OFFSET ${limit}`, false);
            if (sql?.[0]) {
                Promise.all(sql?.map(async item => {
                    let sql = await SELECT_Q(`select attribute_type , attribute_value , concat('${process.env.AWS_S3_BASE_URL}/attribute_type_image/' , attribute_icon) as attribute_image_link from tbl_property_attribute where property_id = '${item?.property_id}' and is_deleted=0`, false);
                    item.attribute = sql;
                    let imageSql = await SELECT_Q(`SELECT image FROM tbl_properties_image WHERE is_deleted = 0 AND property_id = '${item?.property_id}'`, false);

                    item.property_images = imageSql.map(imageObj => {
                        return `${process.env.AWS_S3_BASE_URL}/property_images/${imageObj.image}`;
                    });
                })).then(() => {
                    return sendResponse(req, res, 200, '1', { keyword: "property_found", components: {} }, sql);
                }).catch((e) => {
                    return sendResponse(req, res, 200, '0', { keyword: "something_went_wrong", components: {} }, e?.message);
                })
            } else {
                return sendResponse(req, res, 200, '2', { keyword: "no_data", components: {} }, sql);
            }
        } catch (e) {
            return sendResponse(req, res, 200, '0', { keyword: "something_went_wrong", components: {} }, e?.message);
        }
    },

    homePageProperties: async (req, res) => {
        try {
            let { body } = req;
            let user_id = req.loginUser
            let { selectedStatus, property_type_id, search, page, sortBy, minPrice, maxPrice, address, property_category_id, searchproperty } = req.query;

            let status = "";
            let searching = ""
            let sortingByPrice = ""
            let minmax = ""
            let property_category = ""
            let propertySearch = ""

            if (search) {
                searching = ` and p.location ILIKE '%${search}%'`;
                if (selectedStatus) {
                    searching += ` and p.status = '${selectedStatus}'`
                    if (property_type_id) {
                        searching += ` and p.property_type_id = ${property_type_id}`;
                    }
                }
                else if (address) {
                    searching += ` and p.location ILIKE '%${search}%' and p.status = '${selectedStatus}'`;
                }
            }
            if (searchproperty) {
                propertySearch = ` and p.name ILIKE '%${searchproperty}%'`;
            }

            if (page == '0' || page == undefined) {
                page = 1;
            }

            if (selectedStatus !== undefined) {
                status = ` and p.status = '${selectedStatus}'`;
                if (property_type_id) {
                    status += ` and p.property_type_id = ${property_type_id}`;
                }
            }

            if (property_type_id) {
                status = ` and p.property_type_id = ${property_type_id}`;
                if (selectedStatus) {
                    status += ` and p.status = '${selectedStatus}'`;
                }
            }

            if (property_category_id) {
                property_category = ` and p.category_id = '${property_category_id}'`
            }

            if (sortBy !== undefined || sortBy !== "") {
                if (sortBy === "high_to_low") {
                    sortingByPrice = ` order by p.price desc`
                }
                else {
                    sortingByPrice = ` order by p.price asc`
                }
            }

            if (minPrice && maxPrice) {
                minmax = ` AND (p.price BETWEEN ${minPrice} AND ${maxPrice})`;
            }

            let per_page = PER_PAGE_SIXTEEN;
            let limit = ((page - 1) * PER_PAGE_SIXTEEN);

            let sql = await SELECT_Q(`select p.id as property_id, COUNT(p.id) OVER() as property_count,p.user_id,p.category_id,
            p.property_type_id ,p.name as property_name,p.location ,p.status,p.about,p.price,pc.name as category_name,${PER_PAGE_SIXTEEN} as per_page,
            pc.image as category_image,
            (select count(vf.id) from tbl_fav_property vf where vf.property_id = p.id and vf.is_favourite = 1 and vf.user_id = ${user_id}) as is_favourite,
            (select a.property_id from tbl_advertise a where a.property_id = p.id and a.is_deleted = 0 and p.is_deleted = 0 and a.status='Approved'
            and a.end_date >= NOW()) as ads               
            from tbl_properties p 
            join tbl_properties_categories pc on pc.id = p.category_id
            join tbl_user u on u.id = p.user_id
            where pc.is_deleted = 0 and p.is_deleted = 0  and u.is_deleted=0 and p.is_active=1 and p.property_status = 'approved' ${status} ${property_category} ${minmax} ${searching} ${propertySearch} ${sortingByPrice}  limit ${per_page} OFFSET ${limit} `, false);

            if (sql?.[0]) {
                Promise.all(sql?.map(async item => {
                    let sql = await SELECT_Q(`select attribute_type , attribute_value , concat('${process.env.AWS_S3_BASE_URL}/attribute_type_image/' , attribute_icon) as attribute_image_link from tbl_property_attribute where property_id = '${item?.property_id}' and is_deleted=0`, false);
                    item.attribute = sql;
                    let imageSql = await SELECT_Q(`SELECT image FROM tbl_properties_image WHERE is_deleted = 0 AND property_id = '${item?.property_id}'`, false);

                    item.property_images = imageSql.map(imageObj => {
                        return `${process.env.AWS_S3_BASE_URL}/property_images/${imageObj.image}`;
                    });
                })).then(() => {
                    return sendResponse(req, res, 200, '1', { keyword: "property_found", components: {} }, sql);
                }).catch((e) => {
                    return sendResponse(req, res, 200, '0', { keyword: "something_went_wrong", components: {} }, e?.message);
                })
            } else {
                return sendResponse(req, res, 200, '2', { keyword: "no_data", components: {} }, sql);
            }
        } catch (e) {
            return sendResponse(req, res, 200, '0', { keyword: "something_went_wrong", components: {} }, e?.message);
        }
    },

    PropertiesDetails: async (req, res) => {
        try {
            let { body } = req
            let { property_id } = body?.property_id
            let sql = await SELECT_Q(`select p.id as property_id,p.user_id,p.latitude,p.longitude,concat(u.first_name,' ',u.last_name) as owner_name,
            concat(u.country_code_id ,'-',u.mobile_number) as mobile_number , u.email,u.address,
            p.category_id,p.property_type_id ,p.name as property_name,p.location ,p.status,p.about,p.price,pc.name as category_name,pc.image as category_image , concat('https://bboyorealestate-pord.s3.af-south-1.amazonaws.com/user_profile/' , u.image) as owner_image from tbl_properties p 
            join tbl_properties_categories pc on pc.id = p.category_id
            join tbl_user u on u.id = p.user_id
            where pc.is_deleted = 0 and p.is_deleted = 0 and p.id = '${property_id}' and u.is_deleted=0`, false);

            if (sql?.[0]) {
                Promise.all(sql?.map(async item => {
                    let sql = await SELECT_Q(`select attribute_type , attribute_value ,
                    concat('${ATTRIBUTE_TYPE_IMAGE}' , attribute_icon) as attribute_icon_link
                    from tbl_property_attribute where property_id = '${property_id}' and is_deleted=0`, false);
                    item.attribute = sql;
                    let imageSql = await SELECT_Q(`SELECT image FROM tbl_properties_image WHERE is_deleted = 0 AND property_id = '${property_id}'`, false);

                    item.property_images = imageSql.map(imageObj => {
                        return `${process.env.AWS_S3_BASE_URL}/property_images/${imageObj.image}`;
                    });

                    let amenitiesSql = await SELECT_Q(`SELECT amenity_name , 
                    concat('${AMENITY_IMAGE}' , amenity_icon) as amenity_icon_link
                    FROM tbl_property_amenities WHERE property_id = '${property_id}' and is_deleted=0`, false);

                    item.amenities = amenitiesSql;
                })).then(() => {
                    return sendResponse(req, res, 200, '1', { keyword: "property_found", components: {} }, sql[0]);
                }).catch((e) => {
                    return sendResponse(req, res, 200, '0', { keyword: "something_went_wrong", components: {} }, e?.message);
                })
            } else {
                return sendResponse(req, res, 200, '2', { keyword: "no_data", components: {} }, sql);
            }
        } catch (e) {
            return sendResponse(req, res, 200, '0', { keyword: "something_went_wrong", components: {} }, e?.message);
        }
    },

    propertyFav: async (req, res) => {
        try {
            let { body } = req;
            let user_id = req.loginUser
            let sql = await SELECT_Q(`select * from tbl_fav_property where user_id = '${user_id}' and property_id = '${body?.property_id}'`, false);

            if (sql?.[0]) {
                if (sql?.[0]?.is_favourite == 0) {

                    let submitData = [
                        1
                    ]

                    await con.query(`update tbl_fav_property set is_favourite=$1 where user_id = '${user_id}' and property_id = '${body?.property_id}' and is_deleted=0 RETURNING *`, submitData);

                    return sendResponse(req, res, 200, '1', { keyword: t("add_fav"), components: {} });
                } else {

                    let submitData = [
                        0
                    ]

                    await con.query(`update tbl_fav_property set is_favourite=$1 where user_id = '${user_id}' and property_id = '${body?.property_id}' and is_deleted=0 RETURNING *`, submitData);

                    return sendResponse(req, res, 200, '1', { keyword: t("remove_add_fav"), components: {} });
                }


            } else {
                let sql = `insert into tbl_fav_property (user_id,property_id,is_favourite) VALUES ($1, $2, $3) RETURNING id`;
                let values = [user_id, body?.property_id, 1];

                let { rows } = await con.query(sql, values);

                return sendResponse(req, res, 200, '1', { keyword: t("add_fav"), components: {} });
            }
        } catch (e) {
            return sendResponse(req, res, 200, '0', { keyword: t("failed_to_add_fav"), components: {} }, e?.message);
        }
    },

    listFavProperties: async (req, res) => {
        try {
            let user_id = req.loginUser
            let { page, sortBy } = req.query;

            let sortingByPrice = ""

            if (sortBy !== undefined || sortBy !== "") {
                if (sortBy === "high_to_low") {
                    sortingByPrice = ` order by p.price desc`
                }
                else {
                    sortingByPrice = ` order by p.price asc`
                }
            }

            if (page == '0' || page == undefined) {
                page = 1;
            }

            let per_page = PER_PAGE_TWELVE;
            let limit = ((page - 1) * PER_PAGE_TWELVE);

            let rows = await SELECT_Q(`select fp.is_favourite , p.id,COUNT(p.id) OVER() as property_count,${PER_PAGE_TWELVE} as per_page ,
            p.user_id,p.category_id,p.property_type_id ,p.name as property_name,p.location,p.latitude,p.location ,p.status,p.about,p.price,
            concat(u.first_name,' ',u.last_name) as property_owner , u.mobile_number,u.country_code_id,u.address ,
            (select count (*) from tbl_fav_property where is_favourite = 1 and user_id = '${user_id}') as fav_count_property,
            (select a.property_id from tbl_advertise a where a.property_id = p.id and a.is_deleted = 0 and p.is_deleted = 0 and a.status='Approved'
            and a.end_date >= NOW()) as ads,
            pc.name as category_name     
            from tbl_fav_property fp 
            join tbl_properties p on p.id = fp.property_id
            join tbl_user u on u.id = p.user_id
            join tbl_properties_categories pc on pc.id = p.category_id
            where fp.user_id = '${user_id}' and u.is_deleted=0  and fp.is_favourite = 1 ${sortingByPrice} limit ${per_page} OFFSET ${limit}`, false);
            if (rows) {
                Promise.all(rows?.map(async item => {
                    let sql = await SELECT_Q(`select attribute_type , attribute_value ,
                    concat('${process.env.AWS_S3_BASE_URL}/attribute_type_image/' , attribute_icon) as attribute_icon_link
                    from tbl_property_attribute where property_id = '${item?.id}' and is_deleted=0`, false);
                    item.attribute = sql;
                    let imageSql = await SELECT_Q(`SELECT image FROM tbl_properties_image WHERE is_deleted = 0 AND property_id = '${item?.id}'`, false);

                    item.property_images = imageSql.map(imageObj => {
                        return `${process.env.AWS_S3_BASE_URL}/property_images/${imageObj.image}`;
                    });

                    let amenitiesSql = await SELECT_Q(`SELECT amenity_name , 
                    concat('${AMENITY_IMAGE}' , amenity_icon) as amenity_icon_link
                    FROM tbl_property_amenities WHERE property_id = '${item?.id}' and is_deleted=0`, false);

                    item.amenities = amenitiesSql;
                })).then(() => {
                    return sendResponse(req, res, 200, '1', { keyword: "property_found", components: {} }, rows);
                }).catch((e) => {
                    return sendResponse(req, res, 200, '0', { keyword: "something_went_wrong", components: {} }, e?.message);
                })
            }
            else {
                return sendResponse(req, res, 200, '2', { keyword: "no_data", components: {} }, []);
            }
        } catch (e) {
            return sendResponse(req, res, 200, '0', { keyword: "something_went_wrong", components: {} }, e?.message);
        }
    },

    deleteFavProperty: async (req, res) => {
        try {
            let { body } = req;
            let property_id = body?.property_id
            await con.query(`delete from tbl_fav_property where property_id = ${property_id} RETURNING *`)

            return sendResponse(req, res, 200, '1', { keyword: "delete_fav_property", components: {} });
        } catch (e) {
            return sendResponse(req, res, 200, '0', { keyword: "failed_to_delete_fav_property", components: {} }, e?.message);
        }
    },

    favPropertyDetails: async (req, res) => {
        try {
            let { body } = req;
            let user_id = req.loginUser
            let property_id = body?.property_id

            let rows = await SELECT_Q(`select fp.is_favourite , p.id ,p.user_id,p.category_id,p.property_type_id ,p.name as property_name,p.location ,p.status,p.about,p.price,concat(u.first_name,' ',u.last_name) as property_owner , u.mobile_number,u.country_code_id,u.address ,(select count (*) from tbl_fav_property where is_favourite = 1 and user_id = '${user_id}') as fav_count_property,pc.name as category_name,p.latitude,p.longitude   
            from tbl_fav_property fp 
            join tbl_properties p on p.id = fp.property_id
            join tbl_user u on u.id = p.user_id
            join tbl_properties_categories pc on pc.id = p.category_id
            where fp.user_id = '${user_id}' and u.is_deleted=0  and fp.is_favourite = 1 and p.id = '${property_id}'`, false);
            if (rows) {
                Promise.all(rows?.map(async item => {
                    let sql = await SELECT_Q(`select attribute_type , attribute_value ,
                    concat('${ATTRIBUTE_TYPE_IMAGE}' , attribute_icon) as attribute_icon_link
                    from tbl_property_attribute where property_id = '${item?.id}' and is_deleted=0`, false);
                    item.attribute = sql;
                    let imageSql = await SELECT_Q(`SELECT image FROM tbl_properties_image WHERE is_deleted = 0 AND property_id = '${item?.id}'`, false);

                    item.property_images = imageSql.map(imageObj => {
                        return `${process.env.AWS_S3_BASE_URL}/property_images/${imageObj.image}`;
                    });

                    let amenitiesSql = await SELECT_Q(`SELECT amenity_name , 
                    concat('${AMENITY_IMAGE}' , amenity_icon) as amenity_icon_link
                    FROM tbl_property_amenities WHERE property_id = '${item?.id}' and is_deleted=0`, false);

                    item.amenities = amenitiesSql;
                })).then(() => {
                    return sendResponse(req, res, 200, '1', { keyword: "property_found", components: {} }, rows[0]);
                }).catch((e) => {
                    return sendResponse(req, res, 200, '0', { keyword: "something_went_wrong", components: {} }, e?.message);
                })
            }
            else {
                return sendResponse(req, res, 200, '2', { keyword: "no_data", components: {} }, []);
            }
        } catch (e) {
            return sendResponse(req, res, 200, '0', { keyword: "something_went_wrong", components: {} }, e?.message);
        }
    },

    sendNotification: async (req, res) => {
        try {
            let { body } = req;

            const notificationTag = 'Conctact owner'

            const pushMessage = `${body?.user_name} want to purchase you property`

            common.prepare_notification({
                title: body.title ? body.title : 'You Have a New Inquiry on Your Property',
                sender_id: body.sender_id ? body.sender_id : req.loginUser,
                sender_type: body.sender_type ? body.sender_type : 'Customer',
                receiver_type: "Property Owner",
                receiver_id: body.receiver_id,
                message: body.message ? body.message : pushMessage,
                notification_tag: notificationTag,
            });
        } catch (error) {
            return sendResponse(req, res, 200, '0', { keyword: "something_went_wrong", components: {} }, error?.message);
        }
    },

    sendAdminNotification: async (req, res) => {
        try {
            let { body } = req;

            const notificationTag = 'Contact owner';
            const pushMessage = `${body?.user_name} want to purchase you property`;

            const notificationData = {
                title: body.title ? body.title : 'You Have a New Inquiry on Your Property',
                sender_id: 0,
                sender_type: body.sender_type ? body.sender_type : 'Customer',
                receiver_type: "Property Owner",
                receiver_id: body.receiver_id,
                message: body.message ? body.message : pushMessage,
                notification_tag: notificationTag,
            };

            if (Array.isArray(notificationData.receiver_id)) {
                for (const receiverId of notificationData.receiver_id) {
                    await common.prepare_notification({ ...notificationData, receiver_id: receiverId });
                }
            } else {
                await common.prepare_notification(notificationData);
            }

            return sendResponse(req, res, 200, '1', { keyword: "notification_sent", components: {} });
        } catch (error) {
            return sendResponse(req, res, 200, '0', { keyword: "something_went_wrong", components: {} }, error?.message);
        }
    }

}

module.exports = {
    Property
};