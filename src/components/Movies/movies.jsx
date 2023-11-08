// IMPORT PACKAGES
import React, { useState, useEffect, useRef } from "react";

// IMPORT STYLES
import "./movies.css";

// IMPORT COMPONENT
import Header from "../Header/header";
import SearchForm from "../SearchForm/searchForm";
import MoviesCardList from "../MoviesCardList/moviesCardList";
import Footer from "../Footer/footer";
import { moviesApi, api, serializeBool } from "../../utils";
import { IMAGE_URL, STORAGE_KEYS } from "../../utils/constants/system";

// Movies COMPONENT
function Movies({ isLoggedIn }) {
    const [isMovies, setIsMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const [savedMovies, setSavedMovies] = useState([]);
    const [isShortMovies, setIsShortMovies] = useState(
        serializeBool(localStorage.getItem("isShortMovies"))
    );
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [shownCards, setShownCards] = useState(maxShowCardsDisplay());
    const [shownLoadMore, setShownLoadMore] = useState(false);
    const searUseRef = useRef(localStorage.getItem("searchText"));

    const movieMapper = (item) => {
        return {
            id: item.id,
            nameRU: item?.nameRU,
            nameEN: item?.nameEN,
            duration: item?.duration,
            trailerLink: item?.trailerLink,
            country: item?.country,
            director: item?.director,
            year: item?.year,
            description: item?.description,
            owner: item?.owner,
            image: `${IMAGE_URL}/${item?.image?.url || ""}`,
            thumbnail: `${IMAGE_URL}/${
                item?.image?.formats?.thumbnail?.url || ""
            }`,
        };
    };

    const handleSearchSubmit = (searchText) => {
        searUseRef.current =
            localStorage.getItem("searchText")?.toLowerCase() || "";
        setIsLoading(true);
        setErrors(null);
        setShownCards(maxShowCardsDisplay());
        const isAllMoves = JSON.parse(localStorage.getItem("all") || "[]");
        if (isAllMoves?.length) {
            const filteredData = filterMovies(isAllMoves, isShortMovies);
            localStorage.setItem(
                "filteredMovies",
                JSON.stringify(filteredData)
            );
            setFilteredMovies(filteredData);

            if (!filteredData) {
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
                let res = data;
                const preparedData = res.map((item) => movieMapper(item));
                localStorage.setItem("all", JSON.stringify(preparedData));
                let filteredData = filterMovies(preparedData, isShortMovies);
                setIsMovies(preparedData);
                setFilteredMovies(filterMovies(filteredData));

                if (searchText.trim() !== "") {
                    const searchQuery = searchText.toLowerCase();
                    res = filterMovies(res, searchQuery);
                }

                if (filterMovies(res).length === 0) {
                    setErrors("Ничего не найдено!");
                } else {
                    setErrors(null);
                }

                localStorage.setItem("searchText", searchText);
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
            const savedSearchText = localStorage.getItem("searchText");
            const savedFilteredMovies = JSON.parse(
                localStorage.getItem("filteredMovies") || "[]"
            );
            const savedIsShortMovies = serializeBool(
                localStorage.getItem("isShortMovies")
            );
            const savedMovies = JSON.parse(
                localStorage.getItem(STORAGE_KEYS.SAVED_MOVIES) || "[]"
            );
            if (!savedMovies?.length) {
                api.getInitialCards()
                    .then((data) => {
                        localStorage.setItem(
                            "savedMoves",
                            JSON.stringify(data)
                        );
                        setSavedMovies(data);
                    })
                    .catch(() => {
                        setErrors("Ошибка при получении сохраненных фильмов");
                    });
            }

            if (savedSearchText) {
                searUseRef.current = savedSearchText;
            }

            if (savedIsShortMovies) {
                setIsShortMovies(savedIsShortMovies);
            }

            if (savedMovies?.length) {
                setSavedMovies(savedMovies);
            }

            if (savedFilteredMovies) {
                setFilteredMovies(savedFilteredMovies);
            }

            const savedIsMovies = JSON.parse(
                localStorage.getItem("filteredMovies") || "[]"
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

    const filterMovies = (data, isShortMovies = false) => {
        let filteredData = [...data];

        if (isShortMovies) {
            filteredData = filteredData.filter((movie) => movie.duration <= 40);
        }

        if (searUseRef?.current?.trim() !== "") {
            const searchQuery = searUseRef?.current?.toLowerCase() || "";

            filteredData = filteredData.filter(
                (movie) =>
                    movie.nameRU?.toLowerCase()?.includes(searchQuery) ||
                    movie.nameEN?.toLowerCase()?.includes(searchQuery)
            );
        }

        return filteredData;
    };

    const handleAddToSavedMovies = (movie) => {
        console.log("movie", movie);
        api.addNewCard({
            nameRU: movie.nameRU,
            nameEN: movie.nameEN,
            movieId: movie.movieId,
            country: movie.country,
            director: movie.director,
            duration: movie.duration,
            year: movie.year,
            description: movie?.description || "",
            image: movie.image,
            trailerLink: movie.trailerLink,
            thumbnail: movie.thumbnail,
            owner: movie.owner,
        })
            .then((savedMovie) => {
                console.log("savedMovie", savedMovie);
                const savedMoviesArr = JSON.parse(
                    localStorage.getItem(STORAGE_KEYS.SAVED_MOVIES)
                );
                const newArr = [
                    ...savedMoviesArr,
                    { ...savedMovie, _id: savedMovie._id },
                ];
                setSavedMovies(newArr);
                localStorage.setItem(
                    STORAGE_KEYS.SAVED_MOVIES,
                    JSON.stringify(newArr)
                );
            })
            .catch(() => {
                setErrors("Ошибка при сохранении фильма");
            });
    };

    const handleCheckbox = (isChecked) => {
        setIsShortMovies(isChecked);
        localStorage.setItem("isShortMovies", isChecked);
        const movies = JSON.parse(localStorage.getItem("all") || "[]");
        if (isMovies.length > 0) {
            const filteredData = filterMovies(movies, isChecked);

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
                setSavedMovies((prevSavedMovies) => {
                    const res = prevSavedMovies.filter(
                        (movie) => movie._id !== movieId
                    );
                    localStorage.setItem(
                        STORAGE_KEYS.SAVED_MOVIES,
                        JSON.stringify(res)
                    );
                    return res;
                });
                setFilteredMovies((prevFilteredMovies) =>
                    prevFilteredMovies.filter((movie) => movie._id !== movieId)
                );
            })
            .catch(() => {
                setErrors("Ошибка при удалении сохраненного фильма");
            });
    };

    function maxShowCardsDisplay() {
        const screenWidth = window.innerWidth;
        if (screenWidth > 1023) {
            return 12;
        } else if (screenWidth > 750) {
            return 8;
        } else {
            return 6;
        }
    }

    function calculateCardCount() {
        const screenWidth = window.innerWidth;
        if (screenWidth > 1020) {
            return 3;
        } else if (screenWidth < 1023) {
            return 2;
        }
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
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
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
                    defaultSearchText={localStorage.getItem("searchText") || ""}
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
