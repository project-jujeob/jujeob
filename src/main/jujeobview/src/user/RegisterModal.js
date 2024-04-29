import React from 'react';
import './RegisterModal.css';

function RegisterModal({ isOpen, message, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="modalRegister">
            <div className="modalRegisterContent">
                <span className="closeButton" onClick={onClose}>&times;</span>
                <p>{message}</p>
            </div>
        </div>
    );
}

export default RegisterModal;