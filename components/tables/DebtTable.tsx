import CustomTooltip from "@/components/tooltip";
import { DebtTableType } from "@/types/debt.type";
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

// dummy data
const debts: DebtTableType[] = [
  {
    id: 1,
    due_date: "Senin, 23 September 2024",
    supplier_name: "PT Kabel Kepanjangan",
    bill_amount: 9283098,
  },
  {
    id: 2,
    due_date: "Jumat, 27 September 2024",
    supplier_name: "PT Starlink Indo Jaya",
    bill_amount: 82091176,
  },
];

export default function DebtTable() {
  const columnsDebt = [
    { name: "#", uid: "index" },
    { name: "Nama Supplier", uid: "supplier_name" },
    { name: "Jumlah Tagihan", uid: "bill_amount" },
    { name: "Tanggal Pembayaran", uid: "due_date" },
    { name: "Aksi", uid: "action" },
  ];

  function renderCellDebt(item: DebtTableType, columnKey: React.Key) {
    const cellValue = item[columnKey as keyof DebtTableType];

    switch (columnKey) {
      case "index":
        return <div className="max-w-max text-default-900">{item.id}</div>;
      case "supplier_name":
        return (
          <div className="w-max text-default-900">{item.supplier_name}</div>
        );
      case "bill_amount":
        return (
          <div className="w-max text-default-900">
            {formatRupiah(item.bill_amount)}
          </div>
        );
      case "due_date":
        return <div className="w-max text-default-900">{item.due_date}</div>;
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
        aria-label="debt table"
        color="primary"
        selectionMode="none"
        classNames={customStyleTable}
        className="scrollbar-hide"
      >
        <TableHeader columns={columnsDebt}>
          {(column) => (
            <TableColumn key={column.uid}>{column.name}</TableColumn>
          )}
        </TableHeader>

        <TableBody items={debts}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCellDebt(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
