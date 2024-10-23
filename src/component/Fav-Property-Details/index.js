import { Link, useLocation, useNavigate } from "react-router-dom";
import { PUBLICURL, TOAST_ERROR, TOAST_SUCCESS } from "../../utils/common.service";
import { useDispatch, useSelector } from "react-redux";
import { getFavPropertyDetails } from "../../store/slice/myPropertySlice";
import { useEffect, useState } from "react";
import * as API from "../../utils/api.service"
import { APP_NAME, FCFA_CURRENCY } from "../../app.config";
import { setLoader } from "../../store/slice/masterSlice";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useTranslation } from "react-i18next";
import ImageModal from "../ImageModal";

const FavPropertyDetails = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const MySwal = withReactContent(Swal);
    const { t } = useTranslation();
    const { favpropertiesDetails: { data: favpropertiesDetails } } = useSelector((state) => state.myProperty);
    const propertyImages = favpropertiesDetails?.property_images || [];
    const firstImage = propertyImages[0];
    const imagesToShow = favpropertiesDetails?.property_images?.slice(1, 6);
    const remainingImagesCount = favpropertiesDetails?.property_images?.length - imagesToShow?.length - 1;
    const property_id = location?.state;
    const [showModal, setShowModal] = useState(false);
    const [remainingImg, setRemainingImg] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [selectedImage, setSelectedImage] = useState(null);

    /**
    * 
    * Click Image To Open Modal
    */
    const handleImageClick = (image, index) => {
        setCurrentImageIndex(index);
        setSelectedImage(image);
        setShowModal(true);
    };

    /**
     * 
     * Closed Modal
     */
    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedImage(null);
    };


    const handleRemainingClosed = () => {
        setRemainingImg(false);
    };


    /**
     * Show Previous Image Of Modal
     */

    const handlePrev = () => {
        if (currentImageIndex > 0) {
            const prevIndex = currentImageIndex - 1;
            setCurrentImageIndex(prevIndex);
            setSelectedImage(propertyImages[prevIndex]);
        }
        else {
            let lastIndex = propertyImages.length - 1;
            setCurrentImageIndex(lastIndex);
            setSelectedImage(propertyImages[lastIndex]);
        }
    }

    /**
     * Show Next Image Of Modal
     */

    const handleNext = () => {
        if (currentImageIndex < propertyImages.length - 1) {
            const nextIndex = currentImageIndex + 1;
            setCurrentImageIndex(nextIndex);
            setSelectedImage(propertyImages[nextIndex]);
        } else {
            setCurrentImageIndex(0);
            setSelectedImage(propertyImages[0]);
        }
    };

    let subHeader;
    let redirectPath;
    if (location?.pathname?.split('/')[2] === "fav-property-details") {
        subHeader = "Fav-Property-Details";
        redirectPath = "boyo-realestate/fav-property-details"
    }

    const handleDelete = async (property_id) => {
        try {
            dispatch(setLoader(true));
            let { code, message, data } = await API.deletePropertyFavApi({ property_id });
            dispatch(setLoader(false));
            if (code == 1) {
                TOAST_SUCCESS(message);
                navigate('/boyo-realestate/favorite-property')
            }
        } catch (error) {
            TOAST_ERROR(error.message);
            dispatch(setLoader(false));
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
        dispatch(getFavPropertyDetails({ property_id }));
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="page_wrepper">

            <section className="breadcrumb_sec px-80">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <ol className="breadcrumb m-0 mx-30">
                                <li className="breadcrumb-item"><Link to="/" className='linkdata'>{APP_NAME}</Link></li>
                                <li className="breadcrumb-item"><Link to={'/boyo-realestate/favorite'}>{"favorite-properties"}</Link></li>
                                {subHeader ?
                                    <li className="breadcrumb-item"><Link to={'/' + redirectPath}>{subHeader}</Link></li>
                                    :
                                    <></>
                                }
                            </ol>
                        </div>
                    </div>
                </div >
            </section>

            <section className=" gallary_sec px-80">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-5 col-lg-5 col-md-6 col-sm-12 col-12">
                            <div className="gallary_img-left">
                                <img src={firstImage} alt="img" onClick={() => handleImageClick(firstImage, 0)} />
                            </div>
                        </div>
                        <div className="col-xl-7 col-lg-7 col-md-6 col-sm-12 col-12 mt-3 mt-md-0">
                            <div className="row">
                                {imagesToShow?.map((image, index) => (
                                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6" key={index}>
                                        <div className="property_img_cards">
                                            <div className="property_img">
                                                <img
                                                    src={image}
                                                    alt={`property-${index}`}
                                                    className={index === 2 ? "radius" : ""}
                                                    onClick={() => handleImageClick(image, index + 1)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {remainingImagesCount > 0 && (
                                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6">
                                        <div className="property_img_cards">
                                            <div className="property_img gallary_last-img">
                                                <img
                                                    src={imagesToShow[imagesToShow?.length - 1]}
                                                    alt="place"
                                                    onClick={() => handleImageClick(imagesToShow[imagesToShow?.length - 1], imagesToShow?.length)}
                                                />
                                            </div>
                                            <a
                                                className="delete_place"
                                                onClick={() => handleImageClick(propertyImages[imagesToShow.length], imagesToShow.length)}
                                                style={{ cursor: "pointer" }}
                                            >
                                                <p>
                                                    {remainingImagesCount > 1 ? <span><i className="fa-solid fa-plus"></i></span> : ""}
                                                    {remainingImagesCount > 1 ? `${remainingImagesCount} more` : ''}
                                                </p>
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {/* Image Modal */}
                {selectedImage && (
                    <ImageModal
                        show={showModal}
                        handleClose={handleCloseModal}
                        imageSrc={selectedImage}
                        handlePrev={handlePrev}
                        handleNext={handleNext}
                    />
                )}
                {/* Modal to show remaining images */}
                {/* {remainingImg && (
                    <div className="modal show d-block" onClick={handleRemainingClosed}>
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">More Images</h5>
                                </div>
                                <div className="modal-body" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                                    <div className="row">
                                        {propertyImages.slice(6).map((image, index) => (
                                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6" key={index}>
                                                <div className="property_img_cards">
                                                    <div className="property_img">
                                                        <img
                                                            src={image}
                                                            alt={`remaining-${index}`}
                                                            onClick={() => handleImageClick(image)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )} */}
            </section>
            <section className="place_sec Studio_sec px-80 pb-100 mt-30">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12 pe-lg-5 pe-2 ">
                            <div className="row">
                                <div className="col-12 d-flex align-items-baseline justify-content-between pb-30 realeast_headline pb-30">
                                    <div>
                                        <h2 className="headline_txt ">{favpropertiesDetails?.property_name}</h2>
                                        <p className="card-text mt-3 fs-20"><img src={PUBLICURL + "/assets/imges/icons/location.svg"} alt="location" className="me-1 w-auto" />
                                            {favpropertiesDetails?.location}</p>
                                    </div>
                                    <div className="card_footer_btn">
                                        <a onClick={() => confirmDelete(property_id)}>
                                            <img src={`${PUBLICURL}/assets/imges/icons/delete.svg`} alt="delete" className="heart_btn" />
                                        </a>
                                    </div>
                                </div>
                                <div className="col-12 pb-30">
                                    <a href="javascript:void(0)" className="red_btn">{t("For")} {favpropertiesDetails?.status == "sale" ? t('Sell') : t('Rent')}</a>
                                    <a href="javascript:void(0)" className="red_btn Primary-Blue-bg ms-2">{favpropertiesDetails?.category_name}</a>
                                </div>
                                <div className="top_line"></div>
                            </div>
                            <div className="hotel-info-card">
                                <div className="row">
                                    <div className="col-12 mt-30">
                                        <h3>{t("About Properties")}</h3>
                                        <h6>{favpropertiesDetails?.about}</h6>

                                    </div>
                                    <div className="col-12 mt-30">
                                        <h3>{t("Properties Specifications")}</h3>
                                        <ul className="facilities_list_card">
                                            <div className="row">
                                                {
                                                    favpropertiesDetails &&
                                                        favpropertiesDetails?.attribute?.length > 0 ?
                                                        favpropertiesDetails?.attribute?.map((att) =>
                                                            <div className="col-xl-2 col-lg-2 col-md-4 col-sm-4 col-6 p-0 text-center mt-3">
                                                                <div className="facilities_item align-items-start gap-0">
                                                                    <img src={att?.attribute_icon_link} height={20} width={20} alt="area icon" className="me-2" />
                                                                    <div>
                                                                        <p> <span>{att?.attribute_value}</span>
                                                                        </p>
                                                                        <p className="d-flex">{att?.attribute_type}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ) :
                                                        <h5 className="d-flex justify-content-center align-items-center mt-5">{t("No Attributes Found")}</h5>
                                                }
                                            </div>
                                        </ul>
                                    </div>
                                    <div className="col-12 mt-30 mb-3">
                                        <div className="col-12">
                                            <h3>{t("Properties Amenities")}</h3>
                                            <ul className="facilities_list_card">
                                                <div className="row">
                                                    {
                                                        favpropertiesDetails &&
                                                            favpropertiesDetails?.amenities?.length > 0 ?
                                                            favpropertiesDetails?.amenities?.map((amenity) =>
                                                                <div className="col-xl-2 col-lg-2 col-md-4 col-sm-4 col-6 p-0 text-center mt-3">
                                                                    <div className="">
                                                                        <img src={amenity?.amenity_icon_link} alt="gym" height={20} width={20} />
                                                                        <p>{amenity?.amenity_name}</p>
                                                                    </div>
                                                                </div>
                                                            ) :
                                                            <h5 className="d-flex justify-content-center align-items-center mt-5">{t("No Amenities Found")}</h5>
                                                    }
                                                </div>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                            <div className="facilities_list_card mt-0">
                                <div className="price">
                                    <h6 dangerouslySetInnerHTML={{ __html: `${FCFA_CURRENCY} ${favpropertiesDetails?.price?.toLocaleString()}` }}></h6>
                                    {/* <h6>$ {favpropertiesDetails?.price}</h6> */}
                                    <p>{t("Property price")}</p>
                                </div>
                            </div>
                            <div className="mt-30">
                                <div className="mapouter">
                                    <div className="gmap_canvas"><iframe width="100%" height="500" id="gmap_canvas"
                                        src={`https://maps.google.com/maps?q=${favpropertiesDetails?.location}${favpropertiesDetails?.latitude},${favpropertiesDetails?.longitude}&t=&z=13&ie=UTF8&iwloc=&output=embed`} frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </main>
    )
}

export default FavPropertyDetails;