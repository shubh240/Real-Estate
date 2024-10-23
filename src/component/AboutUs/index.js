import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { TOAST_ERROR } from "../../utils/common.service";
import * as API from "../../utils/api.service";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";

const AboutUs = () => {
    const dispatch = useDispatch();
    const [staticData, setStaticData] = useState(null);
    const { t } = useTranslation();
    const language = Cookies.get('language');
    useEffect(() => {
        const fetchStaticData = async () => {
            try {
                let page_id = 1
                // dispatch(setLoader(true));
                const response = await API.staticPages({ page_id });
                // dispatch(setLoader(false));
                setStaticData(response);
            } catch (error) {
                // dispatch(setLoader(false));
                TOAST_ERROR(error.message);
            }
        };
        fetchStaticData();
    }, []);
    return (

        <main class="page_wrepper">
            <section class="favorite-view_sec px-80">
                <div class="fav_view">
                    <h2>{t("About Us")}</h2>
                    <p>{t("Understand our guidelines and policies clearly with our AboutUs, ensuring transparency andclarity in our interactions.")}</p>
                </div>
            </section>
            <section class="px-80 pb-100">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-12">
                            {staticData ? (
                                <div class="terms_condtions"
                                    dangerouslySetInnerHTML={{ __html: language === "English" ?  staticData.content : staticData.french_content }}
                                />
                            ) : (
                                <h3>{t("No data found")}</h3>
                            )}
                        </div>
                    </div>

                </div>
            </section>
        </main>
    )
}

export default AboutUs;