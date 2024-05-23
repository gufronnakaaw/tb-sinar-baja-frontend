import { Button } from "@nextui-org/react";
import { Pencil } from "@phosphor-icons/react";
import { NextRouter } from "next/router";
import React from "react";

// components & utils
import StatusStock from "@/components/status/StatusStock";
import CustomTooltip from "@/components/tooltip";

type ProductsStocksTable = {
  kode_item: string;
  nama_produk: string;
  kategori: string;
  subkategori?: string;
  status_stok: string;
  stok_aman: number;
  stok?: number;
  created_at: string;
};

export const columnsProductsStocks = [
  { name: "Kode Item", uid: "kode_item" },
  { name: "Nama Produk", uid: "nama_produk" },
  { name: "Stok", uid: "stok" },
  { name: "Stok Aman", uid: "stok_aman" },
  { name: "Status", uid: "status" },
  { name: "Aksi", uid: "action" },
];

export function renderCellProductsStocks(
  produk: ProductsStocksTable,
  columnKey: React.Key,
  router: NextRouter,
) {
  const cellValue = produk[columnKey as keyof ProductsStocksTable];

  switch (columnKey) {
    case "kode_item":
      return (
        <div className="line-clamp-1 w-max max-w-[250px] text-default-900">
          {produk.kode_item}
        </div>
      );
    case "nama_produk":
      return (
        <CustomTooltip content={produk.nama_produk}>
          <div className="line-clamp-1 w-max max-w-[250px] text-default-900">
            {produk.nama_produk}
          </div>
        </CustomTooltip>
      );
    case "stok":
      return <div className="text-default-900">{produk.stok}</div>;
    case "stok_aman":
      return <div className="text-default-900">{produk.stok_aman}</div>;
    case "status":
      return (
        <div className="text-default-900">
          <StatusStock text={produk.status_stok} size="sm" className="gap-1" />
        </div>
      );
    case "action":
      return (
        <div className="flex max-w-[110px] items-center gap-1">
          <CustomTooltip content="Edit Stok">
            <Button
              isIconOnly
              variant="light"
              size="sm"
              onClick={() =>
                router.push(
                  `/owner/products/stocks/edit?kode_item=${produk.kode_item}&stok=${produk.stok}&stok_aman=${produk.stok_aman}`,
                )
              }
            >
              <Pencil weight="bold" size={20} className="text-default-600" />
            </Button>
          </CustomTooltip>
        </div>
      );

    default:
      return cellValue;
  }
}
