// IMPORT PACKAGES
import React from "react";

// IMPORT STYLES
import "./promo.css";

// IMPORT COMPONENT
import NavTab from "../NavTab/navTab";

// Promo COMPONENT
function Promo() {
    return (
        <section className="promo">
            <h1 className="promo__title">
                Учебный проект студента факультета Веб-разработки.
            </h1>
            <NavTab />
        </section>
    );
}

export default Promo;
