import { useForm } from "react-hook-form";
import { PUBLICURL, TOAST_ERROR, TOAST_SUCCESS } from "../../utils/common.service";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCountryList } from "../../store/slice/masterSlice";
import * as API from "../../utils/api.service"
import { useNavigate } from "react-router-dom";
import { getUserDetails } from "../../store/slice/userSlice";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";

const ContactUs = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { countryList: { data: countryList } } = useSelector((state) => state.master);
    const { userDetails: { data: userDetails } } = useSelector((state) => state.user);
    const token = Cookies.get('tokenCA');

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const handleKeyPress = (event) => {
        const keyCode = event.keyCode || event.which;
        const keyValue = String.fromCharCode(keyCode);
        const isValidNumber = /^[0-9]+$/.test(keyValue);

        if (!isValidNumber) {
            event.preventDefault();
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const onSubmit = async (body) => {
        try {
            let requestBody = {
                first_name: body?.first_name,
                last_name: body?.last_name,
                country_code: body?.country_code_id,
                mobile_number: body?.mobile_number,
                email: body?.email,
                subject: body?.subject,
                description: body?.description,
                status: "awaiting"
            }
            let { code, message } = await API.contactUSAdd(requestBody);
            if (code == 1) {
                TOAST_SUCCESS(message);
                navigate('/');
            }
        } catch (err) {
            TOAST_ERROR(err.message);
        }

    }

    useEffect(() => {
        dispatch(getCountryList());
    }, []);

    useEffect(() => {
        if (token) {
            dispatch(getUserDetails());
            setValue("first_name", userDetails?.first_name);
            setValue("last_name", userDetails?.last_name);
            setValue("country_code_id", userDetails?.country_code_id);
            setValue("mobile_number", userDetails?.mobile_number);
            setValue("email", userDetails?.email);
        }
    }, [token])
    return (

        <main className="page_wrepper">
            <section className="favorite-view_sec px-80">
                <div className="fav_view">
                    <h2>{t("contact_us")}</h2>
                    <p>{t("We endeavour to answer within 24 hours")}.</p>
                </div>
            </section>
            <section className="contact-us_sec px-80 pb-100 mb-400">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="faq_headline">
                                <h6 className="fs-24 pb-2">{t("Get in touch")}</h6>
                                <div className="d-flex justify-content-between">
                                    <p className="Gray">{t("Let’s chat , Reach out to us")}</p>
                                    <p><ul >
                                        <li>
                                            <i class="fa-duotone fa-solid fa-phone"></i> +1 682 313 9965
                                        </li>
                                        <li className="ms-4">
                                            +237 654 087 072
                                        </li>
                                    </ul></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="top_line mt-2 mt-sm-4"></div>
                    <div className="row">
                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 order-lg-1 order-2">
                            <form onSubmit={handleSubmit(onSubmit)} className="contact_form">
                                <div className="row justify-content-center">
                                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
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
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
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
                                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                        <div className="input_fild mb-4">
                                            <label>{t("mobile_number")}
                                            </label>
                                            <div className="row mobile_no mx-0">
                                                <div className="col-3 p-0 d-flex align-items-center justify-content-center">
                                                    <select className="form-select me-2 text-start" aria-label="Default select example"
                                                        {...register("country_code_id", {
                                                            required: t("Please select country-code"),
                                                        })}>
                                                        <option selected value="">+1</option>
                                                        {
                                                            countryList?.map((country) =>
                                                                <option key={country?.country_id} value={country?.country_code}>
                                                                    {country?.country_code} - {country?.name}
                                                                </option>
                                                            )
                                                        }
                                                    </select>
                                                </div>
                                                <div className="col-9 p-0">
                                                    <input
                                                        {...register("mobile_number", {
                                                            required: t("Please enter Mobile Number and Country Code."),
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
                                                        // maxLength={10}
                                                        // minLength={10}
                                                        onKeyPress={handleKeyPress}
                                                        placeholder={t("enter_mobile_number")} />
                                                </div>
                                            </div>
                                            {errors.mobile_number && <span className="text-danger">{errors.mobile_number?.message}</span>}
                                            {errors.country_code_id && <span className="text-danger">{errors.country_code_id?.message}</span>}
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                        <div className="input_fild mb-4">
                                            <label>{t("email")}
                                            </label>
                                            <input
                                                {...register("email", {
                                                    required: t("Please enter Email."),
                                                    pattern: {
                                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                        message: t("Please enter a valid email address"),
                                                    },
                                                })}
                                                type="text"
                                                className="form-control"
                                                id="exampleInputEmail1"
                                                name="email"
                                                placeholder={t("Your email id")}
                                                aria-describedby="emailHelp"
                                            />
                                            {errors.email && (
                                                <p role="alert" className="text-danger">
                                                    {errors.email?.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="input_fild mb-4">
                                            <label>{t("Subject")}
                                            </label>
                                            <input
                                                {...register("subject", {
                                                    required: t("Please enter subject")
                                                })}
                                                type="text"
                                                className="form-control"
                                                name="subject"
                                                placeholder={t("Enter Your subject")}
                                                aria-describedby="emailHelp"
                                            />
                                            {errors.subject && (
                                                <p role="alert" className="text-danger">
                                                    {errors.subject?.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="input_fild mb-4">
                                            <label>{t("Message")}
                                            </label>
                                            <textarea
                                                name=""
                                                id=""
                                                cols="30"
                                                rows="10"
                                                placeholder={t("Your message")}
                                                className="form-control"
                                                {...register("description")}
                                            ></textarea>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 mt-3">
                                        <button className="btn blue_btn w-100">{t("Submit")}</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 order-lg-2 order-1">
                            <div className="contact_img">
                                {/* <img src={PUBLICURL + "/assets/imges/women.png"} alt="women" className=" img-fluid" /> */}
                                <img src={PUBLICURL + "/assets/imges/faq3.png"} height={700} width={700} alt="faq" className="img-fluid faq_one" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default ContactUs;