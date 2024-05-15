import { Button } from "@nextui-org/react";
import { Eye, Pencil, Trash } from "@phosphor-icons/react";
import { NextRouter } from "next/router";
import React from "react";

// components & utils
import CustomTooltip from "@/components/tooltip";
import { SuppliersType } from "@/types/suppliers.type";
import { formatRupiah } from "@/utils/formatRupiah";

type SuppliersPricelistsTable = {
  code: string;
  name: string;
  price: number;
  product: string;
  created_at: string;
};

export const columnsSuppliersPricelists = [
  { name: "Kode", uid: "code" },
  { name: "Nama", uid: "name" },
  { name: "Harga", uid: "price" },
  { name: "Product", uid: "product" },
  { name: "Dibuat Pada", uid: "created_at" },
  { name: "Aksi", uid: "action" },
];

export function renderCellSuppliersPricelists(
  supplier: SuppliersType,
  columnKey: React.Key,
  router: NextRouter,
) {
  const cellValue = supplier[columnKey as keyof SuppliersPricelistsTable];

  switch (columnKey) {
    case "code":
      return <div className="text-default-900">{supplier.code}</div>;
    case "name":
      return <div className="w-max text-default-900">{supplier.name}</div>;
    case "price":
      return (
        <div className="text-default-900">{formatRupiah(supplier.price)}</div>
      );
    case "product":
      return (
        <CustomTooltip content={supplier.product}>
          <div className="line-clamp-1 w-max max-w-[250px] text-default-900">
            {supplier.product}
          </div>
        </CustomTooltip>
      );
    case "created_at":
      return (
        <div className="w-max text-default-900">{supplier.created_at}</div>
      );
    case "action":
      return (
        <div className="flex max-w-[110px] items-center gap-1">
          <CustomTooltip content="Detail">
            <Button
              isIconOnly
              variant="light"
              size="sm"
              onClick={() => router.push("/owner/suppliers/pricelists")}
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
