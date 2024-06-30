import React from "react";
import "./Modal.css";
import ReactDOM from "react-dom";

const Modal = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-content">{children}</div>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Modal;
