// IMPORT PACKAGES
import React from "react";

// IMPORT COMPONENT
import MoviesCard from "../MoviesCard/moviesCard";

// MoviesCardSav COMPONENT
function MoviesCardSav({ savedMovies, onCardDelete }) {
    if (!Array.isArray(savedMovies) || savedMovies.length === 0) {
        return null;
    }

    return (
        <section className="cards">
            {savedMovies.map((movie) => {
                const {
                    _id,
                    id,
                    nameEN,
                    nameRU,
                    duration,
                    trailerLink,
                    country,
                    director,
                    year,
                    description,
                    image,
                    thumbnail,
                    owner,
                } = movie;

                return (
                    <MoviesCard
                        key={_id}
                        id={_id}
                        nameEN={nameEN}
                        nameRU={nameRU}
                        movieId={id}
                        duration={duration}
                        trailerLink={trailerLink}
                        country={country}
                        director={director}
                        year={year}
                        description={description}
                        image={image}
                        thumbnail={thumbnail}
                        owner={owner}
                        onCardDelete={onCardDelete}
                    />
                );
            })}
        </section>
    );
}

export default MoviesCardSav;
