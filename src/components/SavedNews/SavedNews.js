import React from 'react';
import Header from '../Header/Header.js'
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader.js'
import NewsCardList from '../NewsCardList/NewsCardList.js'

function SavedNews({isNavigationOpened, openNavigationHandler, logOut, savedArticlesAmount, initialArticles, savedArticles, keyWordsArray, isUserLoggedIn, foundArticles, handleDeleteClickFromSaved }) {
    return (
        <>
        <Header
            isNavigationOpened={isNavigationOpened}
            openNavigationHandler={openNavigationHandler}
            userLoggedIn={true}
            blackTheme={true}
            theme={`black`}
            logOut={logOut}
          />
          <SavedNewsHeader 
          savedArticlesAmount={savedArticlesAmount}
          keyWordsArray={keyWordsArray}/>
          <NewsCardList
            active={true}
            theme='savedCards'
            isUserLoggedIn={isUserLoggedIn}
            initialArticles={initialArticles}
            savedArticles={savedArticles}
            onDeleteClickFromSaved={handleDeleteClickFromSaved} />
        </>
    )
}

export default SavedNews;