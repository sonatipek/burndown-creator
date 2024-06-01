import i18n from "i18next";
import { useEffect, useState } from "react";

import { Button, Icon, Select, SelectItem } from "@tremor/react";
import { RiGlobalLine, RiLogoutBoxLine } from "@remixicon/react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useTranslation } from "react-i18next";
import supabase from "../api";

export default function Navbar() {
  const user = useAuth();
  const { t } = useTranslation();

  const [languageValue, setLanguageValue] = useState(
    localStorage.getItem("languagePreference"),
  );

  const logout = async () => {
    if (confirm(t("areYouSure"))) {
      try {
        const { error } = await supabase.auth.signOut();

        if (error) {
          throw new Error(error);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    i18n.changeLanguage(languageValue);
    localStorage.setItem("languagePreference", languageValue);
  }, [languageValue]);

  return (
    <div className="relative shadow-tremor-input shadow-tremor-brand-muted">
      <div className="container mx-auto flex items-center justify-between py-5">
        <a
          href="/"
          className="text-tremor-title font-extrabold text-tremor-brand"
        >
          Burndown Creator
        </a>

        <ul className="flex gap-3 font-medium text-tremor-brand">
          <NavLink className="nav-link" to="/">
            Genel Görünüm
          </NavLink>
          <NavLink className="nav-link" to="/employees">
            Çalışanlar
          </NavLink>
          <NavLink className="nav-link" to="/employee-stats">
            Çalışan İstatistikleri
          </NavLink>
        </ul>

        <div className="flex gap-5">
          <div>
            <Select
              id="language"
              name="language"
              value={languageValue}
              onValueChange={setLanguageValue}
              className="w-1/12"
              icon={RiGlobalLine}
            >
              <SelectItem value="tr">Türkçe</SelectItem>
              <SelectItem value="en">English</SelectItem>
            </Select>
          </div>

          <ul className="flex gap-3">
            {user && (
              <Icon
                onClick={logout}
                icon={RiLogoutBoxLine}
                tooltip={t("logout")}
                className="cursor-pointer rounded-tremor-small p-2 hover:bg-tremor-background-subtle"
              />
            )}
            {!user && (
              <>
                <Link to="/login">
                  <Button variant="secondary">Giriş Yap</Button>
                </Link>
                <Link to="/signup">
                  <Button>Kaydol</Button>
                </Link>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
