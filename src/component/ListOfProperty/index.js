import { redirect, useLocation, useNavigate, useOutletContext, useParams, useSearchParams } from "react-router-dom";
import { PUBLICURL, TOAST_ERROR, TOAST_SUCCESS } from "../../utils/common.service";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../index.css';
import { useDispatch, useSelector } from "react-redux";
import { getHomeProperty, getLandingProperty } from "../../store/slice/landingSlice";
import { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import { FCFA_CURRENCY, ITEM_PER_PAGE, SEARCH_DELAY, SIGN_IN_MODAL } from "../../app.config";
import { getLandingPageAdvertiseApiCall, setLoader, setModalStatus } from "../../store/slice/masterSlice";
import Pagination from "../Pagination";
import Cookies from "js-cookie";
import { getPropertyList } from "../../store/slice/categorySlice";
import SearchFilter from "./searchFilter";
import * as API from "../../utils/api.service";
import Breadcrumb from "../Breadcrumb";
import { useScrollContext } from "../../scrollProvider";
import { useTranslation } from "react-i18next";
import SearchLocation from "../SearchLocation";

const ListOfProperty = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const token = Cookies.get('tokenCA');

    const { setToken, setAddress, address } = useOutletContext();
    const debounce = useDebounce(address, SEARCH_DELAY);
    const debounceProp = useDebounce(location?.state, SEARCH_DELAY);

    const [page, setPage] = useState(1);
    const { t } = useTranslation();
    const handlePageChange = (newPage) => { setPage(newPage); };
    const { landingProperties: { data: landingProperties } } = useSelector((state) => state.landing);
    const { homeProperties: { data: homeProperties } } = useSelector((state) => state.landing) || [];
    const { advertiseLanding: { data: advertiseLanding } } = useSelector((state) => state.master);

    const [selectType, setSelectType] = useState();
    const [sortBy, setSortBy] = useState();
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(200000000);

    const debouncedMinPrice = useDebounce(minPrice, SEARCH_DELAY);
    const debouncedMaxPrice = useDebounce(maxPrice, SEARCH_DELAY);
    const { propertyList: { data: propertyList } } = useSelector((state) => state.category);

    const { selectedStatus, selectPropCategory } = useOutletContext();
    let isAdvertisementShown = false;
    let subHeader;
    let redirectPath;
    if (selectedStatus === "sale") {
        subHeader = "Sell";
        redirectPath = "boyo-realestate/list-of-property?selectedStatus=sale"
    } else if (selectedStatus === "rent") {
        subHeader = "Rent";
        redirectPath = "boyo-realestate/list-of-property?selectedStatus=rent"
    }
    else if (selectPropCategory === landingProperties?.map((e) => e.category_id)[0] || selectPropCategory === homeProperties?.map((e) => e.category_id)[0]) {
        subHeader = landingProperties?.map((e) => e.category_name)[0] || homeProperties?.map((e) => e.category_name)[0]
        redirectPath = `boyo-realestate/list-of-property?property_category_id=${selectPropCategory}`
    }

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
        slidesToShow: 4, // Default for larger screens
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

    /** Without token */
    const handleLendingListAPI = () => {
        let filters = "";
        if (debounce) filters = `${filters}&search=${debounce}`
        if (debounceProp) filters = `${filters}&searchproperty=${debounceProp}`
        if (selectedStatus) filters = `${filters}&selectedStatus=${selectedStatus}`;
        if (selectType) filters = `${filters}&property_type_id=${selectType}`;
        if (sortBy) filters = `${filters}&sortBy=${sortBy}`;
        if (debouncedMinPrice || debouncedMinPrice === 0) filters = `${filters}&minPrice=${debouncedMinPrice}`;
        if (debouncedMaxPrice) filters = `${filters}&maxPrice=${debouncedMaxPrice}`;
        if (selectPropCategory) filters = `${filters}&property_category_id=${selectPropCategory}`
        dispatch(setLoader(true));
        dispatch(getLandingProperty({ page, filters }))
            .finally(() => {
                dispatch(setLoader(false));
            });
    };

    /** Home Properties with Token */
    const handleHomeListAPI = () => {
        let filters = "";
        if (debounce) filters = `${filters}&search=${debounce}`
        if (debounceProp) filters = `${filters}&searchproperty=${debounceProp}`
        if (selectedStatus) filters = `${filters}&selectedStatus=${selectedStatus}`;
        if (selectType) filters = `${filters}&property_type_id=${selectType}`;
        if (sortBy) filters = `${filters}&sortBy=${sortBy}`;
        if (debouncedMinPrice || debouncedMinPrice === 0) filters = `${filters}&minPrice=${debouncedMinPrice}`;
        if (debouncedMaxPrice) filters = `${filters}&maxPrice=${debouncedMaxPrice}`;
        if (selectPropCategory) filters = `${filters}&property_category_id=${selectPropCategory}`
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

    const handleChangeStatus = (value) => {
        if (value === "") {
            if (address) {
                navigate(`/boyo-realestate/list-of-property?search=${address}`)
            } else {
                navigate(`/boyo-realestate/list-of-property`);
            }
        } else {
            if (address) {
                navigate(`/boyo-realestate/list-of-property?selectedStatus=${value}&search=${address}`)
            }
            else if (address && selectPropCategory) {
                navigate(`/boyo-realestate/list-of-property?selectedStatus=${value}&property_category_id=${selectPropCategory}&search=${address}`)
            }
            else {
                navigate(`/boyo-realestate/list-of-property?selectedStatus=${value}`)
            }
        }
    };

    const handleSortBy = (value) => {
        setSortBy(value)
    };

    /**
     * 
     * With Token HomeProperties Api Call
     */
    const chunkHomeArray = (arr, size) => {
        const result = [];
        for (let i = 0; i < arr.length; i += size) {
            result.push(arr.slice(i, i + size));
        }
        return result;
    };

    const propertyHomeChunks = chunkHomeArray(homeProperties, 4);

    const propertyLandingChunks = chunkHomeArray(landingProperties, 4);

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

    useEffect(() => {
        if (selectedStatus) {
            if (token) {
                handleHomeListAPI();
            } else {
                handleLendingListAPI();
            }
        }
        else {
            if (token) {
                handleHomeListAPI();
            } else {
                handleLendingListAPI();
            }
        }
    }, [debounce, page, selectedStatus, selectType, sortBy, token, debouncedMinPrice, debouncedMaxPrice, selectPropCategory, debounceProp]);

    /** without Token */
    useEffect(() => {
        dispatch(getPropertyList());
        dispatch(getLandingPageAdvertiseApiCall({ options: "General Listing" }));
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="page_wrepper" id="list-property-box">
            <section className="apartment_sec px-80">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <SearchFilter
                                handlePropertyType={handlePropertyType}
                                propertyList={propertyList}
                                selectType={selectType}
                                selectedStatus={selectedStatus}
                                handleChangeStatus={handleChangeStatus}
                                // search={search}
                                // setSearch={setSearch}
                                minPrice={minPrice}
                                setMinPrice={setMinPrice}
                                maxPrice={maxPrice}
                                setMaxPrice={setMaxPrice}
                            />
                        </div>
                    </div>
                    <div className="row mb-4 d-lg-none ">
                        <div className="col-12 text-center text-black p-0">
                            <SearchLocation
                                address={address}
                                setAddress={setAddress}
                                setToken={setToken}
                                selectedStatus={selectedStatus}
                                selectPropCategory={selectPropCategory}
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="breadcrumb_sec px-80">
                <Breadcrumb
                    header="list-of-property"
                    subHeader={subHeader}
                    redirectPath={redirectPath}
                />
            </section>
            <section className="place_sec px-80 pb-100">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 d-flex align-items-baseline justify-content-between  realeast_headline">
                            {
                                token ?
                                    homeProperties?.length > 0 &&
                                    <h2 className="headline_txt fs-24">
                                        {homeProperties?.[0]?.property_count} {t("Properties")} | {t("For")} {' '}
                                        {selectedStatus === "sale" ? t("Sell") : (selectedStatus === "rent" ? t("Rent") : t("Buy and Rent"))}
                                    </h2>
                                    :
                                    landingProperties?.length > 0 &&
                                    <h2 className="headline_txt fs-24">{landingProperties?.[0]?.property_count} {t("Properties")} | {t("For")} {' '}
                                        {selectedStatus === "sale" ? t("Sell") : (selectedStatus === "rent" ? t("Rent") : t("Buy and Rent"))}
                                    </h2>
                            }

                            <li className="lng_menu ">
                                <select
                                    id="optionsDropdown"
                                    className="form-select"
                                    onChange={(e) => handleSortBy(e.target.value)}
                                >
                                    <option value="">{t("Sort by Price")}</option>
                                    <option value="high_to_low">{t("High To Low")}</option>
                                    <option value="low_to_high">{t("Low To High")}</option>
                                </select>
                            </li>
                        </div>
                    </div>
                    {
                        token ?
                            <>
                                <div className="row align-items-center">
                                    {propertyHomeChunks?.length > 0 ? propertyHomeChunks?.map((chunk, chunkIndex) => (
                                        <>
                                            {chunk?.map((item) => (
                                                <div key={item?.property_id} className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                                                    <a>
                                                        <div className="card">
                                                            <div className="place_imges place_slider">
                                                                {item?.property_images?.length === 1 ? (
                                                                    <div onClick={() => navigate('/boyo-realestate/property-details', { state: { property_id: item?.property_id } })}>
                                                                        <img src={item?.property_images[0]} className="card-img-top" alt="place" />
                                                                    </div>
                                                                ) : item?.property_images?.length > 1 ? (
                                                                    <Slider {...settings}>
                                                                        {item?.property_images?.slice(0, 4).map((image, index) => (
                                                                            <div key={index} onClick={() => navigate('/boyo-realestate/property-details', { state: { property_id: item?.property_id } })}>
                                                                                <img src={image} className="card-img-top" alt="place" />
                                                                            </div>
                                                                        ))}
                                                                    </Slider>
                                                                ) : null}
                                                            </div>
                                                            <div className="card-body">
                                                                <a className="btn blue_btn px-2 py-0 mt-2">{item?.category_name}</a>
                                                                <a>
                                                                    <h5 className="card-title mt-2">{item?.property_name}</h5>
                                                                </a>
                                                                <p className="card-text">
                                                                    <img src={PUBLICURL + "/assets/imges/icons/location.svg"} alt="location" className="me-1" />
                                                                    {item?.location}
                                                                </p>
                                                                <div className="facility_item">
                                                                    {item?.attribute.map((att) => (
                                                                        <h6 key={att?.attribute_type}>
                                                                            <img src={att?.attribute_image_link} alt="sq" className="me-1" height={20} width={20} />
                                                                            {att?.attribute_value}
                                                                            <span className="mx-1">{att?.attribute_type}</span>
                                                                        </h6>
                                                                    ))}
                                                                </div>
                                                                <div className="card_footer d-flex justify-content-between align-items-center">
                                                                    <span dangerouslySetInnerHTML={{ __html: `${FCFA_CURRENCY} ${item?.price?.toLocaleString()}` }} />
                                                                    <div className="card_footer_btn">
                                                                        <a className="btn blue_btn" onClick={() => navigate('/boyo-realestate/property-details', { state: { property_id: item?.property_id } })}>
                                                                            <img src={PUBLICURL + "/assets/imges/icons/user.svg"} alt="user" className="me-1" />
                                                                            {t("Contact")}
                                                                        </a>
                                                                        <a onClick={() => handleFavProperty(item?.property_id)}>
                                                                            <img
                                                                                src={item?.is_favourite == 1 ?
                                                                                    PUBLICURL + "/assets/imges/icons/favorite.svg"
                                                                                    :
                                                                                    PUBLICURL + "/assets/imges/icons/heart.svg"}
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
                                            ))}
                                            {
                                                chunkIndex === 0 && !isAdvertisementShown && (
                                                    <div className="row align-items-center justify-content-center my-md-5 my-4">
                                                        {
                                                            advertiseLanding.length > 0 &&
                                                            <h2 class="headline_txt mb-4"> Properties Advertisement</h2>
                                                        }
                                                        {
                                                            advertiseLanding.length === 1 ?
                                                                advertiseLanding.length > 0 &&
                                                                <div key={advertiseLanding[0]?.property_id} className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                                                                    <div className="card_new_slider">
                                                                        <div className="place_imges place_slider">
                                                                            <div onClick={() => navigate('/boyo-realestate/property-details', { state: { property_id: advertiseLanding[0]?.property_id } })}>
                                                                                <img src={advertiseLanding[0]?.images[0]} className="card-img-top" alt="place" />
                                                                            </div>
                                                                        </div>
                                                                        <div className="card-body">

                                                                            <h6 className="mt-2"><strong>Property Name :</strong>  {advertiseLanding[0]?.property_name}</h6>
                                                                            {/* <p>Property Price : {item?.property_price}</p> */}

                                                                            {/* <h6 dangerouslySetInnerHTML={{ __html: `<strong>Property Price :</strong> ${FCFA_CURRENCY} ${advertiseLanding[0]?.property_price}` }} /> */}
                                                                            <h6><strong>Property Location :</strong>{advertiseLanding[0]?.location}</h6>
                                                                            {/* {
                                                                                item?.address &&
                                                                                <p className="card-text">
                                                                                    <img src={PUBLICURL + "/assets/imges/icons/location.svg"} alt="location" className="me-1" />
                                                                                    {item?.address}
                                                                                </p>
                                                                            } */}
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
                                                                                <span dangerouslySetInnerHTML={{ __html: `${FCFA_CURRENCY} ${advertiseLanding[0]?.property_price?.toLocaleString()}` }} />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                :

                                                                <Slider {...settingsImages} className="realeast-banner_cards slider_card">
                                                                    {advertiseLanding.length > 0 && advertiseLanding?.slice(0, 20)?.map((item) =>
                                                                        <div key={item?.property_id} className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                                                                            <div className="card_new_slider">
                                                                                <div className="place_imges place_slider">
                                                                                    <div onClick={() => navigate('/boyo-realestate/property-details', { state: { property_id: item?.property_id } })}>
                                                                                        <img src={item?.images[0]} className="card-img-top" alt="place" />
                                                                                    </div>
                                                                                </div>
                                                                                <div className="card-body">

                                                                                    <h6 className="mt-2"><strong>Property Name :</strong>  {item?.property_name}</h6>

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
                                                                                        <span dangerouslySetInnerHTML={{ __html: `${FCFA_CURRENCY} ${item?.property_price?.toLocaleString()}` }} />
                                                                                    </div>

                                                                                </div>
                                                                            </div>
                                                                            <div className="rent_btn d-flex justify-content-between">

                                                                                <a href="javascript:void(0)" className="red_btn ml-auto">ads</a>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                    }
                                                                </Slider>
                                                        }
                                                    </div>
                                                )
                                            }

                                        </>
                                    )) : (
                                        <h4 className="d-flex justify-content-center align-items-center mt-5">{t("No_Properties_Found")}</h4>
                                    )}
                                </div>

                            </>
                            :
                            <div className="row align-items-center">
                                {
                                    propertyLandingChunks.length > 0 ? propertyLandingChunks?.map((chunk, chunkIndex) => (
                                        <>
                                            {
                                                chunk?.map((item) => (
                                                    <div key={item?.property_id} className="col-xl-3 col-lg-4 col-md-6 col-sm-12 ">
                                                        <a>
                                                            <div className="card">
                                                                <div className="place_imges place_slider">
                                                                    {item?.property_images?.length === 1 ? (
                                                                        <div onClick={() => navigate('/boyo-realestate/property-details', { state: { property_id: item?.property_id } })}>
                                                                            <img src={item?.property_images[0]} className="card-img-top" alt="place" />
                                                                        </div>
                                                                    ) : item?.property_images?.length > 1 ? (
                                                                        <Slider {...settings}>
                                                                            {item?.property_images?.slice(0, 4).map((image, index) => (
                                                                                <div key={index} onClick={() => navigate('/boyo-realestate/property-details', { state: { property_id: item?.property_id } })}>
                                                                                    <img src={image} className="card-img-top" alt="place" />
                                                                                </div>
                                                                            ))}
                                                                        </Slider>
                                                                    ) : null}
                                                                </div>
                                                                <div className="card-body">
                                                                    <a className="btn blue_btn px-2 py-0 mt-2">{item?.category_name}</a>
                                                                    <a >
                                                                        <h5 className="card-title mt-2">{item?.property_name}</h5>
                                                                    </a>
                                                                    <p className="card-text">
                                                                        <img src={PUBLICURL + "/assets/imges/icons/location.svg"} alt="location" className="me-1" />
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
                                                                        {/* <span> {FCFA_CURRENCY}{item?.price}</span> */}
                                                                        <span dangerouslySetInnerHTML={{ __html: `${FCFA_CURRENCY} ${item?.price.toLocaleString()}` }} />
                                                                        <div className="card_footer_btn">
                                                                            <a className="btn blue_btn" onClick={() => dispatch(setModalStatus({ modalType: SIGN_IN_MODAL, isOpen: true, data: [] }))}>
                                                                                <img src={PUBLICURL + "/assets/imges/icons/user.svg"} alt="user" className="me-1" />
                                                                                {t("Contact")}
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
                                                ))}
                                            {/* Render advertisement after every 4 properties */}
                                            {
                                                chunkIndex === 0 && !isAdvertisementShown && (
                                                    <div className="row align-items-center justify-content-center my-md-5 my-4">
                                                        {
                                                            advertiseLanding.length > 0 &&
                                                            <h2 class="headline_txt mb-4"> Properties Advertisement</h2>
                                                        }
                                                        {
                                                            advertiseLanding.length === 1 ?
                                                                advertiseLanding.length > 0 &&
                                                                <div key={advertiseLanding[0]?.property_id} className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                                                                    <div className="card_new_slider">
                                                                        <div className="place_imges place_slider">
                                                                            <div onClick={() => navigate('/boyo-realestate/property-details', { state: { property_id: advertiseLanding[0]?.property_id } })}>
                                                                                <img src={advertiseLanding[0]?.images[0]} className="card-img-top" alt="place" />
                                                                            </div>
                                                                        </div>
                                                                        <div className="card-body">

                                                                            <h6 className="mt-2"><strong>Property Name :</strong>  {advertiseLanding[0]?.property_name}</h6>
                                                                            {/* <p>Property Price : {item?.property_price}</p> */}
                                                                            <h6><strong>Property Location :</strong>{advertiseLanding[0]?.location}</h6>
                                                                            {/* <h6 dangerouslySetInnerHTML={{ __html: `<strong>Property Price :</strong> ${FCFA_CURRENCY} ${advertiseLanding[0]?.property_price}` }} /> */}
                                                                            {/* {
                                                                                item?.address &&
                                                                                <p className="card-text">
                                                                                    <img src={PUBLICURL + "/assets/imges/icons/location.svg"} alt="location" className="me-1" />
                                                                                    {item?.address}
                                                                                </p>
                                                                            } */}
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
                                                                                <span dangerouslySetInnerHTML={{ __html: `${FCFA_CURRENCY} ${advertiseLanding[0]?.property_price?.toLocaleString()}` }} />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                :

                                                                <Slider {...settingsImages} className="realeast-banner_cards slider_card">
                                                                    {advertiseLanding.length > 0 && advertiseLanding?.slice(0, 20)?.map((item) =>
                                                                        <div key={item?.property_id} className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                                                                            <div className="card_new_slider">
                                                                                <div className="place_imges place_slider">
                                                                                    <div onClick={() => navigate('/boyo-realestate/property-details', { state: { property_id: item?.property_id } })}>
                                                                                        <img src={item?.images[0]} className="card-img-top" alt="place" />
                                                                                    </div>
                                                                                </div>
                                                                                <div className="card-body">

                                                                                    <h6 className="mt-2"><strong>Property Name :</strong>  {item?.property_name}</h6>
                                                                                    {/* <p>Property Price : {item?.property_price}</p> */}

                                                                                    {/* <h6 dangerouslySetInnerHTML={{ __html: `<strong>Property Price :</strong> ${FCFA_CURRENCY} ${item?.property_price}` }} /> */}
                                                                                    <h6><strong>Property Location :</strong>{item?.location}</h6>
                                                                                    {/* {
                                                                                item?.address &&
                                                                                <p className="card-text">
                                                                                    <img src={PUBLICURL + "/assets/imges/icons/location.svg"} alt="location" className="me-1" />
                                                                                    {item?.address}
                                                                                </p>
                                                                            } */}
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
                                                                                        <span dangerouslySetInnerHTML={{ __html: `${FCFA_CURRENCY} ${item?.property_price?.toLocaleString()}` }} />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="rent_btn d-flex justify-content-between">

                                                                                <a href="javascript:void(0)" className="red_btn ml-auto">ads</a>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                    }
                                                                </Slider>
                                                        }
                                                    </div>
                                                )
                                            }
                                        </>
                                    )) :
                                        (
                                            <h4 className="d-flex justify-content-center align-items-center mt-5">{t("No_Proeprties_Found")}</h4>
                                        )
                                }
                            </div>


                    }
                </div>
            </section>
            {
                token ?
                    homeProperties.length > 0 && homeProperties[0]?.per_page < homeProperties[0]?.property_count &&
                    <Pagination per_page={homeProperties[0]?.per_page} pageCount={homeProperties[0]?.property_count} onPageChange={handlePageChange} page={page} lableName={t(`Property`)} />
                    :
                    landingProperties.length > 0 && landingProperties[0]?.per_page < landingProperties[0]?.property_count &&
                    <Pagination per_page={landingProperties[0]?.per_page} pageCount={landingProperties[0]?.property_count} onPageChange={handlePageChange} page={page} lableName={t(`Property`)} />
            }
        </main >
    )
}

export default ListOfProperty;