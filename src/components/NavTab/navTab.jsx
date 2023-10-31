// IMPORT STYLES
import "./navTab.css";

// NavTab COMPONENT
function NavTab() {
    return (
        <nav className="nav-tab" aria-label="Навигация по достижениям">
            <ul className="nav-tab__list">
                <li>
                    <a className="nav-tab__link" href="#about-project">
                        О проекте
                    </a>
                </li>
                <li>
                    <a className="nav-tab__link" href="#techno">
                        Технологии
                    </a>
                </li>
                <li>
                    <a className="nav-tab__link" href="#about-me">
                        Студент
                    </a>
                </li>
            </ul>
        </nav>
    );
}

export default NavTab;
