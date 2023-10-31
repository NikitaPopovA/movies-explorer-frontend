// IMPORT PACKAGES
import React, { useState, useEffect, useRef } from "react";

// IMPORT STYLES
import "./savedMovies.css";

// IMPORT COMPONENT
import Header from "../Header/header";
import SearchForm from "../SearchForm/searchForm";
import MoviesCardSav from "../MoviesCardSav/MoviesCardSav";
import Footer from "../Footer/footer";
import { api } from "../../utils";

// SavedMovies COMPONENT
function SavedMovies({ isLoggedIn }) {
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const [savedMovies, setSavedMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [isShortMovies, setIsShortMovies] = useState(false);
    const searUseRef = useRef("");

    useEffect(() => {
        setIsLoading(true);

        api.getInitialCards()
            .then((savedIsMovies) => {
                setSavedMovies(savedIsMovies);
                setFilteredMovies(savedIsMovies);
                setIsLoading(false);
            })
            .catch(() => {
                setErrors("Ошибка при получении сохраненных фильмов");
                setIsLoading(false);
            });
    }, []);

    const filterMovies = (data, isShortMovies) => {
        let filteredData = [...data];

        if (isShortMovies) {
            filteredData = filteredData.filter((movie) => movie.duration <= 40);
        }

        if (searUseRef.current.trim() !== "") {
            const searchQuery = searUseRef.current.toLowerCase();
            filteredData = filteredData.filter(
                (movie) =>
                    movie.nameRU.toLowerCase().includes(searchQuery) ||
                    movie.nameEN.toLowerCase().includes(searchQuery)
            );
        }

        return filteredData;
    };

    const handleSearchSubmit = (searchText) => {
        searUseRef.current = searchText;
        setIsLoading(true);
        setErrors(null);

        const filteredData = filterMovies(savedMovies, isShortMovies);

        if (searchText.trim() !== "") {
            const searchQuery = searchText.toLowerCase();
            const filteredByText = filteredData.filter(
                (movie) =>
                    movie.nameRU.toLowerCase().includes(searchQuery) ||
                    movie.nameEN.toLowerCase().includes(searchQuery)
            );
            setFilteredMovies(filteredByText);
        } else {
            setFilteredMovies(filteredData);
        }

        if (filteredData.length === 0) {
            setErrors("Ничего не найдено");
        } else {
            setErrors(null);
        }

        setIsLoading(false);
    };

    const handleDeleteMovie = (movieId) => {
        api.deleteCard(movieId)
            .then(() => {
                setSavedMovies((prevSavedMovies) =>
                    prevSavedMovies.filter((movie) => movie._id !== movieId)
                );
                setFilteredMovies((prevFilteredMovies) =>
                    prevFilteredMovies.filter((movie) => movie._id !== movieId)
                );
            })
            .catch(() => {
                setErrors("Ошибка при удалении сохраненного фильма");
            });
    };

    const handleCheckbox = (isChecked) => {
        const filteredData = filterMovies(savedMovies, isChecked);
        setIsShortMovies(isChecked);
        setFilteredMovies(filteredData);

        if (filteredData.length === 0) {
            setErrors("Ничего не найдено");
        } else {
            setErrors(null);
        }
    };

    return (
        <>
            <Header isLoggedIn={isLoggedIn} />
            <main className="saved-movies">
                <SearchForm
                    onHandleSearchSubmit={handleSearchSubmit}
                    isShortMovies={isShortMovies}
                    setIsShortMovies={setIsShortMovies}
                    handleCheckboxChange={handleCheckbox}
                />
                {isLoading ? (
                    <p className="saved-movies__error-please">Подождите...</p>
                ) : errors ? (
                    <p className="saved-movies__error-text">{errors}</p>
                ) : (
                    <MoviesCardSav
                        savedMovies={filteredMovies}
                        onCardDelete={handleDeleteMovie}
                        currentRoute="/saved-movies"
                    />
                )}
            </main>
            <Footer />
        </>
    );
}

export default SavedMovies;
