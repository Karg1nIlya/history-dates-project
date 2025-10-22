import ReactDOM from "react-dom/client";
import "./global.scss";
import App from "./App";
// import "@/../public/assets/fonts/stylesheet.css";

const root = document.getElementById("root");

if (!root) {
    throw new Error("root not found");
}

const container = ReactDOM.createRoot(root);

container.render(<App />);
