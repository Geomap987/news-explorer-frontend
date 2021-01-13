import React, { useState } from 'react';
import NewsCard from '../NewsCard/NewsCard.js'
import './NewsCardList.css'
import initialCards from '../../data/cardsData.js'

function NewsCardList({ isUserLoggedIn, theme }) {

    const [row, setRow] = useState(3)

    function nextRow() {
        setRow(row + 3)
    }


    let elementsToRender = initialCards.slice(0, row)

    return (
        <section className="card-list">
            {theme === 'searchCards' ? <h2 className="card-list__results-title">Результаты поиска</h2> : <></>}
            <div className="card-list__container">
                {theme==='searchCards' ?
                    (elementsToRender.map(card =>
                    <NewsCard
                        theme={theme}
                        isUserLoggedIn={isUserLoggedIn}
                        keyWord={card.keyword}
                        title={card.title}
                        text={card.text}
                        date={card.date}
                        source={card.source}
                        link={card.link}
                        image={card.image}
                        isOwn={true}
                    />)) :
                    (initialCards.map(card =>
                    <NewsCard
                        theme={theme}
                        isUserLoggedIn={isUserLoggedIn}
                        keyWord={card.keyword}
                        title={card.title}
                        text={card.text}
                        date={card.date}
                        source={card.source}
                        link={card.link}
                        image={card.image}
                        isOwn={true}
                    />))}
            </div>
            {theme === 'searchCards' ? <button onClick={nextRow}className="card-list__button">Показать еще</button> : <></>}
        </section>
    );
}

export default NewsCardList;
