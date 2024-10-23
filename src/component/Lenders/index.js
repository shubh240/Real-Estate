import { useDispatch, useSelector } from "react-redux";
import { PUBLICURL } from "../../utils/common.service";
import { useEffect, useState } from "react";
import { getLenderApiCall } from "../../store/slice/agentLenderSlice";
import { setLoader } from "../../store/slice/masterSlice";
import useDebounce from "../../hooks/useDebounce";
import { SEARCH_DELAY } from "../../app.config";
import Pagination from "../Pagination";
import { useTranslation } from "react-i18next";

const Lenders = () => {
    const dispatch = useDispatch();
    const { lenderList: { data: lenderList } } = useSelector((state) => state.agentLender);
    const { t } = useTranslation();
    const [selectedUser, setSelectedUser] = useState(null);
    const [page, setPage] = useState(1);
    const [fieldSort, setFieldSort] = useState('id desc');
    const [ascSort, setAscSort] = useState(false);
    const [sortColumn, setSortColumn] = useState("id");
    const handlePageChange = (newPage) => { setPage(newPage); };
    const [search, setSearch] = useState("");
    const debounce = useDebounce(search, SEARCH_DELAY);

    const handleUserClick = (user) => {
        setSelectedUser(user);
    };
    const mobile_number = `${selectedUser?.country_code}-${selectedUser?.mobile_number}`

    useEffect(() => {
        handleLenderAPI();
    }, [page, debounce, fieldSort]);

    const handleLenderAPI = () => {
        dispatch(setLoader(true));
        let submitData = {
            search: debounce,
            page: page,
            fieldSort
        }
        dispatch(getLenderApiCall(submitData));
        dispatch(setLoader(false));
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (

        <main className="page_wrepper">
            <section className="favorite-view_sec px-80">
                <div className="fav_view">
                    <h2>{t("Lenders")}</h2>
                    <p>{t("discuss your property needs and preferences")}.</p>
                </div>
            </section>
            <section className="Newton_sec px-80 pb-100">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 d-flex align-items-baseline justify-content-between pb-30 realeast_headline">
                            <h2 className="headline_txt fs-24">{t("Real_Estate_Lender")}</h2>
                            <input
                                type="text"
                                name=""
                                className="mt-3 p-2 form-control w-25"
                                id=""
                                style={{ borderRadius: "5px" }}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder={t("Search by lender name or location")}
                            />
                        </div>
                    </div>
                    <div className="row align-items-center">
                        {
                            lenderList && lenderList.length > 0 ? lenderList?.map((e) =>
                                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6">
                                    <a href="#user_modal" data-bs-toggle="modal" onClick={() => handleUserClick(e)}>
                                        <div className="newton_card">
                                            <div className="container-box">
                                                <img src={e?.profile_image_link} alt="user" />
                                                <div className="gradient-overlay" ></div>
                                            </div>
                                            <div className="newton_content">
                                                <a>
                                                    <h6 className="white mb-2">{e.name}</h6>
                                                </a>
                                                <p className="white text-truncate">{e?.address}</p>
                                                <a className="btn blue_btn" href="javascript:void(0)"><img src={PUBLICURL + "/assets/imges/icons/user.svg"}
                                                    alt="user" className="me-2" />{t("Contact")}</a>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            ) :
                                <h4 className="d-flex justify-content-center align-items-center mt-5">{t("No_Lenders_Found")}</h4>
                        }
                    </div>
                </div>
            </section>

            <div className="signin_modal">
                <div className="modal fade" id="user_modal" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content">
                            <button type="button" className="btn-close position-absolute top-0 end-0 m-3" data-bs-dismiss="modal" aria-label="Close"></button>
                            <div className="modal-body">
                                {selectedUser && (
                                    <form action="#">
                                        <div className="row">
                                            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 p-0">
                                                <div className="img-user">
                                                    <img src={selectedUser.profile_image_link} alt="user" className="img-fluid" />
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                                <div className="signin_card">
                                                    <h6 className="signin-title">
                                                        {t("About")} {selectedUser.name}
                                                    </h6>
                                                    <p className="verify">{selectedUser.description}</p>
                                                    <div className="signin_card-content">
                                                        <div className="input_fild mb-4">
                                                            <label>{t("Email")}</label>
                                                            <input type="email" className="form-control border-0 ps-0" value={selectedUser.email} readOnly />
                                                        </div>
                                                        <div className="input_fild mb-4">
                                                            <label>{t("Phone Number")}</label>
                                                            <input type="text" className="form-control border-0 ps-0" value={mobile_number} readOnly />
                                                        </div>
                                                        <div className="input_fild mb-4">
                                                            <label>{t("Location")}</label>
                                                            <textarea type="text" className="form-control border-0 ps-0 text-break" value={selectedUser.address} readOnly />
                                                        </div>
                                                        {
                                                            selectedUser?.bio &&
                                                            <div className="input_fild mb-4">
                                                                <label>{t("Bio")}</label>
                                                                <textarea type="text" className="form-control border-0 ps-0 text-break" value={selectedUser.bio} readOnly />
                                                            </div>
                                                        }
                                                        <div>
                                                            <a className="btn blue_btn w-100" href="javascript:void(0)">
                                                                <img src={PUBLICURL + "/assets/imges/icons/user.svg"} alt="user" className="me-1" />
                                                                {t("Contact")}
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                lenderList.length > 0 && lenderList[0]?.per_page < lenderList[0]?.lender_count &&
                    <Pagination per_page={lenderList[0]?.per_page} pageCount={lenderList[0]?.lender_count} onPageChange={handlePageChange} page={page} lableName={t(`Lenders`)} /> 

            }
        </main>
    )
}

export default Lenders;