import { Button } from "@nextui-org/react";
import { Eye, Pencil, Trash } from "@phosphor-icons/react";
import { NextRouter } from "next/router";
import React from "react";

// components & utils
import CustomTooltip from "@/components/tooltip";
import { WarehouseInType } from "@/types/warehouses.type";

type WarehousesInTable = {
  product: string;
  total: number;
  from: string;
  created_at: string;
};

export const columnsWarehousesIn = [
  { name: "Produk", uid: "product" },
  { name: "Total", uid: "total" },
  { name: "Dari", uid: "from" },
  { name: "Dikirim Pada", uid: "created_at" },
  { name: "Aksi", uid: "action" },
];

export function renderCellWarehousesIn(
  warehouseIn: WarehouseInType,
  columnKey: React.Key,
  router: NextRouter,
) {
  const cellValue = warehouseIn[columnKey as keyof WarehousesInTable];

  switch (columnKey) {
    case "product":
      return (
        <CustomTooltip content={warehouseIn.product}>
          <div className="line-clamp-1 w-max max-w-[250px] text-default-900">
            {warehouseIn.product}
          </div>
        </CustomTooltip>
      );
    case "total":
      return <div className="text-default-900">{warehouseIn.total}</div>;
    case "from":
      return <div className="w-max text-default-900">{warehouseIn.from}</div>;
    case "created_at":
      return (
        <div className="w-max text-default-900">{warehouseIn.created_at}</div>
      );
    case "action":
      return (
        <div className="flex max-w-[110px] items-center gap-1">
          <CustomTooltip content="Detail">
            <Button
              isIconOnly
              variant="light"
              size="sm"
              onClick={() => router.push("/owner/warehouses/in")}
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
