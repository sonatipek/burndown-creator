import { RiCloseLargeLine } from "@remixicon/react";
import { Divider, Icon, TextInput } from "@tremor/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../../../api";
import useAuth from "../../../hooks/useAuth";
import { useTranslation } from "react-i18next";

const GoogleIcon = (props) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="M3.06364 7.50914C4.70909 4.24092 8.09084 2 12 2C14.6954 2 16.959 2.99095 18.6909 4.60455L15.8227 7.47274C14.7864 6.48185 13.4681 5.97727 12 5.97727C9.39542 5.97727 7.19084 7.73637 6.40455 10.1C6.2045 10.7 6.09086 11.3409 6.09086 12C6.09086 12.6591 6.2045 13.3 6.40455 13.9C7.19084 16.2636 9.39542 18.0227 12 18.0227C13.3454 18.0227 14.4909 17.6682 15.3864 17.0682C16.4454 16.3591 17.15 15.3 17.3818 14.05H12V10.1818H21.4181C21.5364 10.8363 21.6 11.5182 21.6 12.2273C21.6 15.2727 20.5091 17.8363 18.6181 19.5773C16.9636 21.1046 14.7 22 12 22C8.09084 22 4.70909 19.7591 3.06364 16.4909C2.38638 15.1409 2 13.6136 2 12C2 10.3864 2.38638 8.85911 3.06364 7.50914Z" />
  </svg>
);

export default function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const user = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        throw new Error(error);
      }

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    login();
  };

  if (!user) {
    return (
      <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-4 py-10 lg:px-6">
          <Link
            className="me-4 self-end rounded-tremor-small hover:bg-tremor-background-subtle"
            to="/"
          >
            <Icon
              icon={RiCloseLargeLine}
              tooltip={t("backToHomepage")}
              color="text-tremor-content-strong"
            />
          </Link>

          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h3 className="text-center text-tremor-title font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
              {t("loginPage.signIntoYourAccount")}
            </h3>
            <form
              onSubmit={(e) => submitHandler(e)}
              method="post"
              className="mt-6"
            >
              <label
                htmlFor="email"
                className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
              >
                {t("email")}
              </label>
              <TextInput
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                placeholder="sonat@company.com"
                className="mt-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div>
                <label
                  htmlFor="password"
                  className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                >
                  {t("password")}
                </label>
                <TextInput
                  type="password"
                  id="password"
                  name="password"
                  autoComplete="password"
                  placeholder={t("password")}
                  className="mt-2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Link
                  to="/forgot-password"
                  className="text-tremor-label text-tremor-brand-subtle underline underline-offset-2 hover:text-tremor-brand"
                >
                  {t("loginPage.forgotPassword")}
                </Link>
              </div>
              <button
                type="submit"
                className="mt-4 w-full whitespace-nowrap rounded-tremor-default bg-tremor-brand py-2 text-center text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-tremor-brand-emphasis dark:bg-dark-tremor-brand dark:text-dark-tremor-brand-inverted dark:shadow-dark-tremor-input dark:hover:bg-dark-tremor-brand-emphasis"
              >
                {t("login")}
              </button>
            </form>
            <Divider>{t("orWith")}</Divider>
            <a
              href="#"
              className="inline-flex w-full items-center justify-center space-x-2 rounded-tremor-default border border-tremor-border bg-tremor-background py-2 text-tremor-content-strong shadow-tremor-input hover:bg-tremor-background-subtle dark:border-dark-tremor-border dark:bg-dark-tremor-background dark:text-dark-tremor-content-strong dark:shadow-dark-tremor-input dark:hover:bg-dark-tremor-background-subtle"
            >
              <GoogleIcon className="h-5 w-5" aria-hidden={true} />
              <span className="text-tremor-default font-medium">
              {t("loginPage.signInWithGoogle")}
              </span>
            </a>
            <p className="mt-5 text-tremor-content-subtle">
              {t("loginPage.dontHaveAnAccount")}
              <Link className="font-medium text-tremor-brand" to="/signup">
              {" "}{t("signUp")}
              </Link>
            </p>
          </div>
        </div>
      </>
    );
  }
  navigate("/")
}
