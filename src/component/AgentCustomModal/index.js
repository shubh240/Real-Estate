import { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setAgentStatus } from "../../store/slice/agentSlice";
import { setLenderStatus } from "../../store/slice/lenderSlice";
import { useTranslation } from "react-i18next";

const AgentCustomModal = ({ onSave, children, navigatePath = null, id }) => {
  const { t } = useTranslation();
  const { agentOpen } = useSelector((state) => state.agent);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = () => {
    navigatePath && navigate(navigatePath);
    dispatch(
      setAgentStatus({
        modalType: agentOpen.modalType,
        isOpen: false,
        data: agentOpen?.data,
      })
    )
   
  };

  const handleSave = async () => {
    await onSave();
    handleClose();
  };

  return (
    <Modal
      show={agentOpen.isOpen}
      onHide={handleClose}
      className={"modal-dialog-centered modal-lg p-0"}
      aria-labelledby="exampleModalLabel"
      id={id}
      centered
    >
      <button type="button" className="btn-close pt-4 pe-4" onClick={handleClose} style={{ alignSelf: "self-end" }}></button>
      <Modal.Body className="p-0 modal-body">{children} </Modal.Body>

    </Modal>
  );
};

export default AgentCustomModal;