import React from 'react';
import './About.css';
import avatar from '../../images/avatarka.JPG';

function About() {
    return (
        <section className="about">
            <img className="about__avatar" src={avatar} alt="Фотография автора"></img>
            <div className="about__text-container">
                <h2 className="about__title">Об авторе</h2>
                <p className="about__text">Меня зовут Мария Васильева. Я начинающий frontend-разработчик. Сейчас работаю над дипломным проектом Яндекс.Практикума по направлению веб-разработка. Владею HTML
и CSS, нативным Java Script, React, умею верстать адаптивно. Дружу с Git и Webpack, умею работать с API. Также знакома с основами backend: Node.js (express) и базы данных MongoDB.</p>
                <p className="about__text">Хочу
создавать крутые и удобные сайты и приложения, которые будут радовать пользователей. Тонко
чувствую красоту и гармонию интерфейсов. Люблю работать в команде, заряжаю людей позитивом
и отличаюсь отменным чувством юмора. Имею богатый опыт работы в международных компаниях.
Мастер коммуникации, в том числе на английском и китайском языках.</p>
            </div>
        </section>
    );
}

export default About;