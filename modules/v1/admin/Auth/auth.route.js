const { decryption, checkBodyInline, checkToken, checkApiKey, checkTokenAdmin } = require('../../../../middleware/headerValidator');
const express = require('express');
const router = express.Router();
const authModel = require('./auth.model');
const auth_rules = require('./rules/auth.rules.json');

//////////////////////////////////////////////////////////////////////
//                              Auth                                //
//////////////////////////////////////////////////////////////////////

router.post("/admin/login", checkApiKey, decryption, checkBodyInline(auth_rules["login"]), authModel?.Auth?.login);

// router.post("/admin/generatemfa", checkApiKey, decryption,checkBodyInline(auth_rules["mfaCode"]), authModel?.Auth?.generateMFA);

router.post("/admin/verifymfa", checkApiKey, decryption,checkBodyInline(auth_rules["mfaCode"]), authModel?.Auth?.verifyMFA);

router.post("/admin/logout", checkApiKey, checkTokenAdmin, decryption, authModel?.Auth?.logout);

router.post("/admin/change_password", checkApiKey,checkTokenAdmin, decryption,checkBodyInline(auth_rules["change_password"]) , authModel?.Auth?.changePassword);

router.post("/admin/edit_profile", checkApiKey,checkTokenAdmin, decryption,checkBodyInline(auth_rules["edit_profile"]) , authModel?.Auth?.editProfile);

router.post("/admin/forgotpassword", checkApiKey, checkTokenAdmin,checkBodyInline(auth_rules["forgot_password"]) , authModel?.Auth?.forgotPassword);


module.exports = router;    