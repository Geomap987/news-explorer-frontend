import React from 'react';
import './ServerError.css';

function ServerError({active}) {
    return (
        <section className={active ? `server-error server-error_opened` : `server-error`}>
            <p className="server-error__title">Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</p>
        </section>
    );
}

export default ServerError;