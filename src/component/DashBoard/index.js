import React, { useEffect, useRef, useState } from "react";
import { PUBLICURL, TOAST_SUCCESS } from "../../utils/common.service";
import { Link, useNavigate, useLocation, useOutletContext } from "react-router-dom";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../index.css';
import { getUserDetails } from "../../store/slice/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { getHomeProperty, getLandingProperty } from "../../store/slice/landingSlice";
import Cookies from "js-cookie";
import { AGENT_MODAL, FCFA_CURRENCY, ITEM_PER_PAGE, LENDER_MODAL, SEARCH_DELAY, SIGN_IN_MODAL } from "../../app.config";
import { getCategoryList, getPropertyList } from "../../store/slice/categorySlice";
import { getAdvertiseListApiCall, getLandingPageAdvertiseApiCall, setLoader, setModalStatus } from "../../store/slice/masterSlice";
import useDebounce from "../../hooks/useDebounce";
import * as API from "../../utils/api.service";
import { useTranslation } from 'react-i18next';
import Caption from "../DashboardLayout/Caption";
import { getFaqList } from "../../store/slice/faqSlice";
import { setAgentStatus } from "../../store/slice/agentSlice";
import { setLenderStatus } from "../../store/slice/lenderSlice";
import { getAgentApiCall, getLenderApiCall } from "../../store/slice/agentLenderSlice";
import { useScrollContext } from "../../scrollProvider";

