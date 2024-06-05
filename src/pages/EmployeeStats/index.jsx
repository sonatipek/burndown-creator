import { useTranslation } from "react-i18next";
import LineChartComponent from "../../components/LineChart";
import TableDataActions from "../../components/TableDataActions";
import { useChartDataTodosStore } from "../../states/chartDataTodos";
import { useChartDatasStore } from "../../states/chartDatas";

export default function EmployeeStats() {
    const { t } = useTranslation();

    // States
    const chartDatas = useChartDatasStore((state) => state.chartDatas);
    const chartDataTodos = useChartDataTodosStore(
      (state) => state.chartDataTodos,
    );
    
  return (
    <div>
      <TableDataActions />
      <div className="flex gap-4">
        <LineChartComponent
          chartTitle={t("chartTitles.employeeBasedActivities")}
          data={chartDatas}
          isCustomTooltip
          customTooltipText={t("done")}
        />
        <LineChartComponent
          chartTitle={t("chartTitles.employeeBasedRemainingWork")}
          data={chartDataTodos}
          isCustomTooltip
          customTooltipText={t("toDo")}
        />
      </div>
    </div>
  );
}
