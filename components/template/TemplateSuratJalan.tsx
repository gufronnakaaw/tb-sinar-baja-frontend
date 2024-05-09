import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React from "react";

// utils
import { customStyleTable } from "@/utils/customStyleTable";

type SuratJalanProps = {
  id: number;
  product_name: string;
  amount: number | string;
  description: string;
};

const items: SuratJalanProps[] = [
  {
    id: 1,
    product_name: "Spigot Alumunium 16x14x1.7",
    amount: 3,
    description: "Lorem ipsum dolor sit, amet consectetur adipisicing.",
  },
  {
    id: 2,
    product_name: "Plat Alumunium (1100) 100x200x1.58-1.62",
    amount: 6,
    description: "Lorem ipsum dolor sit, amet consectetur adipisicing.",
  },
];

export default function TemplateSuratJalan() {
  const columns = [
    { name: "Nama Barang", uid: "product_name" },
    { name: "Jumlah", uid: "amount" },
    { name: "Keterangan", uid: "description" },
  ];

  const renderCell = (item: SuratJalanProps, columnKey: React.Key) => {
    const cellValue = item[columnKey as keyof SuratJalanProps];

    switch (columnKey) {
      case "product_name":
        return (
          <div className="w-max text-[10px] font-medium text-default-900">
            {item.product_name}
          </div>
        );
      case "amount":
        return (
          <div className="text-[10px] font-medium text-default-900">
            {item.amount}
          </div>
        );
      case "description":
        return (
          <div className="text-[10px] font-medium text-default-900">
            {item.description}
          </div>
        );

      default:
        return cellValue;
    }
  };

  return (
    <div className="grid gap-8 pt-8">
      <div className="grid grid-cols-2 items-start gap-12">
        <div className="grid gap-1">
          <h1 className="text-lg font-bold text-default-900">TB. Sinar Baja</h1>
          <p className="max-w-[300px] text-[10px] font-medium text-default-600">
            Jl. Letjend Sutoyo No.67, Burengan, Kec. Pesantren, Kabupaten
            Kediri, Jawa Timur 64131
          </p>
          <p className="max-w-[300px] text-[10px] font-medium text-default-600">
            (+62) 21 3456 7890
          </p>
        </div>

        <div className="grid gap-4">
          <div className="grid gap-1">
            <div className="grid grid-cols-[100px_6px_1fr] gap-1 text-[10px] text-default-900">
              <div className="font-medium">Tanggal</div>
              <div className="font-medium">:</div>
              <p className="font-medium">9 Mei 2024</p>
            </div>

            <div className="grid grid-cols-[100px_6px_1fr] gap-1 text-[10px] text-default-900">
              <div className="font-medium">No. Surat Jalan</div>
              <div className="font-medium">:</div>
              <p className="font-medium">8172647018375</p>
            </div>
          </div>

          <div>
            <h5 className="text-[12px] font-semibold text-default-900">
              Kepada Yth,
            </h5>
            <div className="h-5 w-full border-b border-dashed border-default-900 text-[10px] font-medium text-default-900" />
            <div className="h-5 w-full border-b border-dashed border-default-900 text-[10px] font-medium text-default-900" />
            <div className="h-5 w-full border-b border-dashed border-default-900 text-[10px] font-medium text-default-900" />
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        <div className="grid grid-cols-[1fr_100px] gap-4">
          <div className="grid gap-2 text-[10px]">
            <p className="font-medium text-default-600">
              Kami kirimkan barang-barang dibawah ini dengan
              kendaraan......................................................................,
            </p>
            <p className="font-medium text-default-600">
              bernomor......................................................................
            </p>
          </div>
        </div>

        <Table
          isHeaderSticky
          aria-label="surat jalan table"
          classNames={customStyleTable}
          className="scrollbar-hide"
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.uid}>{column.name}</TableColumn>
            )}
          </TableHeader>

          <TableBody items={items}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="grid gap-12 text-center">
          <h4 className="text-[12px] font-semibold text-default-900">
            Yang Menerina,
          </h4>
          <div className="text-sm font-medium text-default-900">
            (............................................................)
          </div>
        </div>

        <div className="grid gap-12 text-center">
          <h4 className="text-[12px] font-semibold text-default-900">
            Hormat Kami,
          </h4>
          <div className="text-sm font-medium text-default-900">
            (............................................................)
          </div>
        </div>
      </div>
    </div>
  );
}
