import { useEffect, useState } from "react";
import { PUBLICURL } from "../../utils/common.service";
import { useDispatch, useSelector } from "react-redux";
import { getNotificationListApiCall, setLoader } from "../../store/slice/masterSlice";
import useDebounce from "../../hooks/useDebounce";
import { SEARCH_DELAY } from "../../app.config";
import Pagination from "../Pagination";
import { useTranslation } from "react-i18next";
import moment from 'moment';
const Notification = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation;
    const { notificationsList: { data: notificationsList } } = useSelector((state) => state.master);
    const [search, setSearch] = useState("");
    const debounce = useDebounce(search, SEARCH_DELAY);
    const [page, setPage] = useState(1);
    const [fieldSort, setFieldSort] = useState('id asc');
    const [ascSort, setAscSort] = useState(false);
    const [sortColumn, setSortColumn] = useState("id");
    const handlePageChange = (newPage) => { setPage(newPage) };

    useEffect(() => {
        handleNotificationAPI();
    }, [page, debounce, fieldSort]);

    const handleNotificationAPI = () => {
        dispatch(setLoader(true));
        let submitData = {
            search: debounce,
            page: page,
            fieldSort
        }
        dispatch(getNotificationListApiCall(submitData));
        dispatch(setLoader(false));
    };


    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (

        <main className="page_wrepper">
            <section className="favorite-view_sec px-80">
                <div className="fav_view">
                    <h2>Notifications</h2>
                    <p>Users will receive notifications about property details and messages, as well as admin alerts.</p>
                </div>
            </section>
            <section className="notifaction_sec px-80 mb-50 ">
                <div className="container-fluid">
                    <div className="row">
                        {
                            notificationsList && notificationsList?.length > 0 ?
                                notificationsList?.map((e) =>
                                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                        <div className="notifaction">
                                            <img src={PUBLICURL + "/assets/imges/icons/notifaction.svg"} alt="notifaction" className="notifation_img" />
                                            <div className="notifaction_content">
                                                <h6>{e?.title}</h6>
                                                <p>{e?.message}</p>
                                                <p className="Primary-Blue">{moment(e?.created_at).format('DD-MM-YYYY h:mm:ss a')}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                                :
                                <h4 className="d-flex justify-content-center">No Notification Found</h4>
                        }
                    </div>
                </div>
            </section>
            <Pagination per_page={notificationsList[0]?.per_page_fortine} pageCount={notificationsList[0]?.count} onPageChange={handlePageChange} page={page} lableName={`Notification`} />
        </main>
    )
}

export default Notification;