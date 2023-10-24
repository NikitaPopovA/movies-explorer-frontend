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
function MoviesCard({ link, name, filmTime, isSave }) {
    const location = useLocation();

    return (
        <article className="movie">
            <a
                className="movie__link"
                href="заглушка"
                target="_blank"
                rel="noreferrer"
            >
                <img src={link} className="movie__image" alt={name} />
            </a>
            <div className="movie__align">
                <h2 className="movie__title">{name}</h2>
                <span className="movie__time">{filmTime}</span>
            </div>
            {location.pathname === "/movies" && (
                <button
                    className={isSave ? "movie__button-save" : "movie__saved"}
                    aria-label="сохранить"
                    type="button"
                >
                    {isSave ? (
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
                >
                    <img
                        className="movie__button-delete-img"
                        src={movDelet}
                        alt="удалить"
                    />
                </button>
            )}
        </article>
    );
}

export default MoviesCard;
