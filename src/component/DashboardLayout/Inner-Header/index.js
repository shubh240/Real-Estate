import { useEffect, useRef, useState } from "react";
import { PUBLICURL, TOAST_ERROR } from "../../../utils/common.service";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import * as API from "../../../utils/api.service";
import '../../../index.css';
import { CHANGE_PASS_MODAL, EDIT_PROFILE_MODAL, PROPERTIES_AMENITES_MODAL, PROPERTIES_ATTRIBUTE_MODAL } from "../../../app.config";
import { useDispatch, useSelector } from "react-redux";
import EditProfileModal from "../../../models/EditProfileModal";
import { setLoader, setModalStatus } from "../../../store/slice/masterSlice";
import ChangePassModal from "../../../models/ChangePassModal";
import EditProfileByOtpModal from "../../../models/EditProfileByOtpModal";
import AttributeModal from "../../../models/Attribute_Modal";
import AmenitiesModal from "../../../models/Amenities_Modal";
import { getUserDetails } from "../../../store/slice/userSlice";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import Select from 'react-select';
import { getHomeProperty } from "../../../store/slice/landingSlice";
import { setAmenityStatus } from "../../../store/slice/amenitiyModalSlice";
import i18n from "../../../component/i18n";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import current_location from "../../../location_current.png"
import AgentModal from "../../../models/AgentModal";
import LenderModal from "../../../models/LenderModal";
import { setChatDetails, setChats } from "../../../store/slice/chatSlice";
import io from "socket.io-client";
import SubscriptionModal from "../../../models/SubscriptionModal";
import LenderSubscriptionModal from "../../../models/LenderSubscriptionModal";
import SearchLocation from "../../SearchLocation";

