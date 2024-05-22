import CustomTooltip from "@/components/tooltip";
import { Button, Chip } from "@nextui-org/react";
import { CheckCircle, Pencil, Trash, XCircle } from "@phosphor-icons/react";

import { formatDate } from "@/utils/formatDate";
import { NextRouter } from "next/router";

type GudangTable = {
  kode_gudang: string;
  nama: string;
  can_delete: boolean;
  created_at: string;
  updated_at: string;
};

export const columnsGudang = [
  { name: "Kode Gudang", uid: "kode_gudang" },
  { name: "Nama", uid: "nama" },
  { name: "Dibuat Pada", uid: "created_at" },
  { name: "Bisa Dihapus", uid: "status" },
  { name: "Aksi", uid: "action" },
];

export function renderCellGudang(
  gudang: GudangTable,
  columnKey: React.Key,
  handleDelete: (kode_gudang: string) => void,
  router: NextRouter,
) {
  const cellValue = gudang[columnKey as keyof GudangTable];

  switch (columnKey) {
    case "code":
      return <div className="text-default-900">{gudang.kode_gudang}</div>;
    case "name":
      return <div className="w-max text-default-900">{gudang.nama}</div>;
    case "created_at":
      return (
        <div className="w-max text-default-900">
          {formatDate(gudang.created_at)}
        </div>
      );
    case "status":
      return (
        <Chip
          variant="flat"
          color={gudang.can_delete ? "success" : "danger"}
          size="sm"
          startContent={
            gudang.can_delete ? (
              <CheckCircle className="text-success" weight="fill" size={18} />
            ) : (
              <XCircle className="text-danger" weight="fill" size={18} />
            )
          }
          classNames={{
            content: "font-medium capitalize",
          }}
        >
          {gudang.can_delete ? "Bisa" : "Tidak"}
        </Chip>
      );
    case "action":
      return (
        <div className="flex max-w-[110px] items-center gap-1">
          <CustomTooltip content="Edit">
            <Button
              isIconOnly
              variant="light"
              size="sm"
              onClick={() =>
                router.push(
                  `/owner/warehouses/lists/edit?kode_gudang=${gudang.kode_gudang}&nama=${gudang.nama}`,
                )
              }
            >
              <Pencil weight="bold" size={20} className="text-default-600" />
            </Button>
          </CustomTooltip>

          {gudang.can_delete ? (
            <CustomTooltip content="Hapus">
              <Button
                isIconOnly
                color="danger"
                variant="light"
                size="sm"
                onClick={() => handleDelete(gudang.kode_gudang)}
              >
                <Trash weight="bold" size={20} />
              </Button>
            </CustomTooltip>
          ) : null}
        </div>
      );

    default:
      return cellValue;
  }
}
