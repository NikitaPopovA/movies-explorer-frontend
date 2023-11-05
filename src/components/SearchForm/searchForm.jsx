// IMPORT PACKAGES
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

// IMPORT STYLES
import "./searchForm.css";

// SearchForm COMPONENT
function SearchForm({
    onHandleSearchSubmit,
    isShortMovies,  
    setIsShortMovies, 
    handleCheckboxChange, 
    defaultSearchText,  
}) {
    const [searchText, setSearchText] = useState(defaultSearchText || "");  
    const [isErrorVisible, setIsErrorVisible] = useState(false);  
    const [isSubmitting, setIsSubmitting] = useState(false); 

    const location = useLocation();  

    const handleInputChange = (evt) => {
        setSearchText(evt.target.value);
        setIsErrorVisible(false);
    };

    const handleCheckbox = (evt) => {
        const isChecked = evt.target.checked;
        setIsShortMovies(isChecked);
        handleCheckboxChange(isChecked);
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        if (isSubmitting) {
            return;
        }

        setIsSubmitting(true);

        try {
            if (!searchText?.trim()) {
                setIsErrorVisible(true);
            } else {
                await onHandleSearchSubmit(searchText);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        if (location.pathname === "/movies") {
            localStorage.setItem("searchText", searchText);
            localStorage.setItem("isShortMovies", isShortMovies);
        }
    }, [location, searchText, isShortMovies]);

    return (
        <section>
            <form className="search-form" noValidate onSubmit={handleSubmit}>
                {isErrorVisible && (
                    <p className="search-form__error-text">
                        Нужно ввести ключевое слово
                    </p>
                )}
                <div className="search-form__container">
                    <input
                        className="search-form__input"
                        type="text"
                        name="search"
                        placeholder="Фильм"
                        required
                        value={searchText}
                        onChange={handleInputChange}
                    />
                    <button className="search-form__button" type="submit" />
                </div>
                <div className="search-form__toggle-container">
                    <label className="search-form__toggle">
                        <input
                            className="search-form__checkbox-input"
                            type="checkbox"
                            checked={isShortMovies}
                            onChange={handleCheckbox}
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