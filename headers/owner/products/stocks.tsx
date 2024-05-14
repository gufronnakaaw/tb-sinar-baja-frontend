import { Button } from "@nextui-org/react";
import { Eye, Pencil, Trash } from "@phosphor-icons/react";
import { NextRouter } from "next/router";
import React from "react";

// components & utils
import CustomTooltip from "@/components/tooltip";
import { ProductsStocksType } from "@/types/productsStocks.type";

type ProductsStocksTable = {
  id: string;
  nama: string;
  stok: number;
  kategori: string;
};

export const columnsProductsStocks = [
  { name: "ID Produk", uid: "products_id" },
  { name: "Nama", uid: "nama" },
  { name: "Kategori", uid: "kategori" },
  { name: "Stok", uid: "stok" },
  { name: "Aksi", uid: "action" },
];

export function renderCellProductsStocks(
  product: ProductsStocksType,
  columnKey: React.Key,
  router: NextRouter,
) {
  const cellValue = product[columnKey as keyof ProductsStocksTable];

  switch (columnKey) {
    case "products_id":
      return <div className="text-default-900">{product.id}</div>;
    case "nama":
      return (
        <div className="line-clamp-1 w-max max-w-[250px] text-default-900">
          {product.nama}
        </div>
      );
    case "kategori":
      return <div className="w-max text-default-900">{product.kategori}</div>;
    case "stok":
      return <div className="text-default-900">{product.stok}</div>;
    case "action":
      return (
        <div className="flex max-w-[110px] items-center gap-1">
          <CustomTooltip content="Detail">
            <Button
              isIconOnly
              variant="light"
              size="sm"
              onClick={() => router.push("/owner/products/stocks")}
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
