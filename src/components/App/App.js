import './App.css';
import React, { useEffect, useCallback, useState } from 'react';
import { Route, useHistory, Switch} from 'react-router-dom';
import * as auth from '../../utils/auth.js';
import { getToken, setToken, removeToken } from '../../utils/token';

import ProtectedRoute from '../ProtectedRoute';
import Header from '../Header/Header.js';
import SearchForm from '../SearchForm/SearchForm.js';
import About from '../About/About.js';
import Footer from '../Footer/Footer.js';
import Register from '../Register/Register.js';
import Login from '../Login/Login.js';
import InfoToolTip from '../InfoToolTip/InfoToolTip.js';
import Preloader from '../Preloader/Preloader.js';
import NewsCardList from '../NewsCardList/NewsCardList.js';
import SavedNews from '../SavedNews/SavedNews.js';
import NoNewsFound from '../NoNewsFound/NoNewsFound.js';
import ServerError from '../ServerError/ServerError.js';
import { newsApi } from '../../utils/NewsApi.js';
import { mainApi } from '../../utils/MainApi.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function App() {

  const [currentUser, setCurrentUser] = React.useState({});
  const [savedArticles, setSavedArticles] = React.useState([]);
  const [keyWord, setKeyWord] = React.useState('');

  const [isNavigationOpened, setNavigationOpened] = React.useState(false);
  const [isUserLoggedIn, setUserLoggedIn] = React.useState(false);
  const [isSignInPopupOpened, setSignInPopupOpened] = React.useState(false);
  const [isSignUpPopupOpened, setSignUpPopupOpened] = React.useState(false);
  const [isInfoToolTipOpened, setInfoToolTipOpened] = React.useState(false);
  const [isStartSerching, setStartSearching] = React.useState(false);
  const [isHaveResults, setHaveResults] = React.useState(false);
  const [isNoResults, setNoResults] = React.useState(false);
  const [isServerError, setServerError] = React.useState(false);
  const [foundArticles, setFoundArticles] = React.useState([])
  const [apiErrorText, setApiErrorText] = useState('')

  const history = useHistory();

  function toggleNavigation() {
    setNavigationOpened(!isNavigationOpened)
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

  function submitSigninPopup() {
    setUserLoggedIn(true);
    closeAllPopups();
  }

  //закрытие попапов
  function closeAllPopups() {
    setSignInPopupOpened(false);
    setSignUpPopupOpened(false);
    setInfoToolTipOpened(false)
    setApiErrorText('')
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

  useEffect(() => {
    mainApi.getInitialInfo().then(
      (res) => {
        const items = res[1]
        setSavedArticles(items)
      }).catch((err) => {console.log(err);
        setUserLoggedIn(false)});
  }, [])

  useEffect(() => {
    tokenCheck();
  }, []);

  //регистрация и авторизация
  const authorization = (email, password) => {
    console.log(email)
    console.log(password)
    auth.authorize(email, password)
      .then((data) => {
        console.log(data)
        if (!data) {
          setApiErrorText('Что-то пошло не так! Попробуйте еще раз.')
        }
        else {
          setToken(data.token);
          tokenCheck()
          submitSigninPopup()
        }
      })
      .then(() => {
        mainApi.getCardList().then(
          (res) => {
            const items = res
            setSavedArticles(items)
          }).catch((err) => console.log(err));
      })
      .catch((err) => {
        setApiErrorText(err.message)
      });

  }

  const registration = (name, email, password) => {
    auth.register(name, email, password).then((res) => {
      console.log(res)
      if (res.status === 200) {
        goToInfoToolTipPopup()
      } else {
        res.json().then((res) => setApiErrorText(res.message))
      }
    })
      .catch((err) => {
        console.log(err)
      })
  }

  const tokenCheck = () => {
    const jwt = getToken();
    if (!jwt) {
      return;
    }
    auth.getContent(jwt).then((res) => {
      if (res) {
        const currentUser = res;
        setUserLoggedIn(true)
        setCurrentUser(currentUser);
        history.push('/')
      }
      else {
        return
      }
    }).catch(err => console.log(err))
  }

  function signOut() {
    removeToken();
    setUserLoggedIn(false)
    history.push('/');
  }

  //поиск статей
  function handleSearchWord(a) {
    const word = a.searchWord;
    setKeyWord(word)
    setNoResults(false)
    setStartSearching(true)
    setServerError(false);
    newsApi.getNewsCardList(word).then((res) => {
      if (res.totalResults !== 0) {
        setStartSearching(false)
        setHaveResults(true)
        console.log(res)
        const foundItems = res.articles;
        console.log(typeof (foundItems))
        setFoundArticles(foundItems)
      }
      else {
        setStartSearching(false)
        setNoResults(true)
      }
    }).catch((err) => {
      setServerError(true);
      console.log(err)
    });
  }

  // сохранение статей
  function handleSaveClick(card) {
    // console.log(card)
    mainApi.createCard({
      keyword: keyWord,
      title: card.title,
      text: card.description,
      date: card.publishedAt,
      source: card.source.name,
      link: card.url,
      image: card.urlToImage,
    }).then(
      (newCard) => {
        console.log(newCard)
        setSavedArticles([...savedArticles, newCard])
      }).catch((err) => console.log(err));
  }

  function handleDeleteClick(card) {
    console.log(card)
    mainApi.deleteCard(card._id).then((newCard) => {
      const newCards = savedArticles.filter((c) => c._id !== card._id);
      setSavedArticles(newCards);
    }).catch((err) => console.log(err));
  }

  function keyWordsArray() {
    const key = savedArticles.map((item) => item.keyword)
    return key.sort().filter(function (item, pos, ary) {
      return !pos || item !== ary[pos - 1];
    });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Header
              isNavigationOpened={isNavigationOpened}
              openNavigationHandler={toggleNavigation}
              userLoggedIn={isUserLoggedIn}
              theme={`white`}
              openSignInPopup={openSignInPopup}
              logOut={signOut}
            />
            <SearchForm
              onSearchWord={handleSearchWord}></SearchForm>
            <Preloader active={isStartSerching}></Preloader>
            <NoNewsFound active={isNoResults} />
            <ServerError active={isServerError} />
            <NewsCardList
              active={isHaveResults}
              theme='searchCards'
              isUserLoggedIn={isUserLoggedIn}
              initialArticles={foundArticles}
              onSaveClick={handleSaveClick}
              keyWord={keyWord} />
            <About></About>
            <Footer></Footer>
            <Login
              isOpen={isSignInPopupOpened}
              goToAnotherPopup={goToSignUpPopup}
              onClose={closeAllPopups}
              overlayClose={closeAllPopups}
              authorization={authorization}
              apiErrorText={apiErrorText}>
            </Login>
            <Register
              isOpen={isSignUpPopupOpened}
              goToAnotherPopup={goToSignInPopup}
              onClose={closeAllPopups}
              registration={registration}
              overlayClose={closeAllPopups}
              apiErrorText={apiErrorText}>
            </Register>
            <InfoToolTip
              onClose={closeInfoToolTip}
              isOpen={isInfoToolTipOpened}
              overlayClose={closeAllPopups}
              goToSignInPopup={goToSignInPopup}>
            </InfoToolTip>
          </Route>
          <ProtectedRoute path="/saved-news" loggedIn={isUserLoggedIn} component={SavedNews}
            isNavigationOpened={isNavigationOpened}
            openNavigationHandler={toggleNavigation}
            logOut={logOut}
            savedArticlesAmount={savedArticles.length}
            keyWordsArray={keyWordsArray()}
            isUserLoggedIn={isUserLoggedIn}
            initialArticles={foundArticles}
            savedArticles={savedArticles}
            handleDeleteClick={handleDeleteClick}>
          </ProtectedRoute>
        </Switch>
      </div>
    </CurrentUserContext.Provider >
  );
}

export default App;
