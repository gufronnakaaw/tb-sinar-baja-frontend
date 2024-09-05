import CustomTooltip from "@/components/tooltip";
import { ReceivableType } from "@/types/receivable.type";
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
import { useRouter } from "next/router";
import StatusPayment from "../status/StatusPayment";

export default function ReceivableTable({
  receivable,
  role,
}: {
  receivable: ReceivableType[];
  role: "owner" | "admin";
}) {
  const router = useRouter();

  const columnsReceivable = [
    { name: "Nama", uid: "penerima" },
    { name: "Jumlah", uid: "total_pembayaran" },
    { name: "Sisa", uid: "sisa" },
    { name: "Status", uid: "status" },
    { name: "Aksi", uid: "action" },
  ];

  function renderCellReceivable(item: ReceivableType, columnKey: React.Key) {
    const cellValue = item[columnKey as keyof ReceivableType];

    switch (columnKey) {
      case "penerima":
        return <div className="w-max text-default-900">{item.penerima}</div>;
      case "total_pembayaran":
        return (
          <div className="w-max text-default-900">
            {formatRupiah(item.total_pembayaran)}
          </div>
        );
      case "sisa":
        return (
          <div className="w-max text-default-900">
            {formatRupiah(item.sisa)}
          </div>
        );
      case "status":
        return <StatusPayment text={item.status} />;
      case "action":
        return (
          <CustomTooltip content="Detail">
            <Button
              isIconOnly
              variant="light"
              size="sm"
              onClick={() => {
                router.push(
                  `/${role}/selling/invout/histories?id_invoice=${item.id_invoice}`,
                );
              }}
              isDisabled={!item.id_invoice}
            >
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

        <TableBody items={receivable}>
          {(item) => (
            <TableRow key={item.id_transaksi}>
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
