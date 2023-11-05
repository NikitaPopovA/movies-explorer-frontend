// IMPORT PACKAGES
import React from "react";

// IMPORT STYLES
import "./notFound.css";

// NotFound COMPONENT
function NotFound() {
    const handleGoBack = () => {
        window.history.back(); 
    };

    return (
        <main className="not-found">
            <h1 className="not-found__title">404</h1>
            <p className="not-found__text">Страница не найдена</p>
            <button onClick={handleGoBack} className="not-found__button">
                Назад
            </button>
        </main>
    );
}

export default NotFound;
