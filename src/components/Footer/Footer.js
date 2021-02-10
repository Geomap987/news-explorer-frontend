import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import github from '../../images/github.svg';
import facebook from '../../images/facebook.svg';

function Footer() {
    return (
        <footer className="footer">
            <p className="footer__copyright">&copy; 2021 Supersite, Powered by News API</p>
            <div className="footer__container">
                <div className="footer__link-container">
                    <Link to="/" className="footer__link">Главная</Link>
                    <a className="footer__link" href="https://praktikum.yandex.ru">Яндекс.Практикум</a>
                </div>
                <div className="footer__media-container">
                    <a className="footer__media" href="https://github.com/" rel="noreferrer" target="_blank"><img className="footer__media-icon" src={github} alt="Иконка гитхаб"></img></a>
                    <a className="footer__media" href="https://facebook.com/" rel="noreferrer" target="_blank"><img className="footer__media-icon" src={facebook} alt="Иконка гитхаб"></img></a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;