import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useChartDatasStore = create(
  persist(
    (set) => ({
      chartDatas: [],
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
      sortChartDataByDate: () =>
        set((state) => ({
          chartDatas: [...state.chartDatas].sort((a, b) => {
            const dateA = new Date(a.date.split("/").reverse().join("-"));
            const dateB = new Date(b.date.split("/").reverse().join("-"));
            return dateA - dateB;
          }),
        })),
    }),
    {
      name: "chartDatas",
    },
  ),
);
