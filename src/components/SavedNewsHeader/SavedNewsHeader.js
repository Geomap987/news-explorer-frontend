import React from 'react';
import './SavedNewsHeader.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';


function SavedNewsHeader({savedArticlesAmount, keyWordsArray}) {
    const currentUser = React.useContext(CurrentUserContext);
    const keyWords = keyWordsArray.join(', ')

    return (
        <section className="saved-news">
            <div className="saved-news__container">
                <h3 className="saved-news__title">Сохраненные статьи</h3>
                <h1 className="saved-news__main-text">{`${currentUser.name}, у вас ${savedArticlesAmount} сохраненных статей`}</h1>
                <h3 className="saved-news__subtitle">По ключевым словам: <span className="saved-news__key-word">{`${keyWords}`}</span></h3>
            </div>
        </section>
    );
}

export default SavedNewsHeader;