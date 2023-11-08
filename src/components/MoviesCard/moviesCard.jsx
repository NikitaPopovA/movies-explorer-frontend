// IMPORT PACKAGES
import React from "react";
import { useLocation } from "react-router-dom";

// IMPORT STYLES
import "./moviesCard.css";

// IMPORT COMPONENT
import movSave from "../../images/Movies/save-movies.svg";
import movSeved from "../../images/Movies/save-movies-tick.svg";
import movDelet from "../../images/Movies/save-movies-delete.svg";

// MoviesCard COMPONENT
function MoviesCard(props) {
    const location = useLocation();

    const isSaved =
        props.savedMovies &&
        props.movieId &&
        props.savedMovies.some(
            (savedMovie) => savedMovie.movieId === props.movieId
        );
    const savedMovieId = isSaved
        ? props.savedMovies.find(
              (savedMovie) => savedMovie.movieId === props.movieId
          )._id
        : null;

    const handleOnSaveClick = () => {
        if (isSaved) {
            props.onCardDelete(savedMovieId);
        } else {
            props.onSaveMovie(props);
        }
    };

    const handleOnDeleteClick = () => {
        if (location.pathname === "/saved-movies") {
            props.onCardDelete(props.id);
        }
    };

    const formatDurationFilm = (duration) => {
        if (duration < 60) return `${duration}м`;
        return `${Math.floor(duration / 60)}ч${
            duration - Math.floor(duration / 60) * 60 !== 0
                ? duration - Math.floor(duration / 60) * 60 + "м"
                : ""
        }`;
    };

    return (
        <article className="movie">
            <a
                className="movie__link"
                href={props.trailerLink}
                target="_blank"
                rel="noreferrer"
            >
                <img
                    src={props.image}
                    className="movie__image"
                    alt={props.nameRU}
                />
            </a>
            <div className="movie__align">
                <h2 className="movie__title">{props.nameRU}</h2>
                <span className="movie__time">
                    {formatDurationFilm(props.duration)}
                </span>
            </div>
            {location.pathname === "/movies" && (
                <button
                    className={isSaved ? "movie__saved" : "movie__button-save"}
                    aria-label="сохранить"
                    type="button"
                    onClick={handleOnSaveClick}
                >
                    {!isSaved ? (
                        <img
                            className="movie__button-save-img"
                            src={movSave}
                            alt="добавить в сохраненные"
                        />
                    ) : (
                        <img
                            className="movie__button-saved"
                            src={movSeved}
                            alt="добавлено в сохраненные"
                        />
                    )}
                </button>
            )}
            {location.pathname === "/saved-movies" && (
                <button
                    className="movie__button-delete"
                    aria-label="удалить фильм"
                    type="button"
                    onClick={handleOnDeleteClick}
                >
                    <img
                        className="movie__button-delete-img"
                        src={movDelet}
                        alt="удалить"
                    />
                </button>
            )}
            {props.errors && (
                <p className="movie__error-message">{props.errors}</p>
            )}
        </article>
    );
}

export default MoviesCard;
