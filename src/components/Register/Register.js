import React from 'react';
import '../PopupWithForm/PopupWithForm.css';
import { useInput } from '../../utils/Validation.js'
import PopupWithForm from '../PopupWithForm/PopupWithForm';

const Register = ({ registration, isOpen, overlayClose, goToAnotherPopup, onClose, apiErrorText }) => {
    //валидация
    const password = useInput('', { isEmpty: true, minLength: 6 })
    const email = useInput('', { isEmpty: true, isEmail: true, maxLength: 40 })
    const userName = useInput('', { isEmpty: true, minLength: 2, maxLength: 40 })

    const handleSubmit = (e) => {
        registration(userName.value, email.value, password.value)
    }

    return (
        <PopupWithForm 
        title='Регистрация'
        linkText='Войти'
        isOpen={isOpen}
        overlayClose={overlayClose}
        goToAnotherPopup={goToAnotherPopup}
        onClose={onClose}
        onSubmit={handleSubmit}>
            <label className="popup__subtitle">E-mail</label>
            <input onChange={email.onChange} onBlur={email.onBlur}
                type="text"
                name="email"
                placeholder="Введите почту"
                className="popup__input popup__input_title"
            />
            {(email.isDirty && email.isEmpty) && <span className='popup__input-error'>Поле обязательно для заполнения</span>}
            {(email.isDirty && email.isEmailError) && <span className='popup__input-error'>Некорректный e-mail</span>}
            {(email.isDirty && email.maxLengthError) && <span className='popup__input-error'>Максимальная длина: 40 символов</span>}

            <label className="popup__subtitle">Пароль</label>
            <input onChange={password.onChange} onBlur={password.onBlur}
                type="text"
                name="password"
                placeholder="Введите пароль"
                className="popup__input popup__input_subtitle" />
            {(password.isDirty && password.isEmpty) && <span className='popup__input-error'>Поле обязательно для заполнения</span>}
            {(password.isDirty && password.minLengthError) && <span className='popup__input-error'>Минимальная длина: 6 символов</span>}
            <label className="popup__subtitle">Имя</label>
            <input onChange={userName.onChange} onBlur={userName.onBlur}
                type="text"
                name="name"
                placeholder="Введите свое имя"
                className="popup__input popup__input_subtitle"
            />
            {(userName.isDirty && userName.isEmpty) && <span className='popup__input-error'>Поле обязательно для заполнения</span>}
            {(userName.isDirty && userName.minLengthError) && <span className='popup__input-error'>Минимальная длина: 2 символа</span>}
            {(userName.isDirty && userName.maxLengthError) && <span className='popup__input-error'>Максимальная длина: 40 символов</span>}
            <span className="popup__api-error">{apiErrorText}</span>
            <button 
            // disabled={!email.inputValid || !password.inputValid || !userName.inputValid } 
            type="submit" id="submit-button"
                className={(email.inputValid && password.inputValid && userName.inputValid) ? `popup__submit-button` : `popup__submit-button popup__submit-button_disabled`}>Зарегистрироваться</button>
        </PopupWithForm>
    )
}

export default Register;