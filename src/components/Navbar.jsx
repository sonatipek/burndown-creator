import i18n from "i18next";
import { useEffect, useState } from "react";

import { Select, SelectItem } from "@tremor/react";
import { RiGlobalLine } from "@remixicon/react";

export default function Navbar() {
  const [languageValue, setLanguageValue] = useState(
    localStorage.getItem("languagePreference"),
  );

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
      </div>
    </div>
  );
}
