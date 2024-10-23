import React, { useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { useSwipeable } from 'react-swipeable';
const ImageModal = ({ show, handleClose, imageSrc, handleNext, handlePrev }) => {

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight') {
        handleNext();
      } else if (event.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    // Attach the event listener when the modal is open
    if (show) {
      window.addEventListener('keydown', handleKeyDown);
    }

    // Clean up the event listener when the modal is closed
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [show, handleNext, handlePrev]);

  // Setup swipe handlers
  const handlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrev(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  return (
    <Modal show={show} className='modal-lg' onHide={handleClose} centered>
      <Modal.Body className='p-5' {...handlers} style={{ position: 'relative', userSelect: 'none' ,backgroundColor : "lightblue" }}>
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <Zoom>
            <img src={imageSrc} alt="Zoomable" style={{ width: '100%', height: 'auto' }} />
          </Zoom>
          {/* Swipe buttons */}
          <button
            className="btn btn-secondary position-absolute top-50 start-0 translate-middle-y"
            style={{ zIndex: 10 }}
            onClick={handlePrev}
          >
            &lt;
          </button>
          <button
            className="btn btn-secondary position-absolute top-50 end-0 translate-middle-y"
            style={{ zIndex: 10 }}
            onClick={handleNext}
          >
            &gt;
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ImageModal;
