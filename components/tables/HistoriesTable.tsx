import usePagination from "@/hooks/usepagination";
import { TransaksiType } from "@/types/transactions.type";
import { customStyleTable } from "@/utils/customStyleTable";
import { fetcher } from "@/utils/fetcher";
import { formatDate } from "@/utils/formatDate";
import { formatRupiah } from "@/utils/formatRupiah";
import { getPath } from "@/utils/getPath";
import {
  Button,
  Chip,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { ClockClockwise, Eye, Power, Trash } from "@phosphor-icons/react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { KeyedMutator } from "swr";
import StatusMetode from "../status/StatusMetode";
import StatusPayment from "../status/StatusPayment";
import CustomTooltip from "../tooltip";

type HistoriesTableProps = {
  transaksi: TransaksiType[] | undefined;
  path: string;
  role?: string;
  roles: string[];
  mutate: KeyedMutator<any>;
};

type TransaksiTable = Pick<
  TransaksiType,
  "id_transaksi" | "created_at" | "total_pembayaran" | "pajak"
>;

export default function HistoriesTable({
  transaksi,
  path,
  role,
  roles,
  mutate,
}: HistoriesTableProps) {
  const router = useRouter();
  const { page, pages, data, setPage } = usePagination(
    transaksi ? transaksi : [],
    10,
  );

  async function handleDelete(id: string) {
    try {
      await toast.promise(
        fetcher({
          url: `/transaksi/${id}`,
          method: "DELETE",
        }),
        {
          loading: "Menghapus transaksi...",
          success: () => {
            mutate();
            return "Transaksi berhasil dihapus";
          },
          error: (err) => {
            console.error(err);
            return "Gagal menghapus transaksi";
          },
        },
      );
    } catch (error) {
      console.log(error);
      toast.error("Terjadi kesalahan saat menghapus transaksi");
    }
  }

  async function handleCancel(id: string, state: "success" | "cancelled") {
    try {
      await toast.promise(
        fetcher({
          url: `/transaksi/state`,
          method: "PATCH",
          data: {
            transaksi_id: id,
            state,
          },
        }),
        {
          loading: "Membatalkan transaksi...",
          success: () => {
            mutate();
            return "Transaksi berhasil dibatalkan";
          },
          error: (err) => {
            console.error(err);
            return "Gagal membatalkan transaksi";
          },
        },
      );
    } catch (error) {
      console.log(error);
      toast.error("Terjadi kesalahan saat membatalkan transaksi");
    }
  }

  const columnsTransaksi = [];

  if (role == "admin") {
    columnsTransaksi.push(
      ...[
        { name: "ID Transaksi", uid: "id_transaksi" },
        { name: "Customer", uid: "penerima" },
        { name: "Tanggal", uid: "tanggal" },
        { name: "Tipe", uid: "tipe" },
        { name: "Metode", uid: "metode" },
        { name: "Total", uid: "total_pembayaran" },
        { name: "Estimasi Barang", uid: "estimasi" },
        { name: "Status", uid: "status" },
        { name: "Kondisi", uid: "state" },
        { name: "Aksi", uid: "action" },
      ],
    );
  } else {
    columnsTransaksi.push(
      ...[
        { name: "ID Transaksi", uid: "id_transaksi" },
        { name: "Customer", uid: "penerima" },
        { name: "Tanggal", uid: "tanggal" },
        { name: "Tipe", uid: "tipe" },
        { name: "Metode", uid: "metode" },
        { name: "Total", uid: "total_pembayaran" },
        { name: "Status", uid: "status" },
        { name: "Kondisi", uid: "state" },
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
      case "penerima":
        return (
          <div className="text-default-900">
            {transaction.penerima ? transaction.penerima : "-"}
          </div>
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
      case "state":
        return (
          <div className="flex justify-center capitalize text-default-900">
            <Chip
              variant="flat"
              color={transaction.state === "success" ? "success" : "danger"}
              size="sm"
              classNames={{
                base: "px-3",
                content: "font-medium capitalize",
              }}
            >
              {transaction.state === "success" ? "Sukses" : "Dibatalkan"}
            </Chip>
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

            {roles.length && roles.includes("owner") ? (
              <CustomTooltip content="Hapus">
                <Button
                  isIconOnly
                  variant="light"
                  size="sm"
                  onClick={() => {
                    if (
                      confirm(
                        "Apakah Anda yakin ingin menghapus transaksi ini?",
                      )
                    ) {
                      handleDelete(transaction.id_transaksi);
                    }
                  }}
                >
                  <Trash weight="bold" size={20} className="text-default-600" />
                </Button>
              </CustomTooltip>
            ) : null}

            <CustomTooltip
              content={
                transaction.state === "success" ? "Batalkan" : "Kembalikan"
              }
            >
              <Button
                isIconOnly
                variant="light"
                size="sm"
                onClick={() => {
                  if (
                    confirm(
                      `Apakah Anda yakin ingin ${transaction.state === "success" ? "membatalkan" : "mengembalikan"} transaksi ini?`,
                    )
                  ) {
                    handleCancel(
                      transaction.id_transaksi,
                      transaction.state === "success" ? "cancelled" : "success",
                    );
                  }
                }}
              >
                {transaction.state === "success" ? (
                  <Power weight="bold" size={20} className="text-default-600" />
                ) : (
                  <ClockClockwise
                    weight="bold"
                    size={20}
                    className="text-default-600"
                  />
                )}
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
