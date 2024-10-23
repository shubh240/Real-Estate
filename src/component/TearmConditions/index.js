import { useEffect, useState } from "react";
import * as API from "../../utils/api.service";
import { useDispatch } from "react-redux";
import setLoader from "../../store/slice/masterSlice";
import { TOAST_ERROR } from "../../utils/common.service";
import Cookies from "js-cookie";

const TearmConditions = () => {
    const dispatch = useDispatch();
    const [staticData, setStaticData] = useState(null);
    const language = Cookies.get('language');

    useEffect(() => {
        const fetchStaticData = async () => {
            try {
                let page_id = 3
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
                    <h2>Terms & Condtions</h2>
                    <p>Understand our guidelines and policies clearly with our Terms & Conditions, ensuring transparency and
                        clarity in our interactions.</p>
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
                                <h3>No data found</h3>
                            )}
                        </div>
                    </div>

                </div>
            </section>
        </main>
    )
}

export default TearmConditions;