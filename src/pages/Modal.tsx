import React from "react";

type ModalProps = {
  title: string;
  message: string;
  onClose: () => void;
  onContinue?: () => void;
};

const Modal: React.FC<ModalProps> = ({ title, message, onClose, onContinue }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6">
        {/* Header */}
        <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>

        {/* Body */}
        <p className="text-gray-600 mb-6">{message}</p>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-4">
          
        
           <button
  onClick={() => {
    onClose(); 
    window.location.reload(); 
  }}
  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
>
  Continue
</button>

       
        </div>
      </div>
    </div>
  );
};

export default Modal;
