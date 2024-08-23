import CustomTooltip from "@/components/tooltip";
import { ReceivableTableType } from "@/types/receivable.type";
import { customStyleTable } from "@/utils/customStyleTable";
import { formatRupiah } from "@/utils/formatRupiah";
import {
  Button,
  Chip,
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
const receivables: ReceivableTableType[] = [
  {
    id: 1,
    due_date: "Jumat, 23 September 2024",
    name: "Muhammad Jupri Al-Malik Iskandar",
    bill_amount: 10862816,
    bill_status: "lunas",
  },
  {
    id: 2,
    due_date: "Kamis, 29 Agustus 2024",
    name: "Ilham Zulkarnain Hidayat",
    bill_amount: 1592281,
    bill_status: "belum bayar",
  },
];

export default function ReceivableTable() {
  const columnsReceivable = [
    { name: "#", uid: "index" },
    { name: "Nama Pembeli", uid: "name" },
    { name: "Jumlah Tagihan", uid: "bill_amount" },
    { name: "Tanggal Pembayaran", uid: "due_date" },
    { name: "Status Tagihan", uid: "bill_status" },
    { name: "Aksi", uid: "action" },
  ];

  function renderCellReceivable(
    item: ReceivableTableType,
    columnKey: React.Key,
  ) {
    const cellValue = item[columnKey as keyof ReceivableTableType];

    switch (columnKey) {
      case "index":
        return <div className="max-w-max text-default-900">{item.id}</div>;
      case "name":
        return <div className="w-max text-default-900">{item.name}</div>;
      case "bill_amount":
        return (
          <div className="w-max text-default-900">
            {formatRupiah(item.bill_amount)}
          </div>
        );
      case "due_date":
        return <div className="w-max text-default-900">{item.due_date}</div>;
      case "bill_status":
        return (
          <Chip
            variant="flat"
            color={item.bill_status == "lunas" ? "success" : "warning"}
            size="sm"
            classNames={{
              base: "px-2",
              content: "capitalize font-medium",
            }}
          >
            {item.bill_status}
          </Chip>
        );
      case "action":
        return (
          <CustomTooltip content="Detail">
            <Button isIconOnly variant="light" size="sm">
              <Eye weight="bold" size={20} className="text-default-600" />
            </Button>
          </CustomTooltip>
        );

      default:
        return cellValue;
    }
  }

  return (
    <>
      <Table
        aria-label="receivable table"
        color="primary"
        selectionMode="none"
        classNames={customStyleTable}
        className="scrollbar-hide"
      >
        <TableHeader columns={columnsReceivable}>
          {(column) => (
            <TableColumn key={column.uid}>{column.name}</TableColumn>
          )}
        </TableHeader>

        <TableBody items={receivables}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCellReceivable(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
