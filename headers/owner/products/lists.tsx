import { NextRouter } from "next/router";

// components & utils
import CustomTooltip from "@/components/tooltip";
import { formatDate } from "@/utils/formatDate";
import { formatRupiah } from "@/utils/formatRupiah";
import { PRICENAME } from "@/utils/price";
import { Button } from "@nextui-org/react";
import { Eye, Pencil } from "@phosphor-icons/react";

type ProdukTable = {
  kode_item: string;
  nama_produk: string;
  kategori: string;
  harga_4: number;
  subkategori?: string;
  status_stok: string;
  stok?: number;
  created_at: string;
};

export const columnsProduk = [
  { name: "Kode Item", uid: "kode_item" },
  { name: "Nama Produk", uid: "nama_produk" },
  { name: "Kategori", uid: "kategori" },
  { name: "Harga Retail", uid: "harga_retail" },
  { name: "Dibuat Pada", uid: "created_at" },
  { name: "Aksi", uid: "action" },
];

export function renderCellProduk(
  produk: ProdukTable,
  columnKey: React.Key,
  router: NextRouter,
) {
  const cellValue = produk[columnKey as keyof ProdukTable];

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
    case "kategori":
      return (
        <div className="w-max text-default-900">
          {produk.kategori} - {produk.subkategori}
        </div>
      );
    case "harga_retail":
      return (
        <div className="text-default-900">
          {formatRupiah(produk[PRICENAME.harga_retail])}
        </div>
      );
    case "created_at":
      return (
        <div className="w-max text-default-900">
          {formatDate(produk.created_at)}
        </div>
      );
    case "action":
      return (
        <div className="flex max-w-[110px] items-center gap-1">
          <CustomTooltip content="Detail">
            <Button
              onClick={() =>
                router.push(
                  `/owner/products/lists/detail?kode_item=${encodeURIComponent(produk.kode_item)}`,
                )
              }
              isIconOnly
              variant="light"
              size="sm"
            >
              <Eye weight="bold" size={20} className="text-default-600" />
            </Button>
          </CustomTooltip>

          <CustomTooltip content="Edit">
            <Button
              onClick={() =>
                router.push(
                  `/owner/products/lists/edit?kode_item=${encodeURIComponent(produk.kode_item)}`,
                )
              }
              isIconOnly
              variant="light"
              size="sm"
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
