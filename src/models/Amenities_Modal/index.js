import { useDispatch, useSelector } from "react-redux";
import CustomModal from "../../component/CustomModal";
import { useEffect } from "react";
import { getPropertyAmenitiesList } from "../../store/slice/categorySlice";
import '../../amenity.css'
import AmenityCustomModal from "../../component/AmenityCustomModal";
import { useForm } from "react-hook-form";
import { setAmenityStatus } from "../../store/slice/amenitiyModalSlice";
import { PROPERTIES_AMENITES_MODAL } from "../../app.config";
import { useTranslation } from "react-i18next";

const AmenitiesModal = ({amenities,setAmenities}) => {
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const { amenitiesList: { data: amenitiesList } } = useSelector((state) => state.category);
    const { amenityOpen } = useSelector((state) => state.amenity);
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
    } = useForm({
        defaultValues: {
            amenities: [],
        },
    });

   const onSubmit = async (body) => {
    try {
        const selectedAmenities = body.amenities.map(amenity_name => {
            const foundAmenity = amenitiesList.find(category =>
                category.sub_amenities.some(sub => sub.sub_category_name === amenity_name)
            );
            const subAmenity = foundAmenity?.sub_amenities.find(sub => sub.sub_category_name === amenity_name);
            const amenity_icon_link = subAmenity?.amenity_image;
            const amenity_icon = subAmenity?.amenity_icon;
            return {
                amenity_name,
                amenity_icon_link,
                amenity_icon
            };
        });

        // Get the existing amenities from the state
        const existingAmenities = amenityOpen?.data || [];

        // Merge existing amenities with the new ones, avoiding duplicates
        const mergedAmenities = [...existingAmenities, ...selectedAmenities].reduce((acc, current) => {
            const x = acc.find(item => item.amenity_name === current.amenity_name);
            if (!x) {
                return acc.concat([current]);
            } else {
                return acc;
            }
        }, []);

        // Update the state with the merged amenities
        dispatch(setAmenityStatus({ modalType: PROPERTIES_AMENITES_MODAL, isOpen: false, data: mergedAmenities }));
        reset()
    } catch (err) {
        TOAST_ERROR(err.message);
    }
};
    useEffect(() => {
        dispatch(getPropertyAmenitiesList());
    }, []);

    return (
        <div className="signin_modal">
            <AmenityCustomModal>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h6 className="signin-title p-2">{t("Properties Amenities")}</h6>
                    <div className="container mt-4">
                        <div className="row">
                            {
                                amenitiesList && amenitiesList?.map((item) =>
                                    <div className="col-md-4 input_fild1 mb-4" style={{ backgroundColor: "none" }}>
                                        <h5>{item?.category_name}</h5>
                                        {
                                            item?.sub_amenities?.map(({ sub_category_id, sub_category_name }) =>
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input border-dark"
                                                        type="checkbox"
                                                        value={sub_category_name}
                                                        id={`flexCheckDefault-${sub_category_id}`}
                                                        name="amenities"
                                                        {...register('amenities', {
                                                            validate: (val) => {
                                                                if (val.length <= 0) {
                                                                    return t("Please select at least 1 amenity");
                                                                }
                                                            }
                                                        })}
                                                    />
                                                    <label className="form-check-label" htmlFor="flexCheckDefault">
                                                        {sub_category_name}
                                                    </label>
                                                </div>
                                            )
                                        }
                                    </div>
                                )
                            }
                            {errors.amenities && (
                                <p role="alert" className="text-danger">
                                    {errors.amenities?.message}
                                </p>
                            )}
                        </div>
                        <button className="btn blue_btn w-75 mb-3" type="submit">{t("Add")}</button>
                    </div>
                </form>
            </AmenityCustomModal>
        </div>
    )
}

export default AmenitiesModal;