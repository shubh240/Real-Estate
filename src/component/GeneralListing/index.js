import { useLocation, useNavigate } from "react-router-dom";
import { PUBLICURL, TOAST_ERROR, TOAST_SUCCESS, convertToBase64 } from "../../utils/common.service";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { getHomeProperty } from "../../store/slice/landingSlice";
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { addHours } from 'date-fns';
import '../../datetime.css';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';
import { useForm, Controller } from "react-hook-form";
import { getProperty } from "../../store/slice/myPropertySlice";
import moment from "moment/moment";
import { uploadImageOnAWS } from "../../utils/aws.service";
import * as API from "../../utils/api.service";
import { setLoader } from "../../store/slice/masterSlice";
import { useTranslation } from "react-i18next";
import { FCFA_CURRENCY } from "../../app.config";

const GeneralListing = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const token = Cookies.get('tokenCA');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);
    const [address, setAddress] = useState('');
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });
    const [selectedProperty, setSelectedProperty] = useState(null);
    const defaultCenter = { lat: -34.397, lng: 150.644 };
    const { properties: { data: properties } } = useSelector((state) => state.myProperty);
    const [previewImage, setPreviewImage] = useState([]);
    const [loading, setLoading] = useState(false);
    const [estimationPrice, setEstimationPrice] = useState(0);
    const [placeEstimation, setPlaceEstimation] = useState(null)
    const [dayDiff, setDayDiff] = useState(0);
    const addData = location?.state?.addData;
    const path = location.pathname.split('/')[2];
    const { register, control, handleSubmit, formState: { errors }, setValue, reset, watch, clearErrors } = useForm({
        defaultValues: {
            property_image: [],
        },
    });
    const { t } = useTranslation();
    const selectedOption = watch("selectedOption");

    const onSubmit = async (body) => {
        const uploadedImages = await Promise.all(
            Array.from(body.property_image).map(async (file) => {
                if (file instanceof Blob) return await uploadImageOnAWS(file, "advertise_banners");
                return file;
            })
        );

        const start_date = moment(body.startDate).format('YYYY-MM-DD');
        const end_date = moment(body.endDate).format('YYYY-MM-DD');

        const requestBody = {
            property_id: body?.property,
            option: body?.selectedOption,
            start_date,
            end_date,
            total_amount: estimationPrice,
            ad_image: uploadedImages
        };

        if (body?.address) {
            requestBody.address = body.address;
        }

        if (body?.latitude) {
            requestBody.latitude = body.latitude;
        }

        if (body?.longitude) {
            requestBody.longitude = body.longitude;
        }

        try {
            setLoading(true);
            const obj = {
                advertise_id: addData?.id,
                property_id: body?.property,
                options: addData?.options,
                address: body?.address,
                latitude: body?.latitude,
                longitude: body?.longitude,
                ad_image: uploadedImages
            };

            const { code, message, data } = addData ?
                await API.editAdvertiseApi(obj) :
                await API.createAdvertiseApi(requestBody);

            setLoading(false);
            if (code == 1) {
                navigate('/boyo-realestate/property-advertisement');
                TOAST_SUCCESS(message);
            }
        } catch (error) {
            setLoading(false);
            TOAST_ERROR(error);
        }
    };


    const isStartDateValid = (date) => {
        const now = new Date();
        return date >= now;
    };

    const isEndDateValid = (date) => {
        return date > startDate;
    };

    const handleStartDateChange = (date, onChange) => {
        onChange(date);
        setStartDate(date);
        if (endDate && date >= endDate) {
            setEndDate(null);
            setDayDiff(0);
        } else if (endDate) {
            const diff = Math.ceil((endDate - date) / (1000 * 60 * 60 * 24));
            setDayDiff(diff);
        }
    };

    const handleEndDateChange = (date, onChange) => {
        onChange(date);
        setEndDate(date);
        if (startDate) {
            const diff = Math.ceil((date - startDate) / (1000 * 60 * 60 * 24));
            setDayDiff(diff);
        }
    };

    const options = Array.isArray(properties) ? properties.map((property) => {
        const imageUrl = property?.property_images?.length > 0 ? property.property_images[0].property_images : null;
        const images = property?.property_images?.length > 0 ? property.property_images.map(img => img.image) : [];

        return {
            value: property?.property_id,
            label: property?.property_name,
            imageUrl,
            images
        };
    }) : [];

    const customStyles = {
        control: (provided) => ({
            ...provided,
            backgroundColor: '#f8f9fa',
            borderColor: '#ced4da',
            borderRadius: '4px',
            padding: '5px',
            boxShadow: 'none'
        }),
        menu: (provided) => ({
            ...provided,
            zIndex: 9999,
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#0d6efd' : state.isFocused ? '#e9ecef' : null,
            color: state.isSelected ? '#fff' : '#495057',
            '&:active': {
                backgroundColor: '#0d6efd',
                color: '#fff',
            },
        }),
        singleValue: (provided) => ({
            ...provided,
            color: '#495057',
        }),
    };

    const getPlaceDetails = async (placeId) => {
        const service = new window.google.maps.places.PlacesService(document.createElement('div'));

        return new Promise((resolve, reject) => {
            service.getDetails({ placeId }, (place, status) => {
                if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                    resolve(place);
                } else {
                    reject(status);
                }
            });
        });
    };

    //select address
    const handleSelect = async (value) => {
        try {
            const results = await geocodeByAddress(value);
            const latlong = await getLatLng(results[0]);
            const placeDetails = await getPlaceDetails(results[0].place_id);
            setValue("address", results[0].formatted_address);
            setValue("latitude", latlong.lat);
            setValue("longitude", latlong.lng);
            setAddress(value);
            setCoordinates(latlong);
            setSelectedPlace(latlong);
            setMapCenter(latlong);
            setPlaceEstimation({
                name: placeDetails.name,
                address: placeDetails.formatted_address,
                priceAdjustment: 50,
            })
        } catch (error) { console.log(error); }
    };

    //Image Change
    const handleImageChange = async (files) => {
        const newImages = [];

        for (let i = 0; i < files?.length; i++) {
            const file = files[i];
            const base64 = await convertToBase64(file);
            newImages.push(base64);
        }
        setPreviewImage([...previewImage, ...newImages]);
        setValue("property_image", [...watch("property_image"), ...files]);
        clearErrors("property_image");
    };

    // Delete Image
    const handleDeleteImage = (index) => {
        const updatedPreviewImages = previewImage.filter((_, i) => i !== index);
        setPreviewImage(updatedPreviewImages);

        const updatedPropertyImages = watch("property_image").filter((_, i) => i !== index);
        setValue("property_image", updatedPropertyImages);
    };

    useEffect(() => {
        if (token) {
            dispatch(getProperty({ page: 1 }))
        }
        if (addData) {
            const initialImages = addData?.images
                || [];

            const parsedStartDate = moment(addData?.start_date).format('YYYY-MM-DD');
            const parsedEndDate = moment(addData?.end_date).format('YYYY-MM-DD');

            reset({
                property: addData?.property_id,
                property_image: initialImages.map(image => image.file)
            })
            setSelectedProperty(options.find(option => option.value === addData?.property_id));
            setPreviewImage(initialImages.map(image => image));
            // setStartDate(parsedStartDate);
            setAddress(addData?.address || "");
            setCoordinates({
                lat: addData?.latitude || null,
                lng: addData?.longitude || null
            });
            setValue("address", addData?.address);
            setValue("latitude", addData?.latitude);
            setValue("longitude", addData?.longitude);
            // setEndDate(parsedEndDate);
            setValue("property_image", addData?.add_image?.map((e) => e));
            setEstimationPrice(addData?.estimation_price);
        }
    }, []);

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

    useEffect(() => {
        if (selectedOption && startDate && endDate) {
            const fetchData = async () => {
                try {
                    let requestBody = {
                        listing_type: selectedOption,
                        day_diff: dayDiff
                    }
                    const { code, message, data } = await API.estimationPriceApi(requestBody);
                    setEstimationPrice(data.total_price);

                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };
            fetchData();
        }
    }, [selectedOption, startDate, endDate]);

    if (!isScriptLoaded) {
        return <div>Loading...</div>;
    }

    // const getMapUrl = () => {
    //     if (!address) return '';
    //     return `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=3&ie=UTF8&iwloc=&output=embed&markers=color:red%7Clabel:%7C${coordinates.lat},${coordinates.lng}`;
    // };


    const mapSrc = `https://maps.google.com/maps?q=${coordinates?.lat},${coordinates?.lng}&hl=es&z=14&output=embed&markers=${coordinates?.lat},${coordinates?.lng}`;

    return (
        <main className="page_wrapper">
            <section className="favorite-view_sec px-80">
                <div className="fav_view">
                    {
                        path === "advertise-your-property" ?
                            <h2>{t("Create Property Advertisement")}</h2>
                            :
                            <h2>{t("Edit Property Advertisement")}</h2>
                    }
                    <p>{t("Attract buyers or renters easily with simple")}.</p>
                </div>
            </section>
            <section className="advertise_sec px-80 pb-100">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="faq_headline">
                                <h6 className="fs-24 pb-2">{t("How would you like to advertise your property")}</h6>
                            </div>
                        </div>
                        {
                            addData ? "" :
                                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                    <div className="row">
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mt-2 mt-sm-0">
                                            <a>
                                                <div className={`gender d-flex align-items-center ${selectedOption == "General Listing" ? "active" : ""} `}>
                                                    <div className="form-check">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="selectedOption"
                                                            id="flexRadioDefault1"
                                                            value="General Listing"
                                                            {...register("selectedOption", { required: t("Please select an advertising option") })}
                                                        />
                                                    </div>
                                                    <p className="m-0">{t("General Listing")}</p>
                                                </div> 
                                            </a>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mt-2 mt-sm-0">
                                            <a>
                                                <div className={`gender d-flex align-items-center ${selectedOption == "Landing Listing" ? "active" : ""} `}>
                                                    <div className="form-check ">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="selectedOption"
                                                            id="flexRadioDefault2"
                                                            value="Landing Listing"
                                                            {...register("selectedOption", { required: t("Please select an advertising option") })}
                                                        />
                                                    </div>
                                                    <p className="m-0">{t("Advertise on Landing Page")}</p>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                    {errors.selectedOption && <p className="error-message text-danger">{errors.selectedOption.message}</p>}
                                </div>
                        }
                    </div>
                    <div className="top_line mt-2 mt-sm-4"></div>
                    <form onSubmit={handleSubmit(onSubmit)} className="row">
                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 order-lg-1 order-2">

                            <div className="contact_form advertise">
                                <div className="row justify-content-center">

                                    {/* Property Select */}
                                    <div className="col-12">
                                        <div className="input_field mb-4">
                                            <label>{t("Select your property")}</label>
                                            <Controller
                                                name="property"
                                                control={control}
                                                defaultValue=""
                                                rules={{ required: t("Please select a property") }}
                                                render={({ field }) => (
                                                    <Select
                                                        {...field}
                                                        options={options}
                                                        styles={customStyles}
                                                        value={selectedProperty}
                                                        onChange={(value) => {
                                                            setSelectedProperty(value);
                                                            setValue("property", value ? value.value : '');
                                                        }}
                                                        placeholder={t("Select your property")}
                                                        classNamePrefix="react-select"
                                                        aria-label="Select your property"
                                                    />
                                                )}
                                            />
                                            {selectedProperty == null && errors.property && <p className="error-message text-danger">{errors.property.message}</p>}
                                        </div>
                                    </div>


                                    {/* Start Date Select */}
                                    {
                                        addData ? "" :
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                                                <div className="input_field mb-4">
                                                    <label>{t("Start Date & Time")}</label>
                                                    <div className="Startdate_input">
                                                        <div className="password w-100">
                                                            <Controller
                                                                control={control}
                                                                name="startDate"
                                                                rules={{ required: t("Please select start date-time") }}
                                                                render={({ field }) => (
                                                                    <DatePicker
                                                                        {...field}
                                                                        selected={startDate}
                                                                        onChange={(date) => handleStartDateChange(date, field.onChange)}
                                                                        dateFormat="dd/MM/yyyy"
                                                                        className={`form-control`}
                                                                        placeholderText={t("Select date")}
                                                                        minDate={new Date()}
                                                                        filterTime={isStartDateValid}
                                                                    />
                                                                )}
                                                            />
                                                            <span><img src={PUBLICURL + "/assets/imges/icons/date.svg"} alt="date-time" /></span>
                                                        </div>
                                                    </div>
                                                    {errors.startDate && <p className="error-message text-danger">{errors.startDate.message}</p>}
                                                </div>
                                            </div>
                                    }

                                    {/* End Date Select */}
                                    {
                                        addData ? "" :
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                                                <div className="input_field mb-4">
                                                    <label>{t("End Date & Time")}</label>
                                                    <div className="Startdate_input">
                                                        <div className="password w-100">
                                                            <Controller
                                                                control={control}
                                                                name="endDate"
                                                                rules={{ required: t("Please select end date-time") }}
                                                                render={({ field }) => (
                                                                    <DatePicker
                                                                        {...field}
                                                                        selected={endDate}
                                                                        onChange={(date) => handleEndDateChange(date, field.onChange)}
                                                                        dateFormat="dd/MM/yyyy"
                                                                        className={`form-control`}
                                                                        placeholderText={t("Select date & time")}
                                                                        minDate={startDate && startDate !== null ? new Date(startDate).getTime() + (24 * 60 * 60 * 1000) : new Date()}
                                                                        filterTime={isEndDateValid}
                                                                    />
                                                                )}
                                                            />
                                                            <span><img src={PUBLICURL + "/assets/imges/icons/date.svg"} alt="date-time" /></span>
                                                        </div>
                                                    </div>
                                                    {errors.endDate && <p className="text-danger">{errors.endDate.message}</p>}
                                                </div>
                                            </div>
                                    }


                                    <div className="col-12">
                                        <div className="faq_headline">
                                            <h6 className="fs-24 pb-2">{t("Targeted Location")}</h6>
                                        </div>
                                        <div className="input_field mb-4">
                                            <label>{t("Select Location")}</label>
                                            <PlacesAutocomplete
                                                value={address}
                                                onChange={setAddress}
                                                onSelect={handleSelect}
                                            >
                                                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                                    <div className="password">
                                                        <span className="location">
                                                            <img src={PUBLICURL + "/assets/imges/icons/location.svg"} alt="location" />
                                                        </span>
                                                        <input
                                                            {...getInputProps({
                                                                placeholder: t("Enter address..."),
                                                                className: "form-control text-dark",
                                                            })}
                                                        />
                                                        <div>
                                                            {loading ? <div>{t("Loading...")}</div> : null}
                                                            {suggestions.map((suggestion) => {
                                                                const style = {
                                                                    backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                                                                };
                                                                return (
                                                                    <div {...getSuggestionItemProps(suggestion, { style })}>
                                                                        {suggestion.description}
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                )}
                                            </PlacesAutocomplete>
                                        </div>
                                        {address && (
                                            // <div className="map_img mt-3">
                                            //     <div className="gmap_canvas">
                                            //         <iframe
                                            //             width="100%"
                                            //             height="450"
                                            //             id="gmap_canvas"
                                            //             src={getMapUrl()}
                                            //             frameBorder="0"
                                            //             scrolling="no"
                                            //             marginHeight="0"
                                            //             marginWidth="0"
                                            //         ></iframe>
                                            //     </div>
                                            // </div>
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
                                        )}
                                    </div>

                                </div>
                            </div>
                        </div>
                        {/* Advertisement Images */}
                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 order-lg-2 order-1 contact_form">
                            <h2 className="headline_txt text-start mb-3">{t("Properties Advertisement Photos")}</h2>
                            <div className="uplod_vedio_card">
                                <Controller name="property_image" control={control} defaultValue={null}
                                    rules={{
                                        // required: "Please choose property image",
                                        // validate: (val) => {
                                        //     if (val.length < 3) {
                                        //         return t("please select at least 3 images");
                                        //     }
                                        // }

                                    }} render={({ field }) => (
                                        <>
                                            <label className="uplod-img">
                                                <i className="fa-solid fa-plus me-1"></i>
                                                <input
                                                    // {...field}
                                                    onChange={(e) => {
                                                        handleImageChange(e.target.files);
                                                    }}
                                                    type="file"
                                                    name='files[]'
                                                    accept="image/png, image/jpg, image/jpeg, image/webp"
                                                    className="d-none"
                                                    multiple
                                                />
                                            </label>
                                            <p>{t("Upload properties photos or videos")}</p>
                                            {errors.property_image && <span className="text-danger">{errors.property_image?.message}</span>}
                                        </>
                                    )} />
                            </div>
                            <div className="row">
                                {previewImage?.slice(0, 6)?.map((image, index) => (
                                    <div key={index} className="col-xl-4 col-lg-6 col-md-4 col-sm-6 col-6">
                                        <div className="property_img_cards" onClick={() => handleDeleteImage(index)}>
                                            <div className="property_img">
                                                <img src={image} alt={`Uploaded ${index}`} />
                                            </div>
                                            <span className="delete_place">
                                                {/* Delete  */}
                                                <img src={PUBLICURL + "/assets/imges/icons/whitw-delete.svg"} alt="delete" />
                                            </span>
                                            <div className="gradient-overlay"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="col-12 order-lg-3 order-3">
                            <div className="top_line mt-2 mt-sm-4"></div>
                            <div className="row">
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mt-3 mt-md-4">
                                    <div className="price">
                                        <h6 dangerouslySetInnerHTML={{ __html: `${FCFA_CURRENCY} ${estimationPrice?.toLocaleString()}` }}></h6>
                                        <p>{t("Approx Estimation Price")}</p>
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                    <div className="row">
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mt-3 mt-md-4">
                                            <a className="btn sign_in w-100" onClick={() => navigate(-1)}>
                                                {t("Cancel")}
                                            </a>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mt-3 mt-md-4">
                                            <button className="btn blue_btn w-100" type="submit" disabled={loading}>
                                                {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> :
                                                    addData ? t('Update') : t('Continue')}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    )
}

export default GeneralListing;