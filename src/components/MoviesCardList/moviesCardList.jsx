// IMPORT PACKAGES
import React from "react";
import MoviesCard from "../MoviesCard/moviesCard";

// IMPORT STYLES
import "./moviesCardList.css";

// MoviesCardList COMPONENT
function MoviesCardList({
    isMovies,
    savedMovies,
    onSaveMovie,
    onCardDelete,
}) {
    if (!Array.isArray(isMovies) || isMovies.length === 0) {
        return null;
    }

    return (
        <section className="cards">
            {isMovies.map((movie) => {

                const {
                    _id,
                    id,
                    nameRU,
                    nameEN,
                    duration,
                    trailerLink,
                    country,
                    director,
                    year,
                    description,
                    owner,
                    image,
                    thumbnail
                } = movie;

                return (
                    <MoviesCard
                        key={id}
                        id={_id}
                        movieId={id}
                        nameRU={nameRU}
                        nameEN={nameEN}
                        duration={duration}
                        trailerLink={trailerLink}
                        country={country}
                        director={director}
                        year={year}
                        description={description}
                        owner={owner}
                        savedMovies={savedMovies}
                        onSaveMovie={onSaveMovie}
                        onCardDelete={onCardDelete}
                        image={image}
                        thumbnail={thumbnail}
                    />
                );
            })}
        </section>
    );
}

export default MoviesCardList;
