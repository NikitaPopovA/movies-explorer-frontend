// IMPORT PACKAGES
import React from "react";
import { Link } from "react-router-dom";

// IMPORT STYLES
import "./notFound.css";

// NotFound COMPONENT
function NotFound() {
    return (
        <main className="not-found">
            <h1 className="not-found__title">404</h1>
            <p className="not-found__text">Страница не найдена</p>
            <Link to="/" className="not-found__button">
                Назад
            </Link>
        </main>
    );
}

export default NotFound;
