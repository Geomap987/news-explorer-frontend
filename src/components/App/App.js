import './App.css';
import React, { useEffect, useCallback, useRef } from 'react';
import { Route, useHistory} from 'react-router-dom';
import { useInput } from '../../utils/Validation.js'

import Header from '../Header/Header.js';
import SearchForm from '../SearchForm/SearchForm.js';
import About from '../About/About.js';
import Footer from '../Footer/Footer.js';
import PopupWithForm from '../PopupWithForm/PopupWithForm.js';
import '../PopupWithForm/PopupWithForm.css';
import InfoToolTip from '../InfoToolTip/InfoToolTip.js';
import Preloader from '../Preloader/Preloader.js';
import NewsCardList from '../NewsCardList/NewsCardList.js';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader.js';
import NoNewsFound from '../NoNewsFound/NoNewsFound.js';

function App() {

  const [isNavigationOpened, setNavigationOpened] = React.useState(false);
  const [isUserLoggedIn, setUserLoggedIn] = React.useState(false);
  const [isSignInPopupOpened, setSignInPopupOpened] = React.useState(false);
  const [isSignUpPopupOpened, setSignUpPopupOpened] = React.useState(false);
  const [isInfoToolTipOpened, setInfoToolTipOpened] = React.useState(false);

  const history = useHistory();

  function toggleNavigation() {
    setNavigationOpened(!isNavigationOpened)
  }

  function toggleUserLoggedIn() {
    setUserLoggedIn(!isUserLoggedIn)
  }

  function logOut() {
    setUserLoggedIn(false)
    history.push('/')
  }

  function openSignInPopup() {
    setNavigationOpened(false)
    setSignInPopupOpened(true)
  }

  function openSignUpPopup() {
    setSignUpPopupOpened(true)
  }

  function openInfoToolTipPopup() {
    setInfoToolTipOpened(true)
  }

  function goToSignUpPopup() {
    closeAllPopups()
    openSignUpPopup()
  }

  function goToSignInPopup() {
    closeAllPopups()
    setSignInPopupOpened(true)
  }

  function goToInfoToolTipPopup() {
    setSignUpPopupOpened(false)
    openInfoToolTipPopup()
  }

  //попап регистрации

  const nameInput = useRef()
  const userName = useInput('', { isEmpty: true, minLength: 2, maxLength: 40 })
  function submitSigninPopup() {
    toggleUserLoggedIn();
    closeAllPopups();
    nameInput.current.value = ''
  }

  //закрытие попапов
  function closeAllPopups() {
    setSignInPopupOpened(false);
    setSignUpPopupOpened(false);
    setInfoToolTipOpened(false)
  }

  function closeInfoToolTip() {
    setInfoToolTipOpened(false)
    openSignInPopup()
  }

  const handleEscPress =
    useCallback((evt) => {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }, [])

  useEffect(() => {
    document.addEventListener('keyup', handleEscPress, false);
    return () => {
      document.removeEventListener('keyup', handleEscPress, false);
    };
  }, [handleEscPress])

  return (
    <div className="App">
      <Route exact path="/">
        <Header
          isNavigationOpened={isNavigationOpened}
          openNavigationHandler={toggleNavigation}
          userLoggedIn={isUserLoggedIn}
          theme={`white`}
          openSignInPopup={openSignInPopup}
          logOut={toggleUserLoggedIn}
        />
        <SearchForm></SearchForm>
        <Preloader active={false}></Preloader>
        <NoNewsFound active={false} />
        <NewsCardList
        theme='searchCards'
        isUserLoggedIn={isUserLoggedIn} />
        <About></About>
        <Footer></Footer>
        <PopupWithForm
          title='Вход'
          name={`signin`}
          isOpen={isSignInPopupOpened}
          buttonText='Вход'
          linkText='Зарегистрироваться'
          goToAnotherPopup={goToSignUpPopup}
          onClose={closeAllPopups}
          overlayClose={closeAllPopups}
          onSubmit={submitSigninPopup}
          apiErrorText=''>
        </PopupWithForm>
        <PopupWithForm
          title='Регистрация'
          name={`signup`}
          isOpen={isSignUpPopupOpened}
          buttonText='Зарегистрироваться'
          linkText='Войти'
          goToAnotherPopup={goToSignInPopup}
          onClose={closeAllPopups}
          onSubmit={goToInfoToolTipPopup}
          overlayClose={closeAllPopups}
          apiErrorText=''>
          <label className="popup__subtitle">Имя</label>
          <input onChange={userName.onChange} onBlur={userName.onBlur}
            ref={nameInput}
            type="text"
            name="name"
            placeholder="Введите свое имя"
            className="popup__input popup__input_subtitle"
          />
          {(userName.isDirty && userName.isEmpty) && <span className='popup__input-error'>Поле обязательно для заполнения</span>}
          {(userName.isDirty && userName.minLengthError) && <span className='popup__input-error'>Минимальная длина: 2 символа</span>}
          {(userName.isDirty && userName.maxLengthError) && <span className='popup__input-error'>Максимальная длина: 40 символов</span>}
        </PopupWithForm>
        <InfoToolTip
          onClose={closeInfoToolTip}
          isOpen={isInfoToolTipOpened}
          overlayClose={closeAllPopups}
          goToSignInPopup={goToSignInPopup}>
        </InfoToolTip>
      </Route>
      <Route path="/saved-news">
        <Header
          isNavigationOpened={isNavigationOpened}
          openNavigationHandler={toggleNavigation}
          userLoggedIn={true}
          blackTheme={true}
          theme={`black`}
          logOut={logOut}
        />
        <SavedNewsHeader />
        <NewsCardList
        theme='savedCards'
        isUserLoggedIn={isUserLoggedIn} />
      </Route>
    </div>
  );
}

export default App;
