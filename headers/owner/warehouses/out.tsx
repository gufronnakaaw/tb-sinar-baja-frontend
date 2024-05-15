import { Button } from "@nextui-org/react";
import { Eye, Pencil, Trash } from "@phosphor-icons/react";
import { NextRouter } from "next/router";
import React from "react";

// components & utils
import CustomTooltip from "@/components/tooltip";
import { WarehouseOutType } from "@/types/warehouses.type";

type WarehousesOutTable = {
  product: string;
  total: number;
  reason: string;
};

export const columnsWarehousesOut = [
  { name: "Produk", uid: "product" },
  { name: "Total", uid: "total" },
  { name: "Alasan", uid: "reason" },
  { name: "Aksi", uid: "action" },
];

export function renderCellWarehousesOut(
  warehouseOut: WarehouseOutType,
  columnKey: React.Key,
  router: NextRouter,
) {
  const cellValue = warehouseOut[columnKey as keyof WarehousesOutTable];

  switch (columnKey) {
    case "product":
      return (
        <CustomTooltip content={warehouseOut.product}>
          <div className="line-clamp-1 w-max max-w-[250px] text-default-900">
            {warehouseOut.product}
          </div>
        </CustomTooltip>
      );
    case "total":
      return <div className="text-default-900">{warehouseOut.total}</div>;
    case "reason":
      return <div className="text-default-900">{warehouseOut.reason}</div>;
    case "action":
      return (
        <div className="flex max-w-[110px] items-center gap-1">
          <CustomTooltip content="Detail">
            <Button
              isIconOnly
              variant="light"
              size="sm"
              onClick={() => router.push("/owner/warehouses/out")}
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
