import { create } from "zustand";

export const useChartDatasStore = create((set) => ({
  chartDatas: JSON.parse(localStorage.getItem("chartData")) || [],
  chartDataAdd: (newChartData) =>
    set((state) => ({
      chartDatas: [...state.chartDatas, newChartData],
    })),
  chartDataUpdate: (date, newChartData) =>
    set((state) => ({
      chartDatas: state.chartDatas.map((chartData) =>
        chartData.date === date.toLocaleDateString("en-UK")
          ? { ...chartData, ...newChartData }
          : chartData,
      ),
    })),
  chartDataDelete: (date) =>
    set((state) => ({
      chartDatas: state.chartDatas.filter(
        (chartData) => chartData.date !== date.toLocaleDateString("en-UK"),
      ),
    })),
  resetChartData: () =>
    set(() => ({
      chartDatas: [],
    })),
}));
