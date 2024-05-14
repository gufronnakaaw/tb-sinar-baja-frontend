import { Button } from "@nextui-org/react";
import { Eye, Pencil, Trash } from "@phosphor-icons/react";
import { NextRouter } from "next/router";
import React from "react";

// components & utils
import CustomTooltip from "@/components/tooltip";
import { OrdersType } from "@/types/orders.type";
import { formatRupiah } from "@/utils/formatRupiah";

type OrdersTable = {
  id_order: string;
  created_at: string;
  total: number;
  kepada: string;
};

export const columnsOrders = [
  { name: "ID Order", uid: "orders_id" },
  { name: "Pembelian Ke", uid: "kepada" },
  { name: "Total", uid: "total" },
  { name: "Tanggal", uid: "created_at" },
  { name: "Aksi", uid: "action" },
];

export function renderCellOrders(
  order: OrdersType,
  columnKey: React.Key,
  router: NextRouter,
) {
  const cellValue = order[columnKey as keyof OrdersTable];

  switch (columnKey) {
    case "orders_id":
      return <div className="text-default-900">{order.id_order}</div>;
    case "kepada":
      return <div className="w-max text-default-900">{order.kepada}</div>;
    case "total":
      return (
        <div className="w-max text-default-900">
          {formatRupiah(order.total)}
        </div>
      );
    case "created_at":
      return <div className="w-max text-default-900">{order.created_at}</div>;
    case "action":
      return (
        <div className="flex max-w-[110px] items-center gap-1">
          <CustomTooltip content="Detail">
            <Button
              isIconOnly
              variant="light"
              size="sm"
              onClick={() => router.push("/owner/orders")}
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
