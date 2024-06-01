import React from "react";
import i18n from "i18next";
import ReactDOM from "react-dom/client";
import { initReactI18next } from "react-i18next";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";

import TR_LOCALE from "./locales/tr.json";
import EN_LOCALE from "./locales/en.json";
import Layout from "./pages/layout.jsx";
import Login from "./pages/auth/SignIn/index.jsx";
import SignUp from "./pages/auth/SignUp/index.jsx";
import Home from "./pages/Home/index.jsx";
import Employees from "./pages/Employees/index.jsx";
import EmployeeStats from "./pages/EmployeeStats/index.jsx";
import ForgotPassword from "./pages/auth/ForgotPassword/index.jsx";
import ResetPassword from "./pages/auth/ResetPassword/index.jsx";


i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: EN_LOCALE,
    },
    tr: {
      translation: TR_LOCALE,
    },
  },
  lng: localStorage.getItem("languagePreference") || "",
  fallbackLng: ["en", "tr"],
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/employees", element: <Employees /> },
      { path: "/employee-stats", element: <EmployeeStats /> },
    ],
  },
  {
    path: "/login",
    element: <Login />  
  },
  {
    path: "/signup",
    element: <SignUp />
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />
  },
  {
    path: "/forgot-password/reset",
    element: <ResetPassword />
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
