// IMPORT PACKAGES
import React from "react";

// IMPORT STYLES
import "./movies.css";

// IMPORT COMPONENT
import Header from "../Header/header";
import SearchForm from "../SearchForm/searchForm";
import MoviesCardList from "../MoviesCardList/moviesCardList";
import Footer from "../Footer/footer";

// Movies COMPONENT
function Movies({ isLoggedIn }) {
    return (
        <>
            <Header isLoggedIn={isLoggedIn} />
            <main className="movies">
                <SearchForm />
                <MoviesCardList />
                <button className="movies__button-more" type="button">
                    Еще
                </button>
            </main>
            <Footer />
        </>
    );
}

export default Movies;
