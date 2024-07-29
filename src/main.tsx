import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import {NotificationProvider} from "./contexts/NotificationContext";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
    <React.StrictMode>
        <NotificationProvider>
            <App />
        </NotificationProvider>
    </React.StrictMode>
);
