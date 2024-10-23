import { useEffect, useState } from "react";
import CustomModal from "../../component/CustomModal";
import { PUBLICURL, TOAST_ERROR, TOAST_SUCCESS, convertToBase64 } from "../../utils/common.service";
import { useForm } from "react-hook-form";
import * as API from "../../utils/api.service";
import { uploadImageOnAWS } from "../../utils/aws.service";
import { useDispatch, useSelector } from "react-redux";
import { getCountryList, setModalStatus } from "../../store/slice/masterSlice";
import { getUserDetails } from "../../store/slice/userSlice";
import moment from 'moment';
import Cookies from "js-cookie";
import { EDIT_PROFILE_BY_OTP_MODAL } from "../../app.config";
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from "react-places-autocomplete";
import { json } from "react-router-dom";
import { useTranslation } from "react-i18next";

const EditProfileModal = ({ setToken }) => {
    const dispatch = useDispatch()
    const { countryList: { data: countryList } } = useSelector((state) => state.master);
    const { userDetails: { data: userDetails } } = useSelector((state) => state.user);
    const [previewImage, setPreviewImage] = useState('');
    const [address, setAddress] = useState("");
    const [coordinates, setCoordinates] = useState(null);
    const [loading, setLoading] = useState(false);
    const {t} = useTranslation();
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

    const handleKeyPress = (e) => {
        if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
        }
    };

    const validateDOB = (value) => {
        const regex = /^(19\d{2}|[2-9]\d{3})$/; // Year between 1900 and 9999
        const today = new Date();
        const dob = new Date(value);
        const dobYear = dob.getFullYear();
        let age = today.getFullYear() - dobYear;
        const monthDifference = today.getMonth() - dob.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dob.getDate())) {
            age--;
        }

        if (!regex.test(dobYear.toString())) {
            return t("Please enter valid Year");
        }

        return age >= 13 || t("You must be 13 or older to create an account");
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
            if (body.profile_image instanceof Blob) body.profile_image = await uploadImageOnAWS(body.profile_image, "user_profile");
            else {
                body.profile_image = userDetails?.image;
            }
            setLoading(true);
            const { data, message, code } = await API.editProfileApi(body);
            setLoading(false);
            body.otp = data.otp
            body.user_id = data.user_id
            if (code === '1') {
                // Cookies.set('dataCA', JSON.stringify(data[0]));
                dispatch(getUserDetails())
                TOAST_SUCCESS(message);
                dispatch(setModalStatus({ modalType: "", isOpen: false, data: [] }));
            }
            else if(code === '7'){
                TOAST_ERROR(message);
                setLoading(false);
            }
            else {
                setLoading(false);
                dispatch(setModalStatus({ modalType: EDIT_PROFILE_BY_OTP_MODAL, isOpen: true, data: body }));
            }

        } catch (err) {
            setLoading(false);
            TOAST_ERROR(err.message);
        }
    };
    
    const handleImageChange = async (file) => {
        if (file) {
            clearErrors("profile_image");
            setValue("profile_image", file);
            setPreviewImage(await convertToBase64(file));
            const result = await trigger("profile_image");
        }
    };

    useEffect(() => {
        setValue("profile_image", userDetails?.image);
        setValue("first_name", userDetails?.first_name);
        setValue("last_name", userDetails?.last_name);
        setValue("dob", userDetails?.dob);
        setValue("email", userDetails?.email);
        setValue("country_code_id", userDetails?.country_code_id);
        setValue("mobile_number", userDetails?.mobile_number);
        setValue("address", userDetails?.address);
        setValue("latitude", userDetails?.latitude);
        setValue("longitude", userDetails?.longitude);
        setAddress(userDetails?.address || "");
        setCoordinates({
            lat: userDetails?.latitude || null,
            lng: userDetails?.longitude || null
        });

        const defaultImage = `${PUBLICURL}/assets/imges/default_profile_Image.png`;
        const imageUrl = userDetails?.image && userDetails?.image !== "https://parth-bucket-hlis.s3.eu-west-1.amazonaws.com/real-estate/user_profile/null"
            ? userDetails.image_link
            : defaultImage;
        setPreviewImage(imageUrl);
    }, [userDetails, setValue]);

    useEffect(() => {
        dispatch(getUserDetails());
        dispatch(getCountryList());
    }, []);

    return (
        <div className="signin_modal">
            <CustomModal>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        <div className="col-12">
                            <div className="signin_card">
                                <h6 className="signin-title">{t("My Profile")}</h6>
                                <p className="verify">{t("Keep your personal information up-to-date and organized")}. </p>
                                <div className="user_profile-box">
                                    <label>
                                        <img src={previewImage} className="rounded-circle" style={{ height: "100px", width: "100px" }} alt="Profile Image" />
                                        <input
                                            {...register("profile_image", {
                                                validate: (val) => {
                                                    watch(val)
                                                    if (val === null) {
                                                        return t("please select profile image");
                                                    }
                                                },
                                            })}
                                            onChange={(e) => handleImageChange(e.target.files[0])}
                                            type="file"
                                            name="profile_image"
                                            accept="image/*"
                                            style={{ display: "none" }} 
                                        />
                                    </label>
                                    <div>
                                        <h6>Upload Profile</h6>
                                        <button type="button" onClick={() => document.getElementById("profile_image").click()} className="btn blue_btn">{t("Browse")}</button>
                                        <input
                                            id="profile_image"
                                            onChange={(e) => handleImageChange(e.target.files[0])}
                                            type="file"
                                            name="profile_image"
                                            accept="image/*"
                                            style={{ display: "none" }} // Hide the file input visually
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
                                                <label>{t("first_name")}
                                                </label>
                                                <input
                                                    {...register("first_name", {
                                                        required: t("Please enter first name"),

                                                        pattern: {
                                                            value: /^[A-Za-z]+(?:[A-Za-z]+)*$/,
                                                            message: t("Firstname must start and end with a letter, and can contain letters without spaces in between"),
                                                        },
                                                    })}
                                                    type="text"
                                                    className="form-control"
                                                    placeholder={t("enter_first_name")} />
                                                {errors.first_name && (
                                                    <p role="alert" className="text-danger">
                                                        {errors.first_name?.message}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                            <div className="input_fild mb-4">
                                                <label>{t("last_name")}
                                                </label>
                                                <input
                                                    {...register("last_name", {
                                                        required: t("Please enter last name"),
                                                        pattern: {
                                                            value: /^[A-Za-z]+(?:[A-Za-z]+)*$/,
                                                            message: t("Lastname must start and end with a letter, and can contain letters without spaces in between"),
                                                        },
                                                    })}
                                                    type="text"
                                                    className="form-control"
                                                    placeholder={t("enter_last_name")} />
                                                {errors.last_name && (
                                                    <p role="alert" className="text-danger">
                                                        {errors.last_name?.message}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                            <div className="input_fild mb-4">
                                                <label>{t("Email")}
                                                </label>
                                                <input
                                                    {...register("email", {
                                                        required: t("Please enter Email"),
                                                        pattern: {
                                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                            message: t("Please enter a valid email address"),
                                                        },
                                                    })}
                                                    type="email"
                                                    className="form-control"
                                                    placeholder={t("enter email address")} />
                                                {errors.email && (
                                                    <p role="alert" className="text-danger">
                                                        {errors.email?.message}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                            <div className="input_fild mb-4">
                                                <label>{t("Mobile Number")}
                                                </label>
                                                <div className="row mobile_no mx-0">
                                                    <div className="col-3 p-0 d-flex align-items-center justify-content-center">
                                                        <select className="form-select text-start" aria-label="Default select example"
                                                            {...register("country_code_id", {
                                                                required: t("Please select country-code"),
                                                            })}>
                                                            <option selected value={userDetails?.country_code_id}>
                                                                {userDetails?.country_code_id}
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
                                                                required: t("Please enter Mobile Number and Country Code"),
                                                                maxLength: {
                                                                    value: 15,
                                                                    message: t("Mobile Number cannot exceed 15 digits"),
                                                                },
                                                                minLength: {
                                                                    value: 9,
                                                                    message: t("Mobile Number must be 9 digits"),
                                                                },
                                                            })}
                                                            type="text"
                                                            onKeyPress={handleKeyPress}
                                                            placeholder={t("Enter mobile number")} />
                                                    </div>
                                                </div>
                                            </div>
                                            {errors.mobile_number && <span className="text-danger">{errors.mobile_number?.message}</span>}
                                            {errors.country_code_id && <span className="text-danger">{errors.country_code_id?.message}</span>}
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                            <div className="input_fild mb-4">
                                                <label>{t("Date")}
                                                </label>
                                                <div className="Startdate_input">
                                                    <div className="password w-100">
                                                        <input
                                                            {...register("dob", {
                                                                required: t("Date of Birth is required"),
                                                                validate: validateDOB
                                                            })}
                                                            type="date"
                                                            name="dob"
                                                            id="dob"
                                                            className="form-control"
                                                            placeholder={t("25051990")} />
                                                    </div>
                                                </div>
                                                {errors.dob && (
                                                    <p role="alert" className="text-danger">
                                                        {errors.dob?.message}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                            <div className="input_fild mb-4">
                                                <label> {t("Address")}
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
                                                                    placeholder: t("Enter address..."),
                                                                    className: "form-control"
                                                                })}
                                                            />
                                                            <div>
                                                                {loading ? <div>{t("Loading...")}</div> : null}
                                                                {
                                                                    suggestions.map((suggestion) => {
                                                                        const style = {
                                                                            backgroundColor: suggestion.active
                                                                                ? "#41b6e6"
                                                                                : "#fff",
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
                                        <div className=" col-12">
                                            <div className="top_line "></div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 mt-4">
                                            <a className="btn sign_in w-100" onClick={() => dispatch(setModalStatus({ modalType: "", isOpen: false, data: null }))}>{t("Cancel")}</a>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 mt-4">
                                        <button className="btn blue_btn w-100" type="submit" disabled={loading}>
                                            {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : t('Update') }
                                        </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </CustomModal>
        </div>
    )
}

export default EditProfileModal;