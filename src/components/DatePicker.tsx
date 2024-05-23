import React, { useState } from "react";
import i18n from "i18next";
import { t } from "i18next";
import { Button, DatePicker, DatePickerValue } from "@tremor/react";
import { tr,enUS } from 'date-fns/locale';

type Props = {
  chartDataAdd: any;
  chartDataDelete: any;
  chartDataUpdate: any;
};
export default function DatePickerComp({
  chartDataAdd,
  chartDataDelete,
  chartDataUpdate
}: Props) {
  const [date, setDate] = useState<DatePickerValue>(new Date());
  return (
    <div>
      <h1 className="text-tremor-title font-semibold text-tremor-content-strong">{t("addTableData")}</h1>
      <p className="text-tremor-default text-tremor-content">{t("addTableDataDesc")}</p>
      <DatePicker
        className="mx-auto max-w-sm"
        value={date}
        onValueChange={setDate}
        locale={i18n.language === "tr" ? tr : enUS }
      />
      <div className="flex gap-4 items-center justify-between">
        <div className="space-x-5">
          <Button onClick={() => chartDataAdd(date)}>{t("addData")}</Button>
          <Button onClick={() => chartDataUpdate(date)} variant="light">
            {t("updateSelectedDateData")}
          </Button>
        </div>
        <Button
          onClick={() => chartDataDelete(date)}
          color="red"
          variant="secondary"
        >
          {t("deleteSelectedDateData")}
        </Button>
      </div>
    </div>
  );
}
