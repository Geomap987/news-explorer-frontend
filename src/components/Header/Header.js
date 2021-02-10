import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'
import whiteLogoutImage from '../../images/logout.svg'
import blackLogoutImage from '../../images/logout-black.svg'
import { CurrentUserContext } from '../../contexts/CurrentUserContext';


function Header({ isNavigationOpened, openNavigationHandler, userLoggedIn, theme, openSignInPopup, logOut }) {
    const currentUser = React.useContext(CurrentUserContext);
 
    return (
        <header>
            <div className={theme === 'white' ? `header__background` : `header__background header__background_hidden`}></div>
            <div className={isNavigationOpened ? `header__blur header__blur_active` : `header__blur`}></div>
            <div className={isNavigationOpened ? `header__main header__main_${theme}` : `header__main`}>
                <p className={`header__logo header__logo_${theme}`}>NewsExplorer</p>
                <div className={isNavigationOpened ? `header__container header__container_${theme} header__container_opened` : `header__container`}>
                    <button className={theme === 'white' ? `header__invisible-button header__invisible-button_${theme} header__invisible-button_border` : `header__invisible-button`}>
                        <Link to="/" className={`header__item header__item_${theme}`}>Главная</Link>
                    </button>
                    <button className={userLoggedIn ? `header__invisible-button header__invisible-button_${theme}` : `header__invisible-button_hidden`}>
                        <Link to="/saved-news" className={`header__item header__item_${theme}`}>Сохраненные статьи</Link>
                    </button>
                    <button className={`header__button header__button_${theme}`} onClick={userLoggedIn ? logOut : openSignInPopup}>
                        <div className={`header__item header__item_${theme}`}>{userLoggedIn ? currentUser.name : `Авторизоваться`}</div>
                        <img className={userLoggedIn ? `header__button-image header__button-image_active` : `header__button-image`}
                            src={theme === 'white' ? whiteLogoutImage : blackLogoutImage}
                            alt="выход" />
                    </button>

                </div >
                <button className={isNavigationOpened ? `header__navigation-button header__navigation-button_${theme} header__navigation-button_${theme}_opened` : `header__navigation-button header__navigation-button_${theme}`}
                    onClick={openNavigationHandler}>
                </button>
            </div >
        </header>
    );
}

export default Header;