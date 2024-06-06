import { useState } from "react";
import { useTranslation } from "react-i18next";

import { RiAddCircleLine, RiAddFill, RiCloseLine } from "@remixicon/react";
import { Button, Dialog, DialogPanel, TextInput } from "@tremor/react";

import { useEmployeesStore } from "../../../states/employees";
import useAuth from "../../../hooks/useAuth";
import supabase from "../../../api";

export default function AddWorkerModal() {
  const user = useAuth();
  const { t } = useTranslation();

  // States
  const employees = useEmployeesStore((state) => state.employees);
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [role, setRole] = useState("");

  // Actions
  const addNewEmployee = useEmployeesStore((state) => state.addNewEmployee);

  // Handlers
  const resetForm = () => {
    setName("");
    setSurname("");
    setRole("");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!user) {
      return alert("Çalışan eklemek için üye olmalısınız!");
    }

    let duplicateName = employees.filter(
        (employee) => employee.name.trim() === name.trim(),
      ),
      duplicateSurname = employees.filter(
        (employee) => employee.surname.trim() === surname.trim(),
      );

    //Validations
    if (name.length <= 3) {
      return alert(
        t("warningsAndErrors.requiredAndMinCharField", {
          field: t("name"),
          min: 3,
        }),
      );
    } else if (surname.length <= 0) {
      return alert(
        t("warningsAndErrors.requiredField", { field: t("surname") }),
      );
    } else if (role.length <= 0) {
      return alert(t("warningsAndErrors.requiredField", { field: t("role") }));
    } else if (duplicateName.length >= 1 && duplicateSurname.length >= 1) {
      return alert(t("warningsAndErrors.alreadyHaveEmployeeSameName"));
    }

    try {
      const { data, error } = await supabase
        .from("employees")
        .insert({ name: name, surname: surname, role: role })
        .select();

      if (error) {
        console.log(error);
        // throw new Error(error);
      }

      // Add new employee
      addNewEmployee({
        id: data[0].employee_id,
        name: data[0].name,
        surname: data[0].surname,
        role: data[0].role,
        status: {
          todo: 0,
          progress: 0,
          waiting: 0,
          test: 0,
          done: 0,
        },
      });
      console.log(data);
    } catch (error) {
      console.error(error);
    }

    // Reset form and close modal
    resetForm();
    setIsOpen(false);
  };

  return (
    <>
      <Button
        size="sm"
        icon={RiAddFill}
        variant="light"
        onClick={() => setIsOpen(true)}
      >
        {t("employeeTable.addNewEmployee")}
      </Button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        static={true}
        className="z-[100]"
      >
        <DialogPanel className="sm:max-w-md">
          <div className="absolute right-0 top-0 pr-3 pt-3">
            <button
              type="button"
              className="rounded-tremor-small p-2 text-tremor-content-subtle hover:bg-tremor-background-subtle hover:text-tremor-content dark:text-dark-tremor-content-subtle hover:dark:bg-dark-tremor-background-subtle hover:dark:text-tremor-content"
              onClick={() => setIsOpen(false)}
              aria-label="Close"
            >
              <RiCloseLine className="h-5 w-5 shrink-0" aria-hidden={true} />
            </button>
          </div>

          <h4 className="font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
            {t("employeeTable.addNewEmployee")}
          </h4>

          <form
            action="#"
            onSubmit={submitHandler}
            className="mt-4 space-y-3 p-1"
          >
            <label className="block text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
              {t("employeeTable.employeeNameAndSurname")}
            </label>
            <div className="flex gap-4">
              <TextInput
                placeholder="Jhon"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextInput
                placeholder="Doe"
                type="text"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              />
            </div>
            <label className="!mt-4 block text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
              {t("employeeTable.employeeRole")}
            </label>
            <TextInput
              placeholder="Frontend Developer"
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />

            <Button
              icon={RiAddCircleLine}
              type="submit"
              onClick={submitHandler}
              size="xs"
              className="!mt-6 w-full"
            >
              {t("employeeTable.addEmployee")}
            </Button>
          </form>
        </DialogPanel>
      </Dialog>
    </>
  );
}
