// IMPORT PACKAGES
import React from "react";

// IMPORT STYLES
import "./portfolio.css";

// IMPORT COMPONENT
import linkSymbol from "../../images/Portfolio/profile-link.svg";

// Portfolio COMPONENT
function Portfolio() {
    return (
        <section className="portfolio">
            <h2 className="portfolio__title">Портфолио</h2>
            <ul className="portfolio__list">
                <li className="portfolio__item">
                    <a
                        className="portfolio__link"
                        href="https://nikitapopova.github.io/how-to-learn/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Статичный сайт
                        <img
                            className="portfolio__link-symbol"
                            src={linkSymbol}
                            alt="Ссылка на статичный сайт"
                        />
                    </a>
                </li>
                <li className="portfolio__item">
                    <a
                        className="portfolio__link"
                        href="https://nikitapopova.github.io/russian-travel/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Адаптивный сайт
                        <img
                            className="portfolio__link-symbol"
                            src={linkSymbol}
                            alt="Ссылка на адаптивный сайт"
                        />
                    </a>
                </li>
                <li className="portfolio__item">
                    <a
                        className="portfolio__link"
                        href="https://nikitapopova.github.io/react-mesto-auth"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Одностраничное приложение
                        <img
                            className="portfolio__link-symbol"
                            src={linkSymbol}
                            alt="Ссылка на одностраничное приложение"
                        />
                    </a>
                </li>
            </ul>
        </section>
    );
}

export default Portfolio;
