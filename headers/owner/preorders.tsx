import { Button } from "@nextui-org/react";
import { Eye, Pencil, Trash } from "@phosphor-icons/react";
import { NextRouter } from "next/router";
import React from "react";

// components & utils
import CustomTooltip from "@/components/tooltip";
import { PreOrdersType } from "@/types/preorders.type";
import { formatRupiah } from "@/utils/formatRupiah";

type PreOrdersTable = {
  id_preorder: string;
  customer_name: string;
  created_at: string;
  total: number;
};

export const columnsPreOrders = [
  { name: "ID Pre Order", uid: "id_preorder" },
  { name: "Nama Pelanggan", uid: "customer_name" },
  { name: "Total", uid: "total" },
  { name: "Tanggal", uid: "created_at" },
  { name: "Aksi", uid: "action" },
];

export function renderCellPreOrders(
  preorder: PreOrdersType,
  columnKey: React.Key,
  router: NextRouter,
) {
  const cellValue = preorder[columnKey as keyof PreOrdersTable];

  switch (columnKey) {
    case "id_preorder":
      return <div className="text-default-900">{preorder.id_preorder}</div>;
    case "customer_name":
      return (
        <div className="w-max text-default-900">{preorder.customer_name}</div>
      );
    case "total":
      return (
        <div className="w-max text-default-900">
          {formatRupiah(preorder.total)}
        </div>
      );
    case "created_at":
      return (
        <div className="w-max text-default-900">{preorder.created_at}</div>
      );
    case "action":
      return (
        <div className="flex max-w-[110px] items-center gap-1">
          <CustomTooltip content="Detail">
            <Button
              isIconOnly
              variant="light"
              size="sm"
              onClick={() => router.push("/owner/preorders")}
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
