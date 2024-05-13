import { Button } from "@nextui-org/react";
import { Eye, Pencil, Trash } from "@phosphor-icons/react";
import { NextRouter } from "next/router";
import React from "react";

// components & utils
import StatusPayment from "@/components/status/StatusPayment";
import CustomTooltip from "@/components/tooltip";
import { PaymentsType } from "@/types/payments.type";
import { formatRupiah } from "@/utils/formatRupiah";

type PaymentsTable = {
  id: string;
  date: string;
  from: string;
  status: "lunas" | "piutang";
  total: number;
};

export const columnsPayments = [
  { name: "ID Pembayaran", uid: "payments_id" },
  { name: "Dari", uid: "from" },
  { name: "Status", uid: "status" },
  { name: "Total", uid: "total" },
  { name: "Tanggal", uid: "payments_date" },
  { name: "Aksi", uid: "action" },
];

export function renderCellPayments(
  payments: PaymentsType,
  columnKey: React.Key,
  router: NextRouter,
) {
  const cellValue = payments[columnKey as keyof PaymentsTable];

  switch (columnKey) {
    case "payments_id":
      return <div className="text-default-900">{payments.id}</div>;
    case "from":
      return <div className="w-max text-default-900">{payments.from}</div>;
    case "status":
      return <StatusPayment text={payments.status} />;
    case "total":
      return (
        <div className="text-default-900">{formatRupiah(payments.total)}</div>
      );
    case "payments_date":
      return <div className="w-max text-default-900">{payments.date}</div>;
    case "action":
      return (
        <div className="flex max-w-[110px] items-center gap-1">
          <CustomTooltip content="Detail">
            <Button
              isIconOnly
              variant="light"
              size="sm"
              onClick={() => router.push("/owner/payments")}
            >
              <Eye weight="bold" size={20} className="text-default-600" />
            </Button>
          </CustomTooltip>

          <CustomTooltip content="Edit">
            <Button isIconOnly variant="light" size="sm">
              <Pencil weight="bold" size={20} className="text-default-600" />
            </Button>
          </CustomTooltip>

          <CustomTooltip content="Hapus">
            <Button isIconOnly variant="light" color="danger" size="sm">
              <Trash weight="bold" size={20} />
            </Button>
          </CustomTooltip>
        </div>
      );

    default:
      return cellValue;
  }
}
