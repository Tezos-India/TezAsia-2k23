import React, { useState, ReactNode, MouseEvent } from "react";

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

function Modal({ children, onClose }: ModalProps) {
  const [open, setOpen] = useState(true);
  return (
    open && (
      <div className="modal-container">
        <div className="modal">
          {children}
          <div
            className="modal-close"
            style={{ color: "black" }}
            onClick={onClose}
          >
            X
          </div>
        </div>
      </div>
    )
  );
}

interface ModalHeaderProps {
  children: ReactNode;
}

Modal.Header = function (props: ModalHeaderProps) {
  return <div className="modal-header">{props.children}</div>;
};

interface ModalBodyProps {
  children: ReactNode;
}

Modal.Body = function (props: ModalBodyProps) {
  return <div className="modal-body">{props.children}</div>;
};

export default Modal;
