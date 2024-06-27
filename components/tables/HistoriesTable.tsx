import usePagination from "@/hooks/usepagination";
import { TransaksiType } from "@/types/transactions.type";
import { customStyleTable } from "@/utils/customStyleTable";
import { formatDate } from "@/utils/formatDate";
import { formatRupiah } from "@/utils/formatRupiah";
import { getPath } from "@/utils/getPath";
import {
  Button,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { Eye } from "@phosphor-icons/react";
import { useRouter } from "next/router";
import StatusMetode from "../status/StatusMetode";
import StatusPayment from "../status/StatusPayment";
import CustomTooltip from "../tooltip";

type HistoriesTableProps = {
  transaksi: TransaksiType[] | undefined;
  path: string;
  role?: string;
};

type TransaksiTable = Pick<
  TransaksiType,
  "id_transaksi" | "created_at" | "total_pembayaran" | "pajak"
>;

export default function HistoriesTable({
  transaksi,
  path,
  role,
}: HistoriesTableProps) {
  const router = useRouter();

  const { page, pages, data, setPage } = usePagination(
    transaksi ? transaksi : [],
    10,
  );

  const columnsTransaksi = [];

  if (role == "admin") {
    columnsTransaksi.push(
      ...[
        { name: "ID Transaksi", uid: "id_transaksi" },
        { name: "Tanggal", uid: "tanggal" },
        { name: "Tipe", uid: "tipe" },
        { name: "Metode", uid: "metode" },
        { name: "Total", uid: "total_pembayaran" },
        { name: "Estimasi Barang", uid: "estimasi" },
        { name: "Status", uid: "status" },
        { name: "Aksi", uid: "action" },
      ],
    );
  } else {
    columnsTransaksi.push(
      ...[
        { name: "ID Transaksi", uid: "id_transaksi" },
        { name: "Tanggal", uid: "tanggal" },
        { name: "Tipe", uid: "tipe" },
        { name: "Metode", uid: "metode" },
        { name: "Total", uid: "total_pembayaran" },
        { name: "Status", uid: "status" },
        { name: "Aksi", uid: "action" },
      ],
    );
  }

  function renderCellTransaksi(
    transaction: TransaksiType,
    columnKey: React.Key,
  ) {
    const cellValue = transaction[columnKey as keyof TransaksiTable];

    switch (columnKey) {
      case "id_transaksi":
        return (
          <div className="text-default-900">{transaction.id_transaksi}</div>
        );
      case "tanggal":
        return (
          <div className="w-max text-default-900">
            {formatDate(transaction.created_at)}
          </div>
        );
      case "tipe":
        return (
          <div className="text-default-900">
            {transaction.pajak ? "Faktur" : "Nota"}
          </div>
        );
      case "metode":
        return (
          <div className="flex justify-center capitalize text-default-900">
            <StatusMetode text={transaction.metode} />
          </div>
        );
      case "total_pembayaran":
        return (
          <div className="text-default-900">
            {formatRupiah(transaction.total_pembayaran)}
          </div>
        );
      case "estimasi":
        return (
          <div className="capitalize text-default-900">
            {transaction.metode == "tempo" ? transaction.estimasi : "-"}
          </div>
        );
      case "status":
        return (
          <div className="flex justify-center capitalize text-default-900">
            <StatusPayment text={transaction.status} />
          </div>
        );
      case "action":
        return (
          <div className="flex max-w-[110px] items-center gap-1">
            <CustomTooltip content="Detail">
              <Button
                isIconOnly
                variant="light"
                size="sm"
                onClick={() =>
                  router.push(`${path}/${transaction.id_transaksi}`)
                }
              >
                <Eye weight="bold" size={20} className="text-default-600" />
              </Button>
            </CustomTooltip>
          </div>
        );

      default:
        return cellValue;
    }
  }

  function getColor() {
    const role = getPath(router);

    if (role == "owner") {
      return "bg-primary";
    }

    if (role == "admin") {
      return "bg-teal-500";
    }

    if (role == "cashier") {
      return "bg-rose-500";
    }
  }

  return (
    <>
      <Table
        isHeaderSticky
        aria-label="transactions table"
        color="primary"
        selectionMode="none"
        classNames={customStyleTable}
        className="scrollbar-hide"
      >
        <TableHeader columns={columnsTransaksi}>
          {(column) => (
            <TableColumn className="text-center" key={column.uid}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>

        <TableBody items={data}>
          {(transaction) => (
            <TableRow key={transaction.id_transaksi}>
              {(columnKey) => (
                <TableCell className="text-center">
                  {renderCellTransaksi(transaction, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Pagination
        isCompact
        showControls
        color="primary"
        page={page}
        total={pages}
        onChange={setPage}
        className="justify-self-center"
        classNames={{
          cursor: getColor(),
        }}
      />
    </>
  );
}
