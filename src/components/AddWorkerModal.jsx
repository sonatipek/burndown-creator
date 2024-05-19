import { RiAddCircleLine, RiAddFill, RiCloseLine } from "@remixicon/react";
import { Button, Dialog, DialogPanel, TextInput } from "@tremor/react";
import { useState } from "react";

export default function AddWorkerModal({ setEmployees, employees }) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [role, setRole] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    let duplicateName = employees.filter(employee => employee.name.trim() === name.trim()),
    duplicateSurname = employees.filter(employee => employee.surname.trim() === surname.trim());

    if (name.length <= 3 || surname.length <= 0 || role.length <= 5) {
      return alert("olmaz");
    } else if (duplicateName.length >= 1 && duplicateSurname.length >= 1){
        return alert("Aynı isimde bir çalışan zaten var")
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
  return (
    <>
      <Button
        size="sm"
        icon={RiAddFill}
        variant="light"
        onClick={() => setIsOpen(true)}
      >
        Add Worker
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
            Çalışan Ekle
          </h4>

          <form
            action="#"
            onSubmit={submitHandler}
            className="mt-4 space-y-3 p-1"
          >
            <label className="block text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Çalışanın Adı ve Soyadı
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
              Çalışanın Rolü
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
              Çalışanı Ekle
            </Button>
          </form>
        </DialogPanel>
      </Dialog>
    </>
  );
}
