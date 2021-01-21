import React, { useState } from 'react';
import NewsCard from '../NewsCard/NewsCard.js'
import './NewsCardList.css'

function NewsCardList({ isUserLoggedIn, theme, active, initialArticles, savedArticles, onSaveClick, onDeleteClick, keyWord }) {

    const [row, setRow] = useState(3)

    function nextRow() {
        setRow(row + 3)
    }

    const articlesAmount = initialArticles.length

    let elementsToRender = initialArticles.slice(0, row)

    return (
        <section className={active ? "card-list" : "card-list card-list_closed"}>
            {theme === 'searchCards' ? <h2 className="card-list__results-title">Результаты поиска</h2> : <></>}
            <div className="card-list__container">
                {theme==='searchCards' ?
                    (elementsToRender.map((card, i) =>
                    <NewsCard
                        theme={theme}
                        isUserLoggedIn={isUserLoggedIn}
                        keyWord={keyWord}
                        title={card.title}
                        text={card.description}
                        date={card.publishedAt}
                        source={card.source.name}
                        link={card.url}
                        image={card.urlToImage}
                        item={card}
                        onSaveClick={onSaveClick}
                        onDeleteClick={onDeleteClick}
                        key={i}
                    />)) :
                    (savedArticles.map((card, i) =>
                    <NewsCard
                        theme={theme}
                        isUserLoggedIn={isUserLoggedIn}
                        onDeleteClick={onDeleteClick}
                        keyWord={card.keyword}
                        title={card.title}
                        text={card.text}
                        date={card.date}
                        source={card.source}
                        link={card.link}
                        image={card.image}
                        item={card}
                        key={i}
                    />))}
            </div>
            {theme === 'searchCards' && row <= articlesAmount ? <button onClick={nextRow} className="card-list__button">Показать еще</button> : <></>}
        </section>
    );
}

export default NewsCardList;
