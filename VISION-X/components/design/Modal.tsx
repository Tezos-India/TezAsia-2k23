import { Dialog, Transition } from '@headlessui/react';
import { HiX } from 'react-icons/hi';
import clsx from 'clsx';
import React, { Fragment } from 'react';

type Props = {
    isOpen: boolean;
    closeModal: () => void;
    children: React.ReactNode;
    size?: 'sm' | 'md' | 'lg'
};

export const ModalHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({
    children,
    className,
}) => {
    return <Dialog.Title className={className}>{children}</Dialog.Title>;
};

const Modal: React.FC<Props> = ({ isOpen, closeModal,children,size='md' }) => {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto" onClose={closeModal}>
                <div className="min-h-screen  px-4 text-center">
                    <Transition.Child
                        as="div"
                        enter="ease-in "
                        enterFrom="opacity-0"
                        enterTo="opacity-100 "
                        leave="ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo=" opacity-0">
                        <Dialog.Overlay className="fixed inset-0 backdrop-blur-sm backdrop-brightness-50" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="inline-block h-screen align-middle" aria-hidden="true">
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-100"
                        enterFrom="translate-y-40 opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95">
                        <Dialog.Panel
                            className={clsx(
                                { 'sm:max-w-5xl': size === 'lg' },
                                { 'sm:max-w-3xl': size === 'md' },
                                { 'sm:max-w-lg': size === 'sm' },
                                'inline-block bg-slate-100 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 align-middle w-full rounded-lg p-6 border '
                            )}>
                            <button onClick={closeModal} className="absolute right-6 top-6">
                                <HiX className="h-6 w-6" />
                            </button>
                            {children}
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
};

export default Modal;