import { create } from "zustand";

export const useEmployeesStore = create((set) => ({
  employees: JSON.parse(localStorage.getItem("employees")) || [],
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
}));
