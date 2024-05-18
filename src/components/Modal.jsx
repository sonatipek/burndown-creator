import { RiAddCircleLine, RiEdit2Line } from "@remixicon/react";
import { Button, Dialog, DialogPanel, NumberInput } from "@tremor/react";
import { useState } from "react";

export function Modal({ employee, buttonText, editEmployeeStatus }) {
  const [isOpen, setIsOpen] = useState(false);
  const [todo, setTodo] = useState(0);
  const [progress, setProgress] = useState(0);
  const [waiting, setWaiting] = useState(0);
  const [test, setTest] = useState(0);
  const [done, setDone] = useState(0);

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
                  className="text-center font-mono text-sm text-slate-500"
                >
                  To-Do Stats
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
                  className="text-center font-mono text-sm text-slate-500"
                >
                  Progress Stats
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
                  className="text-center font-mono text-sm text-slate-500"
                >
                  Waiting Stats
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
                  className="text-center font-mono text-sm text-slate-500"
                >
                  Test Stats
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
                  className="text-center font-mono text-sm text-slate-500"
                >
                  Done Stats
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
                İstatistikleri Düzenle
              </Button>
            </form>
          </div>
        </DialogPanel>
      </Dialog>
    </>
  );
}
