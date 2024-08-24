import CustomTooltip from "@/components/tooltip";
import { LossType } from "@/types/loss.type";
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
const losses: LossType[] = [
  {
    id: 1,
    date: "21 Agustus 2024",
    loss: 10928117,
  },
  {
    id: 2,
    date: "20 Agustus 2024",
    loss: 9820927,
  },
  {
    id: 3,
    date: "19 Agustus 2024",
    loss: 7281762,
  },
  {
    id: 4,
    date: "18 Agustus 2024",
    loss: 9209376,
  },
  {
    id: 5,
    date: "17 Agustus 2024",
    loss: 22837611,
  },
  {
    id: 6,
    date: "16 Agustus 2024",
    loss: 1827635,
  },
  {
    id: 7,
    date: "15 Agustus 2024",
    loss: 2982640,
  },
];

export default function LossTable() {
  const columnsLoss = [
    { name: "#", uid: "index" },
    { name: "Tanggal", uid: "date" },
    { name: "Tekor/Kerugian", uid: "loss" },
    { name: "Aksi", uid: "action" },
  ];

  function renderCellLoss(item: LossType, columnKey: React.Key) {
    const cellValue = item[columnKey as keyof LossType];

    switch (columnKey) {
      case "index":
        return (
          <div className="line-clamp-1 w-max max-w-[250px] text-default-900">
            {item.id}
          </div>
        );
      case "date":
        return <div className="w-max text-default-900">{item.date}</div>;
      case "loss":
        return (
          <div className="w-max font-medium text-default-900">
            {formatRupiah(item.loss)}
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
        aria-label="loss table"
        color="primary"
        selectionMode="none"
        classNames={customStyleTable}
        className="scrollbar-hide"
      >
        <TableHeader columns={columnsLoss}>
          {(column) => (
            <TableColumn key={column.uid}>{column.name}</TableColumn>
          )}
        </TableHeader>

        <TableBody items={losses}>
          {(item) => (
            <TableRow key={item.date}>
              {(columnKey) => (
                <TableCell>{renderCellLoss(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
