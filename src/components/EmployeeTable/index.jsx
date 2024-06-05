import { useTranslation } from "react-i18next";
import {
  Card,
  Icon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";

import { RiDeleteBin6Line } from "@remixicon/react";
import AddWorkerModal from "./components/AddEmployeeModal";
import { UpdateStatsModal } from "./components/UpdateStatsModal";

import { useEmployeesStore } from "../../states/employees";
import { useChartDatasStore } from "../../states/chartDatas";
import { useChartDataTodosStore } from "../../states/chartDataTodos";
import useAuth from "../../hooks/useAuth";

export default function EmployeeTable() {
  const user = useAuth();
  const { t } = useTranslation();

  // States
  const employees = useEmployeesStore((state) => state.employees);

  // Actions
  const deleteEmployee = useEmployeesStore((state) => state.deleteEmployee);
  const resetTodosChartData = useChartDataTodosStore(
    (state) => state.resetTodosChartData,
  );
  const resetChartData = useChartDatasStore((state) => state.resetChartData);

  // Handlers
  const clearCharts = () => {
    resetChartData();
    resetTodosChartData();
  };

  const deleteEmployeeHandler = (id) => {
    if (employees.length <= 1) {
      let confirmResult = confirm(t("warningsAndErrors.lastEmployeeConfirm"));
      if (!confirmResult) {
        return;
      } else {
        clearCharts();
        deleteEmployee(id);
        return;
      }
    }
    confirm(t("warningsAndErrors.areYouSure")) ? deleteEmployee(id) : "";
  };

  return (
    <Card className="my-8">
      <div className="sm:flex sm:items-center sm:justify-between sm:space-x-10">
        <div>
          <h3 className="font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
            {t("employees")}
          </h3>
          <p className="mt-1 text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
            {t("employeeTable.tableDesc")}
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
              <TableCell className="flex flex-col">
                <p className="font-medium text-tremor-content-emphasis">
                  {employee.name + " " + employee.surname}
                </p>
                <span className="text-tremor-label text-tremor-content-subtle">
                  {employee.role}
                </span>
              </TableCell>
              <TableCell>{employee.status.todo}</TableCell>
              <TableCell>{employee.status.progress}</TableCell>
              <TableCell>{employee.status.waiting}</TableCell>
              <TableCell>{employee.status.test}</TableCell>
              <TableCell>{employee.status.done}</TableCell>
              <TableCell className="flex items-center justify-center gap-7">
                {user && (
                  <>
                    <UpdateStatsModal
                      employee={employee}
                      buttonText={t("updateStats")}
                    />
                    <Icon
                      onClick={() => deleteEmployeeHandler(employee.id)}
                      icon={RiDeleteBin6Line}
                      tooltip={t("delete")}
                      size="sm"
                      color="red"
                      className="cursor-pointer rounded-tremor-small p-2 hover:bg-tremor-background-subtle"
                    />
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
