import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getResourceListApiCall } from "../../store/slice/resourceSlice";
import CustomModal from "../CustomModal";
import { setLoader, setModalStatus } from "../../store/slice/masterSlice";
import { Resources_Modal, SEARCH_DELAY } from "../../app.config";
import Cookies from 'js-cookie';
import { PUBLICURL } from "../../utils/common.service";
import Pagination from "../Pagination";
import useDebounce from "../../hooks/useDebounce";
import { useTranslation } from "react-i18next";

const Resources = () => {
    const dispatch = useDispatch();
    const { resourceList: { data: resourceList } } = useSelector((state) => state.resource);
    const { t } = useTranslation();
    const { isModalOpen } = useSelector((state) => state.master);
    const [selectedResource, setSelectedResource] = useState(null);
    const [page, setPage] = useState(1);
    const [fieldSort, setFieldSort] = useState('id desc');
    const [ascSort, setAscSort] = useState(false);
    const [sortColumn, setSortColumn] = useState("id");
    const [search, setSearch] = useState("");
    const debounce = useDebounce(search, SEARCH_DELAY);
    const handlePageChange = (newPage) => { setPage(newPage); };

    useEffect(() => {
        handleResourceAPI();
    }, [page, debounce, fieldSort]);

    const handleResourceAPI = () => {
        dispatch(setLoader(true));
        let submitData = {
            search: debounce,
            page: page,
            fieldSort
        }
        dispatch(getResourceListApiCall(submitData));
        dispatch(setLoader(false));
    };

    const handleResourceClick = (resource) => {
        setSelectedResource(resource);
        dispatch(setModalStatus({ modalType: Resources_Modal, isOpen: true, data: [] }));
    };

    const language = Cookies.get('language') || 'en';

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="page_wrepper">
            <section className="favorite-view_sec px-80">
                <div className="fav_view">
                    <h2>{t("Resource")}</h2>
                </div>
            </section>
            <section className="resources_sec px-80 pb-100">
                <div className="container-fluid">
                    <div className="row">
                        {
                            resourceList && resourceList.map((resource, index) => (
                                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12" key={index}>
                                    <a onClick={() => handleResourceClick(resource)} style={{ cursor: "pointer" }}>
                                        <div className="notifaction justify-content-between">
                                            <div className="d-flex gap-2">
                                                <div className="notifaction_content">
                                                    <h6>{resource?.title}</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>

            {isModalOpen && selectedResource && (
                <div className="signin_modal">
                    <CustomModal id="resource-details" setSelectedResource={setSelectedResource}>
                        {/* <form> */}
                        <div className="row">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 p-0 order-lg-1 order-2">
                                <div className="signin_card">
                                    <h6
                                        className="signin-title"
                                        style={{ textAlign: 'center', marginBottom: '1rem' }}
                                    >
                                        {t("Resource Details")}
                                    </h6>
                                    <div
                                        className="signin_card-content"
                                        style={{
                                            wordWrap: 'break-word',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            maxWidth: '100%',
                                            whiteSpace: 'normal'
                                        }}
                                    >
                                        <h5>{t("Title")}: {selectedResource.title}</h5>
                                        <div className="mt-3"
                                            dangerouslySetInnerHTML={{ __html: language === 'French' ? selectedResource.french_content : selectedResource.eng_content }}>
                                            {/* {language === 'French' ? selectedResource.french_content : selectedResource.eng_content} */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* </form> */}
                    </CustomModal>
                </div>

            )}
            <Pagination
                per_page={resourceList[0]?.per_page_sixty}
                pageCount={resourceList[0]?.count}
                onPageChange={handlePageChange}
                page={page}
                lableName={t(`Resource`)}
            />
        </main>
    );
}

export default Resources;