const InnerHeader = ({
    address, setAddress,
    setToken,
    attributes, setAttributes,
    amenities, setAmenities,
    selectedStatus, selectPropCategory
}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isModalOpen } = useSelector((state) => state.master);
    const { agentOpen } = useSelector((state) => state.agent);
    const { lenderOpen } = useSelector((state) => state.lender);
    const { amenityOpen } = useSelector((state) => state.amenity);
    const unreadMessageCount = useSelector((state) => state.chat.unreadMessageCount);
    const userDetails = JSON.parse(Cookies.get('dataCA') || '{}');
    const token = Cookies.get('tokenCA');
    const [recentSearches, setRecentSearches] = useState([]);
    const [showRecentSearches, setShowRecentSearches] = useState(false);
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);
    const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
    const path = useLocation();
    const pathname = path?.pathname?.split('/')[2];
    let filters = "";
    const [selectedLanguage, setSelectedLanguage] = useState(Cookies.get('language') || 'English');
    const [isOpen, setIsOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const { register, handleSubmit, setValue, control, watch, formState: { errors }, clearErrors } = useForm();

    const handleLanguageChange = (lang, langShort) => {
        setSelectedLanguage(lang);
        Cookies.set('languageCW', langShort, { expires: 2 });
        Cookies.set('language', lang, { expires: 2 });
        i18n.changeLanguage(langShort);
        setIsOpen(false);
    };

    const { t } = useTranslation()

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const getInitials = (firstName, lastName) => {
        if (!firstName || !lastName) return '';
        const firstInitial = firstName.charAt(0).toUpperCase();
        const lastInitial = lastName.charAt(0).toUpperCase();
        return firstInitial + lastInitial;
    };

    const getInitials1 = (firstName, lastName) => {
        const maxLength = 5;
        if (!firstName || !lastName) return '';
        const truncatedFirstName = firstName.length > maxLength ? `${firstName.substring(0, maxLength)}..` : firstName;
        const capitalizedFirstName = truncatedFirstName.charAt(0).toUpperCase() + truncatedFirstName.slice(1);
        const lastNameInitial = lastName ? lastName[0].toUpperCase() : '';
        return `${capitalizedFirstName} ${lastNameInitial}`.trim();
    };

    const initials = getInitials(userDetails?.first_name || '', userDetails?.last_name || '');
    const initials1 = getInitials1(userDetails?.first_name || '', userDetails?.last_name || '');

    //get current location
    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    setCoordinates({ lat: latitude, lng: longitude });
                    const results = await geocodeByAddress(`${latitude},${longitude}`);
                    const address = results[0].formatted_address;
                    setAddress(address);
                    localStorage.setItem("location", address);
                    handleSelect(address);
                },
                (error) => console.error('Error fetching current location:', error)
            );
        } else {
            alert('Geolocation is not supported by this browser.');
        }

    }
    //select address
    const handleSelect = async (value) => {
        try {
            setShowRecentSearches(prev => !prev);
            const results = await geocodeByAddress(value);
            const latlong = await getLatLng(results[0]);
            const formattedAddress = results[0].formatted_address;
            setValue("address", value);
            setValue("latitude", latlong.lat);
            setValue("longitude", latlong.lng);
            setAddress(value);
            localStorage.setItem("location", value);
            setCoordinates(latlong);

            let updatedRecentSearches = [...recentSearches];
            const existingIndex = updatedRecentSearches.findIndex(search => search === address);

            if (existingIndex !== -1) {
                // Move the existing item to the front
                updatedRecentSearches.splice(existingIndex, 1);
            }

            updatedRecentSearches = [formattedAddress, ...updatedRecentSearches.slice(0, 2)];
            setRecentSearches(updatedRecentSearches);
            Cookies.set('recentSearches', JSON.stringify(updatedRecentSearches));

            const offcanvasElement = document.getElementById('offcanvasExample');
            offcanvasElement.classList.remove('show');
            document.body.classList.remove('offcanvas-open');
            const backdrop = document.querySelector('.offcanvas-backdrop');
            if (backdrop) {
                backdrop.remove();
            }

            if (formattedAddress) {
                filters = `${filters}&search=${formattedAddress}`;
                if (selectedStatus) {
                    if (selectPropCategory) {
                        navigate(`/boyo-realestate/list-of-property?search=${formattedAddress}&selectedStatus=${selectedStatus}&property_category_id=${selectPropCategory}`);
                    } else {
                        navigate(`/boyo-realestate/list-of-property?search=${formattedAddress}&selectedStatus=${selectedStatus}`);
                    }
                } else if (selectPropCategory) {
                    navigate(`/boyo-realestate/list-of-property?search=${formattedAddress}&property_category_id=${selectPropCategory}`);
                } else {
                    navigate(`/boyo-realestate/list-of-property?search=${formattedAddress}`);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const dynamicLink = (status) => {
        if (address) {
            if (status === "sale") {
                if (selectPropCategory) {
                    return `?search=${address}&selectedStatus=sale&property_category_id=${selectPropCategory}`
                }
                return `?search=${address}&selectedStatus=sale`;
            } else {
                if (selectPropCategory) {
                    return `?search=${address}&selectedStatus=rent&property_category_id=${selectPropCategory}`
                }
                return `?search=${address}&selectedStatus=rent`;
            }
        } else {
            if (status === "sale") {
                if (selectPropCategory) {
                    return `?selectedStatus=sale&property_category_id=${selectPropCategory}`
                }
                return `?selectedStatus=sale`;
            } else {
                if (selectPropCategory) {
                    return `?selectedStatus=rent&property_category_id=${selectPropCategory}`
                }
                return `?selectedStatus=rent`;
            }
        }
    };

    const handleStatusChange = async (status) => {
        const offcanvasElement = document.getElementById('offcanvasExample');
        offcanvasElement.classList.remove('show');
        document.body.classList.remove('offcanvas-open');
        const backdrop = document.querySelector('.offcanvas-backdrop');
        if (backdrop) {
            backdrop.remove();
        }
        navigate({
            pathname: '/boyo-realestate/list-of-property',
            search: dynamicLink(status)
        });
    };

    const handleNavigate = async (path) => {
        const offcanvasElement = document.getElementById('offcanvasExample');
        offcanvasElement.classList.remove('show');
        document.body.classList.remove('offcanvas-open');
        const backdrop = document.querySelector('.offcanvas-backdrop');
        if (backdrop) {
            backdrop.remove();
        }
        navigate(path);
    }

    useEffect(() => {
        const handleScriptLoad = () => {
            setIsScriptLoaded(true);
        };

        if (window.google) {
            handleScriptLoad();
        } else {
            window.addEventListener('googleMapsScriptLoaded', handleScriptLoad);
        }

        return () => {
            window.removeEventListener('googleMapsScriptLoaded', handleScriptLoad);
        };
    }, []);

    const handleDashboard = () => {
        const offcanvasElement = document.getElementById('offcanvasExample');
        offcanvasElement.classList.remove('show');
        document.body.classList.remove('offcanvas-open');
        const backdrop = document.querySelector('.offcanvas-backdrop');
        if (backdrop) {
            backdrop.remove();
        }
        if (address) {
            if (selectedStatus) {
                navigate(`/?search=${address}&selectedStatus=${selectedStatus}`)
            } else {
                navigate(`/?search=${address}`)
            }
        }
        else {
            navigate('/')
        }
    }

    const handleLogout = async () => {
        try {
            dispatch(setLoader(true));
            const { code, data, message } = await API.logout();
            if (code == 1) {
                dispatch(setLoader(false));
                Cookies.remove('isLoginCA');
                Cookies.remove('dataCA');
                Cookies.remove('tokenCA');
                setAddress('')
                navigate('/');
                setToken(null);
            }
        } catch (err) {
            dispatch(setLoader(false));
            TOAST_ERROR(err.message);
        }
    };

    const handleClick = () => {
        const offcanvasElement = document.getElementById('offcanvasExample');
        offcanvasElement.classList.remove('show');
        document.body.classList.remove('offcanvas-open');
        const backdrop = document.querySelector('.offcanvas-backdrop');
        if (backdrop) {
            backdrop.remove();
        }
        dispatch(setAmenityStatus({ modalType: PROPERTIES_AMENITES_MODAL, isOpen: false, data: [] }))
        dispatch(setModalStatus({ modalType: PROPERTIES_ATTRIBUTE_MODAL, isOpen: false, data: [] }))
        navigate('/boyo-realestate/list-property');
    };

    const handleChatClick = async () => {
        navigate('/boyo-realestate/chat');
    };

    useEffect(() => {
        const searches = Cookies.get('recentSearches');
        const currentLanguage = Cookies.get('languageCW');
        if (searches) {
            setRecentSearches(JSON.parse(searches));
        }
        if (currentLanguage) {
            i18n.changeLanguage(currentLanguage);
        }
    }, []);

    useEffect(() => {
        if (pathname == "list-of-property") {
            if (address == '') {
                if (selectedStatus) {
                    navigate(`/boyo-realestate/list-of-property?selectedStatus=${selectedStatus}`)
                }
                else {
                    localStorage.removeItem('location');
                    navigate('/');
                }
            }
        }
    }, [address]);
    
    if (!isScriptLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <header className="page-header px-80 py-3">
                <nav className="navbar navbar-expand-lg">
                    <div className="container-fluid">
                        <Link style={{ cursor: "pointer" }} className="navbar-brand" to="/"><img src={PUBLICURL + "/assets/imges/icons/boyo-logo.svg"} alt="boyo logo" /></Link>
                        <ul className="left_menu d-lg-none d-flex">
                            <div className="lng_menu">
                                <div className="lng_dropdown lng_box">
                                    <div className="nav-item dropdown">
                                        <div className="nav-link dropdown-toggle" onClick={toggleDropdown} role="button">
                                            {
                                                selectedLanguage === "English" ?
                                                    <img src={`${PUBLICURL}/assets/imges/icons/lng.svg`} alt="language" className="me-2" />
                                                    :
                                                    <img src={`${PUBLICURL}/assets/imges/french_logo.jpeg`} alt="language" height={20} width={22} className="me-2" />
                                            }
                                            {selectedLanguage}
                                        </div>
                                        <div className={`dropdown-menu ${isOpen ? 'show' : ''}`}>
                                            <div className="dropdown-item dark" style={{ cursor: "pointer" }} onClick={() => handleLanguageChange('English', 'en')}>
                                                <img src={`${PUBLICURL}/assets/imges/icons/lng.svg`} alt="language" className="me-2" />
                                                {t("English")}
                                            </div>
                                            <div className="dropdown-item dark" style={{ cursor: "pointer" }} onClick={() => handleLanguageChange('French', 'fr')}>
                                                <img src={`${PUBLICURL}/assets/imges/french_logo.jpeg`} alt="language" height={20} width={22} className="me-2" />
                                                {t("French")}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <a className="btn sign_in messgae_box" onClick={handleChatClick}>
                                <img src={PUBLICURL + "/assets/imges/icons/messgae.svg"}
                                    alt="messgage" />
                                {
                                    unreadMessageCount > 0 &&
                                    <span className="black_box">{unreadMessageCount}</span>
                                }
                            </a>

                            <li className="lng_menu">
                                <div className="lng_dropdown dropdown profile_card me-1" aria-expanded="false">
                                    <div className="bg-light dropdown-toggle form-control" style={{ border: "1px solid lightgrey", cursor: "pointer" }} data-bs-toggle="dropdown" aria-expanded="false">
                                        <span className="profile_name me-1 text-truncate">
                                            <img src={userDetails?.profile_image && userDetails?.profile_image !== "https://bboyorealestate-pord.s3.af-south-1.amazonaws.com/user_profile/" ? userDetails?.profile_image : `${PUBLICURL}/assets/imges/default_profile_Image.png`} className="rounded-circle" height={26} width={27}></img></span><p style={{ width: "76px", overflow: "hidden" }}> {initials1}</p>
                                    </div>
                                    <ul className="dropdown-menu px-3 py-4">
                                        <li><a className="dropdown-item dark mb-3"
                                            onClick={() =>
                                                dispatch(setModalStatus({ modalType: EDIT_PROFILE_MODAL, isOpen: true, data: null }))}
                                        >
                                            <img src={PUBLICURL + "/assets/imges/icons/profile.svg"}
                                                alt="language" className="me-2" />
                                            {t('my_profile')}</a></li>
                                        <li><a className="dropdown-item dark mb-3" onClick={() => navigate('/boyo-realestate/property-advertisement')}>
                                            <img src={PUBLICURL + "/assets/imges/icons/property.svg"} alt="language"
                                                className="me-2" />
                                            {t('Property_Advertisement')}</a></li>
                                        <li><a className="dropdown-item dark  mb-3" onClick={() => navigate('/boyo-realestate/favorite-property')}> <img
                                            src={PUBLICURL + "/assets/imges/icons/fav.svg"} alt="language" className="me-2" />
                                            {t('Favorite_Properties')}Favorite Properties</a></li>
                                        <li><a className="dropdown-item dark  mb-3" onClick={() => navigate('/boyo-realestate/my-properties')} > <img
                                            src={PUBLICURL + "/assets/imges/icons/property.svg"} alt="language"
                                            className="me-2" />
                                            {t('My_Properties')}My Properties</a></li>
                                        <li><a className="dropdown-item dark  mb-3" onClick={() => navigate('/boyo-realestate/notification')}> <img
                                            src={PUBLICURL + "/assets/imges/icons/notifaction.svg"} alt="language"
                                            className="me-2" />
                                            {t('Notifications')} </a></li>
                                        <li><a className="dropdown-item dark  mb-3" onClick={() => dispatch(setModalStatus({ modalType: CHANGE_PASS_MODAL, isOpen: true, data: null }))}> <img src={PUBLICURL + "/assets/imges/icons/key.svg"}
                                            alt="language" className="me-2" />
                                            {t('Change_Password')} </a></li>
                                        <li><a onClick={() => navigate('/boyo-realestate/help')} className="dropdown-item dark  mb-3"> <img
                                            src={PUBLICURL + "/assets/imges/icons/help.png"} alt="language" className="me-2" />
                                            {t('Help')} </a></li>
                                        <li>
                                            <a className="dropdown-item dark  mb-3" href="#logout-profile" data-bs-toggle="modal" >
                                                <img
                                                    src={PUBLICURL + "/assets/imges/icons/logout.svg"} alt="language" className="me-2" />
                                                {t('Logout')}
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <button className="btn toogle_btn" type="button" data-bs-toggle="offcanvas"
                                data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                                <span><i className="fa-solid fa-bars"></i></span>
                            </button>
                        </ul>
                        <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample"
                            aria-labelledby="offcanvasExampleLabel">
                            <div className="offcanvas-header">
                                <h5 className="offcanvas-title" id="offcanvasExampleLabel">
                                    <a className="navbar-brand" onClick={handleDashboard}><img src={PUBLICURL + "/assets/imges/icons/boyo-logo.svg"} alt="boyo logo" /></a>
                                </h5>
                                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                            </div>
                            <div className="offcanvas-body">
                                <div className="menubar">

                                    <nav className="navbar">

                                        <div className="d-none d-lg-inline-block">
                                            <SearchLocation
                                                address={address}
                                                setAddress={setAddress}
                                                setToken={setToken}
                                                selectedStatus={selectedStatus}
                                                selectPropCategory={selectPropCategory}
                                            />
                                        </div>

                                        <ul className="navbar-nav">
                                            <li className="nav-item">
                                                <a
                                                    className={`nav-link Secondary-Black ${selectedStatus === 'sale' ? 'active' : ''}`}
                                                    onClick={() => handleStatusChange('sale')}
                                                >
                                                    {t('Buy')}
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a
                                                    className={`nav-link Secondary-Black ${selectedStatus === 'rent' ? 'active' : ''}`}
                                                    onClick={() => handleStatusChange('rent')}
                                                >
                                                    {t('Rent')}
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link Secondary-Black" onClick={() => handleNavigate("/boyo-realestate/sale")}>{t('Sell')}</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link Secondary-Black" onClick={() => handleNavigate("/boyo-realestate/agent")}>{t('Agent')}</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link Secondary-Black" onClick={() => handleNavigate("/boyo-realestate/lenders")}>{t('Lenders')}</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link Secondary-Black" onClick={() => handleNavigate("/boyo-realestate/help")}>{t('Help')}</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link Secondary-Black" onClick={() => handleNavigate("/boyo-realestate/resources")}>{t('Resources')}</a>
                                            </li>
                                            <li className="d-lg-none ">
                                                <a className="nav-link Secondary-Black"
                                                    onClick={handleClick}>{t('List a Property')}</a>
                                            </li>
                                        </ul>
                                    </nav>

                                    <ul className="left_menu d-none d-lg-flex">

                                        <div className="lng_menu">
                                            <div className="lng_dropdown lng_box">
                                                <div className="nav-item dropdown">
                                                    <div className="nav-link dropdown-toggle" onClick={toggleDropdown} role="button">
                                                        {
                                                            selectedLanguage === "English" ?
                                                                <img src={`${PUBLICURL}/assets/imges/icons/lng.svg`} alt="language" className="me-2" />
                                                                :
                                                                <img src={`${PUBLICURL}/assets/imges/french_logo.jpeg`} alt="language" height={20} width={22} className="me-2" />
                                                        }
                                                        {selectedLanguage}
                                                    </div>
                                                    <div className={`dropdown-menu ${isOpen ? 'show' : ''}`}>
                                                        <div className="dropdown-item dark" style={{ cursor: "pointer" }} onClick={() => handleLanguageChange('English', 'en')}>
                                                            <img src={`${PUBLICURL}/assets/imges/icons/lng.svg`} alt="language" className="me-2" />
                                                            {t("English")}
                                                        </div>
                                                        <div className="dropdown-item dark" style={{ cursor: "pointer" }} onClick={() => handleLanguageChange('French', 'fr')}>
                                                            <img src={`${PUBLICURL}/assets/imges/french_logo.jpeg`} alt="language" height={20} width={22} className="me-2" />
                                                            {t("French")}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <a className="btn sign_in messgae_box" onClick={handleChatClick}>
                                            <img src={PUBLICURL + "/assets/imges/icons/messgae.svg"}
                                                alt="messgage" />
                                            {
                                                unreadMessageCount > 0 &&
                                                <span className="black_box">{unreadMessageCount}</span>
                                            }
                                        </a>
                                        <a className="btn blue_btn" onClick={handleClick}>{t('List a Property')}</a>
                                        <li className="lng_menu ">
                                            <div className="lng_dropdown dropdown profile_card me-1" aria-expanded="false">
                                                <div className="bg-light dropdown-toggle form-control" style={{ border: "1px solid lightgrey", cursor: "pointer" }} data-bs-toggle="dropdown" aria-expanded="false">
                                                    <span className="profile_name me-1">
                                                        <img src={userDetails?.profile_image && userDetails?.profile_image !== "https://bboyorealestate-pord.s3.af-south-1.amazonaws.com/user_profile/" ? userDetails?.profile_image : `${PUBLICURL}/assets/imges/default_profile_Image.png`} className="rounded-circle" height={26} width={27}></img></span><p style={{ width: "76px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}> {initials1}</p>
                                                </div>
                                                <ul className="dropdown-menu px-3 py-4">
                                                    <li><a className="dropdown-item dark mb-3" onClick={() => dispatch(setModalStatus({ modalType: EDIT_PROFILE_MODAL, isOpen: true, data: null }))}><img src={PUBLICURL + "/assets/imges/icons/profile.svg"}
                                                        alt="language" className="me-2" />
                                                        {t('my_profile')}</a></li>
                                                    <li><a className="dropdown-item dark mb-3" onClick={() => navigate('/boyo-realestate/property-advertisement')}>
                                                        <img src={PUBLICURL + "/assets/imges/icons/property.svg"} alt="language"
                                                            className="me-2" />
                                                        {t('Property_Advertisement')}</a></li>
                                                    <li><a className="dropdown-item dark  mb-3" onClick={() => navigate('/boyo-realestate/favorite-property')}> <img
                                                        src={PUBLICURL + "/assets/imges/icons/fav.svg"} alt="language" className="me-2" />
                                                        {t('Favorite_Properties')}</a></li>
                                                    <li><a className="dropdown-item dark  mb-3" onClick={() => navigate('/boyo-realestate/my-properties')} > <img
                                                        src={PUBLICURL + "/assets/imges/icons/property.svg"} alt="language"
                                                        className="me-2" />
                                                        {t('My_Properties')}</a></li>
                                                    <li><a className="dropdown-item dark  mb-3" onClick={() => navigate('/boyo-realestate/notification')}> <img
                                                        src={PUBLICURL + "/assets/imges/icons/notifaction.svg"} alt="language"
                                                        className="me-2" />
                                                        {t('Notifications')}</a></li>
                                                    <li><a className="dropdown-item dark  mb-3" onClick={() => dispatch(setModalStatus({ modalType: CHANGE_PASS_MODAL, isOpen: true, data: null }))}> <img src={PUBLICURL + "/assets/imges/icons/key.svg"}
                                                        alt="language" className="me-2" />
                                                        {t('Change_Password')}</a></li>
                                                    <li><a onClick={() => navigate('/boyo-realestate/help')} className="dropdown-item dark  mb-3"> <img
                                                        src={PUBLICURL + "/assets/imges/icons/help.png"} alt="language" className="me-2" />
                                                        {t('Help')}</a></li>
                                                    <li>
                                                        <a className="dropdown-item dark  mb-3" href="#logout-profile" data-bs-toggle="modal" >
                                                            <img
                                                                src={PUBLICURL + "/assets/imges/icons/logout.svg"} alt="language" className="me-2" />
                                                            {t('Logout')}
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>

            {/* < !-- ====================================== modal ====================================== --> */}

            {isModalOpen.modalType === 'EDIT_PROFILE_MODAL' && (
                <EditProfileModal setToken={setToken} />
            )}

            {isModalOpen.modalType === 'CHANGE_PASS_MODAL' && (
                <ChangePassModal />
            )}

            {isModalOpen.modalType === 'EDIT_PROFILE_BY_OTP_MODAL' && (
                <EditProfileByOtpModal />
            )}

            {isModalOpen.modalType === 'PROPERTIES_ATTRIBUTE_MODAL' && (
                <AttributeModal attributes={attributes} setAttributes={setAttributes} />
            )}

            {amenityOpen.modalType === 'PROPERTIES_AMENITES_MODAL' && (
                <AmenitiesModal amenities={amenities} setAmenities={setAmenities} />
            )}

            {
                agentOpen.modalType === "AGENT_MODAL" && (
                    <AgentModal />
                )
            }
            {
                agentOpen.modalType === "SUB_MODAL" && (
                    <SubscriptionModal />
                )
            }
            {
                lenderOpen.modalType === "LENDER_MODAL" && (
                    <LenderModal />
                )
            }
            {
                lenderOpen.modalType === "LENDER_SUB_MODAL" && (
                    <LenderSubscriptionModal />
                )
            }

            {/* logout modal */}
            <div className="delete_profile-popup">
                <div className="modal fade" id="logout-profile" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content text-center">
                            <div className="modal-body">
                                <div className="delet-popup-content">
                                    <img src="./assets/img/delet-popup-img.png" alt="" className="delet-popup-img" />
                                    <h3 className="fs-22 fw-7 dark black">{t("Logout")}</h3>
                                    <p className="fs-16 fw-4 gray1">{t("Are_you_sure_you_want_to_logout")}</p>

                                    <button className="yes-delete" data-bs-dismiss="modal" onClick={handleLogout}>{t("Yes_Logout")}</button>
                                    <a href="" className="fs-14 fw-5 gray1" data-bs-dismiss="modal">{t("No, Thanks")}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default InnerHeader;