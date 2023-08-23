import React, { useState, ReactNode, MouseEvent } from "react";
import styles from './Modal.module.css';
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
      <a href="#" className={styles['animated-button']}>
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
