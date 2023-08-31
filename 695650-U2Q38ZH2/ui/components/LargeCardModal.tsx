import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
            <div className="bg-white p-8 rounded-lg shadow-lg relative">
                {children}
                <button onClick={onClose} className="absolute top-2 right-2 text-2xl">×</button>
            </div>
        </div>
    );
}

export default Modal;
