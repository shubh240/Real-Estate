import { useLocation, useNavigate, useOutletContext, useParams } from "react-router-dom";
import { PUBLICURL, TOAST_ERROR, TOAST_SUCCESS, convertToBase64 } from "../../utils/common.service";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCategoryList, getPropertyList } from "../../store/slice/categorySlice";
import CustomModal from "../CustomModal";
import { setLoader, setModalStatus } from "../../store/slice/masterSlice";
import { FCFA_CURRENCY, PROPERTIES_AMENITES_MODAL, PROPERTIES_ATTRIBUTE_MODAL } from "../../app.config";
import * as API from "../../utils/api.service";
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from "react-places-autocomplete";
import { setAmenityStatus } from "../../store/slice/amenitiyModalSlice";
import { uploadImageOnAWS } from "../../utils/aws.service";
import MapModal from "../../models/MapModal";
import { useTranslation } from "react-i18next";
import Swal from 'sweetalert2';

const ListProperty = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const [showMapModal, setShowMapModal] = useState(false);
    const { id: property_id } = useParams();
    const propertData = location?.state
    const { categoryList: { data: categoryList } } = useSelector((state) => state.category);
    const { propertyList: { data: propertyList } } = useSelector((state) => state.category);
    const { isModalOpen } = useSelector((state) => state.master);
    const { amenityOpen } = useSelector((state) => state.amenity);
    const [previewImage, setPreviewImage] = useState([]);
    const [address, setAddress] = useState("");
    const [coordinates, setCoordinates] = useState(null);
    const { t } = useTranslation();
    const { attributes, setAttributes } = useOutletContext();
    const { amenities, setAmenities } = useOutletContext();
    const [loading, setLoading] = useState(false);

    const showConfirmation = async (body) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: `Do you want to ${property_id ? 'update' : 'add'} this property?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, proceed!',
                cancelButtonText: 'Cancel'
            });

            if (result.isConfirmed) {
                await onSubmit(body);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const { register, handleSubmit, setValue, control, watch, formState: { errors }, clearErrors } = useForm({
        defaultValues: {
            property_image: [],
        },
    });

    const onSubmit = async (body) => {
        const uploadedImages = await Promise.all(
            Array.from(body.property_image).map(async (file) => {
                if (file instanceof Blob) return await uploadImageOnAWS(file, "property_images");
                return file;
            })
        )

        const requestBody = {
            property_name: body?.property_name,
            address: body?.address,
            latitude: body?.latitude,
            longitude: body?.longitude,
            status: body?.status,
            category_id: body?.property_category,
            property_type_id: body?.property_type,
            property_price: body?.property_price,
            about: body?.About,
            attribute_type: body?.attribute_type,
            amenity_name: body?.amenity_name,
            property_image: uploadedImages
        }
        try {
            dispatch(setLoader(true));
            setLoading(true);
            const { code, message, data } = property_id ?
                await API.editProperty(property_id, requestBody)
                :
                await API.addProperty(requestBody);
            dispatch(setLoader(false));
            setLoading(false);
            if (code == 1) {
                navigate('/boyo-realestate/my-properties');
                // navigate('/');
                TOAST_SUCCESS(message);
                dispatch(setAmenityStatus({ modalType: PROPERTIES_AMENITES_MODAL, isOpen: false, data: [] }));
                dispatch(setModalStatus({ modalType: PROPERTIES_ATTRIBUTE_MODAL, isOpen: false, data: [] }));
            }
        } catch (error) {
            setLoading(false);
            dispatch(setLoader(false));
            TOAST_ERROR(error)
        }
    }

    //Remove Attribute
    const handleRemoveAttribute = (indexToRemove) => {
        const data = isModalOpen?.data.slice();
        data.splice(indexToRemove, 1);
        dispatch(setModalStatus({ modalType: PROPERTIES_ATTRIBUTE_MODAL, isOpen: false, data: data }));
    };

    //Remove Amenity
    const removeAmenity = (indexToRemove) => {
        const data = [...amenityOpen?.data];
        data.splice(indexToRemove, 1);
        dispatch(setAmenityStatus({ modalType: PROPERTIES_AMENITES_MODAL, isOpen: false, data: data }));
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

    const handleDeleteImage = (index) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                const updatedPreviewImages = previewImage.filter((_, i) => i !== index);
                setPreviewImage(updatedPreviewImages);

                const updatedPropertyImages = watch("property_image").filter((_, i) => i !== index);
                setValue("property_image", updatedPropertyImages);

                Swal.fire(
                    'Deleted!',
                    'Your image has been deleted.',
                    'success'
                );
            }
        });
    };

    //select address
    const handleSelect = async (value) => {
        try {
            const results = await geocodeByAddress(value);
            const latlong = await getLatLng(results[0]);
            setValue("address", results[0].formatted_address);
            setValue("latitude", latlong.lat);
            setValue("longitude", latlong.lng);
            setAddress(results[0].formatted_address);
            setCoordinates(address ? latlong : "");
            setShowMapModal(true);
        } catch (error) { console.log(error); }
    };

    // select location from map
    const handleMapSelection = (selectedAddress, latlong) => {
        setAddress(selectedAddress);
        setCoordinates(selectedAddress ? latlong : "");
        setShowMapModal(false);
        setValue("address", selectedAddress);
        setValue("latitude", latlong.lat);
        setValue("longitude", latlong.lng);
    };

    const openMapModal = async () => {
        try {
            if (address) {
                const results = await geocodeByAddress(address);
                const latlong = await getLatLng(results[0]);
                setCoordinates(latlong);
            } else {
                setCoordinates({ lat: 8.9959496, lng: 3.3821161 });
            }
            setShowMapModal(true);
        } catch (error) {
            console.log(error);
        }
    };

    const closeMapModal = () => setShowMapModal(false);

    //Set Attribute and Amenity
    useEffect(() => {
        setValue("attribute_type", isModalOpen?.data);
    }, [isModalOpen?.data]);

    //Set Amenity
    useEffect(() => {
        setValue("amenity_name", amenityOpen?.data);
    }, [amenityOpen?.data]);

    useEffect(() => {
        dispatch(getCategoryList());
        dispatch(getPropertyList());
    }, []);

    useEffect(() => {
        if (property_id) {
            setAddress(propertData?.location || "");
            setCoordinates({
                lat: propertData?.latitude || null,
                lng: propertData?.longitude || null
            });
            setValue("property_name", propertData?.property_name);
            setValue("address", propertData?.location);
            setValue("latitude", propertData?.latitude);
            setValue("longitude", propertData?.longitude);
            setValue("status", propertData?.status);
            setValue("property_category", propertData?.category_id);
            setValue("property_type", propertData?.property_type_id);
            setValue("property_price", propertData?.price);
            setValue("About", propertData?.about);
            setValue("attribute_type", propertData.attribute);
            setValue("amenity_name", propertData.amenities);
            setPreviewImage(propertData?.property_images?.map((e) => e.property_images));
            setValue("property_image", propertData?.property_images?.map((e) => e.image));
            setAttributes(propertData?.attribute);
            setAmenities(propertData?.amenities);
        }
    }, [propertData]);

    const handleAddAttribute = () => {
        dispatch(setModalStatus({ modalType: 'PROPERTIES_ATTRIBUTE_MODAL', isOpen: true, data: isModalOpen?.data || [] }));
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <main className="page_wrepper">
                <section className="favorite-view_sec px-80">
                    <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12">
                        <div className="fav_view">
                            <h2>{t("List a Property")}</h2>
                            <p>{t("Easily list properties for rent or sale with 'My Properties")}.</p>
                        </div>
                    </div>
                </section>
                <section className="px-80 pb-100 ">
                    <div className="container-fluid">
                        <form className="contact_form advertise" onSubmit={handleSubmit(showConfirmation)}>
                            <div className="row">
                                <div className="col-12">
                                    <div className="faq_headline">
                                        <h6 className="fs-24 pb-2">{t("Tell us about properties")}</h6>
                                        <p className="Gray">{t("Upgrade your property listings with photos and descriptions")}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="top_line mt-2 mt-sm-4"></div>
                            <div className="row">
                                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 order-lg-1 order-2">
                                    <div className="row justify-content-center">
                                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                            <div className="input_fild mb-4">
                                                <label>{t("Property Name")}
                                                </label>
                                                <input
                                                    {...register("property_name", {
                                                        required: t("Please enter Property Name"),
                                                    })}
                                                    type="text"
                                                    className="form-control text-dark"
                                                    placeholder={t("Your property name")} />
                                                {errors.property_name && (
                                                    <p role="alert" className="text-danger">
                                                        {errors.property_name?.message}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                            <div className="input_fild mb-4">
                                                <label>{t("Property Location")}
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
                                                            <span
                                                                style={{ cursor: "pointer" }}
                                                                className="location"
                                                                onClick={openMapModal}
                                                            >
                                                                <img src={`${PUBLICURL}/assets/imges/icons/location.svg`} alt="location" />
                                                            </span>
                                                            <input
                                                                {...getInputProps({
                                                                    placeholder: "Enter address...",
                                                                    className: "form-control text-dark",
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
                                        {/* Map Modal */}
                                        <MapModal
                                            show={showMapModal}
                                            onClose={closeMapModal}
                                            onSelect={handleMapSelection}
                                            address={address}
                                            coordinates={coordinates}
                                        />
                                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                            <div className="input_fild mb-4">
                                                <label>{t("What do you want?(Rent/Sale)")}
                                                </label>
                                                <select
                                                    className="form-select form-control text-dark"
                                                    aria-label="Default select example"
                                                    {...register("status", {
                                                        required: t("Please select property status"),
                                                    })}
                                                >
                                                    <option defaultValue value="">{t("Select Property Status")}</option>
                                                    <option value="sale">{t("Sale")}</option>
                                                    <option value="rent">{t("Rent")}</option>
                                                </select>
                                                {errors.status && <span className="text-danger">{errors.status?.message}</span>}
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                            <div className="input_fild mb-4">
                                                <label>{t("Property Category")}
                                                </label>
                                                <select
                                                    className="form-select form-control text-dark"
                                                    aria-label="Default select example"
                                                    {...register("property_category", {
                                                        required: t("Please select property category"),
                                                    })}
                                                >
                                                    <option defaultValue value="">{t("Select Property Category")}</option>
                                                    {
                                                        categoryList && categoryList?.map(({ category_name, category_id }) =>
                                                            <option key={category_id} value={category_id}>{category_name}</option>
                                                        )
                                                    }
                                                </select>
                                                {errors.property_category && <span className="text-danger">{errors.property_category?.message}</span>}
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                            <div className="input_fild mb-4">
                                                <label>{t("Property Type")}
                                                </label>
                                                <select
                                                    className="form-select form-control text-dark"
                                                    aria-label="Default select example"
                                                    {...register("property_type", {
                                                        required: t("Please select property type"),
                                                    })}
                                                >
                                                    <option defaultValue value="">{t("Select Property Type")}</option>
                                                    {
                                                        propertyList && propertyList?.map(({ type_id, property_type }) =>
                                                            <option key={type_id} value={type_id}>{property_type}</option>
                                                        )
                                                    }
                                                </select>
                                                {errors.property_type && <span className="text-danger">{errors.property_type?.message}</span>}
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                            <div className="input_fild mb-4">
                                                <label>
                                                    {t("Property Price")} (
                                                    <span dangerouslySetInnerHTML={{ __html: `${FCFA_CURRENCY}` }} />)
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control text-dark"
                                                    placeholder={t("Your property Price")}
                                                    {...register("property_price", {
                                                        required: "Please enter Property price.",
                                                        validate: value => {
                                                            console.log('value :', value);

                                                            // Convert value to a string, then remove commas
                                                            const numericValue = parseFloat(String(value).replace(/,/g, ''));

                                                            // Check if it's a valid number and within the limit
                                                            return (
                                                                !isNaN(numericValue) && numericValue <= 200000000 || "Property price cannot be greater than 200,000,000."
                                                            );
                                                        }
                                                    })}
                                                />
                                                {errors.property_price && (
                                                    <span className="text-danger">{errors.property_price?.message}</span>
                                                )}
                                            </div>
                                        </div>


                                        <div className="col-12">
                                            <div className="input_fild mb-4">
                                                <label>{t("About Property")}
                                                </label>
                                                <textarea name="" id="" cols="10" rows="5" placeholder={t("About Property")} className="form-control text-dark"
                                                    {...register("About", {
                                                        required: t("Please enter Property About")
                                                    })}
                                                ></textarea>
                                                {errors.About && <span className="text-danger">{errors.About?.message}</span>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-12 d-flex justify-content-between align-items-sm-center flex-column flex-sm-row">
                                            <div className="faq_headline">
                                                <h6 className="fs-24 pb-2">Properties Attribute </h6>
                                                <p className="Gray">Add your properties Attribute </p>
                                            </div>
                                            <a className="btn blue_btn mt-3 mt-sm-0" style={{ color: 'white', backgroundColor: "#0255a3" }} onClick={handleAddAttribute}>
                                                <i className="fa-solid fa-plus me-1"></i> Add
                                            </a>
                                        </div>
                                        <div className="col-12">
                                            <ul className={`facilities_list_card ${isModalOpen?.data?.length > 3 ? 'scrollable' : ''}`}>
                                                {
                                                    isModalOpen?.modalType === "PROPERTIES_ATTRIBUTE_MODAL" && isModalOpen?.data?.map((item, index) =>
                                                        <li className="mb-3" key={index}>
                                                            <div className="facilities_item">
                                                                <p className="d-flex">
                                                                    <img src={item?.attribute_image_link} alt="area icon" height={20} width={20} className="me-2" />
                                                                    {item?.attribute_type}
                                                                </p>
                                                                <span>: {item?.attribute_value}</span>
                                                            </div>
                                                            <i className="fa-solid fa-xmark" onClick={() => handleRemoveAttribute(index)}></i>
                                                        </li>
                                                    )
                                                }
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col-12 d-flex justify-content-between align-items-sm-center flex-column flex-sm-row">
                                            <div className="faq_headline">
                                                <h6 className="fs-24 pb-2">Properties Amenities</h6>
                                                <p className="Gray">Add your properties Amenities</p>
                                            </div>
                                            <a className="btn blue_btn mt-3 mt-sm-0"
                                                style={{ color: 'white', backgroundColor: "#0255a3" }}
                                                onClick={() => dispatch(setAmenityStatus({ modalType: PROPERTIES_AMENITES_MODAL, isOpen: true, data: amenityOpen?.data || [] }))}>
                                                <i className="fa-solid fa-plus me-1"></i> Add
                                            </a>
                                        </div>
                                        <div className="col-12">
                                            <div className={`row ${amenityOpen?.data?.length > 6 ? 'scrollable' : ''}`}>
                                                {
                                                    amenityOpen?.modalType === "PROPERTIES_AMENITES_MODAL" && amenityOpen?.data?.map((item, index) =>
                                                        <div className="col-xl-4 col-lg-6 col-md-4 col-sm-6 col-6" key={index}>
                                                            <ul className="facilities_list_card gym_box">
                                                                <li className="mb-3 border-0">
                                                                    <div className="facilities_item">
                                                                        <p className="d-flex dark align-items-center">
                                                                            <img src={item?.amenity_icon_link} height={20} width={20} alt="gym" className="me-2" />
                                                                            {item?.amenity_name}
                                                                        </p>
                                                                    </div>
                                                                    <i className="fa-solid fa-xmark" onClick={() => removeAmenity(index)}></i>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 order-lg-2 order-1 contact_form">
                                    <h2 className="headline_txt text-start mb-3">{t("Properties Photos")}</h2>
                                    <div className="uplod_vedio_card">
                                        <Controller name="property_image" control={control} defaultValue={null}
                                            rules={{
                                                required: t("Please choose property image"),
                                                validate: (val) => {
                                                    if (val.length < 3) {
                                                        return t("please select at least 3 images");
                                                    }
                                                }

                                            }} render=
                                            {({ field }) => (
                                                <>
                                                    <label className="uplod-img">
                                                        <i className="fa-solid fa-plus me-1"></i>
                                                        <input
                                                            onChange={(e) => handleImageChange(e.target.files)}
                                                            type="file"
                                                            name='files[]'
                                                            accept="image/*"
                                                            multiple
                                                        />
                                                    </label>
                                                    <p>{t("Upload properties photos or videos")}</p>
                                                    {errors.property_image && <span className="text-danger">{errors.property_image?.message}</span>}
                                                </>
                                            )} />
                                    </div>
                                    <div className={`image-container ${previewImage?.length > 6 ? 'scrollable' : ''}`}>
                                        <div className="row">
                                            {previewImage?.map((image, index) => (
                                                <div key={index} className="col-xl-4 col-lg-6 col-md-4 col-sm-6 col-6">
                                                    <div className="property_img_cards" onClick={() => handleDeleteImage(index)}>
                                                        <div className="property_img">
                                                            <img src={image} alt={`Uploaded ${index}`} />
                                                        </div>
                                                        <span className="delete_place">
                                                            <img src={PUBLICURL + "/assets/imges/icons/whitw-delete.svg"} alt="delete" />
                                                        </span>
                                                        <div className="gradient-overlay"></div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                </div>

                                <div className="col-12 order-lg-3 order-3">
                                    <div className="top_line mt-2 mt-sm-4"></div>
                                    <div className="row justify-content-md-end">
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                            <div className="row">
                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mt-3 mt-md-4">
                                                    <a className="btn sign_in w-100" onClick={() => navigate(-1)}>{t("Cancel")}</a>
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mt-3 mt-md-4">
                                                    <button
                                                        className="btn blue_btn w-100"
                                                        type="submit"
                                                    >
                                                        {loading ? 'Processing...' : property_id ? t('Update') : t('Add')}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </section>
            </main >


        </>
    )
}

export default ListProperty;