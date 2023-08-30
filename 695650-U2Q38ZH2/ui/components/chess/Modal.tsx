import React, { useState, ReactNode } from "react";
import styles from "./Modal.module.css";
import { useRouter } from "next/router";

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

function Modal({ children, onClose }: ModalProps) {
  const [open, setOpen] = useState(true);
  const router = useRouter();

  const gotogame = () => {
    router.push("/Game");
  };

  return (
    open && (
      <>
        <div className="modal-container">
          <div className={styles.body}>
            <a href="#" className={styles["animated-button"]}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <div className="modal">
                {children}
                <div
                  className="modal-close"
                  style={{ color: "black" }}
                  onClick={gotogame}
                >
                  X
                </div>
              </div>
            </a>
          </div>
        </div>
      </>
    )
  );
}

// Add the displayName property to the Modal component
Modal.displayName = "Modal";

// Define ModalHeader and ModalBody similarly

interface ModalHeaderProps {
  children: ReactNode;
}

function ModalHeader(props: ModalHeaderProps) {
  return <div className="modal-header">{props.children}</div>;
}

// Add the displayName property to the ModalHeader component
ModalHeader.displayName = "ModalHeader";

interface ModalBodyProps {
  children: ReactNode;
}

function ModalBody(props: ModalBodyProps) {
  return <div className="modal-body">{props.children}</div>;
}

// Add the displayName property to the ModalBody component
ModalBody.displayName = "ModalBody";

// Attach ModalHeader and ModalBody to the Modal component
Modal.Header = ModalHeader;
Modal.Body = ModalBody;

export default Modal;