const Dashboard = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const { landingProperties: { data: landingProperties } } = useSelector((state) => state.landing);
    const { homeProperties: { data: homeProperties } } = useSelector((state) => state.landing);
    const { propertyList: { data: propertyList } } = useSelector((state) => state.category);
    const { advertiseLanding: { data: advertiseLanding } } = useSelector((state) => state.master);
    const { categoryList: { data: categoryList } } = useSelector((state) => state.category);
    const { agentList: { data: agentList } } = useSelector((state) => state.agentLender);
    const { lenderList: { data: lenderList } } = useSelector((state) => state.agentLender);

    const propertiesToShow = Array.isArray(landingProperties) ? landingProperties.slice(0, 8) : [];
    const homePropertiesToShow = Array.isArray(homeProperties) ? homeProperties.slice(0, 8) : [];
    const token = Cookies.get('tokenCA');
    const [search, setSearch] = useState("");
    const [searchProp, setSearchProp] = useState("");
    const debounce = useDebounce(search, SEARCH_DELAY);
    const { selectSearchParams, setAddress,setToken,selectPropCategory, address, selectedStatus, setSelectedStatus } = useOutletContext();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectType, setSelectType] = useState();
    const { faqList: { data: faqList } } = useSelector((state) => state.faq);
    const [openIndex, setOpenIndex] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const language = Cookies.get('language');

    const handleUserClick = (user) => {
        setSelectedUser(user);
    };

    const mobile_number = `${selectedUser?.country_code}-${selectedUser?.mobile_number}`;
    const handleAccordionClick = (index) => {
        setOpenIndex(index === openIndex ? null : index);
    };

    const images = [
        "/assets/imges/banner/banner-1.png",
        "/assets/imges/banner/banner-2.png",
        "/assets/imges/banner/banner-3.png"
    ];

    {/* Slider */ }
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };

    const settingsImages = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3, // Default for larger screens
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: true,
        responsive: [
            {
                breakpoint: 1024, // For tablets and smaller devices
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 768, // For mobile devices
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    };

    { /** Handle Search*/ }
    const handleSearch = () => {
        navigate('/boyo-realestate/list-of-property', { state: searchProp });
    }

    /** Landing Properties without Token */
    const handleLendingListAPI = () => {
        let filters = "";
        if (debounce) filters = `${filters}&search=${debounce}`;
        if (selectType) filters = `${filters}&property_type_id=${selectType}`;
        if (selectedStatus) filters = `${filters}&selectedStatus=${selectedStatus}`;
        // if (address) filters += `${filters}&address=${address}`;
        dispatch(setLoader(true));
        dispatch(getLandingProperty({ page, filters }))
            .finally(() => {
                dispatch(setLoader(false));
            });
    };

    /** Home Properties with Token */
    const handleHomeListAPI = () => {
        let filters = "";
        if (debounce) filters = `${filters}&search=${debounce}`;
        if (selectType) filters = `${filters}&property_type_id=${selectType}`;
        if (selectedStatus) filters = `${filters}&selectedStatus=${selectedStatus}`;
        dispatch(setLoader(true));

        dispatch(getHomeProperty({ page, filters }))
            .finally(() => {
                dispatch(setLoader(false));
            });
    };

    /** For Filter Status */
    const handlePropertyType = (type_id) => {
        setSelectType(type_id)
    }

    /** Select Status */
    const handleSelectStatus = (value) => {
        if (address) {
            navigate(`/boyo-realestate/list-of-property?selectedStatus=${value}&search=${address}`)
        }
        else if (address && selectPropCategory) {
            navigate(`/boyo-realestate/list-of-property?selectedStatus=${value}&property_category_id=${selectPropCategory}&search=${selectSearchParams}`)
        }
        else {
            navigate(`/boyo-realestate/list-of-property?selectedStatus=${value}`)
        }

    }

    /** Proeprty Add Fav */
    const handleFavProperty = async (property_id) => {
        try {
            dispatch(setLoader(true));
            const { code, data, message } = await API.addPropertyFavApi({ property_id });
            if (code == 1) {
                dispatch(setLoader(false));
                TOAST_SUCCESS(message);
                handleHomeListAPI();
            }
        } catch (err) {
            dispatch(setLoader(false));
            TOAST_ERROR(err.message);
        }
    }

    const handleCategoryAPI = () => {
        dispatch(setLoader(true));
        let submitData = {
            page: page
        }
        dispatch(getCategoryList(submitData));
        dispatch(setLoader(false));
    };

    /** without Token */
    useEffect(() => {
        dispatch(getPropertyList());
        dispatch(getLandingPageAdvertiseApiCall({ options: "Landing Listing" }));
        // dispatch(getCategoryList())
        dispatch(getFaqList());
        dispatch(getAgentApiCall());
        dispatch(getLenderApiCall());
    }, []);

    /** Get Property and User Details when Token */
    useEffect(() => {
        if (token) {
            dispatch(getUserDetails());
            if (address == "") {
                handleHomeListAPI();
                localStorage.removeItem('location');
            }
        }
        handleCategoryAPI();
    }, [token, address, selectedStatus, selectType, page, debounce]);


    /** when address is blanck */
    useEffect(() => {
        if (address == '') {
            handleLendingListAPI();
            localStorage.removeItem('location');
        }
    }, [address, selectedStatus, selectType, page, debounce]);

    const addressParts = address?.split(',');
    const country = addressParts && addressParts[5]?.trim();
    const stateAndPostal = addressParts && addressParts[4]?.trim();
    const state = stateAndPostal?.split(' ')[0];

    /** Image change */
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 2000);

        return () => clearInterval(interval);
    }, [images.length]);

    const handleViewAll = () => {
        navigate('/boyo-realestate/list-of-property');
    };

    return (
        <main className="page_wrepper">

            {/* Filter Section  */}
            <section className="banner_sec">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 g-0">
                            <div id="carouselExampleDark" className="carousel slide carousel-fade" data-bs-ride="carousel">
                                <div className="carousel-indicators">
                                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0"
                                        className="active" aria-current="true" aria-label="Slide 1"></button>
                                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1"
                                        aria-label="Slide 2"></button>
                                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2"
                                        aria-label="Slide 3"></button>
                                </div>
                                <div className="carousel-inner">
                                    <div className="carousel-item active" data-bs-interval="1000">
                                        <img src={PUBLICURL + images[currentIndex]} className="d-block w-100" alt="property" />
                                        <Caption
                                            propertyList={propertyList}
                                            handleSearch={handleSearch}
                                            setSearchProp={setSearchProp}
                                            selectedStatus={selectedStatus}
                                            setSelectedStatus={setSelectedStatus}
                                            handleSelectStatus={handleSelectStatus}
                                            handlePropertyType={handlePropertyType}
                                            address={address}
                                            setAddress={setAddress}
                                            setToken={setToken}
                                            selectPropCategory={selectPropCategory}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* { */}
            <div className="container-fluid">
            <div className="row align-items-center justify-content-center p-md-5  pt-2">
                {
                    advertiseLanding?.length === 1 ?
                        advertiseLanding?.length > 0 &&
                        <div key={advertiseLanding[0]?.property_id} className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                            <div className="card_new_slider">
                                <div className="place_imges place_slider">
                                    <div onClick={() => navigate('/boyo-realestate/property-details', { state: { property_id: advertiseLanding[0]?.property_id } })}>
                                        <img src={advertiseLanding[0]?.images[0]} className="card-img-top" alt="place" />
                                    </div>
                                </div>
                                <div className="card-body">

                                    <h6 className="mt-2"><strong>Property Name :</strong>  {advertiseLanding[0]?.property_name}</h6>
                                    {/* <h6 dangerouslySetInnerHTML={{ __html: `<strong>Property Price :</strong> ${FCFA_CURRENCY} ${advertiseLanding[0]?.property_price}` }} /> */}
                                    <h6><strong>Property Location :</strong>{advertiseLanding[0]?.location}</h6>
                                    {
                                        <div className="facility_item">
                                            <h6>Attributes : </h6>
                                            {advertiseLanding[0]?.attributes ?
                                                advertiseLanding[0]?.attributes?.slice(0, 3)?.map((att) => (
                                                    <h6 key={att?.attribute_type}>
                                                        <img src={att?.attribute_image_link} alt="sq" className="me-1" height={20} width={20} />
                                                        {att?.attribute_value}
                                                        <span className="mx-1">{att?.attribute_type}</span>
                                                    </h6>

                                                ))
                                                :
                                                <h6>
                                                    <span className="mx-1">N/A</span>
                                                </h6>
                                            }
                                        </div>
                                    }
                                    {
                                        <div className="facility_item">
                                            <h6>Amenities : </h6>
                                            {advertiseLanding[0]?.amenities ?
                                                advertiseLanding[0]?.amenities?.slice(0, 3)?.map((att) => (
                                                    <h6>
                                                        <img src={att?.amenity_icon_link} alt="sq" className="me-1" height={20} width={20} />
                                                        <span className="mx-1">{att?.amenity_name}</span>
                                                    </h6>
                                                )) :
                                                <h6>
                                                    <span className="mx-1">N/A</span>
                                                </h6>
                                            }
                                        </div>
                                    }
                                    <div className="card_footer d-flex justify-content-between align-items-center">
                                        <span dangerouslySetInnerHTML={{ __html: `${FCFA_CURRENCY} ${advertiseLanding[0]?.property_price.toLocaleString()}` }} />
                                    </div>

                                </div>
                            </div>
                        </div>

                        :
                        <Slider {...settingsImages} className="realeast-banner_cards slider_card slider_gap m-3">
                            {advertiseLanding?.length > 0 && advertiseLanding?.slice(0, 20)?.map((item) =>
                                <div key={item?.property_id} className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                                    <div className="card_new_slider">
                                        <div className="place_imges place_slider">
                                            <div onClick={() => navigate('/boyo-realestate/property-details', { state: { property_id: item?.property_id } })}>
                                                <img src={item?.images[0]} className="card-img-top" alt="place" />
                                            </div>
                                        </div>
                                        <div className="card-body">

                                            <h6 className="mt-2"><strong>Property Name :</strong>  {item?.property_name}</h6>
                                            {/* <h6 dangerouslySetInnerHTML={{ __html: `<strong>Property Price :</strong> ${FCFA_CURRENCY} ${item?.property_price}` }} /> */}
                                            <h6><strong>Property Location :</strong>{item?.location}</h6>
                                            {
                                                <div className="facility_item">
                                                    <h6>Attributes : </h6>
                                                    {item?.attributes ?
                                                        item?.attributes?.slice(0, 3)?.map((att) => (
                                                            <h6 key={att?.attribute_type}>
                                                                <img src={att?.attribute_image_link} alt="sq" className="me-1" height={20} width={20} />
                                                                {att?.attribute_value}
                                                                <span className="mx-1">{att?.attribute_type}</span>
                                                            </h6>
                                                        )) :
                                                        <h6>
                                                            <span className="mx-1">N/A</span>
                                                        </h6>
                                                    }
                                                </div>
                                            }
                                            {
                                                <div className="facility_item">
                                                    <h6>Amenities : </h6>
                                                    {item?.amenities ?
                                                        item?.amenities?.slice(0, 3)?.map((att) => (
                                                            <h6>
                                                                <img src={att?.amenity_icon_link} alt="sq" className="me-1" height={20} width={20} />
                                                                <span className="mx-1">{att?.amenity_name}</span>
                                                            </h6>
                                                        )) :
                                                        <h6>
                                                            <span className="mx-1">N/A</span>
                                                        </h6>
                                                    }
                                                </div>
                                            }
                                            <div className="card_footer d-flex justify-content-between align-items-center">
                                                <span dangerouslySetInnerHTML={{ __html: `${FCFA_CURRENCY} ${item?.property_price.toLocaleString()}` }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                            }
                        </Slider>

                }
            </div>
            </div>


            {/* property listing */}
            <section className="place_sec px-80 pb-100 mt-5">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 d-flex align-items-baseline justify-content-between pb-30 realeast_headline">
                            {
                                (propertiesToShow?.length > 0 || homePropertiesToShow?.length > 0) &&
                                <h2 className="headline_txt"> {t('Top Localities for buying, renting properties')}</h2>
                            }
                            {
                                !token ? propertiesToShow?.length > 0 &&
                                    <a style={{ cursor: "pointer" }} onClick={() => handleViewAll()} className="Viewall sign_in">{t('View_All')}</a> :
                                    homePropertiesToShow?.length > 0 &&
                                    <a style={{ cursor: "pointer" }} onClick={() => handleViewAll()} className="Viewall sign_in">{t('View_All')}</a>
                            }
                        </div>
                    </div>
                    {
                        token ?
                            <div className="row align-items-center">

                                {homePropertiesToShow?.length > 0 ?
                                    homePropertiesToShow?.map((item) =>
                                        <div key={item?.property_id} className="col-xl-3 col-lg-4 col-md-6 col-sm-12 ">
                                            <a onClick={() => navigate('/boyo-realestate/property-details', { state: { property_id: item?.property_id } })}>
                                                <div className="card" >
                                                    <div className="place_imges place_slider" style={{ cursor: "pointer" }}>
                                                        {item?.property_images?.length === 1 ? (
                                                            <div>
                                                                <img src={item?.property_images[0]} className="card-img-top" alt="place" />
                                                            </div>
                                                        ) : item?.property_images?.length > 1 ? (
                                                            <Slider {...settings}>
                                                                {item?.property_images?.slice(0, 4).map((image, index) => (
                                                                    <div key={index}>
                                                                        <img src={image} className="card-img-top" alt="place" />
                                                                    </div>
                                                                ))}
                                                            </Slider>
                                                        ) : null}
                                                    </div>
                                                    <div className="card-body">
                                                        <a className="btn blue_btn px-2 py-0 mt-2"  style={{ cursor: "pointer" }}>{item?.category_name}</a>
                                                        <a onClick={() => navigate('/boyo-realestate/property-details', { state: { property_id: item?.property_id } })} style={{ cursor: "pointer" }}>
                                                            <h5 className="card-title mt-2">{item?.property_name}</h5>
                                                        </a>
                                                        <p className="card-text" onClick={() => navigate('/boyo-realestate/property-details', { state: { property_id: item?.property_id } })} style={{ cursor: "pointer" }}>
                                                            <img src={PUBLICURL + "/assets/imges/icons/location.svg"} alt="location" className="me-1" />
                                                            {item?.location}
                                                        </p>
                                                        <div className="facility_item" onClick={() => navigate('/boyo-realestate/property-details', { state: { property_id: item?.property_id } })} style={{ cursor: "pointer" }}>
                                                            {item?.attribute.map((att) => (
                                                                <h6 key={att?.attribute_type}>
                                                                    <img src={att?.attribute_image_link} height={20} width={20} alt="sq" className="me-1" />
                                                                    {att?.attribute_value}
                                                                    <span className="mx-1">{att?.attribute_type}</span>
                                                                </h6>
                                                            ))}
                                                        </div>
                                                        <div className="card_footer d-flex justify-content-between align-items-center">
                                                            <span dangerouslySetInnerHTML={{ __html: `${FCFA_CURRENCY} ${item?.price.toLocaleString()}` }} />
                                                            <div className="card_footer_btn">
                                                                <a className="btn blue_btn" onClick={() => navigate('/boyo-realestate/property-details', { state: { property_id: item?.property_id } })}>
                                                                    <img src={PUBLICURL + "/assets/imges/icons/user.svg"} alt="user" className="me-1" />
                                                                    {t('Contact')}
                                                                </a>
                                                                <a onClick={() => handleFavProperty(item?.property_id)}>
                                                                    <img
                                                                        src={item?.is_favourite == 1 ?
                                                                            PUBLICURL +
                                                                            "/assets/imges/icons/favorite.svg"
                                                                            :
                                                                            PUBLICURL +
                                                                            "/assets/imges/icons/heart.svg"}
                                                                        alt="heart"
                                                                        className={item?.is_favourite == 1 ? "heart_btn favorite" : "heart_btn"}
                                                                    />
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
                                    ) : <h4 className="d-flex justify-content-center align-items-center mt-5">{t('No_Proeprties_Found')}</h4>
                                }
                            </div>
                            :
                            <div className="row align-items-center">
                                {propertiesToShow?.length > 0 ?
                                    propertiesToShow?.map((item) =>
                                        <div key={item?.property_id} className="col-xl-3 col-lg-4 col-md-6 col-sm-12 ">
                                            <a>
                                                <div className="card" onClick={() => navigate('/boyo-realestate/property-details', { state: { property_id: item?.property_id } })}>
                                                    <div className="place_imges place_slider"  style={{ cursor: "pointer" }}>
                                                        {item?.property_images?.length === 1 ? (
                                                            <div>
                                                                <img src={item?.property_images[0]} className="card-img-top" alt="place" />
                                                            </div>
                                                        ) : item?.property_images?.length > 1 ? (
                                                            <Slider {...settings}>
                                                                {item?.property_images?.slice(0, 4).map((image, index) => (
                                                                    <div key={index}>
                                                                        <img src={image} className="card-img-top" alt="place" />
                                                                    </div>
                                                                ))}
                                                            </Slider>
                                                        ) : null}
                                                    </div>
                                                    <div className="card-body">
                                                        <a className="btn blue_btn px-2 py-0 mt-2" onClick={() => navigate('/boyo-realestate/property-details', { state: { property_id: item?.property_id } })} style={{ cursor: "pointer" }}>{item?.category_name}</a>
                                                        <a onClick={() => navigate('/boyo-realestate/property-details', { state: { property_id: item?.property_id } })} style={{ cursor: "pointer" }}>
                                                            <h5 className="card-title mt-2" >{item?.property_name}</h5>
                                                        </a>
                                                        <p className="card-text" onClick={() => navigate('/boyo-realestate/property-details', { state: { property_id: item?.property_id } })} style={{ cursor: "pointer" }}>
                                                            <img src={PUBLICURL + "/assets/imges/icons/location.svg"} alt="location" className="me-1" />
                                                            {item?.location}
                                                        </p>
                                                        <div className="facility_item" onClick={() => navigate('/boyo-realestate/property-details', { state: { property_id: item?.property_id } })} style={{ cursor: "pointer" }}>
                                                            {item?.attribute.map((att) => (
                                                                <h6 key={att?.attribute_type}>
                                                                    <img src={att?.attribute_image_link} height={20} width={20} alt="sq" className="me-1" />
                                                                    {att?.attribute_value}
                                                                    <span className="mx-1">{att?.attribute_type}</span>
                                                                </h6>
                                                            ))}
                                                        </div>
                                                        <div className="card_footer d-flex justify-content-between align-items-center">
                                                            <span dangerouslySetInnerHTML={{ __html: `${FCFA_CURRENCY} ${item?.price.toLocaleString()}` }} />
                                                            <div className="card_footer_btn">
                                                                <a className="btn blue_btn">
                                                                    <img src={PUBLICURL + "/assets/imges/icons/user.svg"} alt="user" className="me-1" />
                                                                    {t("Contact")}
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="rent_btn">
                                                        <a href="javascript:void(0)" className="red_btn">{t("For")} {item?.status == "sale" ? t('Sell') : t('Rent')}</a>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    ) : <h4 className="d-flex justify-content-center align-items-center mt-5">{t("No_Proeprties_Found")}</h4>
                                }
                            </div>
                    }
                </div>
            </section>

            {/* property category */}
            <section className="Properties_sec px-80 pb-100">
                <div className="container-fluid">
                    <div className="row">
                        {
                            categoryList?.length > 0 &&
                            <div className="col-12 d-flex align-items-baseline justify-content-between pb-30 realeast_headline">
                                <h2 className="headline_txt">{t("Properties_Categories")}</h2>
                                <a style={{ cursor: "pointer" }} onClick={() => navigate('/boyo-realestate/properties-categories')} className="Viewall sign_in">{t("View_All")}</a>
                            </div>
                        }
                    </div>
                    <div className="row align-items-center">
                        {
                            categoryList && categoryList?.slice(0, 8)?.map((category) =>
                                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6  col-12">
                                    <Link
                                        className="nav-link Secondary-Black"
                                        to={{
                                            pathname: '/boyo-realestate/list-of-property',
                                            search: selectedStatus ? `?selectedStatus=${selectedStatus}&property_category_id=${category?.category_id}` :
                                                `?property_category_id=${category?.category_id}`
                                        }}
                                    >
                                        <div className="category_card">
                                            <div className="cetegory_content">
                                                <h6 className="dark">{category?.category_name}</h6>
                                                <p className="dark">{category?.count} {t('Properties')}</p>
                                            </div>
                                            <img src={category?.category_image_link} alt="house" />
                                        </div>
                                    </Link>
                                </div>
                            )
                        }
                    </div>
                </div>
            </section>

            {/* list of agent */}
            <section className="Newton_sec px-80 pb-100">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 d-flex align-items-baseline justify-content-between pb-30 realeast_headline">
                            <div>
                                {
                                    state && country ?
                                        <h2 className="headline_txt">{t("Real_Estate_Agents_in")} {state} ,{country} </h2>
                                        :
                                        <h2 className="headline_txt">{t("Real_Estate_Agents")} </h2>
                                }
                                <p className="difference_txt">{t("A_great_agent_makes_all_the_difference")}</p>
                            </div>
                            <a style={{ cursor: "pointer" }} onClick={() => navigate('/boyo-realestate/agent')} className="Viewall sign_in">{t("View_All")}</a>
                        </div>
                    </div>

                    <div className="row align-items-center">
                        {
                            agentList && agentList?.slice(0, 6)?.map((e) =>
                                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6">
                                    <a href="#user_modal" data-bs-toggle="modal" onClick={() => handleUserClick(e)}>
                                        <div className="newton_card">
                                            <div className="container-box">
                                                <img src={e?.profile_image_link} alt="user" />
                                                <div className="gradient-overlay"></div>
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
                            )
                        }
                    </div>

                </div>
            </section>

            {/* property agent */}
            <section className=" px-80 pb-100">
                <div className="container-fluid">
                    <div className="row justify-content-center align-items-center">
                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 mt-md-0 mt-3">
                            <div className="property_box">
                                <div className="property_banner">
                                    <img src={PUBLICURL + "/assets/imges/banner/pr-6.png"} alt="banner" />
                                </div>

                                <h6>{t("Are_you_interested_to_become_property_agent")}</h6>
                                {
                                    token ?
                                        <a style={{ cursor: "pointer" }} onClick={() => dispatch(setAgentStatus({
                                            modalType: AGENT_MODAL,
                                            isOpen: true,
                                            data: []
                                        }))} className="next_arrow"><i
                                            className="fa-solid fa-arrow-right"></i></a>
                                        :
                                        <a style={{ cursor: "pointer" }} onClick={() => dispatch(setModalStatus({ modalType: SIGN_IN_MODAL, isOpen: true, data: [] }))} className="next_arrow"><i className="fa-solid fa-arrow-right"></i></a>
                                }
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 mt-md-0 mt-3 ">
                            <div className="property_box">
                                <div className="property_banner">
                                    <img src={PUBLICURL + "/assets/imges/banner/pr-7.png"} alt="banner" />
                                </div>
                                <h6>{t("Are_you_interested_to_become_property_lender")}</h6>
                                {
                                    token ?
                                        <a style={{ cursor: "pointer" }} onClick={() => dispatch(setLenderStatus({
                                            modalType: LENDER_MODAL,
                                            isOpen: true,
                                            data: []
                                        }))} className="next_arrow"><i
                                            className="fa-solid fa-arrow-right"></i></a>
                                        :
                                        <a style={{ cursor: "pointer" }} onClick={() => dispatch(setModalStatus({ modalType: SIGN_IN_MODAL, isOpen: true, data: [] }))} className="next_arrow"><i className="fa-solid fa-arrow-right"></i></a>
                                }
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 mt-3 mt-lg-0">
                            <div className="property_box">
                                <div className="property_banner">
                                    <img src={PUBLICURL + "/assets/imges/banner/pr-8.png"} alt="banner" />
                                </div>
                                <h6>{t("Are you interested to Property Advertisement")}</h6>
                                {
                                    token ?
                                        <a style={{ cursor: "pointer" }} onClick={() => navigate('/boyo-realestate/advertise-your-property')} className="next_arrow"><i className="fa-solid fa-arrow-right"></i></a>
                                        :
                                        <a style={{ cursor: "pointer" }} onClick={() => dispatch(setModalStatus({ modalType: SIGN_IN_MODAL, isOpen: true, data: [] }))} className="next_arrow"><i className="fa-solid fa-arrow-right"></i></a>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* list of lenders */}
            <section className="Newton_sec px-80 pb-100">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 d-flex align-items-baseline justify-content-between pb-30 realeast_headline">
                            <div>
                                {
                                    state && country ?
                                        <h2 className="headline_txt">{t("Real_Estate_Lenders_in")} {state} ,{country} </h2>
                                        :
                                        <h2 className="headline_txt">{t("Real_Estate_Lender")} </h2>
                                }
                            </div>
                            <a style={{ cursor: "pointer" }} onClick={() => navigate('/boyo-realestate/lenders')} className="Viewall sign_in">{t("View_All")}</a>
                        </div>
                    </div>
                    <div className="row align-items-center">
                        {
                            lenderList && lenderList?.slice(0, 6)?.map((e) =>
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
                            )
                        }
                    </div>
                </div>
            </section>

            {/* faqs */}
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
                    <div className="row">
                        <div className="col-xl-7 col-lg-6 col-md-12 col-sm-12 col-12 pe-lg-5 ">
                            <div className="faq_content">
                                <div className="accordion" id="accordionPanelsStayOpenExample">
                                    {
                                        faqList?.length > 0 ?
                                            faqList?.slice(0, 5)?.map((e, index) =>
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
                                            : t("No FAQ's Found")
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-5 col-lg-6 col-md-12 col-sm-12 col-12">
                            <div className="faq_img">
                                <img src={PUBLICURL + "/assets/imges/faq3.png"} alt="faq" className="img-fluid faq_one" />
                                <img src={PUBLICURL + "/assets/imges/faq4.png"} alt="faq" className="img-fluid faq_two" />
                            </div>
                        </div>
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
                                                            <input type="text" className="form-control border-0 ps-0 text-break" value={selectedUser.address} readOnly />
                                                        </div>
                                                        {
                                                            selectedUser?.bio &&
                                                            <div className="input_fild mb-4">
                                                                <label>{t("Bio")}</label>
                                                                <textarea type="text" className="form-control border-0 ps-0" value={selectedUser.bio} readOnly />
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

        </main >
    );
}

export default Dashboard;
