import { Link, useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { PUBLICURL, TOAST_ERROR, TOAST_SUCCESS } from "../../utils/common.service";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { PropertyDetails } from "../../store/slice/propertySlice";
import { setModalStatus } from "../../store/slice/masterSlice";
import { APP_NAME, FCFA_CURRENCY, SIGN_IN_MODAL } from "../../app.config";
import Breadcrumb from "../Breadcrumb";
import chatIcon from "../../chat_icon1.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons';
import Cookies from "js-cookie";
import * as API from "../../utils/api.service"
import { setChats } from "../../store/slice/chatSlice";
import createSocket from '../../utils/socket.service';
import { getUserDetails } from "../../store/slice/userSlice";
import { useTranslation } from "react-i18next";
import ImageModal from "../ImageModal";
import { Modal } from "react-bootstrap";

const PropertiesDetails = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const token = Cookies.get('tokenCA')
    const property_id = location?.state;
    const [selectedUser, setSelectedUser] = useState(false);
    const { propertiesDetails: { data: propertiesDetails } } = useSelector((state) => state.propertyDetails);
    const status = propertiesDetails?.status ?
        propertiesDetails.status.charAt(0).toUpperCase() + propertiesDetails.status.slice(1) :
        '';
    // const userDetails = JSON.parse(Cookies.get('dataCA')) ? JSON.parse(Cookies.get('dataCA')) :  {user_id : 0};
    const { userDetails: { data: userDetails } } = useSelector((state) => state.user);
    const { t } = useTranslation();
    const user_id = userDetails?.user_id;
    const propertyImages = propertiesDetails?.property_images || [];
    const firstImage = propertyImages[0];
    const imagesToShow = propertyImages.slice(1, 6);
    const remainingImagesCount = propertyImages.length - imagesToShow.length - 1;
    const [showModal, setShowModal] = useState(false);
    const [remainingImg, setRemainingImg] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const isOwner = propertiesDetails?.user_id === user_id;

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
    if (location?.pathname?.split('/')[2] === "property-details") {
        subHeader = "Property-Details";
        redirectPath = "boyo-realestate/property-details"
    }

    const handleChat = async (propertiesDetails) => {
        const requestBody = {
            loginuser_id: user_id,
            reciever_id: propertiesDetails.user_id,
            property_id: propertiesDetails.property_id
        };

        const { code, message, data } = await API.createChatApi(requestBody);

        if (code === "1") {
            navigate('/boyo-realestate/chat', { state: { chatRoomData: data } });
        }
    }

    useEffect(() => {
        dispatch(PropertyDetails({ property_id }));
    }, []);

    useEffect(() => {
        if (token) {
            dispatch(getUserDetails())
        }
    }, [token]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleUserSelection = () => {
        if (!isOwner) {
            setSelectedUser(true);
        }
    };

    useEffect(() => {
        if (selectedUser) {
            const modalElement = document.getElementById('user_modal');
            if (modalElement) {
                const modal = new bootstrap.Modal(modalElement);
                modal.show();

                // Event listener for when the modal is hidden
                modalElement.addEventListener('hidden.bs.modal', () => {
                    setSelectedUser(false);
                });
            }
        }
    }, [selectedUser]);

    const handleSendNotification = async (id, user) => {
        const obj = {
            receiver_id: id,
            user_name: user?.first_name
        }
        const { code, message, data } = await API.sendConctactNotification(obj);
        if (code === '1') {
            console.log('dopme')
        } else {
            console.log('errorrorrop', message)
        }
    }

    const handleContactClick = () => {
        if (!token) {
            // Close the current modal
            const userModal = document.getElementById('user_modal');
            const modalInstance = bootstrap.Modal.getInstance(userModal); // Get the modal instance
            modalInstance.hide(); // Hide the current modal

            // Dispatch the action to open the sign-in modal
            dispatch(setModalStatus({ modalType: SIGN_IN_MODAL, isOpen: true, data: [] }));
        } else {
            handleSendNotification(propertiesDetails?.user_id, userDetails);
        }
    };

    const mapSrc = `https://maps.google.com/maps?q=${propertiesDetails?.latitude},${propertiesDetails?.longitude}&hl=es&z=14&output=embed&markers=${propertiesDetails?.latitude},${propertiesDetails?.longitude}`;

    return (

        <main className="page_wrepper">
            <div className="top_line mb-2"></div>
            <section className="breadcrumb_sec px-80">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <ol className="breadcrumb m-0 mx-30">
                                <li className="breadcrumb-item"><Link to="/" className='linkdata'>{APP_NAME}</Link></li>
                                <li className="breadcrumb-item"><Link to={'/boyo-realestate/list-of-property'}>{"list-of-property"}</Link></li>
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

                {/* Modal to show remaining images with swipe functionality */}
                {/* {remainingImg && (
                    <Modal show={remainingImg} onHide={handleRemainingClosed} centered>
                        <Modal.Body className="position-relative">
                            <img
                                src={propertyImages[currentImageIndex]}
                                alt={`remaining-${currentImageIndex}`}
                                style={{ width: '100%', height: 'auto' }}
                            />
                            <button
                                className="btn position-absolute top-50 start-0 translate-middle-y"
                                style={{ zIndex: 10 }}
                                onClick={handlePrev}
                            >
                                &lt;
                            </button>
                            <button
                                className="btn position-absolute top-50 end-0 translate-middle-y"
                                style={{ zIndex: 10 }}
                                onClick={handleNext}
                            >
                                &gt;
                            </button>
                        </Modal.Body>
                    </Modal>
                )} */}

            </section>
            <section className="place_sec Studio_sec px-80 pb-100 mt-30">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12 pe-lg-5 pe-2 ">
                            <div className="row">
                                <div className="col-12 d-flex align-items-baseline justify-content-between pb-30 realeast_headline pb-30">
                                    <div>
                                        <h2 className="headline_txt ">{propertiesDetails?.property_name}</h2>
                                        <p className="card-text mt-3 fs-20"><img src={PUBLICURL + "/assets/imges/icons/location.svg"} alt="location" className="me-1 w-auto" />
                                            {propertiesDetails?.location}</p>
                                    </div>
                                </div>
                                <div className="col-12 pb-30">
                                    <a href="javascript:void(0)" className="red_btn">{t("For")} {propertiesDetails?.status == "sale" ? t('Sell') : t('Rent')}</a>
                                    <a href="javascript:void(0)" className="red_btn Primary-Blue-bg ms-2">{propertiesDetails?.category_name}</a>
                                    {
                                        token ?
                                            !isOwner &&
                                            <a className="red_btn Primary-Blue-bg ms-2" style={{ cursor: "pointer" }}
                                                onClick={() => handleChat(propertiesDetails)}>
                                                <FontAwesomeIcon icon={faCommentAlt} />
                                            </a>
                                            :
                                            <a className="red_btn Primary-Blue-bg ms-2" style={{ cursor: "pointer" }}
                                                onClick={() => dispatch(setModalStatus({ modalType: SIGN_IN_MODAL, isOpen: true, data: [] }))}>
                                                <FontAwesomeIcon icon={faCommentAlt} />
                                            </a>
                                    }
                                </div>
                                <div className="top_line"></div>
                            </div>
                            <div className="hotel-info-card">
                                <div className="row">
                                    <div className="col-12 mt-30">
                                        <h3>{t("About Properties")}</h3>
                                        <h6>{propertiesDetails?.about}</h6>

                                    </div>
                                    <div className="col-12 mt-30">
                                        <h3>{t("Properties Specifications")}</h3>
                                        <ul className="facilities_list_card">
                                            <div className="row">
                                                {
                                                    propertiesDetails &&
                                                        propertiesDetails?.attribute?.length > 0 ?
                                                        propertiesDetails?.attribute?.map((att) =>
                                                            <div className="col-xl-2 col-lg-2 col-md-4 col-sm-4 col-6  p-0 text-center mt-3">
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
                                                        propertiesDetails &&
                                                            propertiesDetails?.amenities?.length > 0 ?
                                                            propertiesDetails?.amenities?.map((amenity) =>
                                                                <div className="col-xl-2 col-lg-2 col-md-4 col-sm-4 col-6 p-0 text-center mt-3">
                                                                    <div className="me-2">
                                                                        <img src={amenity?.amenity_icon_link} height={20} width={20} alt="gym" />
                                                                        <p>{amenity?.amenity_name}</p>
                                                                    </div>
                                                                </div>
                                                            ) :
                                                            <h5 className="d-flex justify-content-center align-items-center mt-5">{t("No Amenity Found")}</h5>
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
                                    <h6 dangerouslySetInnerHTML={{ __html: `${FCFA_CURRENCY} ${propertiesDetails?.price?.toLocaleString()}` }}></h6>
                                    <p>{t("Property price")}</p>
                                </div>
                                <div className="top_line my-3"></div>
                                <div>
                                    <h2 className="headline_txt fs-24">{propertiesDetails?.owner_name}</h2>
                                    <p className="card-text Gray"><img src={PUBLICURL + "/assets/imges/icons/location.svg"} alt="location" className="me-1" />
                                        {propertiesDetails?.location}</p>
                                    {/* {
                                        token ? */}
                                    <a
                                        className={`btn blue_btn w-100 mt-3 ${isOwner ? 'disabled' : ''}`}
                                        onClick={handleUserSelection}
                                        // !isOwner && handleSendNotification(propertiesDetails?.user_id)}
                                        style={isOwner ? { pointerEvents: 'none', opacity: 0.6 } : {}}
                                    >
                                        <img src={`${PUBLICURL}/assets/imges/icons/user.svg`} alt="user" className="me-1" />
                                        {t("Contacts Owner")}
                                    </a>
                                    {/* //         :
                                            // <a className="btn blue_btn w-100 mt-3" onClick={() => dispatch(setModalStatus({ modalType: SIGN_IN_MODAL, isOpen: true, data: [] }))}><img src={PUBLICURL + "/assets/imges/icons/user.svg"} alt="user" className="me-1" />{t("Contacts Owner")}</a>
                                    // } */}

                                </div>
                            </div>
                            <div className="mt-30">
                                <div className="mapouter">
                                    <div className="gmap_canvas">
                                        <iframe
                                            width="100%"
                                            height="500"
                                            id="gmap_canvas"
                                            src={mapSrc}
                                            frameBorder="0"
                                            scrolling="no"
                                            marginHeight="0"
                                            marginWidth="0">
                                        </iframe>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>

            <div className="signin_modal">
                <div className="modal fade" id="user_modal" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content">
                            <div className="modal-body">
                                <button type="button" className="btn-close position-absolute top-0 end-0 m-3" data-bs-dismiss="modal" aria-label="Close"></button>
                                {selectedUser === true && (
                                    <form action="#">
                                        <div className="row">
                                            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 p-0">
                                                <div className="img-user">
                                                    <img src={propertiesDetails.owner_image} height={50} width={50} alt="user" className="img-fluid" />
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                                <div className="signin_card">
                                                    <h6 className="signin-title">
                                                        {t("About")} {propertiesDetails.owner_name}
                                                    </h6>
                                                    <div className="signin_card-content">
                                                        <div className="input_fild mb-4">
                                                            <label>{t("Email")}</label>
                                                            <input type="email" className="form-control border-0 ps-0" value={propertiesDetails.email} readOnly />
                                                        </div>
                                                        <div className="input_fild mb-4">
                                                            <label>{t("Phone Number")}</label>
                                                            <input type="text" className="form-control border-0 ps-0" value={propertiesDetails?.mobile_number} readOnly />
                                                        </div>
                                                        <div className="input_fild mb-4">
                                                            <label>{t("Location")}</label>
                                                            <input type="text" className="form-control border-0 ps-0 text-break" value={propertiesDetails.address} readOnly />
                                                        </div>
                                                        <div>
                                                            <a className="btn blue_btn w-100" onClick={handleContactClick}>
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

        </main>
    )
}

export default PropertiesDetails;