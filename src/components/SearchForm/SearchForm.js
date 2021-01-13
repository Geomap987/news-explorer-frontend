import React from 'react';
import './SearchForm.css'

function SearchForm() {
    return (
        <section className="search-form">
            <h1 className="search-form__title">Что творится в мире?</h1>
            <p className="search-form__subtitle">Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.</p>
            <form className="search-form__form">
                <input className="search-form__input" placeholder="Введите тему новости"></input>
                <button className="search-form__button">Искать</button>
            </form>
        </section>
    );
}

export default SearchForm;