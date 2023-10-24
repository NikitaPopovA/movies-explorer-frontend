// IMPORT PACKAGES
import React from "react";
import { Link, useLocation } from "react-router-dom";

// IMPORT STYLES
import "./header.css";

// IMPORT COMPONENT
import logo from "../../images/Logo/logo.svg";
import Navigation from "../Navigation/navigation";

// Header COMPONENT
function Header({ isLoggedIn }) {
    const location = useLocation();

    return (
        <header className="header">
            {isLoggedIn && <Navigation />}

            {!isLoggedIn &&
                location.pathname !== "/signup" &&
                location.pathname !== "/signin" && (
                    <div className="header__container">
                        <Link to="/">
                            <img
                                className="header__logo"
                                src={logo}
                                alt="Логотип"
                            />
                        </Link>
                        <nav className="header__align">
                            <Link
                                to="/signup"
                                className="header__button-register"
                            >
                                Регистрация
                            </Link>
                            <Link to="/signin" className="header__button-auth">
                                Войти
                            </Link>
                        </nav>
                    </div>
                )}
        </header>
    );
}

export default Header;
