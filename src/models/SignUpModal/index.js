import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import SignUpVerifyModal from "../SignUpVerifyModal";
import { PUBLICURL, TOAST_ERROR, TOAST_SUCCESS } from "../../utils/common.service";
import * as API from "../../utils/api.service"
import { useDispatch, useSelector } from "react-redux";
import { getCountryList, setModalStatus } from "../../store/slice/masterSlice";
import SignInModal from "../SignInModal";
import { OTP_VERIFICATION_MODAL, SIGN_IN_MODAL } from "../../app.config";
import CustomModal from "../../component/CustomModal";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SignUpModal = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { countryList: { data: countryList } } = useSelector((state) => state.master);
    const { isModalOpen } = useSelector((state) => state.master);
    const [errorMsg, setErrorMsg] = useState("");
    const [togglePassword, setTogglePassword] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();
    const handleKeyPress = (e) => {
        if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
        }
    };

    const onSubmit = async (body) => {
        try {
            let requestBody = {
                country_code_id: body.country_code_id,
                mobile_number: body.mobile_number,
                email: body.email,
                otp_type: "sign-up otp"
            }
            setLoading(true);
            let { data, code, message } = await API.sendOtpApi(requestBody);
            setLoading(false);
            setErrorMsg(message);
            if (code == '1') {
                requestBody.password = body.password
                requestBody.user_id = data.user_id
                requestBody.otp = data.otp
                requestBody.device_type = 'W'
                requestBody.device_token = '0'
                requestBody.device_name = 'vivo'
                requestBody.os_version = '1.1'
                requestBody.app_version = '1.1'
                dispatch(setModalStatus({ modalType: OTP_VERIFICATION_MODAL, isOpen: true, data: { requestBody } }));
                setErrorMsg('')
            }
        } catch (err) {
            setLoading(false);
            TOAST_ERROR(err.message);
        }
    };

    useEffect(() => {
        dispatch(getCountryList());
    }, []);

    return (
        <>
            <div className="signin_modal">
                <CustomModal id="sign-in">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 p-0 order-lg-1 order-2">
                                <div className="signin_card">
                                    <h6 className="signin-title">{t("Sign Up")}</h6>
                                    {errorMsg && <p className="text-danger mt-2">{errorMsg} !</p>}
                                    <div className="signin_card-content">
                                        <div className="input_fild mb-4">
                                            <label>{t("Email")}
                                            </label>
                                            <input
                                                {...register("email", {
                                                    required: t("Please enter Email"),
                                                    pattern: {
                                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                        message: t("Please enter a valid email address"),
                                                    },
                                                })}
                                                type="email"
                                                className="form-control"
                                                placeholder={t("Enter email address")} />
                                            {errors.email && (
                                                <p role="alert" className="text-danger">
                                                    {errors.email?.message}
                                                </p>
                                            )}
                                        </div>
                                        <div className="input_fild mb-4">
                                            <label>{t("Mobile Number")}</label>
                                            <div className="row mobile_no mx-0">
                                                <div className="col-3 p-0 d-flex align-items-center justify-content-center">
                                                    <select className="form-select me-2 text-start" aria-label="Default select example"
                                                        {...register("country_code_id", {
                                                            required: t("Please select country-code"),
                                                        })}>
                                                        {
                                                            countryList?.map((country) =>
                                                                <option key={country?.country_id} value={country?.country_code}>
                                                                    {country?.country_code} - {country?.name}
                                                                </option>
                                                            )
                                                        }
                                                    </select>
                                                </div>

                                                <div className="col-9 p-0">
                                                    <input
                                                        {...register("mobile_number", {
                                                            required: t("Please enter Mobile Number"),
                                                            maxLength: {
                                                                value: 15,
                                                                message: t("Mobile Number cannot exceed 15 digits"),
                                                            },
                                                            minLength: {
                                                                value: 9,
                                                                message: t("Mobile Number must be at least 9 digits"),
                                                            },
                                                        })}
                                                        type="text"
                                                        onKeyPress={handleKeyPress}
                                                        placeholder={t("Enter mobile number")} />
                                                </div>
                                            </div>
                                            {errors.country_code_id && <span className="text-danger">{errors.country_code_id?.message}</span>}
                                            {errors.country_code_id && errors.mobile_number && <span className="text-danger"> and</span>}
                                            {errors.mobile_number && <span className="text-danger">  {errors.mobile_number?.message}</span>}
                                        </div>

                                        <div className="input_fild mb-4">
                                            <label>{t("Password")}</label>
                                            <div className="password">
                                                <input
                                                    {...register("password", {
                                                        required: t("Please enter Password"),
                                                        minLength: {
                                                            value: 8,
                                                            message: t("Password must be at least 6 characters"),
                                                        },
                                                        maxLength: {
                                                            value: 16,
                                                            message: t("Password cannot exceed 16 characters"),
                                                        },
                                                    })}
                                                    type={togglePassword ? "text" : "password"}
                                                    className="form-control"
                                                    placeholder={t("Enter password")}
                                                    onPaste={(e) => e.preventDefault()}
                                                />
                                                <span style={{ cursor: "pointer" }} onClick={() => setTogglePassword(!togglePassword)}>
                                                    {togglePassword ? (
                                                        <i className="fa-solid fa-eye" style={{ color: "#74C0FC", marginTop: "5px" }}></i>
                                                    ) : (
                                                        <i className="fa-solid fa-eye-slash" style={{ color: "#49657B", marginTop: "5px" }}></i>
                                                    )}
                                                </span>
                                            </div>
                                            {errors.password && (
                                                <p role="alert" className="text-danger">
                                                    {errors.password?.message}
                                                </p>
                                            )}
                                        </div>
                                        <div className="mb-4">
                                            <div className="form-check confrim_txt">
                                                <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" {...register('terms', { required: true })} />
                                                <p>{t("By clicking Create account, I agree that I have read and accepted the")}
                                                    <a href="/boyo-realestate/terms-condtions" target="_blank" style={{ cursor: "pointer" }} className="dark"> Terms of Use</a> and
                                                    <a href="/boyo-realestate/privacy-policy" target="_blank" style={{ cursor: "pointer" }} className="dark"> {t("Privacy Policy")}</a>
                                                </p>
                                                {errors.terms && <span className="text-danger my-1">{t("Please agree to the Terms of Service and Privacy Policy to proceed")}</span>}
                                            </div>
                                        </div>
                                        <button className="btn blue_btn w-100" type="submit" disabled={loading}>
                                            {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : t('Sign Up')}
                                        </button>
                                        <h6 className="sign-up">{t("Already have an account")}  <a className="Primary-Blue" style={{ cursor: "pointer" }} onClick={() => dispatch(setModalStatus({ modalType: SIGN_IN_MODAL, isOpen: true, data: null }))}>{t("Sign In")}</a></h6>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 order-lg-2 order-1">
                                <div className="signin_box">
                                    <a href="javascript:void(0);" className="bolo_log-img"><img
                                        src={PUBLICURL + "/assets/imges/icons/boyo-logo.svg"} alt="boyo" /></a>
                                    <h2>{t("Welcome back to BOYO")}</h2>
                                    <p>{t("Experience luxury living")}</p>
                                </div>
                            </div>
                        </div>
                    </form>
                </CustomModal>
            </div>
        </>
    )
}

export default SignUpModal;