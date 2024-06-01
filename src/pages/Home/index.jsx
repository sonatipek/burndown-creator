import { useTranslation } from "react-i18next";

import { useChartDataTodosStore } from "../../states/chartDataTodos";

import EmployeeTable from "../../components/EmployeeTable";
import LineChartComponent from "../../components/LineChart";

export default function Home() {
  const { t } = useTranslation();

  // States
  const chartDataTodos = useChartDataTodosStore(
    (state) => state.chartDataTodos,
  );

  return (
    <main className="container mx-auto">
      <EmployeeTable />

      <div className="flex flex-col gap-4">
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
