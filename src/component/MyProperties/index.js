import { useNavigate } from "react-router-dom"
import { PUBLICURL, TOAST_ERROR, TOAST_SUCCESS } from "../../utils/common.service";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../index.css';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProperty } from "../../store/slice/myPropertySlice";
import * as API from "../../utils/api.service";
import { setModalStatus } from "../../store/slice/masterSlice";
import { FCFA_CURRENCY, PROPERTIES_AMENITES_MODAL, PROPERTIES_ATTRIBUTE_MODAL } from "../../app.config";
import { setAmenityStatus } from "../../store/slice/amenitiyModalSlice";
import Pagination from "../Pagination";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useTranslation } from "react-i18next";

const MyProperties = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const MySwal = withReactContent(Swal);
    const { t } = useTranslation();
    const { properties: { data: properties } } = useSelector((state) => state.myProperty);
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

    const handleDelete = async (property_id) => {
        try {
            let { code, message, data } = await API.deleteMyPropertyApi({ property_id });
            if (code == 1) {
                // TOAST_SUCCESS(message);
                dispatch(getProperty({ page }));
            }
        } catch (error) {
            TOAST_ERROR(error.message)
        }

    }

    const confirmDelete = (propertyId) => {
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
                handleDelete(propertyId);
                MySwal.fire(
                    'Deleted!',
                    'Your Property has been deleted.',
                    'success'
                );
            }
        });
    };

    useEffect(() => {
        dispatch(getProperty({ page }));
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (

        <main className="page_wrepper">
            <section className="favorite-view_sec px-80">
                <div className="fav_view">
                    <h2>{t("My Properties")}</h2>
                    <p>{t("Track and manage your properties effortlessly")}.</p>
                </div>
            </section>
            <section className="place_sec px-80 pb-100 mb-400">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 d-flex align-items-baseline justify-content-between realeast_headline">
                            <h2 className="headline_txt fs-24">
                                {properties && properties[0]?.property_count == undefined || properties[0]?.property_count == "" || properties[0]?.property_count == null ? <></> : properties[0]?.property_count + t(` properties added in My Properties`)}
                            </h2>
                        </div>
                    </div>
                    <div className="row align-items-center">
                        {Array.isArray(properties) && properties?.length > 0 ? (
                            properties?.map((item) => (
                                <div key={item?.property_id} className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                                    <a>
                                        <div className="card">
                                            <div className="place_imges place_slider">
                                                {item?.property_images?.length === 1 ? (
                                                    <div onClick={() => navigate('/boyo-realestate/my-property-details', { state: item?.property_id })}>
                                                        <img src={item?.property_images[0]?.property_images} className="card-img-top" alt="place" />
                                                    </div>
                                                ) : item?.property_images?.length > 1 ? (
                                                    <Slider {...settings}>
                                                        {item?.property_images?.slice(0, 4).map((image, index) => (
                                                            <div key={index} onClick={() => navigate('/boyo-realestate/my-property-details', { state: item?.property_id })}>
                                                                <img src={image?.property_images} className="card-img-top" alt="place" />
                                                            </div>
                                                        ))}
                                                    </Slider>
                                                ) : null}
                                            </div>
                                            <div className="card-body">
                                                <a className="btn blue_btn px-2 py-0">{item?.category_name}</a>
                                                <a>
                                                    <h5 className="card-title mt-2">{item?.property_name}.</h5>
                                                </a>
                                                <p className="card-text">
                                                    <img src={`${PUBLICURL}/assets/imges/icons/location.svg`} alt="location" className="me-1" />
                                                    {item?.location}
                                                </p>
                                                <div className="facility_item">
                                                    {item?.attribute.map((att) => (
                                                        <h6 key={att?.attribute_type}>
                                                            <img src={att?.attribute_image_link} height={20} width={20} alt="sq" className="me-1" />
                                                            {att?.attribute_value}
                                                            <span className="mx-1">{att?.attribute_type}</span>
                                                        </h6>
                                                    ))}
                                                </div>
                                                <div className="card_footer d-flex justify-content-between align-items-center">
                                                    <span dangerouslySetInnerHTML={{ __html: `${FCFA_CURRENCY} ${item?.price?.toLocaleString()}` }} />
                                                    <div className="card_footer_btn">
                                                        <a className="btn blue_btn" onClick={() => {
                                                            navigate(`/boyo-realestate/edit-my-properties/${item?.property_id}`, { state: item }),
                                                                dispatch(setModalStatus({ modalType: PROPERTIES_ATTRIBUTE_MODAL, isOpen: false, data: item?.attribute })),
                                                                dispatch(setAmenityStatus({ modalType: PROPERTIES_AMENITES_MODAL, isOpen: false, data: item?.amenities }))
                                                        }}>
                                                            <img src={`${PUBLICURL}/assets/imges/icons/edit.svg`} alt="edit" className="me-1" />
                                                            {t("Edit")}
                                                        </a>
                                                        <a onClick={() => confirmDelete(item?.property_id)}>
                                                            <img src={`${PUBLICURL}/assets/imges/icons/delete.svg`} alt="delete" className="heart_btn" />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="rent_btn d-flex justify-content-between">
                                                <a href="javascript:void(0)" className="red_btn">{t("For")} {item?.status === "sale" ? t('Sell') : t('Rent')}</a>
                                                {
                                                    item?.ads &&
                                                    <a href="javascript:void(0)" className="red_btn ml-auto">ads</a>
                                                }
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            ))
                        ) : (
                            <>
                                <h4 className="d-flex justify-content-center align-items-center mt-5">{t("No Properties Found")}</h4>
                                {/* <p className="d-flex justify-content-center align-items-center mt-3 text-primary">{t("If the admin approves your property")}.</p> */}
                            </>
                        )}
                    </div>
                </div>
            </section>
            {
                properties.length > 0 &&
                <Pagination per_page={properties[0]?.per_page} pageCount={properties[0]?.property_count} onPageChange={handlePageChange} page={page} lableName={t(`Property`)} />
            }

        </main >
    )
}

export default MyProperties;