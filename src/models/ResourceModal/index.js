import { useDispatch, useSelector } from "react-redux";
import CustomModal from "../../component/CustomModal";
import { useEffect, useState } from "react";
import { getPropertyAmenitiesList } from "../../store/slice/categorySlice";
import '../../amenity.css'
import AmenityCustomModal from "../../component/AmenityCustomModal";
import { useForm } from "react-hook-form";
import { setAmenityStatus } from "../../store/slice/amenitiyModalSlice";
import { AGENT_MODAL, PROPERTIES_AMENITES_MODAL } from "../../app.config";
import AgentCustomModal from "../../component/AgentCustomModal";
import { PUBLICURL, TOAST_ERROR, TOAST_SUCCESS, convertToBase64 } from "../../utils/common.service";
import { setAgentStatus } from "../../store/slice/agentSlice";
import { getCountryList } from "../../store/slice/masterSlice";
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from "react-places-autocomplete";
import * as API from "../../utils/api.service";
import { uploadImageOnAWS } from "../../utils/aws.service";
import Cookies from "js-cookie";
import { getUserDetails } from "../../store/slice/userSlice";
import { useTranslation } from "react-i18next";

const ResourceModal = () => {
    const dispatch = useDispatch();
    const [previewImage, setPreviewImage] = useState('');
    const [previewId, setPreviewId] = useState(null);
    const [previewLicense, setPreviewLicense] = useState(null);
    const { countryList: { data: countryList } } = useSelector((state) => state.master);
    const { userDetails: { data: userDetails } } = useSelector((state) => state.user);
    const {t} = useTranslation();
    const token = Cookies.get('tokenCA');
    const [address, setAddress] = useState("");
    const [coordinates, setCoordinates] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSelect = async (value) => {
        try {
            const results = await geocodeByAddress(value);
            const latlong = await getLatLng(results[0]);
            setValue("address", results[0].formatted_address);
            setValue("latitude", latlong.lat);
            setValue("longitude", latlong.lng);
            setAddress(value);
            setCoordinates(latlong);
        } catch (error) { console.log(error); }
    };

    const handleKeyPress = (event) => {
        const keyCode = event.keyCode || event.which;
        const keyValue = String.fromCharCode(keyCode);
        const isValidNumber = /^[0-9]+$/.test(keyValue);

        if (!isValidNumber) {
            event.preventDefault();
        }
    };


    const {
        register,
        handleSubmit,
        setValue,
        clearErrors,
        reset,
        watch,
        trigger,
        control,
        formState: { errors },
    } = useForm();

    const onSubmit = async (body) => {
        try {
            setLoading(true);
            if (body.profile_image instanceof Blob) body.profile_image = await uploadImageOnAWS(body.profile_image, "agent_profile");

            if (body.id_card instanceof Blob) body.id_card = await uploadImageOnAWS(body.id_card, "agent_id_card");

            if (body.license instanceof Blob) body.license = await uploadImageOnAWS(body.license, "agent_license");

            const { data, message, code } = await API.createAgentApi(body);

            if (code === '1') {
                // Cookies.set('dataAgent', data[0], { expires: 2 });
                setLoading(false);
                TOAST_SUCCESS(message);
                dispatch(setAgentStatus({ modalType: "", isOpen: false, data: [] }));
            }

        } catch (err) {
            console.log('err.message :', err.message);
            TOAST_ERROR(err.message);
        }
    };

    const handleImageChange = async (file, field) => {
        if (file) {
            setValue(field, file);
            clearErrors(field);
            const preview = await convertToBase64(file);
            if (field === "id_card") {
                setPreviewId(preview);
            } else if (field === "license") {
                setPreviewLicense(preview);
            }
            else {
                setPreviewImage(preview);
            }
            await trigger(field);
        }
    };


    useEffect(() => {
        dispatch(getCountryList());
    }, []);

    return (
        <div className="signin_modal">
            <AgentCustomModal>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        <div className="col-12">
                            <div className="signin_card">
                                <h6 className="signin-title">{t("Become Property Agent")}</h6>
                                <p className="verify">{t("Guide clients to their perfect properties as a Property Agent")} </p>
                                <div className="user_profile-box">
                                    <label>
                                        <img src={previewImage ? previewImage : `${PUBLICURL}/assets/imges/default_profile_Image.png`} className="rounded-circle" style={{ height: "100px", width: "100px" }} alt="Profile Image" />
                                        <input
                                            {...register("profile_image", {
                                                validate: (val) => {
                                                    watch(val)
                                                    if (!val || val.length === 0) {
                                                        return t("please select profile image");
                                                    }
                                                },
                                            })}
                                            onChange={(e) => handleImageChange(e.target.files[0], "profile_image")}
                                            type="file"
                                            name="profile_image"
                                            accept="image/*"
                                            style={{ display: "none" }}
                                        />
                                    </label>
                                    <div>
                                        <h6>{t("Upload Profile")}</h6>
                                        <button type="button" onClick={() => document.getElementById("profile_image").click()} className="btn blue_btn">{t("Browse")}</button>
                                        <input
                                            id="profile_image"
                                            onChange={(e) => handleImageChange(e.target.files[0], "profile_image")}
                                            type="file"
                                            name="profile_image"
                                            accept="image/*"
                                            style={{ display: "none" }}
                                        />
                                    </div>
                                </div>
                                {errors.profile_image && (
                                    <p role="alert" className="text-danger">
                                        {errors.profile_image?.message}
                                    </p>
                                )}
                                <div className="signin_card-content">
                                    <div className="row">
                                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                            <div className="input_fild mb-4">
                                                <label>{t("Agent Name")}
                                                </label>
                                                <input
                                                    {...register("agent_name", {
                                                        required: "Please enter Agent Name.",
                                                        pattern: {
                                                            value: /^[A-Za-z]+(?:[A-Za-z]+)/,
                                                            message: "AgentName must start and end with a letter",
                                                        },
                                                    })}
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="enter agent name" />
                                                {errors.agent_name && (
                                                    <p role="alert" className="text-danger">
                                                        {errors.agent_name?.message}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                            <div className="input_fild mb-4">
                                                <label>Agent Email
                                                </label>
                                                <input
                                                    {...register("email", {
                                                        required: "Please enter Email.",
                                                        pattern: {
                                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                            message: "Please enter a valid email address",
                                                        },
                                                    })}
                                                    type="email"
                                                    className="form-control"
                                                    placeholder="enter email address" />
                                                {errors.email && (
                                                    <p role="alert" className="text-danger">
                                                        {errors.email?.message}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                            <div className="input_fild mb-4">
                                                <label>Mobile Number
                                                </label>
                                                <div className="row mobile_no mx-0">
                                                    <div className="col-3 p-0 d-flex align-items-center justify-content-center">
                                                        <select className="form-select text-start" aria-label="Default select example"
                                                            {...register("country_code_id", {
                                                                required: "Please select country-code",
                                                            })}>
                                                            <option selected value=''>
                                                                1
                                                            </option>
                                                            {
                                                                countryList?.map((country) =>
                                                                    <option key={country?.country_id} value={country?.country_code}>
                                                                        {country?.country_code}-{country?.name}
                                                                    </option>
                                                                )
                                                            }
                                                        </select>
                                                    </div>
                                                    <div className="col-9 p-0">
                                                        <input
                                                            {...register("mobile_number", {
                                                                required: "Please enter Mobile Number and Country Code.",
                                                                pattern: {
                                                                    value: /^[0-9]{10}$/,
                                                                    message: "Mobile Number only contain numbers",
                                                                },
                                                            })}
                                                            type="text"
                                                            onKeyPress={handleKeyPress}
                                                            maxLength={10}
                                                            minLength={10}
                                                            placeholder="Enter mobile number" />
                                                    </div>
                                                </div>
                                                {errors.mobile_number && <span className="text-danger">{errors.mobile_number?.message}</span>}
                                                {errors.country_code_id && <span className="text-danger">{errors.country_code_id?.message}</span>}
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                            <div className="input_fild mb-4">
                                                <label> Address
                                                </label>
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
                                                        <div className="password">
                                                            <span className="location"><img src={PUBLICURL + "/assets/imges/icons/location.svg"} alt="location" /></span>
                                                            <input
                                                                {...getInputProps({
                                                                    placeholder: "Enter address...",
                                                                    className: "form-control"
                                                                })}
                                                            />
                                                            <div>
                                                                {loading ? <div>Loading...</div> : null}
                                                                {
                                                                    suggestions.map((suggestion) => {
                                                                        const style = {
                                                                            backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                                                                            padding: "10px",
                                                                            cursor: "pointer",
                                                                            borderBottom: "1px solid #ddd"
                                                                        };
                                                                        return (
                                                                            <div
                                                                                {...getSuggestionItemProps(suggestion, {
                                                                                    style
                                                                                })}
                                                                            >
                                                                                {suggestion.description}
                                                                            </div>
                                                                        );
                                                                    })}
                                                            </div>
                                                        </div>
                                                    )}
                                                </PlacesAutocomplete>

                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="input_fild mb-4">
                                                <label>Bio
                                                </label>
                                                <textarea name="" id="" cols="5" rows="3" placeholder="Your bio"
                                                    className="form-control"
                                                    {...register("bio")}
                                                ></textarea>
                                            </div>
                                        </div>
                                        <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12">
                                            <div className="uplod-content">
                                                <h6>Upload Document</h6>
                                                <p>(Document/Image/Pdf)</p>
                                            </div>
                                            <div className="row">
                                                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 mt-4">
                                                    <div className="uplod_vedio_card mb-2 uplod_box">
                                                        <label className="uplod-img">
                                                            {!previewId ? <i className="fa-solid fa-plus me-1"></i> : <img src={previewId} style={{ height: "280px", width: "100%" }} />}
                                                            <input
                                                                {...register("id_card", {
                                                                    validate: (val) => {
                                                                        if (!val || val.length === 0) {
                                                                            return "Please select an ID card";
                                                                        }
                                                                    },
                                                                })}
                                                                onChange={(e) => handleImageChange(e.target.files[0], "id_card")}
                                                                type="file"
                                                                accept="image/*"
                                                            />
                                                        </label>
                                                        {!previewId && <p>Upload</p>}
                                                    </div>
                                                    {errors.id_card && (
                                                        <p role="alert" className="text-danger">
                                                            {errors.id_card?.message}
                                                        </p>
                                                    )}
                                                    <p className="verify text-center p-0">Id Card</p>
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 mt-4">
                                                    <div className="uplod_vedio_card mb-2 uplod_box">
                                                        <label className="uplod-img">
                                                            {!previewLicense ? <i className="fa-solid fa-plus me-1"></i> : <img src={previewLicense} style={{ height: "280px", width: "100%" }} />}
                                                            <input
                                                                {...register("license", {
                                                                    validate: (val) => {
                                                                        if (!val || val.length === 0) {
                                                                            return "Please select a license";
                                                                        }
                                                                    },
                                                                })}
                                                                onChange={(e) => handleImageChange(e.target.files[0], "license")}
                                                                type="file"
                                                                accept="image/*"
                                                            />
                                                        </label>
                                                        {!previewLicense && <p>Upload</p>}

                                                    </div>
                                                    {errors.license && <p className="text-danger">{errors.license.message}</p>}
                                                    <p className="verify text-center p-0">License</p>
                                                </div>
                                            </div>

                                        </div>
                                        <div className=" col-12">
                                            <div className="top_line mt-4"></div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 mt-4">
                                            <button
                                                className="btn sign_in w-100"
                                                onClick={() => dispatch(setAgentStatus({
                                                    modalType: AGENT_MODAL,
                                                    isOpen: false,
                                                    data: [],
                                                }))}
                                            >Cancel</button>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 mt-4">
                                            <button className="btn blue_btn w-100" type="submit" disabled={loading}>
                                                {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : 'Create'}
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </AgentCustomModal >
        </div >
    )
}

export default ResourceModal;