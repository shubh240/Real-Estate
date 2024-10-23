import { useEffect, useState } from "react";
import CustomModal from "../../component/CustomModal";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { PUBLICURL, TOAST_ERROR, TOAST_SUCCESS, TOAST_WARNING } from "../../utils/common.service";
import * as API from "../../utils/api.service";
import { setModalStatus } from "../../store/slice/masterSlice";
import { useTranslation } from "react-i18next";

const EditProfileByOtpModal = () => {
    const { isModalOpen } = useSelector((state) => state.master);
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const [showTimer, setShowTimer] = useState(true);
    const [timerSeconds, setTimerSeconds] = useState(60);
    const { register, handleSubmit, formState: { errors }, clearErrors } = useForm();
    const [sentOtp, setSentOtp] = useState(isModalOpen?.data?.otp);
    const [loading, setLoading] = useState(false);
    const onSubmit = async (body) => {
        try {
            // dispatch(setLoader(true));
            const enteredOtp = Object.values(body).join("");

            let requestBody = {
                user_id: isModalOpen?.data?.user_id,
                country_code_id: isModalOpen?.data?.country_code_id,
                mobile_number: isModalOpen?.data?.mobile_number,
                otp: String(sentOtp),
                first_name: isModalOpen?.data?.first_name,
                last_name: isModalOpen?.data?.last_name,
                email: isModalOpen?.data?.email,
                profile_image: isModalOpen?.data?.profile_image,
                dob: isModalOpen?.data?.dob,
                address: isModalOpen?.data?.address,
                // device_name: isModalOpen?.data?.device_name,
                // device_token: isModalOpen?.data?.device_token,
                // device_type: isModalOpen?.data?.device_type,
                // app_version: isModalOpen?.data?.app_version,
                // os_version: isModalOpen?.data?.os_version,
            }

            if (enteredOtp == requestBody?.otp) {
                setLoading(true);
                const { code, data, message } = await API.editProfileByOtpApi(requestBody);
                setLoading(false);
                if (code == 1) {
                    TOAST_SUCCESS(message);
                    dispatch(setModalStatus({ modalType: "", isOpen: false, data: null }));
                }
                // console.log(code, data, message, "ahaalhl");
                // dispatch(setLoader(false));
                // if (code === '1') {
                //     Cookies.set('isLoginCA', true, { expires: 2 });
                //     Cookies.set('tokenCA', data.token, { expires: 2 });
                //     
                //     setProfileData(data)
                //     dispatch(setModalStatus({ modalType: COMPLETE_PROFILE_MODAL, isOpen: true, data }));
                // }
            }
            else {
                setLoading(false);
                TOAST_WARNING(t("Incorrect OTP"))
            };
        } catch (error) {
            setLoading(false);
        }

    }
    const handleChange = (e, index) => {
        if (e.target.value.length === 1 && index < 4) {
            document.getElementById(`digit${index + 1}`).focus();
            clearErrors(`digit${index}`);
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.keyCode === 8 && index > 1 && e.target.value === "") {
            document.getElementById(`digit${index - 1}`).focus();
        }
    };

    const resendOtp = async () => {
        setTimerSeconds(60);
        try {
            setTimerSeconds(60);
            let requestBody = {
                email: isModalOpen?.data?.email,
            }
            let { data, code, message } = await API.resendOtpApi(requestBody);
            requestBody.otp = data.otp
            if (code === '1') {
                setSentOtp(data.otp);
                TOAST_SUCCESS(message);
            }
        } catch (err) {
            TOAST_ERROR(err.message);
        }
    }

    const handleResend = () => {
        setShowTimer(true);
        resendOtp();
    };

    useEffect(() => {
        let timerInterval;
        if (isModalOpen.modalType === 'EDIT_PROFILE_BY_OTP_MODAL') {
            timerInterval = setInterval(() => {
                setTimerSeconds((prevSeconds) => prevSeconds - 1);
            }, 1000);
        } else {
            clearInterval(timerInterval);
            setTimerSeconds(60);
            setShowTimer(true);
        }

        return () => clearInterval(timerInterval);
    }, [isModalOpen.modalType === 'EDIT_PROFILE_BY_OTP_MODAL']);

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
                                <p className="verify">{("Enter the 4 digit code")} <br /> <span>{isModalOpen?.data?.email}</span></p>
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
                                            />
                                        ))}
                                    </div>
                                    {Object.keys(errors).length > 0 && (
                                        <p role="alert" className="text-danger">
                                            {errors[Object.keys(errors)[0]]?.message}
                                        </p>
                                    )}
                                    <Button variant="primary" type="submit" className="btn blue_btn w-100" disabled={loading}>
                                        {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : 'Verify'}
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
                                <h2 className="experience_txt">{("Experience luxury living")}</h2>
                            </div>
                        </div>
                    </div>
                </Form>
            </CustomModal >
        </div>

    )
}
export default EditProfileByOtpModal;