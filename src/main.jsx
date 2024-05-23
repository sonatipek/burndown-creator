import React from "react";
import ReactDOM from "react-dom/client";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import "./index.css";
import App from "./App.jsx";
import Footer from "./components/Footer.jsx";
import Navbar from "./components/Navbar.jsx";

import TR_LOCALE from "./locales/tr.json";
import EN_LOCALE from "./locales/en.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: EN_LOCALE,
    },
    tr: {
      translation: TR_LOCALE,
    },
  },
  fallbackLng: ["en", "tr"],
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Navbar />
    <App />
    <Footer />
  </React.StrictMode>,
);
