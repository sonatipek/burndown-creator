import { Button, DatePicker, DatePickerValue } from "@tremor/react";
import React, { useState } from "react";

type Props = {
    chartDataAdd: any;
};
export default function DatePickerComp({ chartDataAdd }: Props) {
  const [date, setDate] = useState<DatePickerValue>(new Date());
  return (
    <div>
      <h1>Tabloya göre tüm grafikleri güncelle</h1>
      <DatePicker
        className="mx-auto max-w-sm"
        value={date}
        onValueChange={setDate}
      />
      <Button onClick={() => chartDataAdd(date)}>Güncelle</Button>
    </div>
  );
}
