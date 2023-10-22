import "./global.scss"
import "normalize.css"
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"

/**
 * @param no Bruh
 */
ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)