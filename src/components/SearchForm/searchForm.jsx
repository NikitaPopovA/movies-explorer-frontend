// IMPORT PACKAGES
import React from "react";

// IMPORT STYLES
import "./searchForm.css";

// SearchForm COMPONENT
function SearchForm() {
    return (
        <section aria-label="Секция с поиском и фильтрацией">
            <form className="search-form" noValidate>
                <div className="search-form__container">
                    <input
                        className="search-form__input"
                        type="text"
                        name="search"
                        placeholder="Фильм"
                        required
                    />
                    <button className="search-form__button" type="submit" />
                </div>
                <div className="search-form__toggle-container">
                    <label className="search-form__toggle">
                        <input
                            className="search-form__checkbox-input"
                            type="checkbox"
                        />
                        <span className="search-form__checkbox-inner"></span>
                    </label>
                    <p className="search-form__checkbox-text">
                        Короткометражки
                    </p>
                </div>
            </form>
        </section>
    );
}

export default SearchForm;
