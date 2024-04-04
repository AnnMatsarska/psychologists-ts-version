import { useEffect, useRef } from "react";
import css from "./Modal.module.css";
import { createPortal } from "react-dom";
import closeIcon from "../../images/closeIcon.svg";

const modalRoot = document.querySelector("#root-modal");

interface ModalProps {
  children: React.ReactNode;
  onClose: (status: boolean) => void;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Escape") {
        onClose(false);
      }
    };

    const handleClose = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClose);
    document.body.classList.add("body-scroll-lock");
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.addEventListener("mousedown", handleClose);
      document.body.classList.remove("body-scroll-lock");
    };
  }, [onClose]);

  return createPortal(
    <div className={css.backdrop}>
      <div className={css.container}>
        <div
          ref={modalRef}
          className={css.modal}
          onClick={(event) => event.stopPropagation()}
        >
          <button className={css.btnClose} onClick={() => onClose(false)}>
            <img src={closeIcon} width={32} alt="Close" />
          </button>
          <div>{children}</div>
        </div>
      </div>
    </div>,
    modalRoot as Element
  );
};

export default Modal;
