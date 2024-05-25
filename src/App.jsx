import { useTranslation } from "react-i18next";

import { useChartDatasStore } from "./states/chartDatas";
import { useChartDataTodosStore } from "./states/chartDataTodos";

import TableDataActions from "./components/TableDataActions";
import EmployeeTable from "./components/EmployeeTable";
import LineChartComponent from "./components/LineChart";

export default function Example() {
  const { t } = useTranslation();

  // States
  const chartDatas = useChartDatasStore((state) => state.chartDatas);
  const chartDataTodos = useChartDataTodosStore(
    (state) => state.chartDataTodos,
  );

  return (
    <main className="container mx-auto">
      <EmployeeTable />

      <TableDataActions />

      <div className="flex flex-col gap-4">
        <LineChartComponent
          chartTitle={t("employeeBasedActivities")}
          data={chartDatas}
          isCustomTooltip
          customTooltipText={t("done")}
        />
        <LineChartComponent
          chartTitle={t("employeeBasedRemainingWork")}
          data={chartDataTodos}
          isCustomTooltip
          customTooltipText="Todo"
        />
      </div>
    </main>
  );
}
