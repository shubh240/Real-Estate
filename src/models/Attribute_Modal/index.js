import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useOutletContext, useParams } from "react-router-dom";
import CustomModal from "../../component/CustomModal";
import { getPropertyAttributeList } from "../../store/slice/categorySlice";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { setModalStatus } from "../../store/slice/masterSlice";
import { addPropertyAttribute } from "../../store/slice/amenitiyModalSlice";
import { PROPERTIES_AMENITES_MODAL, PROPERTIES_ATTRIBUTE_MODAL } from "../../app.config";
import { TOAST_ERROR } from "../../utils/common.service";
import { useTranslation } from "react-i18next";

const AttributeModal = () => {
    const dispatch = useDispatch();
    const { attributeList: { data: attributeList } } = useSelector((state) => state.category);
    const { isModalOpen } = useSelector((state) => state.master);
    const {t} = useTranslation();
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
        const matchedAttribute = attributeList?.find(item => item?.attribute_type === body?.attribute_type);
        if (matchedAttribute) {
            body.attribute_image_link = matchedAttribute.attribute_type_image;
            body.attribute_icon_name = matchedAttribute.attribute_icon;
            try {
                const newArray = [...isModalOpen?.data, body];
                dispatch(setModalStatus({ modalType: PROPERTIES_ATTRIBUTE_MODAL, isOpen: false, data: newArray }));
                reset();
            } catch (err) {
                TOAST_ERROR(err.message);
            }
        } else {
            TOAST_ERROR(t("Attribute not found or not selected"));
        }
    }

    useEffect(() => {
        dispatch(getPropertyAttributeList());
    }, []);

    return (
        <div className="signin_modal">
            <CustomModal>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        <div className="col-12 p-0">
                            <div className="signin_card">
                                <h6 className="signin-title">{t("Properties Attribute")}</h6>
                                <div className="signin_card-content">
                                    <div className="input_fild mb-4">
                                        <label>{t("Attribute Type")}
                                        </label>
                                        <select
                                            className="form-select form-control"
                                            aria-label="Default select example"
                                            {...register("attribute_type", {
                                                required: t("Please select attribute type"),
                                            })}
                                        >
                                            <option defaultValue value="">{t("Select Attribute Type")}</option>
                                            {
                                                attributeList && attributeList?.map(({ attribute_type, attribute_type_id }) =>
                                                    <option key={attribute_type_id} value={attribute_type}>{attribute_type}</option>
                                                )
                                            }
                                        </select>
                                        {errors.attribute_type && <span className="text-danger">{errors.attribute_type?.message}</span>}
                                    </div>
                                    {/* <div className="input_fild mb-4">
                                        <label>Properties attribute name
                                        </label>
                                        <input type="text" className="form-control" placeholder="Enter attribute name" />
                                    </div> */}
                                    <div className="input_fild mb-4">
                                        <label>{t("Attribute Values")}
                                        </label>
                                        <input
                                            {...register("attribute_value", {
                                                required: t("Please enter attribute value")
                                            })}
                                            type="text"
                                            className="form-control"
                                            placeholder={t("Enter values")}
                                        />
                                        {errors.attribute_value && <span className="text-danger">{errors.attribute_value?.message}</span>}
                                    </div>
                                    <button type="submit" className="btn blue_btn w-100">{t("Add")}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </CustomModal>
        </div>
    )
}

export default AttributeModal;