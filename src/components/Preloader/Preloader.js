import React from 'react';
import './Preloader.css';

function Preloader({active}) {
    return (
        <section className={active ? "preloader preloader_opened" : "preloader"}>
            <i class="preloader__circle"></i>
            <p className="preloader__text">Идет поиск новостей...</p>
        </section>
    );
}

export default Preloader;