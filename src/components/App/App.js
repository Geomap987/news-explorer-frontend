import './App.css';
import React, { useEffect, useCallback, useState } from 'react';
import { Route, useHistory, Switch } from 'react-router-dom';
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
import RequestPreloader from '../RequestPreloader/RequestPreloader.js';
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
  const [isWaitingResponse, setWaitingResponse] = React.useState(false);

  const [isHaveResults, setHaveResults] = React.useState(false);
  const [isNoResults, setNoResults] = React.useState(false);
  const [isServerError, setServerError] = React.useState(false);
  const [foundArticles, setFoundArticles] = React.useState([])
  const [apiErrorText, setApiErrorText] = useState('')

  const history = useHistory();

  function generateId() {
    return `f${(~~(Math.random() * 1e8)).toString(16)}`
  }

  function toggleNavigation() {
    setNavigationOpened(!isNavigationOpened)
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

  //регистрация и авторизация
  const authorization = (email, password) => {
    setWaitingResponse(true)
    auth.authorize(email, password)
      .then((data) => {
        setWaitingResponse(false)
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
        setWaitingResponse(false)
        setApiErrorText(err.message)
      });

  }

  const registration = (name, email, password) => {
    setWaitingResponse(true)
    auth.register(name, email, password).then((res) => {
      setWaitingResponse(false)
      if (res.status === 200) {
        goToInfoToolTipPopup()
      } else {
        res.json().then((res) => setApiErrorText(res.message))
      }
    })
      .catch((err) => {
        setWaitingResponse(false)
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
    localStorage.clear()
    setUserLoggedIn(false)
    history.push('/');
  }

  //поиск статей
  function handleSearchWord(a) {
    const word = a.searchWord;
    setKeyWord(word)
    localStorage.removeItem('keyWord')
    localStorage.setItem('keyWord', JSON.stringify(word))
    setHaveResults(false)
    setNoResults(false)
    setStartSearching(true)
    setServerError(false);
    newsApi.getNewsCardList(word).then((res) => {
      if (res.totalResults !== 0) {
        setStartSearching(false)
        setHaveResults(true)
        const foundItems = res.articles;
        foundItems.forEach((item) => {
          item.isSaved = false
          item.lsId = generateId();
        })
        localStorage.removeItem('foundItems')
        localStorage.setItem('foundItems', JSON.stringify(foundItems))
        const foundItemsLocal = JSON.parse(localStorage.getItem('foundItems'))
        setFoundArticles(foundItemsLocal)
      }
      else {
        setStartSearching(false)
        setNoResults(true)
      }
    }).catch((err) => {
      setStartSearching(false)
      setServerError(true)
      console.log(err)
    });
  }

  // сохранение статей
  function handleSaveClick(card) {
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
        card._id = newCard._id;
        card.isSaved = true;
        const newFoundArticles = foundArticles.map((c) => c.lsId === card.lsId ? card : c);
        localStorage.removeItem('foundItems')
        localStorage.setItem('foundItems', JSON.stringify(newFoundArticles))
        const foundItemsLocal = JSON.parse(localStorage.getItem('foundItems'))
        setFoundArticles(foundItemsLocal)
        setSavedArticles([...savedArticles, newCard])
      }).catch((err) => console.log(err));
  }

  function handleDeleteClick(card) {
    mainApi.deleteCard(card._id).then((newCard) => {
      card.isSaved = false;
      const newCards = savedArticles.filter((c) => c._id !== card._id);
      setSavedArticles(newCards);
      const newFoundArticles = foundArticles.map((c) => c.lsId === card.lsId ? card : c);
      localStorage.removeItem('foundItems')
      localStorage.setItem('foundItems', JSON.stringify(newFoundArticles))
      const foundItemsLocal = JSON.parse(localStorage.getItem('foundItems'))
      setFoundArticles(foundItemsLocal)
    }).catch((err) => console.log(err));
  }

  function handleDeleteClickFromSaved(card) {
    mainApi.deleteCard(card._id).then((newCard) => {
      const newCards = savedArticles.filter((c) => c._id !== card._id);
      setSavedArticles(newCards);
      const newFoundArticle = foundArticles.filter((c) => c._id === card._id);
      newFoundArticle[0].isSaved = false
      const newFoundArticles = foundArticles.map((c) => c.lsId === newFoundArticle.lsId ? newFoundArticle : c);
      console.log(newFoundArticles)
      localStorage.removeItem('foundItems')
      localStorage.setItem('foundItems', JSON.stringify(newFoundArticles))
      const foundItemsLocal = JSON.parse(localStorage.getItem('foundItems'))
      setFoundArticles(foundItemsLocal)
    }).catch((err) => console.log(err));
  }

  function keyWordsArray() {
    const key = savedArticles.map((item) => item.keyword)
    return key.sort().filter(function (item, pos, ary) {
      return !pos || item !== ary[pos - 1];
    });
  }

  useEffect(() => {
    document.addEventListener('keyup', handleEscPress, false);
    return () => {
      document.removeEventListener('keyup', handleEscPress, false);
    };
  }, [handleEscPress])


  useEffect(() => {

    tokenCheck();
  }, []);

  useEffect(() => {
    const foundItemsLocal = JSON.parse(localStorage.getItem('foundItems'))
    const word = JSON.parse(localStorage.getItem('keyWord'))
    if (foundItemsLocal !== null) {
      setFoundArticles(foundItemsLocal)
      setKeyWord(word)
      setHaveResults(true)
    }
    mainApi.getInitialInfo().then(
      (res) => {
        const items = res[1]
        setSavedArticles(items)
      }).catch((err) => {
        console.log(err);
        setUserLoggedIn(false)
      });
  }, [])


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
            <RequestPreloader active={isWaitingResponse}></RequestPreloader>
            <NoNewsFound active={isNoResults} />
            <ServerError active={isServerError} />
            <NewsCardList
              active={isHaveResults}
              theme='searchCards'
              isUserLoggedIn={isUserLoggedIn}
              initialArticles={foundArticles}
              onSaveClick={handleSaveClick}
              onDeleteClick={handleDeleteClick}
              openSignUpPopup={openSignUpPopup}
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
            openSignInPopup={openSignInPopup}
            isNavigationOpened={isNavigationOpened}
            openNavigationHandler={toggleNavigation}
            logOut={signOut}
            savedArticlesAmount={savedArticles.length}
            keyWordsArray={keyWordsArray()}
            isUserLoggedIn={isUserLoggedIn}
            initialArticles={foundArticles}
            savedArticles={savedArticles}
            handleDeleteClickFromSaved={handleDeleteClickFromSaved}>
          </ProtectedRoute>
        </Switch>
      </div>
    </CurrentUserContext.Provider >
  );
}

export default App;
