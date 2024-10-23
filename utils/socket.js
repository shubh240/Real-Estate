const { request } = require('express');
const chat_model = require('../modules/v1/socket/Chat/chat_model');
const con = require('../config/database');

exports = module.exports = function (io) {

    var users = {};
    var sock = io.of('/socket').on('connection', function (socket) {
        const user_id = socket.handshake.query.user_id;

        if (user_id !== null && user_id !== undefined) {

            users[`${user_id}`] = { socket: socket.id };

            if (users[user_id]) {
                con.query(`
            UPDATE tbl_user 
            SET chat_user_active='1' 
            WHERE id = (${user_id}) 
        `);
            }

            socket.on('send_message', async (request) => {
                try {
                    const { chat_room_id, loginuser_id, property_id, message, message_type, image, file, file_name, voice } = request;

                    const chatData = await chat_model.getChatData(chat_room_id);

                    if (chatData !== null) {
                        if (parseInt(chatData.data.sender_id) == parseInt(loginuser_id)) {
                            var receiver_id = chatData.data.receiver_id;
                        } else {
                            var receiver_id = chatData.data.sender_id;
                        }

                        const loginUser = await chat_model.userChatDetails(loginuser_id);

                        if (loginUser !== null) {
                            const receiver_data = await chat_model.userChatDetails(receiver_id);

                            if (receiver_data !== null) {
                                receiver_data.receiver_id = receiver_id;
                                const response_data = await chat_model.sendMessage(
                                    {
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
                                    }
                                );

                                if (response_data.data !== null) {

                                    if (users[receiver_data.receiver_id]) {
                                        response_data.data.property_id = property_id
                                        response_data.data.chat_room_id = chat_room_id
                                        sock.to(users[receiver_data.receiver_id]['socket']).emit('received_message', response_data.data);
                                    }
                                    sock.to(users[loginuser_id]['socket']).emit('message_sent', response_data.data);
                                } else {
                                    sock.to(users[loginuser_id]['socket']).emit('message_sent', []);
                                }

                            } else {
                                sock.to(users[loginuser_id]['socket']).emit('message_sent', []);
                            }
                        }
                        else {
                            sock.to(users[loginuser_id]['socket']).emit('message_sent', []);
                        }

                    } else {
                        sock.to(users[loginuser_id]['socket']).emit('message_sent', []);
                    }
                } catch (error) {
                    sock.to(users[loginuser_id]['socket']).emit('message_sent', []);
                }

            });

            // Listen for user disconnecting
            socket.on('disconnect', () => {
                if (users[user_id]) {
                    con.query(`
            UPDATE tbl_user 
            SET chat_user_active='0' 
            WHERE id = (${user_id}) 

        `);
                }
                console.log(`${user_id} is disconnected`);
            });
        }
    })
}