import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { useLocation, useNavigate } from 'react-router-dom';
import current_location from "../../searchlocation.jpg";
import crossimage from "../../crossimage.png";
import { PUBLICURL } from '../../utils/common.service';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import Cookies from "js-cookie";
import { useForm } from 'react-hook-form';
const SearchLocation = ({ address, setAddress, selectedStatus, selectPropCategory }) => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const path = useLocation();
    const pathname = path?.pathname?.split('/')[2];
    const [recentSearches, setRecentSearches] = useState([]);
    const [showRecentSearches, setShowRecentSearches] = useState(false);
    let filters = "";
    const { register, handleSubmit, setValue, control, watch, formState: { errors }, clearErrors } = useForm();

    //get current location
    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
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

    };

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

            let updatedRecentSearches = [...recentSearches];
            const existingIndex = updatedRecentSearches.findIndex(search => search === address);

            if (existingIndex !== -1) {
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

    useEffect(() => {
        const searches = Cookies.get('recentSearches');

        if (searches) {
            setRecentSearches(JSON.parse(searches));
        }
    }, []);

    const hadnleRemoveAddress = () => {
        localStorage.removeItem('location');
        setAddress('')
    }

    return (
        <ul className="location_dropdown search_bar-nav">
            {
                pathname === "list-property" || pathname === "properties-categories" || pathname === "help" || pathname === "advertise-your-property" ||
                    pathname === "contact-us" || pathname === "property-details" || pathname === "agent" || pathname === "lenders" || pathname === "resources"
                    ?
                    // <li style={{ minWidth: "300px", maxWidth: "300px", border: "none" }}></li>
                    <li ></li>
                    :
                    <>
                        <li className="nav-item dropdown" style={{ border: "none", background: "transparent" }}>
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
                                            {
                                                address ?
                                                    <img className='current_location1' style={{cursor : "pointer"}} src={crossimage} height={15} width={15} onClick={()=>hadnleRemoveAddress()}></img>
                                                    :
                                                    <img className='current_location' style={{cursor : "pointer"}} src={current_location} height={20} width={20} onClick={getCurrentLocation}></img>
                                            }

                                            <div className="password input-box">
                                                <input
                                                    {...getInputProps({
                                                        placeholder: t('Enter_address'),
                                                        className: "form-control text-dark input-box-location",
                                                        style:{height : "50px" ,width : "345px"}
                                                    })}
                                                    onClick={() => setShowRecentSearches(prev => !prev)}
                                                    value={address}
                                                />
                                                <div className="autocomplete-dropdown-container" style={{ position: "absolute", top: "100%", left: "0", width: "100%", zIndex: "1000" }}>
                                                    {loading && <div>{t('Loading')}</div>}
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
        </ul>
    )
}

export default SearchLocation;