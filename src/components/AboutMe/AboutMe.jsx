// IMPORT PACKAGES
import React from "react";

// IMPORT STYLES
import "./AboutMe.css";

// IMPORT COMPONENTS
import author from "../../images/About-me/photo_2023-11-09_09-46-16.jpg";

// AboutMe COMPONENT
function AboutMe() {
    return (
        <section className="about-me" id="about-me">
            <h2 className="about-me__title">Студент</h2>
            <div className="about-me__container">
                <div className="about-me__bio">
                    <h3 className="about-me__name">Никита</h3>
                    <p className="about-me__profession">
                        Фронтенд-разработчик, 29 лет
                    </p>
                    <p className="about-me__text">
                        Я родился в красивом городе Кирове. В настоящее время я
                        работаю "Механиком" в крупной фармацевтической компании.
                        Однако меня всегда увлекало программирование. Следуя
                        этой увлеченности, я решил изменить сферу деятельности и
                        начать свою карьеру в области "веб-разработки". Узнав о
                        компании "Яндекс Практикум" и их курсе
                        "Веб-разработчик", я приступил к обучению без сомнений.
                        Моя цель - полностью сменить профессию и воплотить свои
                        амбиции в области программирования.
                    </p>
                    <a
                        className="about-me__link"
                        href="https://github.com/NikitaPopovA"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Github
                    </a>
                </div>
                <img
                    className="about-me__img"
                    src={author}
                    alt="Фотография разработчика"
                />
            </div>
        </section>
    );
}

export default AboutMe;
