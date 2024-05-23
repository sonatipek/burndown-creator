import { RiAddCircleLine, RiEdit2Line } from "@remixicon/react";
import { Button, Dialog, DialogPanel, NumberInput } from "@tremor/react";
import { t } from "i18next";
import { useState } from "react";

export function Modal({ employee, buttonText, editEmployeeStatus }) {
  const [isOpen, setIsOpen] = useState(false);
  const [todo, setTodo] = useState(employee.status.todo);
  const [progress, setProgress] = useState(employee.status.progress);
  const [waiting, setWaiting] = useState(employee.status.waiting);
  const [test, setTest] = useState(employee.status.test);
  const [done, setDone] = useState(employee.status.done);

  return (
    <>
      <Button
        icon={RiEdit2Line}
        iconPosition="right"
        variant="light"
        onClick={() => setIsOpen(true)}
      >
        {buttonText}
      </Button>
      <Dialog open={isOpen} onClose={(val) => setIsOpen(val)} static={true}>
        <DialogPanel>
          <h3 className="flex flex-col text-lg font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
            {employee.name + " " + employee.surname}
            <span className="text-sm font-medium leading-tight text-zinc-500">
              {employee.role}
            </span>
          </h3>
          <div className="mt-5 text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
            <form action="#" className="space-y-3">
              <div>
                <label
                  htmlFor="todo-stats"
                  className="block text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                >
                  {t("toDo")}
                </label>

                <NumberInput
                  id="todo-stats"
                  defaultValue={employee.todo}
                  value={todo}
                  onChange={(e) => setTodo(e.target.value)}
                  min={0}
                />
              </div>
              <div>
                <label
                  htmlFor="progress-stats"
                  className="block text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                >
                  {t("inProgress")}
                </label>

                <NumberInput
                  id="progress-stats"
                  defaultValue={employee.progress}
                  value={progress}
                  onChange={(e) => setProgress(e.target.value)}
                  min={0}
                />
              </div>

              <div>
                <label
                  htmlFor="waiting-stats"
                  className="block text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                >
                  {t("waiting")}
                </label>

                <NumberInput
                  id="waiting-stats"
                  defaultValue={employee.waiting}
                  value={waiting}
                  onChange={(e) => setWaiting(e.target.value)}
                  min={0}
                />
              </div>

              <div>
                <label
                  htmlFor="test-stats"
                  className="block text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                >
                  {t("test")}
                </label>

                <NumberInput
                  id="test-stats"
                  defaultValue={employee.test}
                  value={test}
                  onChange={(e) => setTest(e.target.value)}
                  min={0}
                />
              </div>

              <div>
                <label
                  htmlFor="done-stats"
                  className="block text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                >
                  {t("done")}
                </label>

                <NumberInput
                  id="done-stats"
                  defaultValue={employee.done}
                  value={done}
                  onChange={(e) => setDone(e.target.value)}
                  min={0}
                />
              </div>

              <Button
                className="mt-8 w-full"
                icon={RiAddCircleLine}
                variant="secondary"
                type="submit"
                onClick={() => {
                  editEmployeeStatus(
                    employee.id,
                    todo,
                    progress,
                    waiting,
                    test,
                    done,
                  );
                  setIsOpen(false);
                }}
              >
                {t("update")}
              </Button>
            </form>
          </div>
        </DialogPanel>
      </Dialog>
    </>
  );
}
