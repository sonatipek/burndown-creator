import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import { Button, Divider, Icon, TextInput } from "@tremor/react";
import { RiCloseLargeLine } from "@remixicon/react";
import supabase from "../../../api";

export default function ForgotPassword() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const user = useAuth();

  const [email, setEmail] = useState("");

  const sendLink = async () => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "/forgot-password/reset",
      });

      if (error) {
        throw new Error(error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    sendLink();
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
              {t("forgotPassword")}
            </h3>
            <p className="text-tremor-content-subtle">
              E-posta adresini girdiğinde şifreni sıfırlaman için sana bir
              bağlantı göndereceğiz.
            </p>
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
              <button
                type="submit"
                className="mt-4 w-full whitespace-nowrap rounded-tremor-default bg-tremor-brand py-2 text-center text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-tremor-brand-emphasis dark:bg-dark-tremor-brand dark:text-dark-tremor-brand-inverted dark:shadow-dark-tremor-input dark:hover:bg-dark-tremor-brand-emphasis"
              >
                Giriş Bağlantısı Gönder
              </button>
            </form>
            <Divider>{t("orWith")}</Divider>
            <Link
              to="/signup"
              className="flex w-full items-center justify-center"
            >
              <Button variant="light" className="inline">
                Yeni Hesap Oluştur
              </Button>
            </Link>
          </div>
        </div>
      </>
    );
  }
  navigate("/");
}
