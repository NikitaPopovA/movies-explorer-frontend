// IMPORT PACKAGES
import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

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

// App COMPONENT
function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    return (
        <div className="page">
            <Routes>
                <Route exact path="/signup" element={<Register />} />
                <Route exact path="/signin" element={<Login />} />
                <Route exact path="/" element={<Main />} />
                <Route
                    exact
                    path="/movies"
                    element={<Movies isLoggedIn={isLoggedIn} />}
                />
                <Route
                    exact
                    path="/saved-movies"
                    element={<SavedMovies isLoggedIn={isLoggedIn} />}
                />
                <Route
                    exact
                    path="/profile"
                    element={<Profile isLoggedIn={isLoggedIn} />}
                />
                <Route exact path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
}

export default App;
