var con = require("../../../../config/database");
var asyncLoop = require("node-async-loop");
var globals = require("../../../../config/constants");
var moment = require("moment");
const { sendResponse } = require("../../../../middleware/headerValidator");
const { SELECT_Q } = require("../../../../utils/SQLWorker");

const Chat = {

    userChatDetails: async (user_id) => {
        try {
            const result = await con.query(
                `SELECT *, CONCAT('https://bboyorealestate-pord.s3.af-south-1.amazonaws.com/user_profile/', image) AS profile_image FROM tbl_user WHERE id = $1 AND is_deleted = '0'`,
                [user_id]
            );
            return result.rows.length > 0 ? result.rows[0] : null;
        } catch (err) {
            console.error(err);
            return null;
        }
    },

    create_chat_room: async ({ loginuser_id, receiver_id, property_id }) => {
        if (!loginuser_id || !receiver_id) {
            console.error('Sender ID or Receiver ID is missing');
            return { code: 400, message: 'Invalid data', data: null };
        }

        const selectChatRoomSql = `
            SELECT * 
            FROM tbl_chat_room 
            WHERE 
                (sender_id IN ($1, $2)) 
                AND 
                (receiver_id IN ($2, $1))
                AND
                property_id = $3
        `;

        try {
            const chatRoomResult = await con.query(selectChatRoomSql, [loginuser_id, receiver_id, property_id]);

            if (chatRoomResult.rows.length > 0) {
                const selectUserSql = `
                    SELECT 
                        id as receiver_id, 
                        first_name, 
                        last_name, 
                        CONCAT('https://bboyorealestate-pord.s3.af-south-1.amazonaws.com/user_profile/', image) AS profile_image 
                    FROM tbl_user 
                    WHERE id = $1
                `;
                const userResult = await con.query(selectUserSql, [receiver_id]);

                if (userResult.rows.length > 0) {
                    const userDetails = userResult.rows[0];
                    const oldData = {
                        chat_room_id: chatRoomResult.rows[0].id,
                        user_details: userDetails,
                        property_id: property_id
                    };

                    return { code: 200, message: 'Chat Room Data', data: oldData };

                } else {
                    return { code: 400, message: 'User details not found', data: null };
                }
            } else {
                const insertChatRoomSql = `
                    INSERT INTO tbl_chat_room 
                    (sender_id, receiver_id, property_id) 
                    VALUES ($1, $2, $3) 
                    RETURNING id
                `;
                const insertChatRoomResult = await con.query(insertChatRoomSql, [loginuser_id, receiver_id, property_id]);

                if (insertChatRoomResult.rowCount > 0) {
                    const newChatRoomId = insertChatRoomResult.rows[0].id;
                    const selectUserSql = `
                        SELECT 
                            id as receiver_id, 
                            first_name, 
                            last_name, 
                            CONCAT('https://bboyorealestate-pord.s3.af-south-1.amazonaws.com/user_profile/', image) AS profile_image 
                        FROM tbl_user 
                        WHERE id = $1
                    `;

                    const userResult = await con.query(selectUserSql, [receiver_id]);

                    if (userResult.rows.length > 0) {
                        const userDetails = userResult.rows[0];

                        const data = {
                            chat_room_id: newChatRoomId,
                            user_details: userDetails,
                            property_id: property_id
                        };

                        return { code: 200, message: 'Chat Room Created', data: data };
                    } else {
                        return { code: 400, message: 'User details not found', data: null };
                    }
                } else {
                    return { code: 400, message: 'Failed to create chat room', data: null };
                }
            }
        } catch (error) {
            console.error('Error in create_chat_room:', error);
            return { code: 500, message: 'Server error', data: null };
        }
    },

    create_chat_room_api: async (req, res) => {
        let { body } = req;
        let loginuser_id = body?.loginuser_id
        let receiver_id = body?.reciever_id
        let property_id = body?.property_id
        if (!loginuser_id || !receiver_id) {
            console.error('Sender ID or Receiver ID is missing');
            return sendResponse(req, res, 400, '0', { keyword: "Invalid data", components: {} }, []);
        }

        const selectChatRoomSql = `
            SELECT * 
            FROM tbl_chat_room 
            WHERE 
                (sender_id IN ($1, $2)) 
                AND 
                (receiver_id IN ($2, $1))
                AND
                property_id = $3
        `;

        try {
            const chatRoomResult = await con.query(selectChatRoomSql, [loginuser_id, receiver_id, property_id]);

            if (chatRoomResult.rows.length > 0) {
                const selectUserSql = `
                    SELECT 
                        id as receiver_id, 
                        first_name, 
                        last_name, 
                        CONCAT('https://bboyorealestate-pord.s3.af-south-1.amazonaws.com/user_profile/', image) AS profile_image 
                    FROM tbl_user 
                    WHERE id = $1
                `;
                const userResult = await con.query(selectUserSql, [receiver_id]);

                if (userResult.rows.length > 0) {
                    const userDetails = userResult.rows[0];
                    const oldData = {
                        chat_room_id: chatRoomResult.rows[0].id,
                        user_details: userDetails,
                        property_id: property_id
                    };

                    return sendResponse(req, res, 200, '1', { keyword: "Chat Room Data", components: {} }, oldData);

                } else {
                    return sendResponse(req, res, 400, '0', { keyword: "User details not found", components: {} }, []);
                }
            } else {
                const insertChatRoomSql = `
                    INSERT INTO tbl_chat_room 
                    (sender_id, receiver_id, property_id) 
                    VALUES ($1, $2, $3) 
                    RETURNING id
                `;
                const insertChatRoomResult = await con.query(insertChatRoomSql, [loginuser_id, receiver_id, property_id]);

                if (insertChatRoomResult.rowCount > 0) {
                    const newChatRoomId = insertChatRoomResult.rows[0].id;
                    const selectUserSql = `
                        SELECT 
                            id as receiver_id, 
                            first_name, 
                            last_name, 
                            CONCAT('https://bboyorealestate-pord.s3.af-south-1.amazonaws.com/user_profile/', image) AS profile_image 
                        FROM tbl_user 
                        WHERE id = $1
                    `;

                    const userResult = await con.query(selectUserSql, [receiver_id]);

                    if (userResult.rows.length > 0) {
                        const userDetails = userResult.rows[0];

                        const data = {
                            chat_room_id: newChatRoomId,
                            user_details: userDetails,
                            property_id: property_id
                        };

                        return sendResponse(req, res, 200, '1', { keyword: "Chat Room Created", components: {} }, data);
                    } else {
                        return sendResponse(req, res, 400, '0', { keyword: "User details not found", components: {} }, []);
                    }
                } else {
                    return sendResponse(req, res, 400, '0', { keyword: "Failed to create chat room", components: {} }, []);
                }
            }
        } catch (error) {
            console.error('Error in create_chat_room:', error);
            return sendResponse(req, res, 500, '0', { keyword: "Server error", components: {} }, []);
        }
    },

    /**
     * 
     * Chat Details Api   (Step - 2)
     * 
     */

    getChatDetails: async ({ loginuser_id, property_id }) => {
        const user_id = loginuser_id;
        try {
            // Construct the property condition dynamically
            let propertyCondition = '';
            if (property_id) {
                propertyCondition = ` AND property_id = '${property_id}'`;
            }

            // Query to get chat rooms
            const { rows } = await con.query(`SELECT id as chat_room_id, sender_id, receiver_id, property_id 
                                              FROM tbl_chat_room 
                                              WHERE (sender_id = '${user_id}' OR receiver_id = '${user_id}')`);

            if (rows?.length > 0) {
                for (const item of rows) {
                    const otherUserId = item.sender_id == user_id ? item.receiver_id : item.sender_id;

                    // Query to get user details and chat information
                    const userResult = await con.query(`
                        SELECT 
                            tu.id, 
                            tc.is_read,
                            CONCAT(tu.first_name, ' ', tu.last_name) as fullName, chat_user_active as active,
                            p.name as property_name,
                            CONCAT('https://bboyorealestate-pord.s3.af-south-1.amazonaws.com/user_profile/', tu.image) as profile_picture, 
                            tc.message as lastMessage, 
                            (SELECT COUNT(tc2.id) FROM tbl_chat tc2 
                             WHERE ((tc2.sender_id = $1 AND tc2.receiver_id = $2 ) OR (tc2.sender_id = $2 AND tc2.receiver_id = $1))
                             AND tc2.is_read = '0') AS unreadMessages, 
                            tc.created_at 
                        FROM 
                            tbl_user tu
                        LEFT JOIN 
                            tbl_properties p ON p.id = ${item?.property_id}
                        LEFT JOIN 
                            tbl_chat tc ON ((tc.sender_id = $1 AND tc.receiver_id = $2) OR (tc.sender_id = $2 AND tc.receiver_id = $1))
                        WHERE 
                            (tu.id = $2 or tu.id = $1) 
                            AND tu.id NOT IN ($3)
                            AND tu.is_active = '1' 
                            AND tu.is_deleted = '0'
                        ORDER BY 
                            tc.id DESC 
                        LIMIT 1
                    `, [user_id, otherUserId, user_id]);

                    if (userResult?.rows?.length > 0) {
                        const message = userResult?.rows[0]?.lastmessage?.toString();
                        userResult.rows[0].lastMessage = message?.toString();
                    }

                    item.userDetails = userResult.rows;
                }

                return { code: 200, message: 'Chat Room Data', data: rows };
            } else {
                return { code: 400, message: 'Failed to get chat room data', data: null };
            }
        } catch (error) {
            console.error('Error in getchatdetaills:', error);
            return { code: 500, message: 'Server error', data: null };
        }
    },

    getChatDetailsApi: async (req, res) => {
        let { body } = req;
        let user_id = req.loginUser;
        let property_id = body?.property_id
        try {
            // Construct the property condition dynamically
            let propertyCondition = '';
            if (property_id) {
                propertyCondition = ` AND property_id = '${property_id}'`;
            }

            // Query to get chat rooms
            const { rows } = await con.query(`SELECT id as chat_room_id, sender_id, receiver_id, property_id 
                                              FROM tbl_chat_room 
                                              WHERE (sender_id = '${user_id}' OR receiver_id = '${user_id}')`);

            if (rows?.length > 0) {
                for (const item of rows) {
                    const otherUserId = item.sender_id == user_id ? item.receiver_id : item.sender_id;

                    // Query to get user details and chat information
                    const userResult = await con.query(`
                        SELECT 
                            tu.id, 
                            tc.is_read,
                            CONCAT(tu.first_name, ' ', tu.last_name) as fullName, chat_user_active as active,
                            p.name as property_name,
                            CONCAT('https://bboyorealestate-pord.s3.af-south-1.amazonaws.com/user_profile/', tu.image) as profile_picture, 
                            tc.message as lastMessage, 
                            (SELECT COUNT(tc2.id) FROM tbl_chat tc2 
                             WHERE ((tc2.sender_id = $1 AND tc2.receiver_id = $2 ) OR (tc2.sender_id = $2 AND tc2.receiver_id = $1))
                             AND tc2.is_read = '0') AS unreadMessages, 
                            tc.created_at 
                        FROM 
                            tbl_user tu
                        LEFT JOIN 
                            tbl_properties p ON p.id = ${item?.property_id}
                        LEFT JOIN 
                            tbl_chat tc ON ((tc.sender_id = $1 AND tc.receiver_id = $2) OR (tc.sender_id = $2 AND tc.receiver_id = $1))
                        WHERE 
                            (tu.id = $2 or tu.id = $1) 
                            AND tu.id NOT IN ($3)
                            AND tu.is_active = '1' 
                            AND tu.is_deleted = '0'
                        ORDER BY 
                            tc.id DESC 
                        LIMIT 1
                    `, [user_id, otherUserId, user_id]);

                    if (userResult?.rows?.length > 0) {
                        const message = userResult?.rows[0]?.lastmessage?.toString();
                        userResult.rows[0].lastMessage = message?.toString();
                    }

                    item.userDetails = userResult.rows;
                }

                return sendResponse(req, res, 200, '1', { keyword: "Chat Room Data", components: {} }, rows);
            } else {
                return sendResponse(req, res, 200, '2', { keyword: "No chat room data", components: {} }, []);
            }
        } catch (error) {
            console.error('Error in getchatdetaills:', error);
            return sendResponse(req, res, 500, '0', { keyword: "Server error", components: {} }, []);
        }
    },

    /**
     *  Get Chat History  (Step - 3)
     */
    getChatHistory: async ({ loginuser_id, chat_room_id, reciever_id, property_id }) => {
        const user_id = loginuser_id;
        try {

            const { rows } = await con.query(`SELECT u.id AS loginuser_id, concat(first_name ,' ' ,last_name) as full_name,chat_user_active as active,
            concat('https://bboyorealestate-pord.s3.af-south-1.amazonaws.com/user_profile/' , image) as owner_image,
            p.location ,p.name as property_name,
            (select concat('https://bboyorealestate-pord.s3.af-south-1.amazonaws.com/property_images/' , image)) as property_image
            FROM tbl_user u
            join tbl_properties p on p.id = ${property_id} 
            WHERE u.id='${reciever_id}' LIMIT 1;`);

            const result1 = await con.query(`
            SELECT *, 
            CONCAT('${process.env.AWS_S3_BASE_URL}', '/chatImages/', image) as uploadedImg, 
            CONCAT('${process.env.AWS_S3_BASE_URL}', '/chatFiles/', file) as uploadedFile, 
            CONCAT('${process.env.AWS_S3_BASE_URL}', '/chatVoice/', voice) as uploadedVoice 
            FROM tbl_chat 
            WHERE chat_room_id='${chat_room_id}'
            `);

            if (result1.rows.length > 0) {

                const chatList = result1.rows.map((o) => ({
                    ...o,
                    message: o.message.toString(),
                }));

                rows[0].chatList = chatList;

                await con.query(`
                    UPDATE tbl_chat 
                    SET is_read='1' 
                    WHERE chat_room_id='${chat_room_id}' 
                      AND receiver_id='${user_id}' 
                      AND is_read='0'
                `);

                return { code: 200, message: 'Chat Room Created', data: rows[0] };

            }
            else {
                rows[0].chatList = [];
                return { code: 200, message: 'Chat Room Created', data: rows[0] };
            }


        } catch (error) {
            console.error('Error in getchathistory:', error);
            return { code: 500, message: 'Server error', data: null };
        }
    },

    getChatHistoryAPI: async (req, res) => {
        let { body } = req;
        let user_id = req.loginUser
        let chat_room_id = body?.chat_room_id
        let receiver_id = body?.receiver_id
        let property_id = body?.property_id
        try {

            const { rows } = await con.query(`SELECT u.id AS loginuser_id, concat(first_name ,' ' ,last_name) as full_name,chat_user_active as active,
            concat('https://bboyorealestate-pord.s3.af-south-1.amazonaws.com/user_profile/' , image) as owner_image,
            p.location ,p.name as property_name,
            (select concat('https://bboyorealestate-pord.s3.af-south-1.amazonaws.com/property_images/' , image)) as property_image
            FROM tbl_user u
            join tbl_properties p on p.id = ${property_id} 
            WHERE u.id='${receiver_id}' LIMIT 1;`);

            const result1 = await con.query(`
            SELECT *, 
            CONCAT('${process.env.AWS_S3_BASE_URL}', '/chatImages/', image) as uploadedImg, 
            CONCAT('${process.env.AWS_S3_BASE_URL}', '/chatFiles/', file) as uploadedFile, 
            CONCAT('${process.env.AWS_S3_BASE_URL}', '/chatVoice/', voice) as uploadedVoice 
            FROM tbl_chat 
            WHERE chat_room_id='${chat_room_id}'
            `);
            
            if (result1.rows.length > 0) {

                const chatList = result1.rows.map((o) => ({
                    ...o,
                    message: o.message.toString(),
                }));

                rows[0].chatList = chatList;
                
                await con.query(`
                UPDATE tbl_chat 
                SET is_read='1' 
                WHERE chat_room_id='${chat_room_id}' 
                AND receiver_id='${user_id}' 
                AND is_read='0'
                `);
                
                return sendResponse(req, res, 200, '1', { keyword: "Chat Room History", components: {} }, rows[0]);

            }
            else {
                rows[0].chatList = [];
                return sendResponse(req, res, 200, '1', { keyword: "Chat Room History", components: {} }, rows[0]);
            }


        } catch (error) {
            console.error('Error in getchathistory:', error);
            return sendResponse(req, res, 500, '0', { keyword: "Server error", components: {} }, []);
        }
    },

    /**
     * 
     * get ChatRoomData
     */

    getChatData: async (chat_id) => {
        try {
            const { rows } = await con.query(`SELECT * FROM tbl_chat_room where id=${chat_id}`);

            if (rows[0]) {
                return { code: 200, message: 'Chat Data Found', data: rows[0] };
            } else {
                return { code: 200, message: 'No Data Found', data: [] };
            }
        } catch (error) {
            return { code: 500, message: 'Server error', data: null };
        }
    },

    /**
    * 
    *  Check Chat-Room ID  (Step - 4)
    * 
    * 
    */

    checkChatRoomId: async (req, res) => {
        const loginuser_id = req.loginUser;
        const { receiver_id, property_id } = req.body;

        const selectChatRoomSql = `
          SELECT * FROM tbl_chat_room 
          WHERE 
            (loginuser_id = $1 AND receiver_id = $2) 
            OR 
            (receiver_id = $1  AND loginuser_id = $2)
        `;

        try {
            const chatRoomResult = await con.query(selectChatRoomSql, [loginuser_id, receiver_id]);

            if (chatRoomResult.rows.length > 0) {
                return sendResponse(req, res, 200, '1', { keyword: "rest_keyword_chat_room_id_success", components: {} }, chatRoomResult.rows[0].id);
            } else {
                const insertChatRoomSql = `
                INSERT INTO tbl_chat_room 
                (loginuser_id, receiver_id,property_id) 
                VALUES ($1, $2,$3) 
                RETURNING id
            `;
                const insertChatRoomResult = await con.query(insertChatRoomSql, [loginuser_id, receiver_id, property_id]);

                if (insertChatRoomResult.rowCount > 0) {
                    return sendResponse(req, res, 200, '1', { keyword: "rest_keyword_chat_room_id_success", components: {} }, insertChatRoomResult.rows[0].id);
                } else {
                    return sendResponse(req, res, 400, '0', { keyword: "Failed_to_create_chat_room", components: {} }, null);
                }
            }
        } catch (error) {
            console.error('Error in checkChatRoomId:', error);
            return sendResponse(req, res, 500, '0', { keyword: "text_rest_mysql_query_error", components: {} }, null);
        }
    },

    /**
 * Function to get single message
 */
    getSingleMessage: async (message_id) => {
        const query = `
                SELECT *, 
                    CONCAT($1::text, '/chatImages/', image) as uploadedImg, 
                    CONCAT($1::text, '/chatFiles/', file) as uploadedFile, 
                    CONCAT($1::text, '/chatVoice/', voice) as uploadedVoice, 
                    TO_CHAR(created_at, 'HH24:MI') as created_time  
                FROM tbl_chat 
                WHERE id = $2::int
            `;
        const values = [process.env.AWS_S3_BASE_URL, message_id];

        try {
            const { rows } = await con.query(query, values);

            if (rows.length > 0) {
                const result = rows.map((o) => {
                    o.message = o.message ? o.message.toString() : null;
                    return o;
                });
                return result[0];
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error in create_chat_room:', error);
            return { code: 500, message: 'Server error', data: null };
        }
    },

    /*
     * sendMessage
     */

    sendMessage: async ({
        chat_room_id,
        message_type,
        loginuser_id,
        receiver_id,
        message,
        image,
        property_id,
        file,
        file_name,
        voice
    }) => {
        const selectChatRoomSql = `
            SELECT id
            FROM tbl_chat_room
            WHERE 
                sender_id IN ($1, $2) 
                AND receiver_id IN ($2, $1)
                AND property_id = $3
        `;

        try {
            const chatRoomResult = await con.query(selectChatRoomSql, [loginuser_id, receiver_id, property_id]);

            let chatRoomId;
            if (chatRoomResult.rows.length > 0) {
                chatRoomId = chatRoomResult.rows[0].id;
            } else {
                const insertChatRoomSql = `
                    INSERT INTO tbl_chat_room 
                    (sender_id, receiver_id, property_id) 
                    VALUES ($1, $2, $3) 
                    RETURNING id
                `;
                const insertChatRoomResult = await con.query(insertChatRoomSql, [loginuser_id, receiver_id, property_id]);

                if (insertChatRoomResult.rowCount > 0) {
                    chatRoomId = insertChatRoomResult.rows[0].id;
                } else {
                    return { code: 200, message: 'No Data Found', data: null };
                }
            }

            const messageParams = {
                chat_room_id: chatRoomId,
                message_type: message_type || 'text',
                loginuser_id,
                receiver_id,
                message: message || "",
                image,
                file,
                file_name,
                voice
            };

            const insertMessageSql = `
                INSERT INTO tbl_chat (chat_room_id, message_type, sender_id, receiver_id, message, image, file, file_name, voice) 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
                RETURNING id
            `;
            const insertMessageResult = await con.query(insertMessageSql, [
                messageParams.chat_room_id, messageParams.message_type, messageParams.loginuser_id,
                messageParams.receiver_id, messageParams.message, messageParams.image, messageParams.file, messageParams.file_name,
                messageParams.voice
            ]);

            if (insertMessageResult.rowCount > 0) {
                const message_id = insertMessageResult.rows[0].id;
                const messageData = await Chat.getSingleMessage(message_id);

                const updateChatRoomSql = `
                    UPDATE tbl_chat_room 
                    SET updated_at = $1 
                    WHERE id = $2
                `;
                const updatedAt = moment().utc().add(6, "hours").subtract(30, "minutes").format("YYYY-MM-DD HH:mm:ss");
                await con.query(updateChatRoomSql, [updatedAt, chatRoomId]);

                messageData.message_id = message_id;
                messageData.receiver_id = receiver_id;
                return { code: 200, message: 'Message Sent', data: messageData };
            } else {
                return { code: 200, message: 'No Data', data: null };
            }
        } catch (error) {
            console.error('Error in create_chat_room:', error);
            return { code: 500, message: 'Server error', data: null };
        }
    },


    /**
     * Function to get chat details
     */
    getChatRoomData: async (chat_id) => {
        try {

            let ChatRoomData = await SELECT_Q(`SELECT * FROM tbl_chat_room WHERE id='${chat_id}'`, false);

            if (ChatRoomData?.length) {
                return sendResponse(req, res, 200, '1', { keyword: "Chat_Room_Data", components: {} }, ChatRoomData);
            } else {
                return sendResponse(req, res, 200, '2', { keyword: "no_data", components: {} }, []);
            }

        } catch (error) {
            return sendResponse(req, res, 200, '0', { keyword: "Failed_to_Chat_Room_Data", components: {} }, error.message);
        }
    },

    get_last_message: async (id) => {
        try {
            let ChatRoomData = await SELECT_Q(`SELECT * FROM tbl_chat where chat_room_id = '${id}'`, false);

            if (ChatRoomData?.length) {
                return sendResponse(req, res, 200, '1', { keyword: "Chat_Room_Data", components: {} }, ChatRoomData);
            } else {
                return sendResponse(req, res, 200, '2', { keyword: "no_data", components: {} }, []);
            }

        } catch (error) {
            return sendResponse(req, res, 200, '0', { keyword: "Failed_to_Get_Last_Msg", components: {} }, error.message);
        }
    },

    get_last_message_for_chat_list: async (id) => {
        try {
            const query = `
      SELECT id, chat_room_id, loginuser_id, receiver_id, CONVERT(message_body USING utf8) as message_body, sender_type, receiver_type, created_at 
      FROM tbl_chat 
      WHERE chat_room_id = $1 
      ORDER BY created_at DESC 
      LIMIT 1
    `;
            const values = [id];

            const { rows } = await con.query(query, values);

            if (rows.length > 0) {
                return rows[0];
            } else {
                return null;
            }

        } catch (error) {
            console.error('Error fetching last message:', error);
            return null;
        }
    },

    get_receiver_details_owner: async (id, property_id) => {
        const query = `
          SELECT 
            id as user_id,
            first_name,
            last_name,
            profile_image,
            (
              SELECT id 
              FROM tbl_property 
              WHERE id = $2
            ) as property_id,
            (
              SELECT property_name 
              FROM tbl_property 
              WHERE id = $2
            ) as property_name,
            (
              SELECT 
                CASE 
                  WHEN media_type = 'Image' 
                  THEN CONCAT($3, 'property_media/', file_url) 
                  ELSE CONCAT($3, 'property_media/', thumbnail_image) 
                END as property_media 
              FROM tbl_property_media 
              WHERE property_id = $2 
              LIMIT 1
            ) as property_media 
          FROM tbl_user 
          WHERE id = $1 
          LIMIT 1;
        `;
        const values = [id, property_id, globals.upload_url];

        try {
            const { rows } = await con.query(query, values);
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            console.error('Error fetching receiver details:', error);
            return null;
        }
    },

    get_receiver_details: async (id, property_id) => {
        const query = `
          SELECT 
            id as receiver_id,
            first_name,
            last_name,
            CASE 
              WHEN profile_image != '' 
              THEN CONCAT($3, 'user/', profile_image) 
              ELSE 'default_user_image.jpg' 
            END as profile_image,
            (
              SELECT id 
              FROM tbl_property 
              WHERE id = $2
            ) as property_id,
            (
              SELECT property_name 
              FROM tbl_property 
              WHERE id = $2
            ) as property_name,
            (
              SELECT 
                CASE 
                  WHEN media_type = 'Image' 
                  THEN CONCAT($3, 'property_media/', file_url) 
                  ELSE CONCAT($3, 'property_media/', thumbnail_image) 
                END as property_media 
              FROM tbl_property_media 
              WHERE property_id = $2 
              LIMIT 1
            ) as property_media 
          FROM tbl_user 
          WHERE id = $1 
          LIMIT 1;
        `;
        const values = [id, property_id, globals.upload_url];

        try {
            const { rows } = await con.query(query, values);
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            console.error('Error fetching receiver details:', error);
            return null;
        }
    },

    get_chat_room_list: async (req, res) => {
        const query = `
          SELECT * 
          FROM tbl_chat_room
          WHERE loginuser_id = $1 OR receiver_id = $1
          ORDER BY updated_at DESC
        `;
        const values = [req.user_id];

        try {
            const { rows: chatRooms } = await con.query(query, values);

            if (chatRooms.length > 0) {
                const data = await Promise.all(chatRooms.map(async (item) => {
                    const userId = item.loginuser_id === req.user_id ? item.receiver_id : item.loginuser_id;
                    const lastMessage = await get_last_message_for_chat_list(item.id);
                    const userDetails = await get_receiver_details(userId, item.property_id);

                    if (lastMessage && userDetails) {
                        return {
                            chat_room_id: item.id,
                            last_message_details: lastMessage,
                            user_details: userDetails,
                        };
                    }

                    return null;
                }));

                const filteredData = data.filter(item => item !== null);

                if (filteredData.length > 0) {
                    return sendResponse(req, res, 200, '1', { keyword: "Chat_Room_Data", components: {} }, filteredData);
                } else {
                    return sendResponse(req, res, 200, '0', { keyword: "rest_keyword_something_went_wrong", components: {} }, null);
                }
            } else {
                return sendResponse(req, res, 200, '0', { keyword: "rest_keyword_something_went_wrong", components: {} }, null);
            }
        } catch (error) {
            console.error('Error fetching chat room list:', error);
            return sendResponse(req, res, 500, '0', { keyword: "rest_keyword_something_went_wrong", components: {} }, null);
        }
    },




    // AWS_S3_BASE_URL






};

module.exports = Chat;
