// IMPORT PACKAGES
import React from "react";

// IMPORT STYLES
import "./savedMovies.css";

// IMPORT COMPONENT
import Header from "../Header/header";
import SearchForm from "../SearchForm/searchForm";
import MoviesCardList from "../MoviesCardList/moviesCardList";
import Footer from "../Footer/footer";

// SavedMovies COMPONENT
function SavedMovies({ isLoggedIn }) {
    return (
        <>
            <Header isLoggedIn={isLoggedIn} />
            <main className="saved-movies">
                <SearchForm />
                <MoviesCardList />
            </main>
            <Footer />
        </>
    );
}

export default SavedMovies;
