import { useDispatch, useSelector } from "react-redux";
import { PUBLICURL } from "../../utils/common.service";
import { getFaqList } from "../../store/slice/faqSlice";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Help = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [openIndex, setOpenIndex] = useState(null);
    const { faqList: { data: faqList } } = useSelector((state) => state.faq);
    const { t } = useTranslation();
    const handleAccordionClick = (index) => {
        setOpenIndex(index === openIndex ? null : index);
    };
    const language = Cookies.get('language');

    useEffect(() => {
        dispatch(getFaqList());
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (

        <main className="page_wrepper">
            <section className="favorite-view_sec px-80">
                <div className="fav_view">
                    <h2>{t("Help")}</h2>
                    <p>{t("Easily find answers and assistance in our Help & FAQ section")}</p>
                </div>
            </section>
            <section className="faQ_sec px-80 pb-100">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="faq_headline">
                                <h6>{t("Frequently Asked Questions")}</h6>
                                <p>{t("Still need help")}<a style={{ cursor: "pointer" }} onClick={() => navigate('/boyo-realestate/contact-us')}> {t("Get Help Now")}</a></p>
                            </div>
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-xl-7 col-lg-6 col-md-12 col-sm-12 col-12 pe-lg-5 ">
                            <div className="faq_content" style={{ maxHeight: '550px', overflowY: 'auto' }}>
                                <div className="accordion" id="accordionPanelsStayOpenExample">
                                    {
                                        faqList?.length > 0 ?
                                            faqList?.map((e, index) =>
                                                <div className="accordion-item" key={index}>
                                                    <h2 className="accordion-header">
                                                        <button
                                                            className={`accordion-button ${openIndex === index ? '' : 'collapsed'}`}
                                                            type="button"
                                                            onClick={() => handleAccordionClick(index)}
                                                            aria-expanded={openIndex === index}
                                                            aria-controls={`panelsStayOpen-collapse${index}`}
                                                        >
                                                            {language === "English" ? e?.question : e?.frenchquestion}
                                                        </button>
                                                    </h2>
                                                    <div
                                                        id={`panelsStayOpen-collapse${index}`}
                                                        className={`accordion-collapse collapse ${openIndex === index ? 'show' : ''}`}
                                                    >
                                                        <div className="accordion-body pt-0">
                                                            <p> {language === "English" ? e?.answer : e?.frenchanswer}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                            : <h4 className="d-flex justify-content-center">{t("No FAQ's Found")}</h4>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-5 col-lg-6 col-md-12 col-sm-12 col-12">
                            <div className="faq_img">
                                <img src={PUBLICURL + "/assets/imges/faq3.png"} alt="faq" className="img-fluid faq_one" />
                                <img src={PUBLICURL + "/assets/imges/Young_men_with_background.png"} alt="faq" className="img-fluid faq_two" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Help;