// IMPORT PACKAGES
import React from "react";

// IMPORT STYLES
import "./techs.css";

// Techs COMPONENT
function Techs() {
    return (
        <section className="techs" id="techno">
            <h2 className="techs__title">Технологии</h2>
            <h3 className="techs__subtitle">7 технологий</h3>
            <p className="techs__text">
                На&nbsp;курсе веб-разработки мы&nbsp;освоили технологии, которые
                применили в&nbsp;дипломном проекте.
            </p>
            <ul className="techs__list">
                <li className="techs__list-item">
                    <p className="techs__list-item-text">HTML</p>
                </li>
                <li className="techs__list-item">
                    <p className="techs__list-item-text">CSS</p>
                </li>
                <li className="techs__list-item">
                    <p className="techs__list-item-text">JS</p>
                </li>
                <li className="techs__list-item">
                    <p className="techs__list-item-text">React</p>
                </li>
                <li className="techs__list-item">
                    <p className="techs__list-item-text">Git</p>
                </li>
                <li className="techs__list-item">
                    <p className="techs__list-item-text">Express.js</p>
                </li>
                <li className="techs__list-item">
                    <p className="techs__list-item-text">mongoDB</p>
                </li>
            </ul>
        </section>
    );
}

export default Techs;
