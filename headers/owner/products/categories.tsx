import { Button } from "@nextui-org/react";
import { Eye, Pencil } from "@phosphor-icons/react";
import { NextRouter } from "next/router";
import React from "react";

// components & utils
import CustomTooltip from "@/components/tooltip";
import { formatDate } from "@/utils/formatDate";

type KategoriTable = {
  id_kategori: string;
  nama: string;
  created_at: string;
};

export const columnsKategori = [
  { name: "Kode", uid: "kode" },
  { name: "Nama", uid: "nama" },
  { name: "Dibuat Pada", uid: "created_at" },
  { name: "Aksi", uid: "action" },
];

export function renderCellKategori(
  kategori: KategoriTable,
  columnKey: React.Key,
  router: NextRouter,
) {
  const cellValue = kategori[columnKey as keyof KategoriTable];

  switch (columnKey) {
    case "kode":
      return <div className="text-default-900">{kategori.id_kategori}</div>;
    case "nama":
      return <div className="w-max text-default-900">{kategori.nama}</div>;
    case "created_at":
      return (
        <div className="w-max text-default-900">
          {formatDate(kategori.created_at)}
        </div>
      );
    case "action":
      return (
        <div className="flex max-w-[110px] items-center gap-1">
          <CustomTooltip content="Detail">
            <Button
              isIconOnly
              variant="light"
              size="sm"
              onClick={() =>
                router.push(
                  `/owner/products/categories/detail/${kategori.id_kategori}`,
                )
              }
            >
              <Eye weight="bold" size={20} className="text-default-600" />
            </Button>
          </CustomTooltip>

          <CustomTooltip content="Edit">
            <Button isIconOnly variant="light" size="sm" onClick={() =>
                router.push(
                  `/owner/products/categories/edit?id_kategori=${kategori.id_kategori}&nama=${kategori.nama}`,
                )
              }>
              <Pencil weight="bold" size={20} className="text-default-600" />
            </Button>
          </CustomTooltip>
        </div>
      );

    default:
      return cellValue;
  }
}
