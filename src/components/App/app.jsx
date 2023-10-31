// IMPORT PACKAGES
import { React, useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

// IMPORT STYLES
import "./app.css";

// IMPORT COMPONENT
import Main from "../Main/main";
import Register from "../Register/register";
import Login from "../Login/login";
import Profile from "../Profile/profile";
import NotFound from "../NotFound/notFound";
import Movies from "../Movies/movies";
import SavedMovies from "../SavedMovies/savedMovies";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { api, apiAuth } from "../../utils";

// App COMPONENT
function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [serverError, setServerError] = useState("");
    const [errors, setErrors] = useState(null);
    const [currentUser, setCurrentUser] = useState({});
    const navigate = useNavigate();

    async function handleUserRegistration(name, email, password) {
        try {
            const res = await apiAuth.signup({ name, email, password });
            if (res.status === "errors") {
                throw new Error(res.message);
            } else {
                setCurrentUser({ name });
                handleUserAuthorize(email, password);
            }
        } catch (errors) {
            setServerError("Пользователь с таким email уже существует!");
            setTimeout(() => setServerError(""), 5000);
        }
    }

    async function handleUserAuthorize(email, password) {
        try {
            const res = await apiAuth.signin({ email, password });
            localStorage.setItem("jwt", res.token);
            setIsLoggedIn(true);
            navigate("/movies");
        } catch (errors) {
            setServerError("Неверное имя пользователя или пароль!");
            setTimeout(() => setServerError(""), 5000);
        }
    }

    useEffect(() => {
        async function checkUserAuthorize() {
            if (!localStorage.getItem("jwt")) return;
            try {
                const res = await apiAuth.checkToken(
                    localStorage.getItem("jwt")
                );
                if (res) {
                    setIsLoggedIn(true);
                }
            } catch (err) {
                setIsLoggedIn(false);
                console.error(err);
            }
        }
        checkUserAuthorize();
    }, [isLoggedIn]);

    useEffect(() => {
        if (!isLoggedIn) return;
        api.getUserInfo()
            .then((data) => setCurrentUser(data))
            .catch((err) => console.error(err?.status || "ошибка"));
    }, [isLoggedIn]);

    async function handleUpdateUser(data) {
        try {
            const res = await api.setUserInfo(data);
            setCurrentUser(res);
        } catch (err) {
            console.error(err);
            if (err?.status === 409) {
                setServerError("Пользователь с таким email уже существует!");
                setTimeout(() => setServerError(""), 5000);
            } else {
                setErrors("Ошибка при обновлении данных пользователя!");
                setTimeout(() => setErrors(""), 5000);
            }
        }
    }

    const handleLogout = () => {
        localStorage.removeItem("jwt");
        localStorage.removeItem("searchText");
        localStorage.removeItem("isShortMovies");
        localStorage.removeItem("filteredMovies");
        setIsLoggedIn(false);
    };

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Routes>
                    <Route
                        path="/movies"
                        element={
                            <ProtectedRoute
                                element={Movies}
                                isLoggedIn={isLoggedIn}
                            />
                        }
                    />
                    <Route
                        path="/saved-movies"
                        element={
                            <ProtectedRoute
                                element={SavedMovies}
                                isLoggedIn={isLoggedIn}
                            />
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute
                                element={Profile}
                                isLoggedIn={isLoggedIn}
                                handleLogout={handleLogout}
                                onUpdateUser={handleUpdateUser}
                                errors={errors}
                                serverError={serverError}
                            />
                        }
                    />
                    <Route
                        exact
                        path="/"
                        element={<Main isLoggedIn={isLoggedIn} />}
                    />
                    <Route
                        exact
                        path="/signup"
                        element={
                            <Register
                                isLoggedIn={isLoggedIn}
                                onRegister={handleUserRegistration}
                                serverError={serverError}
                            />
                        }
                    />
                    <Route
                        exact
                        path="/signin"
                        element={
                            <Login
                                isLoggedIn={isLoggedIn}
                                onLogin={handleUserAuthorize}
                                serverError={serverError}
                            />
                        }
                    />
                    <Route exact path="*" element={<NotFound />} />
                </Routes>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
