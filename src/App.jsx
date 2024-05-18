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
  // LineChart,
} from "@tremor/react";

import { useEffect, useState } from "react";
import { Modal } from "./components/Modal";
import DatePickerComp from "./components/DatePicker";

export default function Example() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [role, setRole] = useState("");

  const [employees, setEmployees] = useState(
    JSON.parse(localStorage.getItem("employees")) || [],
  );
  // const [chartdata, setChartData] = useState(
  //   JSON.parse(localStorage.getItem("chartData")) || [],
  // );

  const submitHandler = (e) => {
    e.preventDefault();
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

  const chartDataAdd = (date) => {
    // setChartData((prevState) => [
    //   ...prevState,
    //   {
    //     date: date.toLocaleDateString("tr"),
    //     "Emirhan Erol": 20,
    //     "Sonat İpek": 20,
    //   },
    // ]);
    console.log(date);
  };

  const deleteEmployee = (id) => {
    setEmployees((prevState) =>
      prevState.filter((employee) => employee.id !== id),
    );
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

  return (
    <main className="container mx-auto">
      <form action="#" onSubmit={submitHandler}>
        <TextInput
          placeholder="Çalışanı ismi"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextInput
          placeholder="Çalışanı soyadı"
          type="text"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
        <TextInput
          placeholder="Çalışanı rolü"
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />

        <Button icon={RiAddCircleLine} type="submit" onClick={submitHandler}>
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
                <TableCell className="flex gap-3">
                  <Modal
                    employee={employee}
                    buttonText="Güncelle"
                    editEmployeeStatus={editEmployeeStatus}
                  />
                  <button onClick={() => deleteEmployee(employee.id)} >Sil</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <DatePickerComp chartDataAdd={chartDataAdd} />

      {/* <LineChart
        className="h-80"
        data={chartdata}
        index="date"
        categories={employees
          .filter((item) => item.name.trim() !== "")
          .map((item) => item.name + " " + item.surname)}
        colors={["indigo", "rose"]}
        yAxisWidth={60}
        onValueChange={(v) => console.log(v)}
      /> */}
    </main>
  );
}
