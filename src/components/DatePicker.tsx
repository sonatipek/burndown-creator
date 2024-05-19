import { Button, DatePicker, DatePickerValue } from "@tremor/react";
import React, { useState } from "react";

type Props = {
  chartDataAdd: any;
  chartDataDelete: any;
  chartDataUpdate: any;
};
export default function DatePickerComp({
  chartDataAdd,
  chartDataDelete,
  chartDataUpdate
}: Props) {
  const [date, setDate] = useState<DatePickerValue>(new Date());
  return (
    <div>
      <h1 className="text-tremor-title font-semibold text-tremor-content-strong">Tabloya göre seçili tarihteki verileri ekle</h1>
      <p className="text-tremor-default text-tremor-content">Yaptığınız değişiklikler tüm tabloları etkileyecektir.</p>
      <DatePicker
        className="mx-auto max-w-sm"
        value={date}
        onValueChange={setDate}
      />
      <div className="flex gap-4 items-center justify-between">
        <div className="space-x-5">
          <Button onClick={() => chartDataAdd(date)}>Verileri Ekle</Button>
          <Button onClick={() => chartDataUpdate(date)} variant="light">
            Seçili Tarih Verilerini Güncelle
          </Button>
        </div>
        <Button
          onClick={() => chartDataDelete(date)}
          color="red"
          variant="secondary"
        >
          Seçili Tarih Verilerini Sil
        </Button>
      </div>
    </div>
  );
}
