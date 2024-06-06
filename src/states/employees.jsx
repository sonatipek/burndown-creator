import { create } from "zustand";
import { persist } from "zustand/middleware";
import supabase from "../api";

export const useEmployeesStore = create(
  persist(
    (set) => ({
      employees: [fetchEmployees()],
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

async function fetchEmployees() {
  const { data, error } = await supabase
  .from('employees')
  .select()

  if (error) {
    return []
  }
  console.log({...data});
  return {...data};
}