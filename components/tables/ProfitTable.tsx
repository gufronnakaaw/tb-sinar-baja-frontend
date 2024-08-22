import CustomTooltip from "@/components/tooltip";
import { ProfitType } from "@/types/profit.type";
import { customStyleTable } from "@/utils/customStyleTable";
import { formatRupiah } from "@/utils/formatRupiah";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { Eye } from "@phosphor-icons/react";
import React from "react";

// dummy data
const profits: ProfitType[] = [
  {
    id: 1,
    date: "21 Agustus 2024",
    profit: 22762510,
  },
  {
    id: 2,
    date: "20 Agustus 2024",
    profit: 117092976,
  },
  {
    id: 3,
    date: "19 Agustus 2024",
    profit: 45900231,
  },
  {
    id: 4,
    date: "18 Agustus 2024",
    profit: 39382112,
  },
  {
    id: 5,
    date: "17 Agustus 2024",
    profit: 207625100,
  },
  {
    id: 6,
    date: "16 Agustus 2024",
    profit: 77029010,
  },
  {
    id: 7,
    date: "15 Agustus 2024",
    profit: 287029192,
  },
];

export default function ProfitTable() {
  const columnsProfit = [
    { name: "#", uid: "index" },
    { name: "Tanggal", uid: "date" },
    { name: "Laba/Keungtungan", uid: "profit" },
    { name: "Aksi", uid: "action" },
  ];

  function renderCellProfit(item: ProfitType, columnKey: React.Key) {
    const cellValue = item[columnKey as keyof ProfitType];

    switch (columnKey) {
      case "index":
        return (
          <div className="line-clamp-1 w-max max-w-[250px] text-default-900">
            {item.id}
          </div>
        );
      case "date":
        return <div className="w-max text-default-900">{item.date}</div>;
      case "profit":
        return (
          <div className="w-max font-medium text-default-900">
            {formatRupiah(item.profit)}
          </div>
        );
      case "action":
        return (
          <div className="flex max-w-[110px] items-center gap-1">
            <CustomTooltip content="Detail">
              <Button isIconOnly variant="light" size="sm">
                <Eye weight="bold" size={20} className="text-default-600" />
              </Button>
            </CustomTooltip>
          </div>
        );

      default:
        return cellValue;
    }
  }

  return (
    <>
      <Table
        aria-label="profit table"
        color="primary"
        selectionMode="none"
        classNames={customStyleTable}
        className="scrollbar-hide"
      >
        <TableHeader columns={columnsProfit}>
          {(column) => (
            <TableColumn key={column.uid}>{column.name}</TableColumn>
          )}
        </TableHeader>

        <TableBody items={profits}>
          {(item) => (
            <TableRow key={item.date}>
              {(columnKey) => (
                <TableCell>{renderCellProfit(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
