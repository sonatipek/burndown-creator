import { RiCloseLargeLine } from "@remixicon/react";
import { Icon, TextInput } from "@tremor/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../../../api";
import useAuth from "../../../hooks/useAuth";
import { useTranslation } from "react-i18next";

export default function ResetPassword() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const user = useAuth();

  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");

  const login = async () => {
    try {
      const { error } = await supabase.auth.updateUser({
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
              Şifreni Güncelle
            </h3>
            <form
              onSubmit={(e) => submitHandler(e)}
              method="post"
              className="mt-6"
            >
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
              <label
                htmlFor="passwordAgain"
                className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
              >
                {t("passwordAgain")}
              </label>
              <TextInput
                type="password"
                id="passwordAgain"
                name="passwordAgain"
                autoComplete="password"
                placeholder={t("password")}
                className="mt-2"
                value={passwordAgain}
                onChange={(e) => setPasswordAgain(e.target.value)}
              />


              <button
                type="submit"
                className="mt-4 w-full whitespace-nowrap rounded-tremor-default bg-tremor-brand py-2 text-center text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-tremor-brand-emphasis dark:bg-dark-tremor-brand dark:text-dark-tremor-brand-inverted dark:shadow-dark-tremor-input dark:hover:bg-dark-tremor-brand-emphasis"
              >
                Şifreni Güncelle
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }
  navigate("/");
}
