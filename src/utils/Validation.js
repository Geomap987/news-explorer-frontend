  
import React, { useState, useCallback, useEffect } from 'react';


const useValidation = (value, validations) => {

    const [isEmpty, setEmpty] = useState(true);
    const [minLengthError, setMinLengthError] = useState(false)
    const [maxLengthError, setMaxLengthError] = useState(false)
    const [isEmailError, setEmailError] = useState(false)
    const [isContainNumbersError, setNumberError] = useState(false)
    const [isFullNameError, setFullNameError] = useState(false)
    const [inputValid, setInputValid] = useState(false)

    useEffect(() => {
        for (const validation in validations) {
            switch (validation) {
                case 'minLength':
                    value.length < validations[validation] ? setMinLengthError(true) : setMinLengthError(false)
                    break;
                case 'isEmpty':
                    value ? setEmpty(false) : setEmpty(true)

                    break;
                case 'maxLength':
                    value.length > validations[validation] ? setMaxLengthError(true) : setMaxLengthError(false)

                    break;
                case 'isEmail':
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        .test(String(value).toLowerCase()) ? setEmailError(false) : setEmailError(true)

                    break
                    default:
            }
        }
    }, [value, validations])

    useEffect(() => {
        if (isEmpty || minLengthError || maxLengthError || isEmailError ) {
            setInputValid(false)
        } else {
            setInputValid(true)
        }
    }, [isEmpty,
        minLengthError,
        maxLengthError,
        isEmailError,
        ])

    return {
        isEmpty,
        minLengthError,
        maxLengthError,
        isEmailError,
        inputValid,
    }
}

const useInput = (initialValue, validations) => {
    const [value, setValue] = useState(initialValue)
    const [isDirty, setDirty] = useState(false)
    const valid = useValidation(value, validations)
    const onChange = (e) => {
        setValue(e.target.value)
    }
    const onBlur = (e) => {
        setDirty(true)
    }
    return {
        value,
        onChange,
        onBlur,
        isDirty,
        ...valid
    }
}


function ContactForm(inputValid) {

    const fullName = useInput('', { isEmpty: true, minLength: 5, isFullName: true })
    const email = useInput('', { isEmpty: true, isEmail: true, maxLength: 40 })
    const phoneNumber = useInput('', { isEmpty: true, isContainNumbers: true, maxLength: 12 })
    const poems = useInput('', { isEmpty: true, minLength: 2 })


    return (
        <article className="form">
            <h2 className="form__title">ФОРМА.</h2>
            <h3 className="form__subtitle">Заполняя эту форму, вы становитесь частью проекта.</h3>
            <form name="form-turbina" className="form__container" action="#">
                <input className="form__input" onChange={e => fullName.onChange(e)} onBlur={e => fullName.onBlur(e)} value={fullName.value} name="fullName" type="text" placeholder="Имя и фамилия автора"
                />
                {(fullName.isDirty && fullName.isFullNameError && fullName.isEmpty) && <div style={{ color: 'red' }}>Поле обязательно для заполнения (В формате: А-я)</div>}
                {(fullName.isDirty && fullName.minLengthError) && <div style={{ color: 'red' }}>Минимальная длина: 5 символов</div>}
                <input className="form__input" onChange={email.onChange} onBlur={email.onBlur} value={email.value} name="email" type="email" placeholder="Почта" />
                {(email.isDirty && email.isEmpty) && <div style={{ color: 'red' }}>Поле обязательно для заполнения</div>}
                {(email.isDirty && email.isEmailError) && <div style={{ color: 'red' }}>Некорректный e-mail</div>}
                {(email.isDirty && email.maxLengthError) && <div style={{ color: 'red' }}>Максимальная длина: 40 символов</div>}
        
                <button disabled={!fullName.inputValid || !phoneNumber.inputValid || !email.inputValid || !poems.inputValid} className="form__submit-button">Отправить форму</button>
            </form>
        </article>
    );
}
export {useValidation, useInput} 