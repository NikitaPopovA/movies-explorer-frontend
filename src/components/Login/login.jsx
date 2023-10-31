// IMPORT PACKAGES
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import validator from "validator";

// IMPORT STYLES
import "./login.css";

// IMPORT COMPONENT
import logo from "../../images/Logo/logo.svg";

// Login COMPONENT
function Login({ onLogin, serverError, isLoggedIn }) {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [formErrors, setFormErrors] = useState({ email: "", password: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const isFormValid = () =>
        Object.values(formErrors).every((error) => error === "");

    const handleInputChange = (evt) => {
        const { name, value } = evt.target;
        setFormData({ ...formData, [name]: value });
        validateField(name, value);
    };

    const validateField = (fieldName, value) => {
        let errorMessage = "";

        if (fieldName === "email") {
            errorMessage =
                value.length < 6
                    ? "Email должен содержать от 6 до 30 символов"
                    : !validator.isEmail(value)
                    ? "Вы ввели неправильный логин или пароль"
                    : "";
        } else if (fieldName === "password") {
            errorMessage = !validator.isLength(value, { min: 6, max: 30 })
                ? "Пароль должен содержать от 6 до 30 символов"
                : "";
        }

        setFormErrors({ ...formErrors, [fieldName]: errorMessage });
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        if (isFormValid() && !isSubmitting) {
            setIsSubmitting(true);
            try {
                await onLogin(formData.email, formData.password);
            } catch (err) {
                console.error(err);
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/movies");
        }
    }, [isLoggedIn, navigate]);

    return (
        <section className="login">
            <Link to="/">
                <img className="login__logo" src={logo} alt="Логотип" />
            </Link>
            <main className="login__content">
                <h1 className="login__title">Рады видеть!</h1>
                <form className="login__form" onSubmit={handleSubmit}>
                    {["email", "password"].map((field) => (
                        <label key={field} className="login__label">
                            {field === "email" ? "E-mail" : "Пароль"}
                            <input
                                className="login__input"
                                name={field}
                                type={field === "email" ? "email" : "password"}
                                placeholder={
                                    field === "email" ? "E-mail" : "Пароль"
                                }
                                minLength="6"
                                maxLength="30"
                                autoComplete="off"
                                required
                                value={formData[field]}
                                onChange={handleInputChange}
                            />
                            <span
                                className={`login__input-error ${
                                    formErrors[field]
                                        ? "login__input-error"
                                        : ""
                                }`}
                            >
                                {formErrors[field]}
                            </span>
                        </label>
                    ))}
                    {serverError && (
                        <p className="login__error-message">{serverError}</p>
                    )}
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
    );
}

export default Login;
