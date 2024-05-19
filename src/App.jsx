import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  LineChart,
  Card,
} from "@tremor/react";

import { useEffect, useState } from "react";
import { Modal } from "./components/Modal";
import DatePickerComp from "./components/DatePicker";
import AddWorkerModal from "./components/AddWorkerModal";

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
              {category.value} Done
            </p>
          </div>
        ))}
    </div>
  );
};

export default function Example() {
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
      const dateA = new Date(a.date.split(".").reverse().join("-"));
      const dateB = new Date(b.date.split(".").reverse().join("-"));
      return dateA - dateB;
    });
    setState(sortedState);
  };

  const chartDataUpdate = (date) => {
    if (
      chartdata.filter((item) => item.date === date.toLocaleDateString("tr"))
        .length <= 0
    ) {
      return alert("seçtiğiniz tarihte güncellenecek bir veri girişi yok");
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
        item.date === date.toLocaleDateString("tr")
          ? { ...item, ...newChartData }
          : item,
      ),
    );
    setChartDataTodo((prevState) =>
      prevState.map((item) =>
        item.date === date.toLocaleDateString("tr")
          ? { ...item, ...newChartDataToDo }
          : item,
      ),
    );
  };
  const chartDataDelete = (date) => {
    if (
      chartdata.filter((item) => item.date === date.toLocaleDateString("tr"))
        .length <= 0
    ) {
      return alert("seçtiğiniz tarihte bir veri girişi zaten yok");
    }
    if (
      !confirm(
        "bu tarihte çalışanlara ait tüm veriler silinecektir. Onaylıyor musun?",
      )
    ) {
      return;
    }

    setChartData((prevState) =>
      prevState.filter((item) => item.date !== date.toLocaleDateString("tr")),
    );
    setChartDataTodo((prevState) =>
      prevState.filter((item) => item.date !== date.toLocaleDateString("tr")),
    );
  };

  const chartDataAdd = (date) => {
    let isDateDuplicate = chartdata.filter(
      (item) => item.date === date.toLocaleDateString("tr"),
    );

    if (employees.length <= 0) {
      return alert("güncellemem");
    } else if (isDateDuplicate.length >= 1) {
      return alert(
        "zaten bu tarihte bir veri girişi var. Önce bu tarihi silin veya bu tarihi güncelleyin.",
      );
    }

    let newChartData = employees.reduce((acc, item) => {
      acc[`${item.name}`] = Number(item.status.done);
      return acc;
    }, {});

    newChartData = { ...newChartData, date: date.toLocaleDateString("tr") };

    let newChartDataToDo = employees.reduce((acc, item) => {
      acc[`${item.name}`] = Number(item.status.todo);
      return acc;
    }, {});
    newChartDataToDo = {
      ...newChartDataToDo,
      date: date.toLocaleDateString("tr"),
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
        "bu son çalışanınız, tüm çalışanlar silinirse mevcut grafik de sıfırlanacaktır. KABUL EDİYOR MUSUNUZ",
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
    confirm("emin misiniz")
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
              Çalışanlar
            </h3>
            <p className="mt-1 text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
              Overview of all registered workers within your organization.
            </p>
          </div>
          <AddWorkerModal setEmployees={setEmployees} employees={employees} />
        </div>

        <Table className="mt-4 max-h-64">
          <TableHead className="sticky left-0 right-0 top-0 bg-white">
            <TableRow className="border-b border-tremor-border dark:border-dark-tremor-border">
              <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                Çalışan
              </TableHeaderCell>
              <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                Rol
              </TableHeaderCell>
              <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                ToDo
              </TableHeaderCell>
              <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                In Progress
              </TableHeaderCell>
              <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                Waiting
              </TableHeaderCell>
              <TableHeaderCell className="text-right text-tremor-content-strong dark:text-dark-tremor-content-strong">
                Test
              </TableHeaderCell>
              <TableHeaderCell className="text-right text-tremor-content-strong dark:text-dark-tremor-content-strong">
                Done
              </TableHeaderCell>
              <TableHeaderCell className="text-right text-tremor-content-strong dark:text-dark-tremor-content-strong"></TableHeaderCell>
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
                    buttonText="Güncelle"
                    editEmployeeStatus={editEmployeeStatus}
                  />
                  <Button
                    onClick={() => deleteEmployee(employee.id)}
                    color="red"
                    className="px-4 py-0"
                  >
                    Sil
                  </Button>
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
          Kişi bazlı kim ne kadar çalıştı
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
        />

        <h1 className="mt-3 text-tremor-metric font-semibold text-tremor-content-strong">
          Kimin ne kadar işi kaldı
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
        />

        <h1 className="mt-3 text-tremor-metric font-semibold text-tremor-content-strong">
          Toplamda ne kadar iş kaldı
        </h1>
      </div>
    </main>
  );
}
