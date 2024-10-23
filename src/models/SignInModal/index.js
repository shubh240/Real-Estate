import { Modal } from "react-bootstrap";
import SignUpModal from "../SignUpModal";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { PUBLICURL, TOAST_ERROR, TOAST_SUCCESS } from "../../utils/common.service";
import { useDispatch, useSelector } from "react-redux";
import { getCountryList, setModalStatus } from "../../store/slice/masterSlice";
import * as API from "../../utils/api.service";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import ForgotModal from "../ForgotModal";
import SignUpVerifyModal from "../SignUpVerifyModal";
import CustomModal from "../../component/CustomModal";
import { COMPLETE_PROFILE_MODAL, FORGOT_PASS_MODAL, OTP_VERIFICATION_MODAL, SIGN_IN_MODAL, SIGN_UP_MODAL } from "../../app.config";
import Select from 'react-select';
import { useTranslation } from "react-i18next";
import { generateToken } from "../../firebase";


const SignInModal = ({ setToken }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { isModalOpen } = useSelector((state) => state.master);
    const { countryList: { data: countryList } } = useSelector((state) => state.master);
    const [togglePassword, setTogglePassword] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");
    const [loginMethod, setLoginMethod] = useState("mobile");
    const countryOptions = countryList.map(country => ({
        value: country.country_code,
        label: `${country.country_code} - ${country.name}`
    }));
    const currentPath = location.pathname;

    const handleLoginMethodChange = (method) => {
        setLoginMethod(method);
    };

    const handleCountryChange = (selectedOption) => {
        setSelectedCountry(selectedOption);
        setValue('country_code_id', selectedOption.value, { shouldValidate: true });
    };

    const handleSignUpClick = () => {
        dispatch(setModalStatus({ modalType: 'SIGN_UP_MODAL', isOpen: true, data: [] }));
    };

    const handleForgotShow = () => {
        dispatch(setModalStatus({ modalType: FORGOT_PASS_MODAL, isOpen: true, data: [] }));
    };

    const handleKeyPress = (e) => {
        if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
        }
    };

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = async (body) => {
        try {
            const deviceToken = await generateToken()
            let requestBody = {
                country_code_id: body.country_code_id,
                mobile_number: body.mobile_number,
                email: body.email,
                password: body.password,
                device_token: deviceToken,
                device_name: 'vivo',
                device_type: 'W',
                os_version: '1.1',
                app_version: '1.1'
            }
            let { data, code, message } = await API.login(requestBody);
            requestBody.user_id = data?.user_id
            requestBody.otp = data?.otp
            if (body.country_code_id == "" && body.mobile_number == "") {
                requestBody.country_code_id = data?.country_code_id
                requestBody.mobile_number = data?.mobile_number
            }
            else if (body.email == "") {
                requestBody.email = data?.email
            }
            if (code === '4') {
                dispatch(setModalStatus({ modalType: OTP_VERIFICATION_MODAL, isOpen: true, data: { requestBody } }));
                setErrorMsg('')
            }
            else if (code === '5') {
                Cookies.set('isLoginCA', true, { expires: 2 });
                Cookies.set('dataCA', JSON.stringify(data), { expires: 2 });
                Cookies.set('tokenCA', data.token, { expires: 2 });
                dispatch(setModalStatus({ modalType: COMPLETE_PROFILE_MODAL, isOpen: true }));
                setErrorMsg('')
            }
            else if (code == 1) {
                Cookies.set('isLoginCA', true, { expires: 2 });
                Cookies.set('dataCA', JSON.stringify(data), { expires: 2 });
                Cookies.set('tokenCA', data.token, { expires: 2 });
                navigate(currentPath);
                dispatch(setModalStatus({ modalType: SIGN_IN_MODAL, isOpen: false }));
                setToken(data.token);
                TOAST_SUCCESS(message);
                setErrorMsg('')
            }
            else {
                setErrorMsg(message);
            }
        } catch (err) {
            console.log('err :', err.message);
            TOAST_ERROR(err.message);
        }
    };

    useEffect(() => {
        dispatch(getCountryList());
    }, []);

    return (
        <div className="signin_modal">
            <CustomModal id="sign-in">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 p-0 order-lg-1 order-2">
                            <div className="signin_card">
                                <h6 className="signin-title">{t("Sign in")}</h6>
                                {errorMsg && <p className="text-danger mt-2">{errorMsg} !</p>}
                                <div className="signin_card-content">
                                    <div className="input_fild mb-3">
                                        {/* <label>Login with</label> */}
                                        <div className="btn-group" role="group">
                                            <button type="button" className="btn" style={{ backgroundColor: loginMethod === "mobile" ? "#0255a3" : "#6c757d" }} onClick={() => handleLoginMethodChange("mobile")}>{t('Mobile')}</button>
                                            <button type="button" className="btn" style={{ backgroundColor: loginMethod === "email" ? "#0255a3" : "#6c757d" }} onClick={() => handleLoginMethodChange("email")}>{t('email')}</button>
                                        </div>
                                    </div>
                                    {loginMethod === "mobile" ? (
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
                                    ) : (
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
                                    )}

                                    <div className="input_fild mb-4">
                                        <label>{t("Password")}</label>
                                        <div className="password">
                                            <input
                                                // {...register("password", {
                                                //     required: t("Please enter Password"),
                                                //     pattern: {
                                                //         value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,16}$/,
                                                //         message: t("Password must contain at least 8 characters"),
                                                //     },
                                                // })}
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
                                        <a className="forgot_btn" style={{ cursor: "pointer" }} onClick={handleForgotShow}>{t("Forgot Password")}</a>
                                    </div>

                                    <button className="btn blue_btn w-100">{t("Sign In")}</button>
                                    <h6 className="sign-up">{t("Dont have an account")}
                                        <a className="Primary-Blue" style={{ cursor: "pointer" }} onClick={handleSignUpClick}>{t("Sign Up")}</a></h6>
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
    );
}

export default SignInModal;