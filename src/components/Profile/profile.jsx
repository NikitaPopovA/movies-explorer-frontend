// IMPORT PACKAGES
import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import validator from "validator";

// IMPORT STYLES
import "./profile.css";

// IMPORT COMPONENT
import Header from "../Header/header";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

// Profile COMPONENT
function Profile(props) {
    const currentUser = useContext(CurrentUserContext);
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(currentUser.name || "");
    const [email, setEmail] = useState(currentUser.email || "");
    const [initialName, setInitialName] = useState(currentUser.name || "");
    const [initialEmail, setInitialEmail] = useState(currentUser.email || "");
    const [hasIsChanges, setHasIsChanges] = useState(false);
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formErrors, setFormErrors] = useState({ name: "", email: "" });

    const isFormValid = () => {
        return (
            formErrors.name === "" &&
            formErrors.email === "" &&
            name !== "" &&
            email !== ""
        );
    };

    const handleInputChange = (evt) => {
        const { name, value } = evt.target;

        if (name === "name") {
            setName(value);
        } else if (name === "email") {
            setEmail(value);
        }

        validateField(name, value);
        setHasIsChanges(
            (name === "name" && value !== initialName) ||
                (name === "email" && value !== initialEmail)
        );
    };

    const handleUpdateClick = async (evt) => {
        evt.preventDefault();
        if (hasIsChanges && isFormValid() && !isSubmitting) {
            setIsSubmitting(true);
            try {
                await props.onUpdateUser({ name, email });
                setInitialName(name);
                setInitialEmail(email);
                setHasIsChanges(false);
                setUpdateSuccess(true);
                setIsEditing(false);

                setTimeout(() => {
                    setUpdateSuccess(false);
                }, 5000);
            } catch (err) {
                console.error(err);
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    const validateField = (fieldName, value) => {
        let errorMessage = "";

        switch (fieldName) {
            case "name":
                if (value.length < 2) {
                    errorMessage =
                        "Имя должно содержать не менее двух символов";
                } else if (
                    !validator.matches(value, /^[A-Za-zА-Яа-яЁё\s-]{2,30}$/)
                ) {
                    errorMessage =
                        "Имя должно содержать только латиницу, кириллицу, пробел или дефис";
                }
                break;
            case "email":
                if (value.length < 6) {
                    errorMessage = "Email должен содержать от 6 до 30 символов";
                } else if (!validator.isEmail(value)) {
                    errorMessage = "Введите корректный email";
                }
                break;
            default:
                break;
        }

        setFormErrors({
            ...formErrors,
            [fieldName]: errorMessage,
        });
    };

    const errorMessage = () => {
        return props.error || props.serverError || "";
    };

    useEffect(() => {
        setName(currentUser.name || "");
        setEmail(currentUser.email || "");
        setInitialName(currentUser.name || "");
        setInitialEmail(currentUser.email || "");
    }, [currentUser]);

    return (
        <>
            <Header isLoggedIn={props.isLoggedIn} />
            <main className="profile">
                <section className="profile__container">
                    <h1 className="profile__name">
                        Привет, {currentUser.name || "пользователь"}!
                    </h1>
                    <form className="profile__form">
                        <label className="profile__label-name">
                            Имя
                            <input
                                className="profile__input"
                                name="name"
                                type="text"
                                placeholder="Имя"
                                required
                                value={name}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                            />
                        </label>
                        <p
                            className={`${
                                formErrors.name ? "profile__input-error" : ""
                            }`}
                        >
                            {formErrors.name}
                        </p>
                        <label className="profile__label-email">
                            E-mail
                            <input
                                className="profile__input"
                                name="email"
                                type="email"
                                placeholder="E-mail"
                                required
                                value={email}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                            />
                        </label>
                        <p
                            className={`${
                                formErrors.email ? "profile__input-error" : ""
                            }`}
                        >
                            {formErrors.email}
                        </p>
                        <div className="profile__align">
                            {errorMessage() && (
                                <p className="profile__error-message">
                                    {errorMessage()}
                                </p>
                            )}
                            {updateSuccess && !errorMessage() && (
                                <p className="profile__update-success">
                                    Данные успешно обновлены!
                                </p>
                            )}
                            {isEditing ? (
                                <button
                                    className={`profile__button-edit ${
                                        !hasIsChanges || !isFormValid()
                                            ? "profile__button-edit-editing_disabled"
                                            : "profile__button-edit-editing_valid"
                                    }`}
                                    type="button"
                                    onClick={handleUpdateClick}
                                    disabled={!hasIsChanges || !isFormValid()}
                                >
                                    Сохранить
                                </button>
                            ) : (
                                <button
                                    className="profile__button-edit"
                                    type="button"
                                    onClick={() => setIsEditing(true)}
                                >
                                    Редактировать
                                </button>
                            )}
                            {isEditing ? null : (
                                <Link
                                    to="/"
                                    className="profile__button-exit"
                                    onClick={props.handleLogout}
                                >
                                    Выйти из аккаунта
                                </Link>
                            )}
                        </div>
                    </form>
                </section>
            </main>
        </>
    );
}

export default Profile;
