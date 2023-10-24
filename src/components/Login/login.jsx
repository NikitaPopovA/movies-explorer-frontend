// IMPORT PACKAGES
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import validator from "validator";

// IMPORT STYLES
import "./login.css";

// IMPORT COMPONENT
import logo from "../../images/Logo/logo.svg";

// Login COMPONENT
function Login({ onLogin, isLoggedIn }) {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [formErrors, setFormErrors] = useState({ email: "", password: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();

    const isFormValid = () => {
        return (
            Object.values(formData).every((value) => value !== "") &&
            Object.values(formErrors).every((error) => error === "")
        );
    };

    const handleInputChange = (evt) => {
        const { name, value } = evt.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        validateField(name, value);
    };

    const validateField = (fieldName, value) => {
        let errorMessage = "";

        switch (fieldName) {
            case "email":
                if (value.length < 6) {
                    errorMessage = "e-mail должен содержать от 6 до 30 символов";
                } else if (!validator.isEmail(value)) {
                    errorMessage = "Введите e-mail";
                }
                break;
            case "password":
                if (!validator.isLength(value, { min: 6, max: 30 })) {
                    errorMessage =
                        "Пароль должен содержать от 6 до 30 символов";
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

    async function handleSubmit(evt) {
        evt.preventDefault();

        if (isFormValid() && !isSubmitting) {
            setIsSubmitting(true);
            try {
                await onLogin(formData.email, formData.password);
            } catch (err) {
                console.log(err);
            } finally {
                setIsSubmitting(false);
            }
        }
    }

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/movies");
        }
    }, [isLoggedIn, navigate]);

    return (
        <>
            <section className="login">
                <Link to="/">
                    <img className="login__logo" src={logo} alt="Логотип" />
                </Link>
                <main className="login__content">
                    <h1 className="login__title">Рады видеть!</h1>
                    <form className="login__form" onSubmit={handleSubmit}>
                        <label className="login__label">
                            E-mail
                            <input
                                className="login__input"
                                name="email"
                                type="email"
                                placeholder="E-mail"
                                minLength="6"
                                maxLength="30"
                                autoComplete="off"
                                required
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                            <span
                                className={`${
                                    formErrors.email ? "login__input-error" : ""
                                }`}
                            >
                                {formErrors.email}
                            </span>
                        </label>
                        <label className="login__label">
                            Пароль
                            <input
                                className="login__input"
                                name="password"
                                type="password"
                                minLength="6"
                                maxLength="30"
                                autoComplete="off"
                                placeholder="Пароль"
                                required
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                            <span
                                className={`${
                                    formErrors.password
                                        ? "login__input-error"
                                        : ""
                                }`}
                            >
                                {formErrors.password}
                            </span>
                        </label>
                        <button
                            className={`login__button ${
                                !isFormValid() ? "login__button_disabled" : ""
                            }`}
                            type="submit"
                            disabled={!isFormValid()}
                        >
                            Войти
                        </button>
                    </form>
                    <p className="login__text">
                        Еще не зарегистрированы?{" "}
                        <Link className="login__link" to="/signup">
                            <span className="login__signin">Регистрация</span>
                        </Link>
                    </p>
                </main>
            </section>
        </>
    );
}

export default Login;
