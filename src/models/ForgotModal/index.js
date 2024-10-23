import { useEffect, useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getCountryList, setModalStatus } from '../../store/slice/masterSlice';
import { useForm } from 'react-hook-form';
import { TOAST_ERROR } from '../../utils/common.service';
import * as API from "../../utils/api.service";
import CustomModal from '../../component/CustomModal';
import { FORGOT_OTP_MODAL } from '../../app.config';
import { useTranslation } from 'react-i18next';

const ForgotModal = ({
    showForgotModal,
    ForgotClosed
}) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [loading,setLoading] = useState(false);
    const { countryList: { data: countryList } } = useSelector((state) => state.master);
    const handleKeyPress = (e) => {
        if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
        }
    };
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = async (body) => {
        try {
            let requestBody = {
                email: body.email,
                otp_type: "forgot otp"
            }
            setLoading(true);
            let { data, code, message } = await API.forgotPasswordApi(requestBody);
            setLoading(false);
            data.device_token = '0',
                data.device_name = 'oppo',
                data.device_type = 'W',
                data.os_version = '1.2',
                data.app_version = '1.2'
            if (code == 1) {
                dispatch(setModalStatus({ modalType: FORGOT_OTP_MODAL, isOpen: true, data }));
            }

        } catch (err) {
            setLoading(false);
            console.log(err.message);
        }
    };
    useEffect(() => {
        dispatch(getCountryList());
    }, []);
    return (
        <div className="signin_modal">
            <CustomModal id="sign-in">
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <Col xl={6} lg={6} md={12} sm={12} className="p-0 order-lg-1 order-2">
                            <div className="signin_card">
                                <h6 className="signin-title">{t("We just sent you SMS")}</h6>
                                <p className="verify">{t("We'll send a verification code to your email")}</p>
                                <div className="signin_card-content">
                                    <Form.Group className="mb-4">
                                        <div className="input_fild mb-4">
                                            <label>{t("Email")}
                                            </label>
                                            <input
                                                {...register("email", {
                                                    required: t("Please Enter Email"),
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
                                    </Form.Group>
                                    <button className="btn blue_btn w-100" type="submit" disabled={loading}>
                                        {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : t('Submit')}
                                    </button>
                                </div>
                            </div>
                        </Col>
                        <Col xl={6} lg={6} md={12} sm={12} className="order-lg-2 order-1">
                            <div className="signin_box">
                                <a href="javascript:void(0);" className="bolo_log-img">
                                    <img src="./assets/imges/icons/boyo-logo.svg" alt="boyo" />
                                </a>
                                <h2 className="experience_txt">
                                    {t("Experience luxury living")}
                                </h2>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </CustomModal >
        </div>
    )
}

export default ForgotModal;