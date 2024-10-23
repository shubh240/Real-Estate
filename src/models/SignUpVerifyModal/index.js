import { useEffect, useState } from "react";
import { Button, Form, FormControl, FormGroup, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import CompleteProfile from "../ProfileModal";
import { PUBLICURL, TOAST_ERROR, TOAST_SUCCESS, TOAST_WARNING } from "../../utils/common.service";
import * as API from "../../utils/api.service"
import Cookies from "js-cookie";
import SignInModal from "../SignInModal";
import CustomModal from "../../component/CustomModal";
import { useDispatch, useSelector } from "react-redux";
import { setLoader, setModalStatus } from "../../store/slice/masterSlice";
import { COMPLETE_PROFILE_MODAL, OTP_VERIFICATION_MODAL } from "../../app.config";
import { useTranslation } from "react-i18next";

const SignUpVerifyModal = () => {
    const dispatch = useDispatch();
    const [showTimer, setShowTimer] = useState(true);
    const [timerSeconds, setTimerSeconds] = useState(60);
    const { isModalOpen } = useSelector((state) => state.master);
    const { register, handleSubmit, setValue, formState: { errors }, clearErrors, setError } = useForm();
    const [otp, setOtp] = useState({ digit1: '', digit2: '', digit3: '', digit4: '' });
    const [sentOtp, setSentOtp] = useState(isModalOpen?.data?.requestBody?.otp);
    let bodydata = isModalOpen?.data?.requestBody;
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();
    const onSubmit = async (body) => {
        try {
            dispatch(setLoader(true));
            const enteredOtp = Object.values(body).join("");
            let requestBody = {
                app_version: bodydata?.app_version,
                country_code_id: bodydata?.country_code_id,
                device_name: bodydata?.device_name,
                device_token: bodydata?.device_token,
                device_type: bodydata?.device_type,
                mobile_number: bodydata?.mobile_number,
                email: bodydata?.email,
                os_version: bodydata?.os_version,
                otp: sentOtp,
                otp_type: bodydata?.otp_type,
                password: bodydata?.password,
                user_id: bodydata?.user_id
            }
            if (enteredOtp == sentOtp) {
                setLoading(true);
                const { code, data, message } = await API.signupApi(requestBody);
                setLoading(false);
                dispatch(setLoader(false));
                if (code === '1') {
                    Cookies.set('isLoginCA', true, { expires: 2 });
                    Cookies.set('tokenCA', data.token, { expires: 2 });
                    TOAST_SUCCESS(message);
                    dispatch(setModalStatus({ modalType: COMPLETE_PROFILE_MODAL, isOpen: true, data }));
                }
            }
            else TOAST_WARNING(t("Incorrect OTP"));
        } catch (error) {
            setLoading(false);
            dispatch(setLoader(false));
        }
    };

    const handleChange = (e, index) => {
        const { value } = e.target;
        const key = `digit${index}`;
        setOtp((prev) => ({ ...prev, [key]: value }));

        // Move focus to next input box if current input is valid and not the last digit
        if (/^[0-9]{1,4}$/.test(value) && index < 4) {
            const nextInput = document.getElementById(`digit${index + 1}`);
            if (nextInput) {
                nextInput.focus();
            }
        }

        // Clear error if all inputs are valid
        if (/^[0-9]{1,4}$/.test(value)) {
            clearErrors(key);
            if (Object.values(otp).every((digit) => /^[0-9]{1,4}$/.test(digit))) {
                clearErrors();
            }
        } else {
            setError(key, {
                type: "pattern",
                message: "4 digits OTP is required"
            });
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.keyCode === 8 && index > 1 && e.target.value === "") {
            document.getElementById(`digit${index - 1}`).focus();
        }
    };

    const handleKeyPress = (e) => {
        if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
        }
    };

    const handleInput = (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
        clearErrors
    };

    const clearOtpInputs = () => {
        for (let i = 1; i <= 4; i++) {
            document.getElementById(`digit${i}`).value = "";
        }
    };

    const resendOtp = async () => {
        setTimerSeconds(60);
        try {
            setTimerSeconds(60);
            let requestBody = {
                email: isModalOpen?.data?.requestBody?.email
            }
            let { data, code, message } = await API.resendOtpApi(requestBody);
            requestBody.otp = data.otp
            if (code === '1') {
                TOAST_SUCCESS(message);
                setSentOtp(data.otp)
            }
        } catch (err) {
            TOAST_ERROR(err.message);
        }
    }

    const handleResend = () => {
        setShowTimer(true);
        clearOtpInputs();
        resendOtp();
    };

    useEffect(() => {
        let timerInterval;
        if (isModalOpen.modalType === 'OTP_VERIFICATION_MODAL') {
            timerInterval = setInterval(() => {
                setTimerSeconds((prevSeconds) => prevSeconds - 1);
            }, 1000);
        } else {
            clearInterval(timerInterval);
            setTimerSeconds(60);
            setShowTimer(true);
        }

        return () => clearInterval(timerInterval);
    }, [isModalOpen.modalType === 'OTP_VERIFICATION_MODAL']);

    useEffect(() => {
        if (timerSeconds <= 0) {
            setShowTimer(false);
        }
    }, [timerSeconds]);

    return (
        <div className="signin_modal">
            <CustomModal id="sign-in">
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 p-0 order-lg-1 order-2">
                            <div className="signin_card">
                                <h6 className="signin-title">{t("Otp Verification")}</h6>
                                <p className="verify">{t("Enter the 4 digit")} <br /> <span>{isModalOpen?.data?.requestBody?.email}</span></p>
                                <div className="signin_card-content">
                                    <div className="verify-code">
                                        {[1, 2, 3, 4].map((index) => (
                                            <input
                                                key={index}
                                                {...register(`digit${index}`, {
                                                    required: t("4 digit OTP required"),
                                                    pattern: {
                                                        value: /^[0-9]$/,
                                                        message: t("Invalid OTP"),
                                                    },
                                                })}
                                                aria-invalid={errors[`digit${index}`] ? "true" : "false"}
                                                className="form-control"
                                                type="text"
                                                id={`digit${index}`}
                                                maxLength="1"
                                                onChange={(e) => handleChange(e, index)}
                                                onKeyDown={(e) => handleKeyDown(e, index)}
                                                onKeyPress={handleKeyPress}
                                                onInput={handleInput}
                                            />
                                        ))}
                                    </div>
                                    {Object.keys(errors).length > 0 && (
                                        <p role="alert" className="text-danger">
                                            {errors[Object.keys(errors)[0]]?.message}
                                        </p>
                                    )}
                                    <Button variant="primary" type="submit" className="btn blue_btn w-100" disabled={loading}>
                                        {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : t('Verify')}
                                    </Button>
                                    {showTimer && (
                                        <p className="receive"><span style={{ color: '#007bff' }}>(00:{timerSeconds < 10 ? `0${timerSeconds}` : timerSeconds})</span></p>
                                    )}
                                    {!showTimer && (
                                        <p className="receive">{t("I didnt receive a code")} <a onClick={handleResend} style={{ color: '#007bff', cursor: 'pointer' }}>{t("Resend")}</a></p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 order-lg-2 order-1">
                            <div className="signin_box">
                                <a href="javascript:void(0);" className="bolo_log-img"><img src={PUBLICURL + "/assets/imges/icons/boyo-logo.svg"} alt="boyo" /></a>
                                <h2 className="experience_txt">{t("Experience luxury living")}</h2>
                            </div>
                        </div>
                    </div>
                </Form>
            </CustomModal >
        </div>
    )
}


export default SignUpVerifyModal;