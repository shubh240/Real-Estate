import { PUBLICURL, TOAST_ERROR, TOAST_SUCCESS } from "../../utils/common.service"
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../index.css';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getAdvertiseListApiCall } from "../../store/slice/masterSlice";
import * as API from "../../utils/api.service";
import Swal from 'sweetalert2';
import withReactContent from "sweetalert2-react-content";
import Pagination from "../Pagination";

const PropertyAdvertisement = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const MySwal = withReactContent(Swal);
    const { advertiseList: { data: advertiseList } } = useSelector((state) => state.master);

    const [page, setPage] = useState(1);
    const handlePageChange = (newPage) => { setPage(newPage); };
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };

    const handleDelete = async (advertise_id) => {
        try {
            let body = {
                advertise_id,
                is_deleted: '1'
            }
            let { code, message, data } = await API.deletePropertyAdvertiseApi(body);
            if (code == 1) {
                TOAST_SUCCESS(message);
                dispatch(getAdvertiseListApiCall({ page }));
            }
        } catch (error) {
            TOAST_ERROR(error.message)
        }

    }

    const confirmDelete = (advertise_id) => {
        MySwal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                handleDelete(advertise_id);
                MySwal.fire(
                    'Deleted!',
                    'Your Property Advertisement has been deleted.',
                    'success'
                );
            }
        });
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(getAdvertiseListApiCall({ page }));
    }, [page]);

    return (

        <main className="page_wrepper">
            <section className="favorite-view_sec px-80">
                <div className="fav_view">
                    <div className="row align-items-end">
                        <div className="col-xl-10 col-lg-8 col-md-12 col-sm-12 col-12">
                            <h2>{t("Property_Advertisement")}</h2>
                            <p>{t("Attract buyers or renters easily with simple")}.</p>
                        </div>
                        <div className="col-xl-2 col-lg-4 col-md-12 col-sm-12 col-12">
                            <div className="serch_box p-0">
                                <a className="btn blue_btn" onClick={() => navigate('/boyo-realestate/advertise-your-property')}>{t("Create Advertisements")}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="place_sec px-80 pb-100 mb-400">
                <div className="container-fluid">
                    {
                        advertiseList.length > 0 &&
                        <div className="row">
                            <div className="col-12 d-flex align-items-baseline justify-content-between realeast_headline">
                                <h2 className="headline_txt fs-24">{advertiseList.length > 0 ? advertiseList[0]?.advertise_count : ''} properties added in advertisement list</h2>
                            </div>
                        </div>
                    }
                    <div className="row align-items-center">
                        {
                            advertiseList && advertiseList.length > 0 ?
                                advertiseList?.map((e) =>
                                    <div className="col-xl-6 col-lg-12 col-md-6 col-sm-12 ">
                                        <div className="card flexr_box_card">
                                            <div className="row">
                                                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                                    <div className="place_imges place_slider">
                                                        {e?.images?.length === 1 ? (
                                                            <div>
                                                                <img src={e?.images[0]} className="card-img-top" alt="place" />
                                                            </div>
                                                        ) : e?.images?.length > 1 ? (
                                                            <Slider {...settings}>
                                                                {e?.images?.slice(0, 4).map((image, index) => (
                                                                    <div key={index}>
                                                                        <img height={50} width={50} src={image} className="card-img-top" alt="place" />
                                                                    </div>
                                                                ))}
                                                            </Slider>
                                                        ) : null}
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 ">
                                                    <div className="card-body">
                                                        <a className="btn blue_btn px-2 py-0">{e?.property_type}</a>
                                                        <h5 className="card-title mt-2">{e?.property_name}</h5>
                                                        {
                                                            e?.address &&
                                                            <p className="card-text"><img src={PUBLICURL + "/assets/imges/icons/location.svg"} alt="location"
                                                                className="me-1" />

                                                                <span className="Gray">Targeted Location : {e?.address}</span>

                                                            </p>
                                                        }
                                                        <div className="facility_item">
                                                            <div>
                                                                <p>Start on</p>
                                                                <h5>{e?.formatted_start_date}
                                                                </h5>
                                                            </div>
                                                            <div>
                                                                <p>End in</p>
                                                                <h5>{e?.formatted_end_date}
                                                                </h5>
                                                            </div>
                                                        </div>
                                                        <div className="card_footer d-flex justify-content-between align-items-center">
                                                            <div className="card_footer_btn">
                                                                <a className="btn blue_btn" onClick={() => {
                                                                    navigate(`/boyo-realestate/edit-advertise-property`, { state: { addData: e } })
                                                                }}
                                                                ><img
                                                                        src={PUBLICURL + "/assets/imges/icons/edit.svg"} alt="edit"
                                                                        className="me-1" />Edit</a>
                                                                <a onClick={() => confirmDelete(e?.id)}><img src={PUBLICURL + "/assets/imges/icons/delete.svg"} alt="delete"
                                                                    className="heart_btn" /></a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="rent_btn general_btn">
                                                <a href="javascript:void(0)" className="red_btn dark bg-white">
                                                    {e?.options == "Landing Listing" ? "Advertise on Landing Page" : e?.options}
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                )
                                :
                                <h4 className="d-flex justify-content-center align-items-center mt-5">{t("No Advertise Found")}</h4>
                        }

                    </div>
                </div>
            </section>
            {
                advertiseList.length > 0 &&
                <Pagination per_page={advertiseList[0]?.per_page_six} pageCount={advertiseList[0]?.advertise_count} onPageChange={handlePageChange} page={page} lableName={t(`Property Advertise`)} />
            }

        </main>
    )
}

export default PropertyAdvertisement;