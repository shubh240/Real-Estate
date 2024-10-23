import { useNavigate } from "react-router-dom";
import { PUBLICURL } from "../../../utils/common.service";
import { setAgentStatus } from "../../../store/slice/agentSlice";
import { AGENT_MODAL, LENDER_MODAL, SIGN_IN_MODAL } from "../../../app.config";
import { useDispatch } from "react-redux";
import { setLenderStatus } from "../../../store/slice/lenderSlice";
import { useTranslation } from "react-i18next";
import { setModalStatus } from "../../../store/slice/masterSlice";
import Cookies from "js-cookie";

const Footer = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const token = Cookies.get('tokenCA');

    const handleAgentModal = () => {
        token ?
            dispatch(setAgentStatus({
                modalType: AGENT_MODAL,
                isOpen: true,
                data: []
            }))
            :
            dispatch(setModalStatus({ modalType: SIGN_IN_MODAL, isOpen: true, data: [] }))
    }

    const handleLenderModal = () => {
        token ?
            dispatch(setLenderStatus({
                modalType: LENDER_MODAL,
                isOpen: true,
                data: []
            }))
            :
            dispatch(setModalStatus({ modalType: SIGN_IN_MODAL, isOpen: true, data: [] }))
    }
    return (
        <>
            <section className="availability_sec">
                <div className="container">
                    <div className="row justify-content-center align-items-center">
                        <div className="col-xl-7 col-lg-7 col-md-12  col-sm-12 col-12">
                            <ul>
                                <li><a href="javascript:void(0);"><img src={PUBLICURL + "/assets/imges/icons/satisfaction.svg"}
                                    alt="satisfaction" /><span>{t("Satisfaction")} <br />{t("Guarantee")}</span></a>
                                </li>
                                <li><a href="javascript:void(0);"><img src={PUBLICURL + "/assets/imges/icons/clock.svg"}
                                    alt="satisfaction" /><span>{t("24H")}<br />{t("Availability")}
                                    </span></a>
                                </li>
                                <li><a href="javascript:void(0);"><img src={PUBLICURL + "/assets/imges/icons/expert.svg"}
                                    alt="satisfaction" /><span>{t("Expert")}<br />{t("Agent")}</span></a>
                                </li>
                                <li><a href="javascript:void(0);"><img src={PUBLICURL + "/assets/imges/icons/expert.svg"}
                                    alt="satisfaction" /><span>{t("Expert")}
                                        <br />{t("Lender")}</span></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <footer>
                <section className="px-80">
                    <div className="container-fluid">
                        <div className="row pt-2 pt-md-5 ">
                            <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12">
                                <div className="row">
                                    <div className="col-xl-5 col-lg-10 col-md-12 col-sm-12">
                                        <div className="footer_content">
                                            <a href="javascript:void(0);"><img src={PUBLICURL + "/assets/imges/icons/f-logo.svg"}
                                                alt="boyo logo" /></a>
                                            <p>{t("Your Gateway to Dream Homes")}</p>
                                            <p><ul>
                                                <li>
                                                    <i class="fa-duotone fa-solid fa-phone"></i> +1 682 313 9965
                                                </li>
                                                <li className="ms-3">
                                                    +237 654 087 072
                                                </li>
                                            </ul></p>
                                            <div className="sosial_media">
                                                <h6>{t("Follow us on")}</h6>
                                                <div className="social_icons">
                                                    <a href="https://www.facebook.com/people/Bboyo-Real-Estate-LLC/61559798185682/" target="_blank"><img src={PUBLICURL + "/assets/imges/icons/facebook.svg"}
                                                        alt="facebook" /></a>
                                                    <a href="https://www.youtube.com/@bboyo525" target="_blank"><img src={PUBLICURL + "/assets/imges/icons/youtube.svg"}
                                                        alt="youtube" /></a>
                                                    <a href="https://www.instagram.com/bboyorealestate/?igsh=Nm85aWt3azlkMXR6" target="_blank"><img src={PUBLICURL + "/assets/imges/icons/insta.svg"}
                                                        alt="insta" /></a>
                                                    <a href="https://x.com/b_bboyo" target="_blank"><img src={PUBLICURL + "/assets/imges/icons/twiter.svg"}
                                                        alt="twiter" /></a>

                                                    {/* https://x.com/i/flow/login?redirect_after_login=%2Fb_bboyo */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 col-6">
                                <div className="footer-links">
                                    <h5>{t("Company")}</h5>
                                    <ul className="text-left">
                                        {/* <li><a href="javascript:void(0);">Services</a></li> */}
                                        <li><a style={{ cursor: "pointer" }} onClick={() => navigate('/boyo-realestate/resources')}>{t("Resources")}</a></li>
                                        <li>
                                            <a style={{ cursor: "pointer" }} onClick={() => handleAgentModal()}>{t("Become a agent")}
                                            </a>
                                        </li>
                                        <li><a style={{ cursor: "pointer" }} onClick={() => handleLenderModal()}>{t("Become a lender")}</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 col-6">
                                <div className="footer-links">
                                    <h5>{t("Legal")}</h5>
                                    <ul className="text-left">
                                        <li><a style={{ cursor: "pointer" }} onClick={() => navigate('/boyo-realestate/terms-condtions')}>{t("Terms & Condtions")}</a></li>
                                        <li><a style={{ cursor: "pointer" }} onClick={() => navigate('/boyo-realestate/privacy-policy')}>{t("Privacy Policy")}</a></li>
                                        <li><a style={{ cursor: "pointer" }} onClick={() => navigate('/boyo-realestate/about-us')}>{t("About us")}</a></li>
                                        <li><a style={{ cursor: "pointer" }} onClick={() => navigate('/boyo-realestate/help')}>{t("Help")}</a></li>
                                        <li><a style={{ cursor: "pointer" }} onClick={() => navigate('/boyo-realestate/contact-us')}>{t("Contact us")}</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="copy_right text-center">
                    <h5>&#169; {new Date().getFullYear()} {t("BOYO All rights reserved")}</h5>
                </div>
            </footer>


        </>
    )
}

export default Footer;