// IMPORT PACKAGES
import React, { useState, useEffect, useRef } from "react";

// IMPORT STYLES
import "./movies.css";

// IMPORT COMPONENT
import Header from "../Header/header";
import SearchForm from "../SearchForm/searchForm";
import MoviesCardList from "../MoviesCardList/moviesCardList";
import Footer from "../Footer/footer";
import { moviesApi, api } from "../../utils";

// Movies COMPONENT
function Movies({ isLoggedIn }) {
    const [isMovies, setIsMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const [savedMovies, setSavedMovies] = useState([]);
    const [isShortMovies, setIsShortMovies] = useState(false);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [shownCards, setShownCards] = useState(maxShowCardsDisplay());
    const [shownLoadMore, setShownLoadMore] = useState(false);
    const [selectedMovieId, setSelectedMovieId] = useState(null);

    const searUseRef = useRef("");

    const handleSearchSubmit = (searchText) => {
        searUseRef.current = localStorage.getItem("searchText")
            ? localStorage.getItem("searchText").toLowerCase()
            : "";
        setIsLoading(true);
        setErrors(null);
        setShownCards(maxShowCardsDisplay());

        if (isMovies.length > 0) {
            const filteredData = filterMovies(isMovies, isShortMovies);
            setFilteredMovies(filteredData);

            if (filteredData.length === 0) {
                setErrors("Ничего не найдено!");
            } else {
                setErrors(null);
            }

            setIsLoading(false);
            return;
        }

        moviesApi
            .getMovies(searchText)
            .then((data) => {
                let filteredData = filterMovies(data, isShortMovies);

                setIsMovies(data);
                setFilteredMovies(filterMovies(filteredData));

                if (searchText.trim() !== "") {
                    const searchQuery = searchText.toLowerCase();
                    data = data.filter(
                        (movie) =>
                            movie.nameRU.toLowerCase().includes(searchQuery) ||
                            movie.nameEN.toLowerCase().includes(searchQuery)
                    );
                }

                if (filterMovies(data).length === 0) {
                    setErrors("Ничего не найдено!");
                } else {
                    setErrors(null);
                }

                localStorage.setItem("searchText", searchText);
                localStorage.setItem("isShortMovies", isShortMovies);
                localStorage.setItem(
                    "filteredMovies",
                    JSON.stringify(filteredData)
                );

                setIsMovies(data);
            })
            .catch(() => {
                setErrors(`Ваш запрос не может быть выполнен в данный момент из-за возникшей ошибки.
                           Вероятно, у нас возникли проблемы с соединением или сервер временно недоступен.
                           Подождите еще или попробуйте в другой раз.`);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    useEffect(() => {
        if (isLoggedIn) {
            setErrors(null);
            handleSearchSubmit("");
            api.getInitialCards()
                .then((data) => {
                    setSavedMovies(data);
                })
                .catch(() => {
                    setErrors("Ошибка при получении сохраненных фильмов");
                });

            const savedSearchText = localStorage.getItem("searchText");
            const savedIsShortMovies =
                localStorage.getItem("isShortMovies") === "true";
            const savedFilteredMovies = localStorage.getItem("filteredMovies");

            if (savedSearchText) {
                searUseRef.current = savedSearchText;
            }

            if (savedIsShortMovies) {
                setIsShortMovies(savedIsShortMovies);
            }

            if (savedFilteredMovies) {
                setFilteredMovies(JSON.parse(savedFilteredMovies));
            }

            const savedIsMovies = JSON.parse(
                localStorage.getItem("filteredMovies")
            );
            if (savedIsMovies) {
                setIsMovies(savedIsMovies);
                const filteredData = filterMovies(
                    savedIsMovies,
                    savedIsShortMovies
                );
                setFilteredMovies(filteredData);
            }
        }
    }, [isLoggedIn]);

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

    const handleAddToSavedMovies = (movie) => {
        api.addNewCard({
            nameRU: movie.nameRU,
            nameEN: movie.nameEN,
            movieId: movie.movieId,
            country: movie.country,
            director: movie.director,
            duration: movie.duration,
            year: movie.year,
            description: movie.description,
            image: movie.image,
            trailerLink: movie.trailerLink,
            thumbnail: movie.thumbnail,
            owner: movie.owner,
        })
            .then((savedMovie) => {
                setSavedMovies([...savedMovies, savedMovie]);
                setSelectedMovieId(savedMovie.movieId);
            })
            .catch(() => {
                setErrors("Ошибка при сохранении фильма");
            });
    };

    const handleCheckbox = (isChecked) => {
        setIsShortMovies(isChecked);

        if (isMovies.length > 0) {
            const filteredData = filterMovies(isMovies, isChecked);

            const searchQuery = localStorage
                .getItem("searchText")
                .toLowerCase();
            const filteredBySearch = filteredData.filter(
                (movie) =>
                    movie.nameRU.toLowerCase().includes(searchQuery) ||
                    movie.nameEN.toLowerCase().includes(searchQuery)
            );

            setFilteredMovies(filteredBySearch);

            if (filteredBySearch.length === 0) {
                setErrors("Ничего не найдено");
            } else {
                setErrors(null);
            }
        }

        localStorage.setItem("isShortMovies", isChecked);
    };

    const handleRemoveFromSaved = (movieId) => {
        api.deleteCard(movieId)
            .then(() => {
                setSavedMovies((prevSavedMovies) =>
                    prevSavedMovies.filter((movie) => movie._id !== movieId)
                );
                setFilteredMovies((prevFilteredMovies) =>
                    prevFilteredMovies.filter((movie) => movie._id !== movieId)
                );
                setSelectedMovieId(movieId);
            })
            .catch(() => {
                setErrors("Ошибка при удалении сохраненного фильма");
            });
    };

    function maxShowCardsDisplay() {
        const screenWidth = window.innerWidth;
        return screenWidth > 768 ? 12 : screenWidth > 480 ? 8 : 5;
    }

    function calculateCardCount() {
        const screenWidth = window.innerWidth;
        return screenWidth > 768 ? 3 : 2;
    }

    const handleLoadMore = () => {
        setShownCards(shownCards + calculateCardCount());
    };

    const updateLoadMoreButton = (cardsCount) => {
        if (filteredMovies.length > cardsCount) {
            setShownLoadMore(true);
        } else {
            setShownLoadMore(false);
        }
    };

    useEffect(() => {
        updateLoadMoreButton(shownCards);
    }, [filteredMovies, shownCards]);

    const handleResize = () => {
        const newShownCards = maxShowCardsDisplay();
        setShownCards(newShownCards);
        updateLoadMoreButton(newShownCards);
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
            updateLoadMoreButton(maxShowCardsDisplay());
        };
    }, []);

    return (
        <>
            <Header isLoggedIn={isLoggedIn} />
            <main className="movies">
                <SearchForm
                    isLoggedIn={isLoggedIn}
                    onHandleSearchSubmit={handleSearchSubmit}
                    isShortMovies={isShortMovies}
                    setIsShortMovies={setIsShortMovies}
                    handleCheckboxChange={handleCheckbox}
                    defaultSearchText={localStorage.getItem("searchText")}
                />
                {isLoading ? (
                    <p className="movies__error-loading">Подождите...</p>
                ) : errors ? (
                    <p className="movies__error-text">{errors}</p>
                ) : (
                    <MoviesCardList
                        isMovies={filteredMovies.slice(0, shownCards)}
                        savedMovies={savedMovies}
                        onSaveMovie={handleAddToSavedMovies}
                        onCardDelete={handleRemoveFromSaved}
                        selectedMovieId={selectedMovieId}
                        currentRoute="/movies"
                    />
                )}
                {shownLoadMore && (
                    <button
                        className="movies__button-more"
                        type="button"
                        onClick={handleLoadMore}
                    >
                        Еще
                    </button>
                )}
            </main>
            <Footer />
        </>
    );
}

export default Movies;
