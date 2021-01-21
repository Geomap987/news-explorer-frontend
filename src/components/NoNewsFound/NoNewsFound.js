import React from 'react';
import './NoNewsFound.css';
import notFound from '../../images/not-found.svg'

function NoNewsFound({active}) {
    return (
        <section className={active ? `no-news no-news_opened` : `no-news`}>
            <img className="no-news__image" src={notFound} alt="изображение лупы"></img>
            <p className="no-news__title">Ничего не найдено</p>
            <p className="no-news__subtitle">К сожалению, по вашему запросу ничего не найдено.</p>
        </section>
    );
}

export default NoNewsFound;