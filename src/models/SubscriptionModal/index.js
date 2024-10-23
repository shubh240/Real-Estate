import { useDispatch, useSelector } from "react-redux";
import CustomModal from "../../component/CustomModal";
import { useEffect, useState } from "react";
import { getPropertyAmenitiesList } from "../../store/slice/categorySlice";
import '../../amenity.css'
import AmenityCustomModal from "../../component/AmenityCustomModal";
import { useForm } from "react-hook-form";
import { setAmenityStatus } from "../../store/slice/amenitiyModalSlice";
import { AGENT_MODAL, FCFA_CURRENCY, PROPERTIES_AMENITES_MODAL, SEARCH_DELAY, SUB_MODAL } from "../../app.config";
import AgentCustomModal from "../../component/AgentCustomModal";
import { PUBLICURL, TOAST_ERROR, TOAST_SUCCESS, convertToBase64 } from "../../utils/common.service";
import { setAgentStatus } from "../../store/slice/agentSlice";
import { getCountryList, setLoader } from "../../store/slice/masterSlice";
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from "react-places-autocomplete";
import * as API from "../../utils/api.service";
import { uploadImageOnAWS } from "../../utils/aws.service";
import Cookies from "js-cookie";
import { getUserDetails } from "../../store/slice/userSlice";
import { getSubscriptionListApiCall } from "../../store/slice/subscriptionSlice";
import useDebounce from "../../hooks/useDebounce";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const SubscriptionModal = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [previewImage, setPreviewImage] = useState('');
    const [previewId, setPreviewId] = useState(null);
    const [previewLicense, setPreviewLicense] = useState(null);
    const { countryList: { data: countryList } } = useSelector((state) => state.master);
    const { userDetails: { data: userDetails } } = useSelector((state) => state.user);
    const { agentOpen } = useSelector((state) => state.agent);
    const { t } = useTranslation();
    const token = Cookies.get('tokenCA');
    const [address, setAddress] = useState("");
    const [coordinates, setCoordinates] = useState(null);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const debounce = useDebounce(search, SEARCH_DELAY);
    const [page, setPage] = useState(1);
    const [fieldSort, setFieldSort] = useState('id asc');
    const [ascSort, setAscSort] = useState(false);
    const [sortColumn, setSortColumn] = useState("id");
    const { subscriptionList: { data: subscriptionList } } = useSelector((state) => state.subscription);
    const [selectedPlan, setSelectedPlan] = useState({ plan_name: 'Monthly' });
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
            const selectedSubscription = subscriptionList.find(plan => plan.plan_name === selectedPlan.plan_name);
            if (selectedSubscription) {
                body.subscription_id = selectedSubscription.subscription_id;
            }

            if (agentOpen?.data?.profile_image instanceof Blob) body.profile_image = await uploadImageOnAWS(agentOpen?.data?.profile_image, "agent_profile");

            if (agentOpen?.data?.id_card instanceof Blob) body.id_card = await uploadImageOnAWS(agentOpen?.data?.id_card, "agent_id_card");

            if (agentOpen?.data?.license instanceof Blob) body.license = await uploadImageOnAWS(agentOpen?.data?.license, "agent_license");

            let requestBody = {
                agent_name: agentOpen?.data?.agent_name,
                email: agentOpen?.data?.email,
                country_code_id: agentOpen?.data?.country_code_id,
                mobile_number: agentOpen?.data?.mobile_number,
                address: agentOpen?.data?.address,
                latitude: agentOpen?.data?.latitude,
                longitude: agentOpen?.data?.longitude,
                profile_image: body?.profile_image,
                id_card: body?.id_card,
                license: body?.license,
                bio: agentOpen?.data?.bio,
                subscription_id: body?.subscription_id
            }

            const { data, message, code } = await API.createAgentApi(requestBody);
            if (code === '1') {
                setLoading(false);
                TOAST_SUCCESS(message);
                navigate('/');
                dispatch(setAgentStatus({ modalType: SUB_MODAL, isOpen: false, data: [] }));
            }
        } catch (error) {
            TOAST_ERROR(error.message)
        }


    };

    const handlePlanSelection = (planName) => {
        setSelectedPlan(planName);
    };

    useEffect(() => {
        handleSubscriptionAPI();
    }, [page, debounce, fieldSort]);

    const handleSubscriptionAPI = () => {
        dispatch(setLoader(true));
        let submitData = {
            search: debounce,
            page: page,
            fieldSort,
            type : "Website"
        }
        dispatch(getSubscriptionListApiCall(submitData));
        dispatch(setLoader(false));
    };

    return (

        <div className="signin_modal">
            <AgentCustomModal>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        <div className="col-xl-6 col-lg-6 col-md-12 col- sm-12 col-12 p-0 order-lg-1 order-2">
                            <div className="signin_card">
                                <h6 className="signin-title">{t("Subscription")}</h6>
                                <p className="pt-3">{selectedPlan.plan_name === "Monthly" ? subscriptionList?.[0]?.plan_name : subscriptionList?.[1]?.plan_name}</p>
                                <p className="verify">{selectedPlan.plan_name === "Monthly" ? subscriptionList?.[0]?.plan_description : subscriptionList?.[1]?.plan_description}</p>
                                <div className="top_line my-3"></div>
                                <div className="signin_card-content">
                                    <ul>
                                        <li>{selectedPlan.plan_name === "Monthly" ? subscriptionList?.[0]?.premium_features : subscriptionList?.[1]?.premium_features}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 order-lg-2 order-1">
                            <div className="subscription">
                                <a className="bolo_log-img"><img src="./assets/imges/icons/boyo-logo.svg" alt="boyo" /></a>
                                <h6 className="plan">{t("Select the plan that works for you")}</h6>
                                {subscriptionList && subscriptionList.map((sub, index) => (
                                    <div
                                        key={index}
                                        className={`facilities_list_card ${selectedPlan.plan_name === sub.plan_name ? 'active' : ''}`}
                                        onClick={() => handlePlanSelection(sub)}
                                    >
                                        <div className="price">
                                            <h6>{sub.plan_name}</h6>
                                            <div className="d-flex Secondary-Black">
                                                <h6 dangerouslySetInnerHTML={{ __html: `${FCFA_CURRENCY} ${sub?.price.toLocaleString()}` }} /><p className="Gray">/ {sub.plan_name === "Monthly" ? t("Month") : t("Year")}</p>
                                            </div>
                                            {/* <h6 className="d-flex Secondary-Black">${sub.price}<p className="Gray">/ {sub.plan_name === "Monthly" ? t("Month") : t("Year")}</p></h6> */}
                                        </div>
                                        {selectedPlan.plan_name === sub.plan_name && <span><i className="fa-solid fa-check"></i></span>}
                                    </div>
                                ))}
                                <button className="btn blue_btn w-100 mt-3" type="submit" disabled={loading}>
                                    {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : t('Subscribe')}
                                </button>
                                <button type="button" className="btn blue_btn w-100 mt-3" onClick={() => dispatch(setAgentStatus({
                                    modalType: AGENT_MODAL,
                                    isOpen: false,
                                    data: []
                                }))}>{t("Cancel")}</button>
                            </div>
                        </div>
                    </div>
                </form>
            </AgentCustomModal >
        </div >
    )
}

export default SubscriptionModal;