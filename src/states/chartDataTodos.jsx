import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useChartDataTodosStore = create(
  persist(
    (set) => ({
      chartDataTodos: [],
      chartTodosDataAdd: (newChartDataTodos) =>
        set((state) => ({
          chartDataTodos: [...state.chartDataTodos, newChartDataTodos],
        })),
      chartTodosDataUpdate: (date, newChartDataTodos) =>
        set((state) => ({
          chartDataTodos: state.chartDataTodos.map((chartData) =>
            chartData.date === date.toLocaleDateString("en-UK")
              ? { ...chartData, ...newChartDataTodos }
              : chartData,
          ),
        })),
      chartTodosDataDelete: (date) =>
        set((state) => ({
          chartDataTodos: state.chartDataTodos.filter(
            (chartData) => chartData.date !== date.toLocaleDateString("en-UK"),
          ),
        })),
      resetTodosChartData: () =>
        set(() => ({
          chartDataTodos: [],
        })),
      sortTodosChartDataByDate: () =>
        set((state) => ({
          chartDataTodos: [...state.chartDataTodos].sort((a, b) => {
            const dateA = new Date(a.date.split("/").reverse().join("-"));
            const dateB = new Date(b.date.split("/").reverse().join("-"));
            return dateA - dateB;
          }),
        })),
    }),
    {
      name: "chartDataTodos",
    },
  ),
);
