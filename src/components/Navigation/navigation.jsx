// IMPORT PACKAGES
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

// IMPORT STYLES
import "./navigation.css";

// IMPORT COMPONENT
import logo from "../../images/Logo/logo.svg";
import openMenuBurger from "../../images/Burger/Burger-navigation.svg";
import closeMenuBurger from "../../images/Burger/Burger-navigation-close.svg";

// Navigation COMPONENT
function Navigation() {
    const [isMenuOpenBurger, setIsMenuOpenBurger] = useState(false);

    const toggleMenuBurger = () => {
        setIsMenuOpenBurger(!isMenuOpenBurger);
    };

    return (
        <nav className="navigation">
            <div className="navigation__container">
                <Link to="/">
                    <img
                        src={logo}
                        className="navigation__logo"
                        alt="Логотип"
                    />
                </Link>
                <div
                    className={`navigation__menu ${
                        isMenuOpenBurger ? "navigation__menu_open" : ""
                    }`}
                >
                    <div className="navigation__align">
                        {isMenuOpenBurger && (
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    isActive
                                        ? "navigation__active"
                                        : "navigation__link"
                                }
                            >
                                Главная
                            </NavLink>
                        )}
                        <NavLink
                            to="/movies"
                            className={({ isActive }) =>
                                isActive
                                    ? "navigation__active"
                                    : "navigation__link"
                            }
                        >
                            Фильмы
                        </NavLink>
                        <NavLink
                            to="/saved-movies"
                            className={({ isActive }) =>
                                isActive
                                    ? "navigation__active"
                                    : "navigation__link"
                            }
                        >
                            Сохранённые фильмы
                        </NavLink>
                    </div>
                    <Link to="/profile" className="navigation__accaunt">
                        Аккаунт
                    </Link>
                </div>
                <button
                    className={`navigation__burger ${
                        isMenuOpenBurger ? "navigation__burger_open" : ""
                    }`}
                    aria-label="меню"
                    onClick={toggleMenuBurger}
                    type="button"
                >
                    {isMenuOpenBurger ? (
                        <img
                            className="navigation__burger-close"
                            src={closeMenuBurger}
                            alt="Меню закрытия"
                        />
                    ) : (
                        <img
                            className="navigation__burger"
                            src={openMenuBurger}
                            alt="Меню открытия"
                        />
                    )}
                </button>
                <div
                    className={`navigation__overlay ${
                        isMenuOpenBurger ? "navigation__overlay_open" : ""
                    }`}
                    onClick={toggleMenuBurger}
                ></div>
            </div>
        </nav>
    );
}

export default Navigation;
