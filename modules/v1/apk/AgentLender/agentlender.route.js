const { decryption, checkValidationRules, checkBodyInline, checkToken, checkApiKey, checkTokenAdmin } = require('../../../../middleware/headerValidator');
const express = require('express');
const router = express.Router();
const agentlenderModel = require('./agentlender.model');
const agentlender_rules = require('./rules/agentlender.rules.json');
const { CheckMobile, CheckMobile1, CheckEmail, CheckMobileExist, CheckMobileAgentLender, CheckEmailAgentLender } = require('../../../../utils/uniqueMiddleware');

//////////////////////////////////////////////////////////////////////
//                              Auth                                //
//////////////////////////////////////////////////////////////////////

router.post("/agent/signup", checkApiKey, decryption,checkTokenAdmin, checkBodyInline(agentlender_rules["signup"]),CheckEmailAgentLender("tbl_agent"), CheckMobileAgentLender('tbl_agent'), agentlenderModel?.AgentLender?.agentsignUp);

router.post("/agent/web-signup", checkApiKey,checkToken, decryption, checkBodyInline(agentlender_rules["signup"]),CheckEmailAgentLender("tbl_agent"), CheckMobileAgentLender('tbl_agent'), agentlenderModel?.AgentLender?.agentWebSignUp);

router.post("/lender/signup", checkApiKey, decryption,checkTokenAdmin, checkBodyInline(agentlender_rules["lendersignup"]),CheckEmailAgentLender("tbl_lender"), CheckMobileAgentLender('tbl_lender'), agentlenderModel?.AgentLender?.lednersignUp);

router.post("/lender/web-signup", checkApiKey,checkToken, decryption, checkBodyInline(agentlender_rules["lendersignup"]),CheckEmailAgentLender("tbl_lender"), CheckMobileAgentLender('tbl_lender'), agentlenderModel?.AgentLender?.lednerWebsignUp);

router.post("/agent/agentlist", checkApiKey, decryption, agentlenderModel?.AgentLender?.agentListing);

router.post("/agent/agentWebListing", checkApiKey, decryption, agentlenderModel?.AgentLender?.agentWebListing);

router.post("/lender/lenderlist", checkApiKey, decryption, agentlenderModel?.AgentLender?.lenderListing);

router.post("/lender/lenderWebListing", checkApiKey, decryption, agentlenderModel?.AgentLender?.lenderWebListing);

router.post("/agent/edit-agent", checkApiKey,checkTokenAdmin, decryption,agentlenderModel?.AgentLender?.editAgent);

router.post("/lender/edit-lender", checkApiKey,checkTokenAdmin, decryption,agentlenderModel?.AgentLender?.editLender);

module.exports = router;