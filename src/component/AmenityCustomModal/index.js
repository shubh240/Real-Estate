import { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setAmenityStatus } from "../../store/slice/amenitiyModalSlice";

const AmenityCustomModal = ({ onSave, children, navigatePath = null, id }) => {
  const { amenityOpen } = useSelector((state) => state.amenity);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = () => {
    navigatePath && navigate(navigatePath);
    dispatch(
      setAmenityStatus({
        modalType: amenityOpen?.modalType,
        isOpen: false,
        data: amenityOpen?.data,
      })
    );
  };

  const handleSave = async () => {
    await onSave();
    handleClose();
  };

  return (
    <Modal
      show={amenityOpen?.isOpen}
      // size={"lg"}
      onHide={handleClose}
      className="modal-dialog-centered modal-lg p-0"
      aria-labelledby="exampleModalLabel"
      id={id}
      centered
    >
      <button type="button" className="btn-close pt-4 pe-4" onClick={handleClose} style={{ alignSelf: "self-end" }}></button>
      <Modal.Body className="p-0 modal-body">{children} </Modal.Body>

    </Modal>
  );
};

export default AmenityCustomModal;