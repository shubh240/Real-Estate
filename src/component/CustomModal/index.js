import { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { SIGN_IN_MODAL, SIGN_UP_MODAL } from "../../app.config";
import { setModalStatus } from "../../store/slice/masterSlice";
import { setAmenityStatus } from "../../store/slice/amenitiyModalSlice";

const CustomModal = ({ onSave, children, navigatePath = null, id ,setSelectedResource}) => {
  const { isModalOpen } = useSelector((state) => state.master);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = () => {
    navigatePath && navigate(navigatePath);
    if (isModalOpen?.modalType === "Resources_Modal") {
      setSelectedResource(null)
    }
    dispatch(
      setModalStatus({
        modalType: isModalOpen.modalType,
        isOpen: false,
        data: isModalOpen?.data,
      })
    );
  };

  const handleSave = async () => {
    await onSave();
    handleClose();
  };

  return (
    <Modal
      show={isModalOpen.isOpen}
      onHide={handleClose}
      className={isModalOpen.modalType === 'SUCCESS_MODAL' || isModalOpen.modalType === 'PROPERTIES_ATTRIBUTE_MODAL' ? "lg p-0" : "modal-lg p-0" }
      aria-labelledby="exampleModalLabel"
      id={id}
      centered
    >
      <button type="button" className="btn-close pt-4 pe-4" onClick={handleClose} style={{ alignSelf: "self-end" }}></button>
      <Modal.Body className="p-0 modal-body">{children} </Modal.Body>

    </Modal>
  );
};

export default CustomModal;