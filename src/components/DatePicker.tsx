import React, { useState } from "react";
import i18n from "i18next";
import { t } from "i18next";
import { Button, DatePicker, DatePickerValue } from "@tremor/react";
import { tr, enUS } from "date-fns/locale";
import { useChartDatasStore } from "../states/chartDatas";
import { useChartDataTodosStore } from "../states/chartDataTodos";
import { useEmployeesStore } from "../states/employees";

export default function DatePickerComp() {
  const [date, setDate] = useState<DatePickerValue>(new Date());
  const employees = useEmployeesStore((state) => state.employees);

  // ChartData State
  const chartDatas = useChartDatasStore((state) => state.chartDatas);
  const chartDataAdd = useChartDatasStore((state) => state.chartDataAdd);
  const chartDataUpdate = useChartDatasStore((state) => state.chartDataUpdate);
  const chartDataDelete = useChartDatasStore((state) => state.chartDataDelete);

  // ChartData Todos State
  const chartTodosDataAdd = useChartDataTodosStore((state) => state.chartTodosDataAdd);
  const chartTodosDataUpdate = useChartDataTodosStore((state) => state.chartTodosDataUpdate);
  const chartTodosDataDelete = useChartDataTodosStore((state) => state.chartTodosDataDelete);
  

  const updateChartData = (date) => {
    if (
      chartDatas.filter(
        (item) => item.date === date.toLocaleDateString("en-UK"),
      ).length <= 0
    ) {
      return alert(t("noDatEntryToUpdate"));
    }
    let newChartData = employees.reduce((acc, item) => {
      acc[`${item.name}`] = Number(item.status.done);
      return acc;
    }, {});
    let newChartDataToDo = employees.reduce((acc, item) => {
      acc[`${item.name}`] = Number(item.status.todo);
      return acc;
    }, {});

    chartDataUpdate(date, newChartData);
    chartTodosDataUpdate(date, newChartDataToDo);
  };
  const deleteChartData = (date) => {
    if (
      chartDatas.filter(
        (item) => item.date === date.toLocaleDateString("en-UK"),
      ).length <= 0
    ) {
      return alert(t("noDataEntryToDelete"));
    }

    if (!confirm(t("willBeDeletedConfirm"))) {
      return;
    }

    chartDataDelete(date);
    chartTodosDataDelete(date)
  };

  const addChartData = (date) => {
    let isDateDuplicate = chartDatas.filter(
      (item) => item.date === date.toLocaleDateString("en-UK"),
    );

    if (employees.length <= 0) {
      return alert(t("youMustAddLeastOneEmployee"));
    } else if (isDateDuplicate.length >= 1) {
      return alert(t("alreadyHaveData"));
    }

    let newChartData = employees.reduce((acc, item) => {
      acc[`${item.name}`] = Number(item.status.done);
      return acc;
    }, {});

    newChartData = { ...newChartData, date: date.toLocaleDateString("en-UK") };
    chartDataAdd(newChartData);

    let newChartDataToDo = employees.reduce((acc, item) => {
      acc[`${item.name}`] = Number(item.status.todo);
      return acc;
    }, {});
    newChartDataToDo = {
      ...newChartDataToDo,
      date: date.toLocaleDateString("en-UK"),
    };

    chartTodosDataAdd(newChartDataToDo)
  };

  return (
    <div>
      <h1 className="text-tremor-title font-semibold text-tremor-content-strong">
        {t("addTableData")}
      </h1>
      <p className="text-tremor-default text-tremor-content">
        {t("addTableDataDesc")}
      </p>
      <DatePicker
        className="mx-auto max-w-sm"
        value={date}
        onValueChange={setDate}
        locale={i18n.language === "tr" ? tr : enUS}
      />
      <div className="flex items-center justify-between gap-4">
        <div className="space-x-5">
          <Button onClick={() => addChartData(date)}>{t("addData")}</Button>
          <Button onClick={() => updateChartData(date)} variant="light">
            {t("updateSelectedDateData")}
          </Button>
        </div>
        <Button
          onClick={() => deleteChartData(date)}
          color="red"
          variant="secondary"
        >
          {t("deleteSelectedDateData")}
        </Button>
      </div>
    </div>
  );
}
