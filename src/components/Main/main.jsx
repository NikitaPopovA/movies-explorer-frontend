// IMPORT PACKAGES
import React from "react";

// IMPORT STYLES
import "./main.css";

// IMPORT COMPONENT
import Header from "../Header/header";
import Promo from "../Promo/promo";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/techs";
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/portfolio";
import Footer from "../Footer/footer";

// Main COMPONENT
function Main({ isLoggedIn }) {
    return (
        <>
            <Header isLoggedIn={isLoggedIn} />
            <main className="main">
                <Promo />
                <AboutProject />
                <Techs />
                <AboutMe />
                <Portfolio />
            </main>
            <Footer />
        </>
    );
}

export default Main;
