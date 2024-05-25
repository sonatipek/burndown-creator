import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useEmployeesStore = create(
  persist(
    (set) => ({
      employees: [],
      addNewEmployee: (newEmployee) =>
        set((state) => ({
          employees: [...state.employees, newEmployee],
        })),
      deleteEmployee: (id) =>
        set((state) => ({
          employees: state.employees.filter((employee) => employee.id !== id),
        })),
      editEmployeeStats: (id, todo, progress, waiting, test, done) =>
        set((state) => ({
          employees: state.employees.map((employee) => {
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
          }),
        })),
    }),
    {
      name: "employees",
    },
  ),
);
