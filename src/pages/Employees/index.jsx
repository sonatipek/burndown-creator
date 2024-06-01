import EmployeeTable from "../../components/EmployeeTable";
import { Card, DonutChart, Legend } from "@tremor/react";
const datahero = [
  {
    name: "Backend Developer",
    value: 3,
  },
  {
    name: "Frontend Developer",
    value: 2,
  },
];

export default function Employees() {
  return (
    <>
      <EmployeeTable />

      <Card className="mt-3">
        <h1 className="text-tremor-metric font-semibold text-tremor-content-strong">
          Departman Dağılımı
        </h1>
        <Legend
          categories={["Frontend Developer", "Backend Developer"]}
          colors={["blue", "cyan"]}
          className="max-w-xs me-0"
        />
        <DonutChart data={datahero} variant="pie" className="mt-6 h-80" />
      </Card>
    </>
  );
}
