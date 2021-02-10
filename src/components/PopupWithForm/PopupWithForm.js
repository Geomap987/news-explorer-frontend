import React from 'react';
import './PopupWithForm.css';

function PopupWithForm({ title, isOpen, onClose, children, onSubmit, linkText, goToAnotherPopup, overlayClose}) {

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit();
    }

    function closePopupOverlay(evt) {
        if (evt.target === evt.currentTarget) {
            overlayClose()
        }
    }

    return (
        <section className={isOpen ? `popup popup_opened` : `popup`} onClick={closePopupOverlay}>
            <form className={`popup__container`} onSubmit={handleSubmit} action="#" noValidate>
                <button type="button" onClick={onClose} className="popup__close-button"></button>
                <h3 className="popup__title">{title}</h3>
                {children}
                <div className="popup__signup">
                    <p className="popup__signup">или</p>
                    <p onClick={goToAnotherPopup} className="popup__link">{linkText}</p>
                </div>
            </form>
        </section>
    );
}


export default PopupWithForm;