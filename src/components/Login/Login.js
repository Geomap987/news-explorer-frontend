import React from 'react';
import '../PopupWithForm/PopupWithForm.css';
import { useInput } from '../../utils/Validation.js'
import PopupWithForm from '../PopupWithForm/PopupWithForm';

const Login = ({ authorization, isOpen, overlayClose, goToAnotherPopup, onClose, apiErrorText }) => {
    //валидация
    const password = useInput('', { isEmpty: true, minLength: 6 })
    const email = useInput('', { isEmpty: true, isEmail: true, maxLength: 40 })

    const handleSubmit = (e) => {
        authorization(email.value, password.value)

    }

    return (
        <PopupWithForm 
        title='Вход'
        linkText='Зарегистрироваться'
        isOpen={isOpen}
        overlayClose={overlayClose}
        goToAnotherPopup={goToAnotherPopup}
        onClose={onClose}
        onSubmit={handleSubmit}>
            <label className="popup__subtitle">E-mail</label>
            <input onChange={email.onChange} onBlur={email.onBlur}
                type="text"
                name="email"
                // value={data.email}
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
                // value={data.password}
                placeholder="Введите пароль"
                className="popup__input popup__input_subtitle" />
            {(password.isDirty && password.isEmpty) && <span className='popup__input-error'>Поле обязательно для заполнения</span>}
            {(password.isDirty && password.minLengthError) && <span className='popup__input-error'>Минимальная длина: 6 символов</span>}
            <span className="popup__api-error">{apiErrorText}</span>
            <button 
            disabled={!email.inputValid || !password.inputValid} 
            type="submit" id="submit-button"
                className={(email.inputValid && password.inputValid) ? `popup__submit-button` : `popup__submit-button popup__submit-button_disabled`}>Войти</button>
        </PopupWithForm>
    )
}

export default Login;