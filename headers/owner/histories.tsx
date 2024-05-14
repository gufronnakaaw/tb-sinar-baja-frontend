import { Button } from "@nextui-org/react";
import { Eye } from "@phosphor-icons/react";
import { NextRouter } from "next/router";

// components & utils
import StatusDocument from "@/components/status/StatusDocument";
import CustomTooltip from "@/components/tooltip";
import { TransaksiType } from "@/types/transactions.type";
import { formatDate } from "@/utils/formatDate";
import { formatRupiah } from "@/utils/formatRupiah";

type TransaksiTable = {
  id_transaksi: string;
  created_at: string;
  total_pembayaran: number;
  pajak: number;
};

export const columnsTransaksi = [
  { name: "ID Transaksi", uid: "id_transaksi" },
  { name: "Tanggal", uid: "tanggal" },
  { name: "Total", uid: "total_pembayaran" },
  { name: "Tipe", uid: "tipe" },
  { name: "Aksi", uid: "action" },
];

export function renderCellTransaksi(
  transaction: TransaksiType,
  columnKey: React.Key,
  router: NextRouter,
) {
  const cellValue = transaction[columnKey as keyof TransaksiTable];

  switch (columnKey) {
    case "id_transaksi":
      return <div className="text-default-900">{transaction.id_transaksi}</div>;
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
            onClick={() =>
              router.push(`/owner/histories/${transaction.id_transaksi}`)
            }
          >
            <Eye weight="bold" size={20} className="text-default-600" />
          </Button>
        </CustomTooltip>
      );

    default:
      return cellValue;
  }
}
