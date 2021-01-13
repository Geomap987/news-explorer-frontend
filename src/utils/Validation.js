import { useState, useEffect } from 'react';

const useValidation = (value, validations) => {

    const [isEmpty, setEmpty] = useState(true);
    const [minLengthError, setMinLengthError] = useState(false)
    const [maxLengthError, setMaxLengthError] = useState(false)
    const [isEmailError, setEmailError] = useState(false)
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

export {useValidation, useInput} 