import { useTranslation } from "react-i18next";
import { Card, LineChart } from "@tremor/react";

import { useEmployeesStore } from "../../states/employees";

export default function LineChartComponent({
  chartTitle,
  data,
  isCustomTooltip = false,
  customTooltipText,
}) {
  const { t } = useTranslation();
  const employees = useEmployeesStore((state) => state.employees);

  const customTooltip = ({ payload, active, label }) => {
    if (!active || !payload) return null;

    return (
      <div className="min-w-40 max-w-64 rounded-tremor-default border border-tremor-border bg-tremor-background p-2 text-tremor-default shadow-tremor-dropdown">
        <div className="mb-3 w-full rounded border border-tremor-border bg-tremor-background-subtle p-1 text-center font-medium">
          {label}
        </div>
        {payload
          .filter((item) => item.className !== "cursor-pointer")
          .map((category, idx) => (
            <div
              key={idx}
              className="mt-1.5 flex flex-1 items-center justify-between space-x-2.5"
            >
              <div className="flex items-center justify-center gap-2 space-y-1">
                <div
                  className={`flex size-3 items-center justify-center bg-${category.color}-500 rounded`}
                />
                <p className="font-normal text-tremor-content-emphasis">
                  {category.dataKey}
                </p>
              </div>
              <p className="font-semibold text-tremor-content-strong">
                {category.value} {customTooltipText}
              </p>
            </div>
          ))}
      </div>
    );
  };

  return (
    <Card className="mt-3">
      <h1 className="text-tremor-metric font-semibold text-tremor-content-strong">
        {chartTitle}
      </h1>
      <LineChart
        className="h-80 mt-6"
        data={data}
        index="date"
        categories={employees
          .filter((item) => item.name.trim() !== "")
          .map((item) => item.name)}
        yAxisWidth={60}
        customTooltip={isCustomTooltip ? customTooltip : null}
        noDataText={t("noDataText")}
      />
    </Card>
  );
}
