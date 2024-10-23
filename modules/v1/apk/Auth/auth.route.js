const { decryption, checkValidationRules, checkBodyInline, checkToken, checkApiKey } = require('../../../../middleware/headerValidator');
const express = require('express');
const router = express.Router();
const authModel = require('./auth.model');
const auth_rules = require('./rules/auth.rules.json');
const { CheckMobile, CheckMobile1, CheckEmail, CheckMobileExist, CheckEmail1, CheckEmailExist } = require('../../../../utils/uniqueMiddleware');

//////////////////////////////////////////////////////////////////////
//                              Auth                                //
//////////////////////////////////////////////////////////////////////
router.post("/user/sendOtp", checkApiKey, decryption, checkBodyInline(auth_rules["sendotp"]),CheckEmail1,CheckMobile1, authModel?.Auth?.sendOtp);

router.post("/user/resendOtp", checkApiKey, decryption, checkBodyInline(auth_rules["resend_otp"]), authModel?.Auth?.reSendOtp);

router.post("/user/signup", checkApiKey, decryption, checkBodyInline(auth_rules["signup"]),CheckMobile,CheckEmail, authModel?.Auth?.signUp);

router.post("/user/signin", checkApiKey, decryption, checkBodyInline(auth_rules["signin"]), authModel?.Auth?.signIn);

router.post("/user/complete_profile", checkApiKey, checkToken, decryption, checkBodyInline(auth_rules["complete-profile"]), authModel?.Auth?.completeProfile);

router.get("/country_list", checkApiKey, decryption, authModel?.countryList);

router.post("/user/logout", checkApiKey, checkToken, decryption, authModel?.Auth?.logout);

router.post("/user/forgotpassword", checkApiKey, decryption,checkBodyInline(auth_rules["forgot_password"]) ,CheckEmailExist, authModel?.Auth?.forgotPassword);

router.post("/user/forgototpverify", checkApiKey, decryption,checkBodyInline(auth_rules["forgot_otp_verify"]) ,CheckEmailExist, authModel?.Auth?.forgotOtpVerify);

router.post("/user/reset_password", checkApiKey, decryption,checkBodyInline(auth_rules["reset_password"]) , authModel?.Auth?.resetPassword);

router.post("/user/change_password", checkApiKey,checkToken, decryption,checkBodyInline(auth_rules["change_password"]) , authModel?.Auth?.changePassword);

router.post("/user/edit_profile", checkApiKey,checkToken, decryption,checkBodyInline(auth_rules["edit-profile"]) , authModel?.Auth?.editProfile);

router.post("/user/editProfileByOtpVerification", checkApiKey,checkToken, decryption,checkBodyInline(auth_rules["edit-profilebyotp"]) , authModel?.Auth?.editProfileByOtpVerification);

router.get("/user/userdetails", checkApiKey,checkToken, decryption, authModel?.UserDetails);


module.exports = router;