import { Button } from "@nextui-org/react";
import { Pencil, Trash } from "@phosphor-icons/react";
import { NextRouter } from "next/router";
import React from "react";

// components & utils
import CustomTooltip from "@/components/tooltip";
import { formatDate } from "@/utils/formatDate";

type SubKategoriTable = {
  id_subkategori: number;
  nama: string;
  created_at: string;
};

export const columnsSubKategori = [
  { name: "Kode", uid: "kode" },
  { name: "Nama", uid: "nama" },
  { name: "Dibuat Pada", uid: "created_at" },
  { name: "Aksi", uid: "action" },
];

export function renderCellSubKategori(
  subkategori: SubKategoriTable,
  columnKey: React.Key,
  router: NextRouter,
) {
  const cellValue = subkategori[columnKey as keyof SubKategoriTable];

  switch (columnKey) {
    case "kode":
      return (
        <div className="text-default-900">{subkategori.id_subkategori}</div>
      );
    case "nama":
      return <div className="w-max text-default-900">{subkategori.nama}</div>;
    case "created_at":
      return (
        <div className="w-max text-default-900">
          {formatDate(subkategori.created_at)}
        </div>
      );
    case "action":
      return (
        <div className="flex max-w-[110px] items-center gap-1">
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
