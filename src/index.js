// IMPORT PACKAGES
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// IMPORT STYLES
import "./index.css";

// App COMPONENT
import App from "./components/App/app";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);
