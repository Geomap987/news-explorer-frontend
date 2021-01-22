import React, { useState } from 'react';
import moment from 'moment';
import 'moment/locale/ru'
import './NewsCard.css'

function NewsCard({ title, text, date, source, link, image, onDeleteClick, keyWord, theme, isUserLoggedIn, item, onSaveClick, isSaved }) {
    // const [isSaved, setIsSaved] = useState(false)
    const [isDeleteClicked, setDeleteClicked] = useState(false)
    const [isFlagClicked, setFlagClicked] = useState(false)

    function handleSaveClick() {
        // setIsSaved(!isSaved);
        onSaveClick(item);
    }
    function handleDeleteClick() {
        setDeleteClicked(!isDeleteClicked)
    }
    function handleDeleteButton() {
        onDeleteClick(item);
    }
    function handleFlagClick() {
        setFlagClicked(!isFlagClicked)
    }

    function formatDate(a) {
        moment.locale('ru');
        return moment(a).format('LL');
    }

    function doNothing() {

    }


    return (
        <article className="card-list__card">
            <a className="card-list__link" href={link} target="_blank" rel="noreferrer">
                <img className="card-list__photo" src={image} alt={title} />
            </a>
            <p className={theme === 'savedCards' ? `card-list__key-word` : `card-list__key-word_hidden`}>{keyWord}</p>
            <button onClick={handleDeleteButton} className={isDeleteClicked ? "card-list__delete-window" : "card-list__delete-window_none"}>Убрать из сохраненных</button>
            <button onClick={handleDeleteClick} className={theme === 'savedCards' ? "card-list__delete-icon" : "card-list__delete-icon_none"}></button>
            <button className={isFlagClicked ? "card-list__remind-window" : "card-list__remind-window_none"}>Войдите, чтобы сохранить статью</button>
            {theme === 'searchCards' ? <button onMouseOver={isUserLoggedIn ? doNothing : handleFlagClick}
                onMouseOut={isUserLoggedIn ? doNothing : handleFlagClick}
                onClick={isUserLoggedIn ? handleSaveClick : doNothing}
                className={isSaved ? "card-list__flag_active" : "card-list__flag"}></button> : <button
                    onClick={handleDeleteClick} className="card-list__delete-icon"></button>}
            <div className="card-list__text">
                <h5 className="card-list__date">{formatDate(date)}</h5>
                <a className="card-list__link" href={link} target="_blank" rel="noreferrer">
                    <h3 className="card-list__title">{title}</h3>
                </a>
                <a className="card-list__link" href={link} target="_blank" rel="noreferrer">
                    <h4 className="card-list__subtitle">{text}</h4>
                </a>
                <h5 className="card-list__source">{source}</h5>
            </div>
        </article>
    );
}

export default NewsCard;
