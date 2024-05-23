import { create } from "zustand";

export const useChartDataTodosStore = create((set) => ({
  chartDataTodos: JSON.parse(localStorage.getItem("chartData")) || [],
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
}));
