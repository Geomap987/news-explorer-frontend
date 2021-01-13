import React from 'react';
import './SavedNewsHeader.css';

function SavedNewsHeader() {

    return (
        <section className="saved-news">
            <div className="saved-news__container">
                <h3 className="saved-news__title">Сохраненные статьи</h3>
                <h1 className="saved-news__main-text">Пупырка, у вас 6 сохраненных статей</h1>
                <h3 className="saved-news__subtitle">По ключевым словам: <span className="saved-news__key-word">Природа</span></h3>
            </div>
        </section>
    );
}

export default SavedNewsHeader;