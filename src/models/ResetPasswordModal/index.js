import { useForm } from "react-hook-form";
import CustomModal from "../../component/CustomModal";
import { TOAST_ERROR, TOAST_SUCCESS } from "../../utils/common.service";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModalStatus } from "../../store/slice/masterSlice";
import { SIGN_IN_MODAL } from "../../app.config";
import * as API from "../../utils/api.service";
import { useTranslation } from "react-i18next";

const ResetPasswordModal = () => {
    const { isModalOpen } = useSelector((state) => state.master);
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const [togglePassword, setTogglePassword] = useState(false);
    const [togglePassword1, setTogglePassword1] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        watch,
        getValues,
        formState: { errors },
    } = useForm();


    const onSubmit = async (value) => {

        try {
            const requestBody = {
                user_id: isModalOpen?.data?.user_id,
                new_password: value.password,
                confirm_password: value.cnfpassword
            };
            //   dispatch(setLoader(true));
            const { code, data, message } = await API.resetPasswordApi(requestBody);
            //   dispatch(setLoader(false));
            if (code === '1') {
                TOAST_SUCCESS(message);
                dispatch(setModalStatus({ modalType: SIGN_IN_MODAL, isOpen: true, data:null }));
            }
        } catch (err) {
            //   dispatch(setLoader(false));
            TOAST_ERROR(err.message);
        }
    };

    return (
        <div className="signin_modal">
            <CustomModal>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 p-0 order-lg-1 order-2">
                            <div className="signin_card">
                                <h6 className="signin-title">{t("Reset Password")}</h6>
                                <p className="verify">{t("Your new password must be different from the previous used passwords")}. </p>
                                <div className="signin_card-content">
                                    <div className="input_fild mb-4">
                                        <label>{t("New Password")}
                                        </label>
                                        <div className="password">
                                            <input
                                                {...register("password", {
                                                    required: t("Please enter New Password"),
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
                                                placeholder={t("New password")}
                                            />
                                            <span className="password-hide-show" onClick={() => setTogglePassword(!togglePassword)}>
                                                {togglePassword ? (
                                                    <i className="fa-solid fa-eye" style={{ color: "#74C0FC", marginTop: "5px" }}></i>
                                                ) : (
                                                    <i className="fa-solid fa-eye-slash" style={{ color: "#49657B", marginTop: "5px" }}></i>
                                                )}
                                            </span>
                                            {errors.password && (
                                                <p role="alert" className="text-danger">
                                                    {errors.password?.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="input_fild mb-4">
                                        <label>{t("Confirm Password")}
                                        </label>
                                        <div className="password">
                                            <input
                                                {...register("cnfpassword", {
                                                    required: t("PLease enter Confirm Password"),
                                                    minLength: {
                                                        value: 8,
                                                        message: t("Password must be at least 6 characters"),
                                                    },
                                                    maxLength: {
                                                        value: 16,
                                                        message: t("Password cannot exceed 16 characters"),
                                                    },
                                                    validate: (val) => {
                                                        if (watch('password') != val) {
                                                            return t("Your passwords do no match");
                                                        }
                                                    },
                                                })}
                                                type={togglePassword1 ? "text" : "password"}
                                                className="form-control"
                                                placeholder={t("Confirm password")} />
                                            <span className="password-hide-show" onClick={() => setTogglePassword1(!togglePassword1)}>
                                                {togglePassword1 ? (
                                                    <i className="fa-solid fa-eye" style={{ color: "#74C0FC", marginTop: "5px" }}></i>
                                                ) : (
                                                    <i className="fa-solid fa-eye-slash" style={{ color: "#49657B", marginTop: "5px" }}></i>
                                                )}
                                            </span>
                                            {errors.cnfpassword && (
                                                <p role="alert" className="text-danger">
                                                    {errors.cnfpassword?.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <button type="submit" className="btn blue_btn w-100">{t("Update")}</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 order-lg-2 order-1">
                            <div className="signin_box">
                                <a href="javascript:void(0);" className="bolo_log-img"><img
                                    src="./assets/imges/icons/boyo-logo.svg" alt="boyo" /></a>
                                <h2 className="experience_txt">{t("Experience luxury living")}</h2>

                            </div>
                        </div>
                    </div>
                </form>
            </CustomModal>
        </div>
    )
}

export default ResetPasswordModal;