import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  LineChart,
  Card,
} from "@tremor/react";
import { useTranslation } from "react-i18next";

import { Modal } from "./components/Modal";
import DatePickerComp from "./components/DatePicker";
import AddWorkerModal from "./components/AddWorkerModal";
import { RiDeleteBin6Line } from "@remixicon/react";
import { Icon } from "@tremor/react";
import { t } from "i18next";
import { useEmployeesStore } from "./states/employees";
import { useChartDatasStore } from "./states/chartDatas";
import { useChartDataTodosStore } from "./states/chartDataTodos";

const colors = [
  "stone",
  "red",
  "orange",
  "yellow",
  "green",
  "emerald",
  "teal",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "violet",
  "lime",
  "purple",
  "fuchsia",
  "pink",
  "amber",
  "rose",
];

function mapColors(number) {
  return Array.from(
    { length: number },
    (_, index) => colors[index % colors.length],
  );
}
const customTooltip = (props) => {
  const { payload, active, label } = props;
  if (!active || !payload) return null;

  return (
    <div className="min-w-40 max-w-64 rounded-tremor-default border border-tremor-border bg-tremor-background p-2 text-tremor-default shadow-tremor-dropdown">
      <div className="mb-3 w-full rounded border border-tremor-border bg-tremor-background-subtle p-1 text-center font-medium">
        {label}
      </div>
      {payload
        .filter((item) => item.className !== "cursor-pointer")
        .map((category, idx) => (
          <div
            key={idx}
            className="mt-1.5 flex flex-1 items-center justify-between space-x-2.5"
          >
            <div className="flex items-center justify-center gap-2 space-y-1">
              <div
                className={`flex size-3 items-center justify-center bg-${category.color}-500 rounded`}
              />
              <p className="font-normal text-tremor-content-emphasis">
                {category.dataKey}
              </p>
            </div>
            <p className="font-semibold text-tremor-content-strong">
              {category.value} {t("done")}
            </p>
          </div>
        ))}
    </div>
  );
};

export default function Example() {
  const { t } = useTranslation();
  // Employee State
  const employees = useEmployeesStore((state) => state.employees);
  const deleteEmployee = useEmployeesStore((state) => state.deleteEmployee);

  const resetTodosChartData = useChartDataTodosStore(
    (state) => state.resetTodosChartData,
  );
  const resetChartData = useChartDatasStore((state) => state.resetChartData);

  const chartDatas = useChartDatasStore((state) => state.chartDatas);
  const chartDataTodos = useChartDataTodosStore(
    (state) => state.chartDataTodos,
  );

  const clearCharts = () => {
    resetChartData();
    resetTodosChartData();
  };

  const deleteEmployeeHandler = (id) => {
    if (employees.length <= 1) {
      let confirmResult = confirm(t("lastEmployeeConfirm"));
      if (!confirmResult) {
        return;
      } else {
        clearCharts();
        deleteEmployee(id);
        return;
      }
    }
    confirm(t("areYouSure")) ? deleteEmployee(id) : "";
  };

  return (
    <main className="container mx-auto">
      <Card className="my-8">
        <div className="sm:flex sm:items-center sm:justify-between sm:space-x-10">
          <div>
            <h3 className="font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
              {t("employees")}
            </h3>
            <p className="mt-1 text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
              {t("overviewEmployeesTableDesc")}
            </p>
          </div>
          <AddWorkerModal />
        </div>

        <Table className="mt-4 max-h-64">
          <TableHead className="sticky left-0 right-0 top-0 bg-white">
            <TableRow className="border-b border-tremor-border dark:border-dark-tremor-border">
              <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                {t("employee")}
              </TableHeaderCell>
              <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                {t("role")}
              </TableHeaderCell>
              <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                {t("toDo")}
              </TableHeaderCell>
              <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                {t("inProgress")}
              </TableHeaderCell>
              <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                {t("waiting")}
              </TableHeaderCell>
              <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                {t("test")}
              </TableHeaderCell>
              <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                {t("done")}
              </TableHeaderCell>
              <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                {" "}
              </TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>{employee.name + " " + employee.surname}</TableCell>
                <TableCell>{employee.role}</TableCell>
                <TableCell>{employee.status.todo}</TableCell>
                <TableCell>{employee.status.progress}</TableCell>
                <TableCell>{employee.status.waiting}</TableCell>
                <TableCell>{employee.status.test}</TableCell>
                <TableCell>{employee.status.done}</TableCell>
                <TableCell className="flex items-center justify-center gap-7">
                  <Modal employee={employee} buttonText={t("updateStats")} />
                  <Icon
                    onClick={() => deleteEmployeeHandler(employee.id)}
                    icon={RiDeleteBin6Line}
                    tooltip={t("delete")}
                    size="sm"
                    color="red"
                    className="cursor-pointer rounded-tremor-small p-2 hover:bg-tremor-background-subtle"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <DatePickerComp />

      <div className="flex flex-col gap-4">
        <h1 className="mt-3 text-tremor-metric font-semibold text-tremor-content-strong">
          {t("employeeBasedActivities")}
        </h1>
        <LineChart
          className="h-80"
          data={chartDatas}
          index="date"
          categories={employees
            .filter((item) => item.name.trim() !== "")
            .map((item) => item.name)}
          colors={mapColors(employees.length)}
          yAxisWidth={60}
          customTooltip={customTooltip}
          noDataText={t("noDataText")}
        />

        <h1 className="mt-3 text-tremor-metric font-semibold text-tremor-content-strong">
          {t("employeeBasedRemainingWork")}
        </h1>
        <LineChart
          className="h-80"
          data={chartDataTodos}
          index="date"
          categories={employees
            .filter((item) => item.name.trim() !== "")
            .map((item) => item.name)}
          colors={mapColors(employees.length)}
          yAxisWidth={60}
          noDataText={t("noDataText")}
        />

        <h1 className="mt-3 text-tremor-metric font-semibold text-tremor-content-strong">
          {t("remainingWorks")}
        </h1>
      </div>
    </main>
  );
}
