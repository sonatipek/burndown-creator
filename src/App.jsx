import { RiAddCircleLine } from "@remixicon/react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  TextInput,
  LineChart,
} from "@tremor/react";

import { useEffect, useState } from "react";
import { Modal } from "./components/Modal";
import DatePickerComp from "./components/DatePicker";

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
  const { payload, active } = props;
  if (!active || !payload) return null;

  return (
    <div className="w-56 rounded-tremor-default border border-tremor-border bg-tremor-background p-2 text-tremor-default shadow-tremor-dropdown">
      {payload
        .filter((item) => item.className !== "cursor-pointer")
        .map((category, idx) => (
          <div key={idx} className="flex flex-1 space-x-2.5">
            <div
              className={`flex w-1 flex-col bg-${category.color}-500 rounded`}
            />
            <div className="space-y-1">
              <p className="text-tremor-content">{category.dataKey}</p>
              <p className="font-medium text-tremor-content-emphasis">
                {category.value} bpm
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default function Example() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [role, setRole] = useState("");

  const [employees, setEmployees] = useState(
    JSON.parse(localStorage.getItem("employees")) || [],
  );
  const [chartdata, setChartData] = useState(
    JSON.parse(localStorage.getItem("chartData")) || [],
  );
  const [chartdatatodo, setChartDataTodo] = useState(
    JSON.parse(localStorage.getItem("chartDataToDo")) || [],
  );

  const submitHandler = (e) => {
    e.preventDefault();
    if (name.length <= 0 || surname.length <= 0 || role.length <= 0) {
      return alert("olmaz");
    }
    setEmployees((prevState) => [
      ...prevState,
      {
        id: Date.now(),
        name,
        surname,
        role,
        status: {
          todo: 0,
          progress: 0,
          waiting: 0,
          test: 0,
          done: 0,
        },
      },
    ]);

    setName("");
    setSurname("");
    setRole("");
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

    setChartData(prevState => prevState.map(item => item.date === date.toLocaleDateString("tr") ? {...item, ...newChartData }: item))
    setChartDataTodo(prevState => prevState.map(item => item.date === date.toLocaleDateString("tr") ? {...item, ...newChartDataToDo }: item))
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
  }, [chartdata]);

  useEffect(() => {
    localStorage.setItem("chartDataToDo", JSON.stringify(chartdatatodo));
  }, [chartdatatodo]);

  return (
    <main className="container mx-auto">
      <form
        action="#"
        onSubmit={submitHandler}
        className="mt-4 grid w-6/12 grid-cols-1 gap-x-4 gap-y-6 rounded border p-3 py-4 sm:grid-cols-6"
      >
        <TextInput
          placeholder="Çalışanı ismi"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="col-span-3"
        />
        <TextInput
          placeholder="Çalışanı soyadı"
          type="text"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          className="col-span-3"
        />

        <TextInput
          placeholder="Çalışanı rolü"
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="col-span-3"
        />

        <Button
          icon={RiAddCircleLine}
          type="submit"
          onClick={submitHandler}
          size="xs"
          className="col-span-full"
        >
          Çalışanı Ekle
        </Button>
      </form>

      <div className="mx-auto ">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Çalışan</TableHeaderCell>
              <TableHeaderCell>Role</TableHeaderCell>
              <TableHeaderCell>ToDo</TableHeaderCell>
              <TableHeaderCell>In Progress</TableHeaderCell>
              <TableHeaderCell>Waiting</TableHeaderCell>
              <TableHeaderCell>Test</TableHeaderCell>
              <TableHeaderCell>Done</TableHeaderCell>
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
      </div>

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
