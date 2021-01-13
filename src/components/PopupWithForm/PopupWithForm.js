import React, { useRef } from 'react';
import './PopupWithForm.css';
import { Link } from 'react-router-dom';
import { useInput } from '../../utils/Validation.js'

function PopupWithForm({ title, name, isOpen, onClose, children, onSubmit, buttonText, linkText, goToAnotherPopup, overlayClose, apiErrorText }) {
    //валидация
    const password = useInput('', { isEmpty: true, minLength: 6 })
    const email = useInput('', { isEmpty: true, isEmail: true, maxLength: 40 })

    //сабмит
    const emailInput = useRef()
    const passwordInput = useRef()
    function handleSubmit(e) {
        e.preventDefault();
        onSubmit();
        emailInput.current.value = '';
        passwordInput.current.value = '';
    }

    function closePopupOverlay(evt) {
        if (evt.target === evt.currentTarget) {
            overlayClose()
        }
    }

    return (
        <section className={isOpen ? `popup popup_opened` : `popup`} onClick={closePopupOverlay}>
            <form className={`popup__container`} onSubmit={handleSubmit} action="#" noValidate>
                <button type="button" onClick={onClose} id={`${name}button`} className="popup__close-button"></button>
                <h3 className="popup__title">{title}</h3>
                <label className="popup__subtitle">E-mail</label>
                <input ref={emailInput} onChange={email.onChange} onBlur={email.onBlur}
                    type="text"
                    name="email"
                    placeholder="Введите почту"
                    className="popup__input popup__input_title"
                />
                {(email.isDirty && email.isEmpty) && <span className='popup__input-error'>Поле обязательно для заполнения</span>}
                {(email.isDirty && email.isEmailError) && <span className='popup__input-error'>Некорректный e-mail</span>}
                {(email.isDirty && email.maxLengthError) && <span className='popup__input-error'>Максимальная длина: 40 символов</span>}

                <label className="popup__subtitle">Пароль</label>
                <input ref={passwordInput} onChange={password.onChange} onBlur={password.onBlur}
                    type="text"
                    name="password"
                    placeholder="Введите пароль"
                    className="popup__input popup__input_subtitle" />
                {(password.isDirty && password.isEmpty) && <span className='popup__input-error'>Поле обязательно для заполнения</span>}
                {(password.isDirty && password.minLengthError) && <span className='popup__input-error'>Минимальная длина: 6 символов</span>}
                {children}
                <span className="popup__api-error">{apiErrorText}</span>
                <button disabled={!email.inputValid || !password.inputValid} type="submit" id="submit-button"
                    className={(email.inputValid && password.inputValid) ? `popup__submit-button` : `popup__submit-button popup__submit-button_disabled`}>{buttonText}</button>
                <div className="popup__signup">
                    <p>или</p>
                    <Link onClick={goToAnotherPopup} className="popup__link">{linkText}</Link>
                </div>
            </form>
        </section>
    );
}


export default PopupWithForm;