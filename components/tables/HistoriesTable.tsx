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
import StatusDocument from "../status/StatusDocument";
import CustomTooltip from "../tooltip";

type HistoriesTableProps = {
  transaksi: TransaksiType[] | undefined;
  path: string;
};

type TransaksiTable = {
  id_transaksi: string;
  created_at: string;
  total_pembayaran: number;
  pajak: number;
};

export default function HistoriesTable({
  transaksi,
  path,
}: HistoriesTableProps) {
  const router = useRouter();

  const { page, pages, data, setPage } = usePagination(
    transaksi ? transaksi : [],
    10,
  );

  const columnsTransaksi = [
    { name: "ID Transaksi", uid: "id_transaksi" },
    { name: "Tanggal", uid: "tanggal" },
    { name: "Total", uid: "total_pembayaran" },
    { name: "Tipe", uid: "tipe" },
    { name: "Aksi", uid: "action" },
  ];

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
      case "total_pembayaran":
        return (
          <div className="text-default-900">
            {formatRupiah(transaction.total_pembayaran)}
          </div>
        );
      case "tipe":
        return (
          <div className="text-default-900">
            {transaction.pajak ? (
              <StatusDocument text="Faktur" />
            ) : (
              <StatusDocument text="Nota" />
            )}
          </div>
        );
      case "action":
        return (
          <CustomTooltip content="Detail">
            <Button
              isIconOnly
              variant="light"
              size="sm"
              onClick={() => router.push(`${path}/${transaction.id_transaksi}`)}
            >
              <Eye weight="bold" size={20} className="text-default-600" />
            </Button>
          </CustomTooltip>
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
      return "bg-lime-500";
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
        selectionMode="single"
        classNames={customStyleTable}
        className="scrollbar-hide"
      >
        <TableHeader columns={columnsTransaksi}>
          {(column) => (
            <TableColumn key={column.uid}>{column.name}</TableColumn>
          )}
        </TableHeader>

        <TableBody items={data}>
          {(transaction) => (
            <TableRow key={transaction.id_transaksi}>
              {(columnKey) => (
                <TableCell>
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
