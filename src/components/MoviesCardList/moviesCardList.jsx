// IMPORT PACKAGES
import React from "react";
import { useLocation } from "react-router-dom";

// IMPORT STYLES
import "./moviesCardList.css";

// IMPORT COMPONENT
import MoviesCard from "../MoviesCard/moviesCard";
import card1 from "../../images/Movies/33-words-about-design1.png";
import card2 from "../../images/Movies/Movie-almanac-100-years-of-design2.png";
import card3 from "../../images/Movies/In-pursuit-of-Banksy3.png";
import card4 from "../../images/Movies/Basquiat-Explosion-of-reality4.png";
import card5 from "../../images/Movies/Running-is-freedom5.png";
import card6 from "../../images/Movies/Booksellers6.png";
import card7 from "../../images/Movies/When-I-think-of-Germany-at-night7.png";
import card8 from "../../images/Movies/Gimme-Danger-The-Story-of-Iggy-and-The-Stooges8.png";
import card9 from "../../images/Movies/Janice-The-little-girl-is-sad9.png";
import card10 from "../../images/Movies/Get-ready-before-the-jump10.png";
import card11 from "../../images/Movies/P-J-Harvey-A-dog-called-money11.png";
import card12 from "../../images/Movies/By-the-Waves-The-Art-of-Sound-in-Cinema12.png";

// MoviesCardList COMPONENT
function MoviesCardList() {
    const location = useLocation;
    const movies = [
        {
            link: card1,
            name: "33 слова о дизайне",
            filmTime: "1ч 17м",
            isSave: "+",
        },
        {
            link: card2,
            name: "Киноальманах «100 лет дизайна»",
            filmTime: "1ч 17м",
            isSave: "",
        },
        {
            link: card3,
            name: "В погоне за Бенкси",
            filmTime: "1ч 17м",
            isSave: "+",
        },
        {
            link: card4,
            name: "Баския: Взрыв реальности",
            filmTime: "1ч 17м",
            isSave: "+",
        },
        {
            link: card5,
            name: "Бег это свобода",
            filmTime: "1ч 17м",
            isSave: "+",
        },
        {
            link: card6,
            name: "Книготорговцы",
            filmTime: "1ч 17м",
            isSave: "+",
        },
        {
            link: card7,
            name: "Когда я думаю о Германии ночью",
            filmTime: "1ч 17м",
            isSave: "+",
        },
        {
            link: card8,
            name: "Gimme Danger: История Игги и The Stooges",
            filmTime: "1ч 17м",
            isSave: "+",
        },
        {
            link: card9,
            name: "Дженис: Маленькая девочка грустит",
            filmTime: "1ч 17м",
            isSave: "+",
        },
        {
            link: card10,
            name: "Соберись перед прыжком",
            filmTime: "1ч 17м",
            isSave: "+",
        },
        {
            link: card11,
            name: "Пи Джей Харви: A dog called money",
            filmTime: "1ч 17м",
            isSave: "+",
        },
        {
            link: card12,
            name: "По волнам: Искусство звука в кино",
            filmTime: "1ч 17м",
            isSave: "+",
        },
    ];

    return (
        <section className="cards">
            {movies.map((movie) =>
                (location.pathname === "/saved-movies" &&
                    movie.isSave === "") ||
                location.pathname !== "/saved-movies" ? (
                    <MoviesCard
                        key={movie.name}
                        link={movie.link}
                        name={movie.name}
                        filmTime={movie.filmTime}
                        isSave={movie.isSave}
                    />
                ) : null
            )}
        </section>
    );
}

export default MoviesCardList;
