import { useEffect, useRef, useState } from "react";
import SignInModal from "../../../models/SignInModal";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { PUBLICURL } from "../../../utils/common.service";
import { useDispatch, useSelector } from "react-redux";
import { SIGN_IN_MODAL } from "../../../app.config";
import { setModalStatus } from "../../../store/slice/masterSlice";
import SignUpModal from "../../../models/SignUpModal";
import SignUpVerifyModal from "../../../models/SignUpVerifyModal";
import CompleteProfile from "../../../models/ProfileModal";
import SuccessModal from "../../../models/SucessModal";
import ForgotModal from "../../../models/ForgotModal";
import SignInVerifyModal from "../../../models/SignInVerifyModal";
import ResetPasswordModal from "../../../models/ResetPasswordModal";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import Select from 'react-select';
import { getLandingProperty } from "../../../store/slice/landingSlice";
import i18n from "../../../component/i18n";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import current_location from "../../../location_current.png"
import AgentModal from "../../../models/AgentModal";
import LenderModal from "../../../models/LenderModal";
import { Offcanvas } from "react-bootstrap";
import SearchLocation from "../../SearchLocation";

const Header = ({ address, setAddress, setToken, selectedStatus, selectPropCategory }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { isModalOpen } = useSelector((state) => state.master);
    const { agentOpen } = useSelector((state) => state.agent);
    const { lenderOpen } = useSelector((state) => state.lender);
    const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);

    const path = useLocation();
    const pathname = path?.pathname?.split('/')[2];
    const [selectedLanguage, setSelectedLanguage] = useState(Cookies.get('language') || 'English');
    const [isOpen, setIsOpen] = useState(false);


    const handleLanguageChange = (lang, langShort) => {
        setSelectedLanguage(lang);
        Cookies.set('languageCW', langShort, { expires: 2 });
        Cookies.set('language', lang, { expires: 2 });
        i18n.changeLanguage(langShort);
        setIsOpen(false);
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const { register, handleSubmit, setValue, control, watch, formState: { errors }, clearErrors } = useForm();

    // //get current location
    // const getCurrentLocation = () => {
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(
    //             async (position) => {
    //                 const { latitude, longitude } = position.coords;
    //                 setCoordinates({ lat: latitude, lng: longitude });
    //                 const results = await geocodeByAddress(`${latitude},${longitude}`);
    //                 const address = results[0].formatted_address;
    //                 setAddress(address);
    //                 localStorage.setItem("location", address);
    //                 handleSelect(address);
    //             },
    //             (error) => console.error('Error fetching current location:', error)
    //         );
    //     } else {
    //         alert('Geolocation is not supported by this browser.');
    //     }

    // };

    // const handleSelect = async (value) => {
    //     try {
    //         setShowRecentSearches(prev => !prev);
    //         const results = await geocodeByAddress(value);
    //         const latlong = await getLatLng(results[0]);
    //         const formattedAddress = results[0].formatted_address;

    //         setValue("address", value);
    //         setValue("latitude", latlong.lat);
    //         setValue("longitude", latlong.lng);
    //         setAddress(value);
    //         localStorage.setItem("location", value);
    //         setCoordinates(latlong);

    //         let updatedRecentSearches = [...recentSearches];
    //         const existingIndex = updatedRecentSearches.findIndex(search => search === address);

    //         if (existingIndex !== -1) {
    //             updatedRecentSearches.splice(existingIndex, 1);
    //         }

    //         updatedRecentSearches = [formattedAddress, ...updatedRecentSearches.slice(0, 2)];
    //         setRecentSearches(updatedRecentSearches);
    //         Cookies.set('recentSearches', JSON.stringify(updatedRecentSearches));

    //         const offcanvasElement = document.getElementById('offcanvasExample');
    //         offcanvasElement.classList.remove('show');
    //         document.body.classList.remove('offcanvas-open');
    //         const backdrop = document.querySelector('.offcanvas-backdrop');
    //         if (backdrop) {
    //             backdrop.remove();
    //         }

    //         if (formattedAddress) {
    //             filters = `${filters}&search=${formattedAddress}`;
    //             if (selectedStatus) {
    //                 if (selectPropCategory) {
    //                     navigate(`/boyo-realestate/list-of-property?search=${formattedAddress}&selectedStatus=${selectedStatus}&property_category_id=${selectPropCategory}`);
    //                 } else {
    //                     navigate(`/boyo-realestate/list-of-property?search=${formattedAddress}&selectedStatus=${selectedStatus}`);
    //                 }
    //             } else if (selectPropCategory) {
    //                 navigate(`/boyo-realestate/list-of-property?search=${formattedAddress}&property_category_id=${selectPropCategory}`);
    //             } else {
    //                 navigate(`/boyo-realestate/list-of-property?search=${formattedAddress}`);
    //             }
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

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

    const openModal = async () => {
        const offcanvasElement = document.getElementById('offcanvasExample');
        offcanvasElement.classList.remove('show');
        document.body.classList.remove('offcanvas-open');
        const backdrop = document.querySelector('.offcanvas-backdrop');
        if (backdrop) {
            backdrop.remove();
        }
        dispatch(setModalStatus({ modalType: SIGN_IN_MODAL, isOpen: true, data: [] }))
    }

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

    useEffect(() => {
        const handleScroll = () => {
            const header = document.querySelector(".page-header");
            if (header) {
                const currentScroll = window.pageYOffset;
                const toggleClass = "is-sticky";
                if (currentScroll > 150) {
                    header.classList.add(toggleClass);
                } else {
                    header.classList.remove(toggleClass);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        if (pathname == "list-of-property" || pathname == undefined) {
            if (address == '') {
                if (selectedStatus) {
                    navigate(`/boyo-realestate/list-of-property?selectedStatus=${selectedStatus}`)
                }
                else {
                    localStorage.setItem('location', address);
                    navigate('/');
                }
            }
        }
    }, [address]);

    useEffect(() => {
        const handleScriptLoad = () => {
            setIsScriptLoaded(true);
        };

        if (window.google) {
            handleScriptLoad();
        } else {
            // Create the script tag for Google Maps API
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDhuJrjhS1JNrk61fisAcb1_-rCN1QXPeI&loading=async&libraries=places&callback=initMap`;
            script.async = true;
            script.defer = true;
            script.onload = handleScriptLoad;
            document.head.appendChild(script);
        }

        return () => {
            window.removeEventListener('googleMapsScriptLoaded', handleScriptLoad);
        };
    }, []);

    if (!isScriptLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <header className="page-header px-80 py-3">
                <nav className="navbar navbar-expand-lg">
                    <div className="container-fluid">
                        <a className="navbar-brand" style={{ cursor: "pointer" }} onClick={() => handleDashboard()}><img src={PUBLICURL + "/assets/imges/icons/boyo-logo.svg"} alt="boyo logo" /></a>
                        <ul className="left_menu  d-lg-none d-flex">
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

                            <button className="btn sign_in" type="button" onClick={() => dispatch(setModalStatus({ modalType: SIGN_IN_MODAL, isOpen: true, }))}>{t('Sign_up_or_Sign_in')}</button>
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
                                <button type="button" className="btn btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                            </div>
                            <div className="offcanvas-body">
                                <div className="menubar ">
                                    <nav className="navbar ">
                                        <div className="d-none d-lg-inline-block">
                                            <SearchLocation
                                                address={address}
                                                setAddress={setAddress}
                                                setToken={setToken}
                                                selectedStatus={selectedStatus}
                                                selectPropCategory={selectPropCategory}
                                            />
                                        </div>
                                        {/* <ul className="location_dropdown d-none d-lg-inline-block">
                                            {
                                                pathname === "list-property" || pathname === "properties-categories" || pathname === "help" || pathname === "advertise-your-property" ||
                                                    pathname === "contact-us" || pathname === "property-details" || pathname === "agent" || pathname === "lenders" || pathname === "resources"
                                                    ?
                                                    <li style={{ minWidth: "300px", maxWidth: "300px", border: "none" }}></li>
                                                    :
                                                    <>
                                                        <li className="nav-item dropdown" style={{ minWidth: "300px", maxWidth: "300px", border: "none" }}>
                                                            <div className="input_fild position-relative">
                                                                <PlacesAutocomplete
                                                                    value={address}
                                                                    onChange={setAddress}
                                                                    onSelect={handleSelect}
                                                                >
                                                                    {({
                                                                        getInputProps,
                                                                        suggestions,
                                                                        getSuggestionItemProps,
                                                                        loading,
                                                                    }) => (
                                                                        <>
                                                                            <img style={{ position: "absolute", top: "17px", zIndex: "99", right: "-27px", backgroundColor: "none" }} src={current_location} height={20} width={20} onClick={getCurrentLocation}></img>

                                                                            <div className="password">
                                                                                <span className="location">
                                                                                    <img
                                                                                        src={PUBLICURL + "/assets/imges/icons/downdrop-down.svg"} alt="drop-icon" className="ms-2" />
                                                                                </span>
                                                                                <input
                                                                                    {...getInputProps({
                                                                                        placeholder: t('Enter_address'),
                                                                                        className: "form-control text-dark w-100",
                                                                                    })}
                                                                                    onClick={() => setShowRecentSearches(prev => !prev)}
                                                                                    value={address}
                                                                                />
                                                                                <div className="autocomplete-dropdown-container" style={{ position: "absolute", top: "100%", left: "0", width: "100%", zIndex: "1000" }}>
                                                                                    {loading ? <div>{t('Loading')}</div> : null}
                                                                                    <ol style={{ listStyleType: "none", padding: 0 }}>
                                                                                        {suggestions.map((suggestion, index) => {
                                                                                            const style = {
                                                                                                backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                                                                                                padding: "10px",
                                                                                                cursor: "pointer",
                                                                                                borderBottom: "1px solid #ddd"
                                                                                            };
                                                                                            return (
                                                                                                <li
                                                                                                    {...getSuggestionItemProps(suggestion, { style })}
                                                                                                    key={index}
                                                                                                >
                                                                                                    {suggestion.description}
                                                                                                </li>
                                                                                            );
                                                                                        })}
                                                                                    </ol>
                                                                                </div>
                                                                                {!address && showRecentSearches && (
                                                                                    <div style={{ position: "absolute", top: "100%", left: "0", width: "100%", zIndex: "1000", backgroundColor: "#fff", border: "1px solid #ddd", marginTop: "5px", borderRadius: "4px", overflowY: "auto", maxHeight: "200px" }}>
                                                                                        <h5 className="p-2">{t('Recent_Searches')}:</h5>
                                                                                        <ol style={{ padding: "0 10px" }}>
                                                                                            {recentSearches.map((search, index) => (
                                                                                                <li key={index} className="p-2" style={{ cursor: "pointer", borderBottom: "1px solid #ddd" }} onClick={() => handleSelect(search)}>
                                                                                                    {search}
                                                                                                </li>
                                                                                            ))}
                                                                                        </ol>
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                        </>
                                                                    )}
                                                                </PlacesAutocomplete>
                                                            </div>
                                                        </li>
                                                    </>
                                            }
                                        </ul> */}

                                        <ul className="navbar-nav">
                                            <li className="nav-item">
                                                <a
                                                    className={`nav-link Secondary-Black ${selectedStatus === 'sale' ? 'active' : ''}`}
                                                    onClick={() => handleStatusChange('sale')}
                                                // data-bs-dismiss="offcanvas" aria-label="Close"
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
                                                <Link className="nav-link Secondary-Black" onClick={() => openModal()}>{t('Sell')}</Link>
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
                                            <li className="d-lg-none">
                                                <Link className="nav-link Secondary-Black" onClick={() => dispatch(setModalStatus({ modalType: SIGN_IN_MODAL, isOpen: true, data: [] }))}>{t('List a Property')}</Link>
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

                                        <Link className="btn blue_btn" onClick={() => dispatch(setModalStatus({ modalType: SIGN_IN_MODAL, isOpen: true, data: [] }))}>{t('List a Property')}</Link>

                                        <button className="btn sign_in" type="button" onClick={() => dispatch(setModalStatus({ modalType: SIGN_IN_MODAL, isOpen: true, data: [] }))}>{t('Sign_up_or_Sign_in')}</button>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header >

            {
                isModalOpen.modalType === 'SIGN_IN_MODAL' && (
                    <SignInModal setToken={setToken} />
                )
            }
            {
                isModalOpen.modalType === 'SIGN_UP_MODAL' && (
                    <SignUpModal />
                )
            }
            {
                isModalOpen.modalType === 'OTP_VERIFICATION_MODAL' && (
                    <SignUpVerifyModal />
                )
            }
            {
                isModalOpen.modalType === 'COMPLETE_PROFILE_MODAL' && (
                    <CompleteProfile />
                )
            }
            {
                isModalOpen.modalType === 'SUCCESS_MODAL' && (
                    <SuccessModal setToken={setToken} />
                )
            }
            {
                isModalOpen.modalType === 'FORGOT_PASS_MODAL' && (
                    <ForgotModal />
                )
            }
            {
                isModalOpen.modalType === 'FORGOT_OTP_MODAL' && (
                    <SignInVerifyModal />
                )
            }
            {
                isModalOpen.modalType === 'RESET_PASSWORD_MODAL' && (
                    <ResetPasswordModal />
                )
            }
            {
                agentOpen.modalType === "AGENT_MODAL" && (
                    <AgentModal />
                )
            }
            {
                lenderOpen.modalType === "LENDER_MODAL" && (
                    <LenderModal />
                )
            }

        </>
    )
}

export default Header;