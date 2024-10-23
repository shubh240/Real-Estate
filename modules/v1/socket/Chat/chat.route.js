const { decryption, checkValidationRules, checkBodyInline, checkToken, checkApiKey, checkTokenAdmin } = require('../../../../middleware/headerValidator');
const express = require('express');
const router = express.Router();
const chatModel = require('./chat_model');
const chat_rules = require('./rules/chat.rules.json');

//////////////////////////////////////////////////////////////////////
//                              Properties                          //
//////////////////////////////////////////////////////////////////////

router.post("/chat/create-chat", checkApiKey,checkToken, decryption, chatModel?.create_chat_room_api);

router.post("/chat/chatdetails", checkApiKey,checkToken, decryption, chatModel?.getChatDetailsApi);

router.post("/chat/chathistory", checkApiKey,checkToken, decryption, chatModel?.getChatHistoryAPI);

router.post("/chat/checkChatRoomId", checkApiKey,checkToken, decryption, chatModel?.checkChatRoomId);



module.exports = router;