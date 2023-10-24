// IMPORT PACKAGES
import React from "react";

// IMPORT STYLES
import "./footer.css";

// Footer COMPONENT
function Footer() {
    return (
        <footer className="footer">
            <p className="footer__text">
                Учебный проект Яндекс.Практикум х BeatFilm.
            </p>
            <div className="footer__copyright">
                <p className="footer__author">&copy; 2023 Попов Никита</p>
                <a
                    className="footer__link-item"
                    href="https://practicum.yandex.ru"
                    target="_blank"
                    rel="noreferrer"
                >
                    Яндекс.Практикум
                </a>
                <a
                    className="footer__link-item"
                    href="https://github.com/NikitaPopovA"
                    target="_blank"
                    rel="noreferrer"
                >
                    Github
                </a>
            </div>
        </footer>
    );
}

export default Footer;
