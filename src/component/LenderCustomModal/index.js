import { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { SIGN_IN_MODAL, SIGN_UP_MODAL } from "../../app.config";
import { setModalStatus } from "../../store/slice/masterSlice";
import { setAmenityStatus } from "../../store/slice/amenitiyModalSlice";
import { setLenderStatus } from "../../store/slice/lenderSlice";
import { useFormContext } from "react-hook-form";

const LenderCustomModal = ({ onSave, children, navigatePath = null, id }) => {
  const { lenderOpen } = useSelector((state) => state.lender);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = () => {
    navigatePath && navigate(navigatePath);
    dispatch(
      setLenderStatus({
        modalType: lenderOpen.modalType,
        isOpen: false,
        data: lenderOpen?.data,
      })
    )
  };

  const handleSave = async () => {
    await onSave();
    handleClose();
  };

  return (
    <Modal
      show={lenderOpen.isOpen}
      onHide={handleClose}
      className="modal-dialog-centered modal-lg p-0"
      aria-labelledby="exampleModalLabel"
      id={id}
      centered
    >
      {/* <button type="button" className="btn-close pt-4 pe-4" onClick={handleClose} style={{ alignSelf: "self-end" }}></button> */}
      <Modal.Body className="p-0 modal-body">{children} </Modal.Body>
    </Modal>
  );
};

export default LenderCustomModal;