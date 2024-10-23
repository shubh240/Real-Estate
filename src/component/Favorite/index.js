import { useNavigate } from "react-router-dom"
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../index.css';
import { PUBLICURL, TOAST_ERROR, TOAST_SUCCESS } from "../../utils/common.service";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getFavPropertyList } from "../../store/slice/favPropertySlice";
import * as API from "../../utils/api.service"
import Pagination from "../Pagination";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useTranslation } from "react-i18next";
import { FCFA_CURRENCY } from "../../app.config";

const Favorite = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const MySwal = withReactContent(Swal);
    const { t } = useTranslation();
    const [page, setPage] = useState(1);
    const handlePageChange = (newPage) => { setPage(newPage); };
    const [sortBy, setSortBy] = useState();
    const { FavPropertyList: { data: FavPropertyList } } = useSelector((state) => state.favourite);
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };
    const handleSortBy = (value) => {
        setSortBy(value)
    };

    const handleDelete = async (property_id) => {
        try {
            let { code, message, data } = await API.deletePropertyFavApi({ property_id });
            if (code == 1) {
                TOAST_SUCCESS(message);
                let filters = "";
                if (sortBy) filters = `${filters}&sortBy=${sortBy}`;
                dispatch(getFavPropertyList({ page, filters }));
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
                    'Your Favourite Property has been deleted.',
                    'success'
                );
            }
        });
    };

    useEffect(() => {
        let filters = "";
        if (sortBy) filters = `${filters}&sortBy=${sortBy}`;
        dispatch(getFavPropertyList({ page, filters }));
    }, [page, sortBy]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="page_wrepper">
            <section className="favorite-view_sec px-80">
                <div className="fav_view">
                    <h2>{t("View Favorite Properties")}</h2>
                </div>
            </section>
            <section className="place_sec px-80 pb-100">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 d-flex align-items-baseline justify-content-between realeast_headline">
                            <h2 className="headline_txt fs-24">
                                {FavPropertyList && FavPropertyList[0]?.fav_count_property == undefined || FavPropertyList[0]?.fav_count_property == "" || FavPropertyList[0]?.fav_count_property == null ? <></> : FavPropertyList[0]?.fav_count_property + ` Favourite Properties`}
                            </h2>
                            <div className="row">
                                <div className="col-12 d-flex align-items-baseline justify-content-between  realeast_headline">
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
                        </div>
                    </div>
                    <div className="row align-items-center">
                        {
                            Array.isArray(FavPropertyList) && FavPropertyList?.length > 0 ? (
                                FavPropertyList?.map((item) =>
                                    <div key={item?.id} className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                                        <a>
                                            <div className="card">
                                                <div className="place_imges place_slider">
                                                    {item?.property_images?.length === 1 ? (
                                                        <div onClick={() => navigate('/boyo-realestate/fav-property-details', { state: item?.id })}>
                                                            <img src={item?.property_images[0]} className="card-img-top" alt="place" />
                                                        </div>
                                                    ) : item?.property_images?.length > 1 ? (
                                                        <Slider {...settings}>
                                                            {item?.property_images?.slice(0, 4).map((image, index) => (
                                                                <div key={index} onClick={() => navigate('/boyo-realestate/fav-property-details', { state: item?.id })}>
                                                                    <img src={image} className="card-img-top" alt="place" />
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
                                                                <img src={att?.attribute_icon_link} height={20} width={20} alt="sq" className="me-1" />
                                                                {att?.attribute_value}
                                                                <span className="mx-1">{att?.attribute_type}</span>
                                                            </h6>
                                                        ))}
                                                    </div>
                                                    <div className="card_footer d-flex justify-content-between align-items-center">
                                                        <span dangerouslySetInnerHTML={{ __html: `${FCFA_CURRENCY} ${item?.price?.toLocaleString()}` }} />
                                                        <div className="card_footer_btn">
                                                            <a onClick={() => confirmDelete(item?.id)}>
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
                                )
                            ) :
                                <h4 className="d-flex justify-content-center align-items-center mt-5">{t("No Favorite Properties Found")}</h4>
                        }
                    </div>
                </div>
            </section>
            {
                FavPropertyList?.length > 0 &&
                <Pagination per_page={FavPropertyList[0]?.per_page} pageCount={FavPropertyList[0]?.fav_count_property} onPageChange={handlePageChange} page={page} lableName={`${t("Favorite Properties")}`} />
            }

        </main>
    )
}

export default Favorite;