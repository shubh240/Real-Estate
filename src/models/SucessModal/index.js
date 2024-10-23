import { Button, Modal } from "react-bootstrap";
import { PUBLICURL } from "../../utils/common.service";
import CustomModal from "../../component/CustomModal";
import { useDispatch, useSelector } from "react-redux";
import { setModalStatus } from "../../store/slice/masterSlice";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SuccessModal = ({setToken}) => {
  const { isModalOpen } = useSelector((state) => state.master);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleClose = ()=>{
    dispatch(setModalStatus({ modalType: "", isOpen: false, data:null }))
    setToken(isModalOpen?.data?.token);
  }

  return (

    <div className="signin_modal">
      <CustomModal id="sign-in">
        <div className="row justify-content-center align-items-center">
          <div className="col-sm-12">
            <div className="successfully_box text-center">
              <a href="javascript:void(0);" className="bolo_log-img"><img src={PUBLICURL + "/assets/imges/icons/boyo-logo.svg"} alt="boyo" /></a>
              <h2 className="mt-3 text-truncate">{t("Hello")} {isModalOpen?.data?.first_name}!</h2>
              <p className="verify mb-3">{t("You have successfully created your account")}</p>
              <Button className="btn blue_btn w-100" onClick={handleClose}>{t("Explore")}</Button>
            </div>
          </div>
        </div>
      </CustomModal>
    </div >
  )
}

export default SuccessModal;