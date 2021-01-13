import React from 'react';
import '../PopupWithForm/PopupWithForm.css';
import { Link } from 'react-router-dom';

function InfoToolTip({ onClose, isOpen, goToSignInPopup, overlayClose }) {

    function closePopupOverlay(evt) {
        if (evt.target === evt.currentTarget) {
            overlayClose()
        }
    }

    return (
        <section className={isOpen ? `popup popup_opened` : `popup`} onClick={closePopupOverlay}>
            <div className="popup__container ">
                <button onClick={onClose} type="button" className="popup__close-button"></button>
                <p className="popup__title">Пользователь успешно зарегистрирован!</p>
                <Link onClick={goToSignInPopup} className="popup__signin-link">Войти</Link>
            </div>
        </section>
    );
}

export default InfoToolTip;