// IMPORT PACKAGES
import React from "react";
import { Link } from "react-router-dom";

// IMPORT STYLES
import "./profile.css";

// IMPORT COMPONENT
import Header from "../Header/header";

// Profile COMPONENT
function Profile(isLoggedIn) {
    return (
        <>
            <Header isLoggedIn={isLoggedIn} />
            <main className="profile">
                <section className="profile__container">
                    <h1 className="profile__name">Привет, Виталий!</h1>
                    <form className="profile__form">
                        <label className="profile__label-name">
                            Имя
                            <input
                                className="profile__input"
                                name="name"
                                type="text"
                                placeholder="Имя"
                                required
                            />
                        </label>
                        <label className="profile__label-email">
                            E-mail
                            <input
                                className="profile__input"
                                name="email"
                                type="email"
                                placeholder="E-mail"
                                required
                            />
                        </label>
                        <div className="profile__align">
                            <button
                                className="profile__button-edit"
                                type="submit"
                            >
                                Редактировать
                            </button>
                            <Link to="/" className="profile__button-exit">
                                Выйти из аккаунта
                            </Link>
                        </div>
                    </form>
                </section>
            </main>
        </>
    );
}

export default Profile;
