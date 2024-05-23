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

import { useEffect, useState } from "react";
import { Modal } from "./components/Modal";
import DatePickerComp from "./components/DatePicker";
import AddWorkerModal from "./components/AddWorkerModal";
import { RiDeleteBin6Line } from "@remixicon/react";
import { Icon } from "@tremor/react";
import { t } from "i18next";

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
  const [employees, setEmployees] = useState(
    JSON.parse(localStorage.getItem("employees")) || [],
  );
  const [chartdata, setChartData] = useState(
    JSON.parse(localStorage.getItem("chartData")) || [],
  );
  const [chartdatatodo, setChartDataTodo] = useState(
    JSON.parse(localStorage.getItem("chartDataToDo")) || [],
  );

  const sortByDate = (state, setState) => {
    const sortedState = [...state].sort((a, b) => {
      const dateA = new Date(a.date.split("/").reverse().join("-"));
      const dateB = new Date(b.date.split("/").reverse().join("-"));
      return dateA - dateB;
    });
    setState(sortedState);
  };

  const chartDataUpdate = (date) => {
    if (
      chartdata.filter((item) => item.date === date.toLocaleDateString("en-UK"))
        .length <= 0
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

    setChartData((prevState) =>
      prevState.map((item) =>
        item.date === date.toLocaleDateString("en-UK")
          ? { ...item, ...newChartData }
          : item,
      ),
    );
    setChartDataTodo((prevState) =>
      prevState.map((item) =>
        item.date === date.toLocaleDateString("en-UK")
          ? { ...item, ...newChartDataToDo }
          : item,
      ),
    );
  };
  const chartDataDelete = (date) => {
    if (
      chartdata.filter((item) => item.date === date.toLocaleDateString("en-UK"))
        .length <= 0
    ) {
      return alert(t("noDataEntryToDelete"));
    }
    if (
      !confirm(
        t("willBeDeletedConfirm"),
      )
    ) {
      return;
    }

    setChartData((prevState) =>
      prevState.filter((item) => item.date !== date.toLocaleDateString("en-UK")),
    );
    setChartDataTodo((prevState) =>
      prevState.filter((item) => item.date !== date.toLocaleDateString("en-UK")),
    );
  };

  const chartDataAdd = (date) => {
    let isDateDuplicate = chartdata.filter(
      (item) => item.date === date.toLocaleDateString("en-UK"),
    );

    if (employees.length <= 0) {
      return alert(t("youMustAddLeastOneEmployee"));
    } else if (isDateDuplicate.length >= 1) {
      return alert(
        t("alreadyHaveData"),
      );
    }

    let newChartData = employees.reduce((acc, item) => {
      acc[`${item.name}`] = Number(item.status.done);
      return acc;
    }, {});

    newChartData = { ...newChartData, date: date.toLocaleDateString("en-UK") };

    let newChartDataToDo = employees.reduce((acc, item) => {
      acc[`${item.name}`] = Number(item.status.todo);
      return acc;
    }, {});
    newChartDataToDo = {
      ...newChartDataToDo,
      date: date.toLocaleDateString("en-UK"),
    };

    setChartData((prevState) => [...prevState, newChartData]);
    setChartDataTodo((prevState) => [...prevState, newChartDataToDo]);
  };

  const clearCharts = () => {
    setChartData([]);
    setChartDataTodo([]);
  };

  const deleteEmployee = (id) => {
    if (employees.length <= 1) {
      let confirmResult = confirm(
        t("lastEmployeeConfirm"),
      );
      if (!confirmResult) {
        return;
      } else {
        clearCharts();
        setEmployees((prevState) =>
          prevState.filter((employee) => employee.id !== id),
        );
        return;
      }
    }
    confirm(t("areYouSure"))
      ? setEmployees((prevState) =>
          prevState.filter((employee) => employee.id !== id),
        )
      : "";
  };

  const editEmployeeStatus = (id, todo, progress, waiting, test, done) => {
    setEmployees((prevState) => {
      return prevState.map((employee) => {
        if (employee.id === id) {
          return {
            ...employee,
            ...{
              status: {
                todo: todo,
                progress: progress,
                waiting: waiting,
                test: test,
                done: done,
              },
            },
          };
        }
        return employee;
      });
    });
  };

  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  useEffect(() => {
    localStorage.setItem("chartData", JSON.stringify(chartdata));
    sortByDate(chartdata, setChartData);
  }, [chartdata]);

  useEffect(() => {
    localStorage.setItem("chartDataToDo", JSON.stringify(chartdatatodo));
    sortByDate(chartdatatodo, setChartDataTodo);
  }, [chartdatatodo]);

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
          <AddWorkerModal setEmployees={setEmployees} employees={employees} />
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
                  <Modal
                    employee={employee}
                    buttonText={t("updateStats")}
                    editEmployeeStatus={editEmployeeStatus}
                  />
                  <Icon
                    onClick={() => deleteEmployee(employee.id)}
                    icon={RiDeleteBin6Line}
                    tooltip={t("delete")}
                    size="sm"
                    color="red"
                    className="cursor-pointer"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <DatePickerComp
        chartDataAdd={chartDataAdd}
        chartDataDelete={chartDataDelete}
        chartDataUpdate={chartDataUpdate}
      />

      <div className="flex flex-col gap-4">
        <h1 className="mt-3 text-tremor-metric font-semibold text-tremor-content-strong">
          {t("employeeBasedActivities")}
        </h1>
        <LineChart
          className="h-80"
          data={chartdata}
          index="date"
          categories={employees
            .filter((item) => item.name.trim() !== "")
            .map((item) => item.name)}
          colors={mapColors(employees.length)}
          yAxisWidth={60}
          onValueChange={(v) => console.log(v)}
          customTooltip={customTooltip}
          noDataText={t("noDataText")}
        />

        <h1 className="mt-3 text-tremor-metric font-semibold text-tremor-content-strong">
          {t("employeeBasedRemainingWork")}
        </h1>
        <LineChart
          className="h-80"
          data={chartdatatodo}
          index="date"
          categories={employees
            .filter((item) => item.name.trim() !== "")
            .map((item) => item.name)}
          colors={mapColors(employees.length)}
          yAxisWidth={60}
          onValueChange={(v) => console.log(v)}
          noDataText={t("noDataText")}
        />

        <h1 className="mt-3 text-tremor-metric font-semibold text-tremor-content-strong">
          {t("remainingWorks")}
        </h1>
      </div>
    </main>
  );
}
