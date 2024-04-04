import { useEffect, useRef } from 'react';
import css from './Modal.module.css';
import { createPortal } from 'react-dom';
import closeIcon from '../../images/closeIcon.svg';

const modalRoot = document.querySelector('#root-modal');

const Modal = ({ children, onClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onClose(false);
      }
    };

    const handleClose = event => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClose);
    document.body.classList.add('body-scroll-lock');
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClose);
      document.body.classList.remove('body-scroll-lock');
    };
  }, [onClose]);

  return createPortal(
    <div className={css.backdrop}>
      <div className={css.container}>
        <div
          ref={modalRef}
          className={css.modal}
          onClick={event => event.stopPropagation()}
        >
          <button className={css.btnClose} onClick={() => onClose(false)}>
            <img src={closeIcon} width={32} alt="Close" />
          </button>
          <div>{children}</div>
        </div>
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
