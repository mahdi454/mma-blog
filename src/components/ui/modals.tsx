import { XCircle } from "lucide-react";
import React, { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  closeOnOutsideClick?: boolean; 
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, closeOnOutsideClick = true }) => {
  if (!isOpen) return null;

  const handleOutsideClick = () => {
    if (closeOnOutsideClick) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleOutsideClick}
    >
      <div
        className="bg-gray-900 rounded-lg py-6 px-3 sm:px-8 w-96 shadow-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400"
          aria-label="Close Modal"
        >
          <XCircle width={20} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
