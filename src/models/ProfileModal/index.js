import { Button, Modal } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import SuccessModal from "../SucessModal";
import { useState } from "react";
import { PUBLICURL, TOAST_ERROR, TOAST_SUCCESS } from "../../utils/common.service";
import * as API from "../../utils/api.service"
import Cookies from "js-cookie";
import CustomModal from "../../component/CustomModal";
import { useDispatch, useSelector } from "react-redux";
import { COMPLETE_PROFILE_MODAL, SUCCESS_MODAL } from "../../app.config";
import { setModalStatus } from "../../store/slice/masterSlice";
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from "react-places-autocomplete";
import { useTranslation } from "react-i18next";

const CompleteProfile = () => {
    const dispatch = useDispatch();
    const [showSuccessModal, setShowSucessModal] = useState(false);
    const { isModalOpen } = useSelector((state) => state.master);
    const sucessClosed = () => { setShowSucessModal(false) };
    const [address, setAddress] = useState("");
    const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
    const { t } = useTranslation();

    //select address
    const handleSelect = async (value) => {
        try {
            const results = await geocodeByAddress(value);
            const latlong = await getLatLng(results[0]);
            setValue("address", results[0].formatted_address, { shouldValidate: true });
            setValue("latitude", latlong.lat);
            setValue("longitude", latlong.lng);
            setAddress(results[0].formatted_address);
            setCoordinates(latlong);
            field.onChange(address);
            await trigger("address"); 
        } catch (error) {
            console.log(error);
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

    const { register, handleSubmit, setValue, formState: { errors }, control } = useForm();
    
    const onSubmit = async (body) => {
        try {
            let requestBody = {
                first_name: body?.first_name,
                last_name: body?.last_name,
                dob: body?.dob,
                address: body?.address,
                latitude: body?.latitude,
                longitude: body?.longitude,
            }
            let { data, code, message } = await API.profileApi(requestBody);
            if (code == 1) {
                Cookies.set('dataCA', JSON.stringify(data));
                TOAST_SUCCESS(message);
                dispatch(setModalStatus({ modalType: SUCCESS_MODAL, isOpen: true, data }));
            }
        } catch (err) {
            TOAST_ERROR(err.message);
        }

    }

    return (
        <>

            <div className="signin_modal">
                <CustomModal id="sign-in">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 p-0 order-lg-1 order-2">
                                <div className="signin_card">
                                    <h6 className="signin-title">{t("Complete Profile")}</h6>
                                    <div className="signin_card-content">
                                        <div className="name_fild">
                                            <div className="input_fild mb-4">
                                                <label>{t("first_name")}</label>
                                                <input
                                                    {...register("first_name", {
                                                        required: t("Please enter first name"),
                                                        pattern: {
                                                            value: /^[A-Za-z]+(?:[A-Za-z]+)*$/,
                                                            message: t("Firstname must start and end with a letter"),
                                                        },
                                                    })}
                                                    type="text"
                                                    className="form-control"
                                                    name="first_name"
                                                    placeholder={t("Your first name")}
                                                    aria-describedby="FirstHelp"
                                                />

                                                {errors.first_name && (
                                                    <p role="alert" className="text-danger">
                                                        {errors.first_name?.message}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="input_fild mb-4">
                                                <label>{t("last_name")}</label>
                                                <input {...register("last_name", {
                                                    required: t("Please enter last name"),
                                                    pattern: {
                                                        value: /^[A-Za-z]+(?:[A-Za-z]+)*$/,
                                                        message: t("Lastname must start and end with a letter"),
                                                    }
                                                })}
                                                    type="text"
                                                    className="form-control"
                                                    name="last_name"
                                                    placeholder={t("Your last name")}
                                                    aria-describedby="LastHelp"
                                                />
                                                {errors.last_name && (
                                                    <p role="alert" className="text-danger">
                                                        {errors.last_name?.message}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="input_fild mb-4">
                                            <label>{t("Date of Birth")}</label>
                                            <div className="Startdate_input">
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
                                                {/* <span><img src={PUBLICURL + "/assets/imges/icons/date.svg"} alt="date" /></span> */}
                                            </div>
                                            {errors.dob && (
                                                <p role="alert" className="text-danger">
                                                    {errors.dob?.message}
                                                </p>
                                            )}
                                        </div>
                                        <div className="input_fild mb-4">
                                            <label>{t("Address")}</label>
                                            <Controller
                                                name="address"
                                                control={control}
                                                defaultValue=""
                                                rules={{ required: "Address is required" }}
                                                render={({ field }) => (
                                                    <PlacesAutocomplete
                                                        value={address}
                                                        onChange={(value) => {
                                                            setAddress(value);
                                                            field.onChange(value);
                                                        }}
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
                                                                        className: "form-control",
                                                                    })}
                                                                />
                                                                <div>
                                                                    {loading ? <div>{t("Loading...")}</div> : null}
                                                                    {suggestions.map((suggestion) => {
                                                                        const style = {
                                                                            backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                                                                        };
                                                                        return (
                                                                            <div
                                                                                {...getSuggestionItemProps(suggestion, { style })}
                                                                            >
                                                                                {suggestion.description}
                                                                            </div>
                                                                        );
                                                                    })}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </PlacesAutocomplete>
                                                )}
                                            />
                                            {errors.address && <p role="alert" className="text-danger">{errors.address.message}</p>}
                                        </div>

                                        <input type="hidden" {...register("latitude")} />
                                        <input type="hidden" {...register("longitude")} />
                                        <Button variant="primary" type="submit" className="w-100">{t("Submit")}</Button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 order-lg-2 order-1">
                                <div className="signin_box">
                                    <a href="javascript:void(0);" className="bolo_log-img"><img src={PUBLICURL + "/assets/imges/icons/boyo-logo.svg"} alt="boyo" /></a>
                                    <h2 className="experience_txt">{t("Experience luxury living")}</h2>
                                </div>
                            </div>
                        </div>
                    </form>
                </CustomModal>
            </div>
        </>
    )
}

export default CompleteProfile;