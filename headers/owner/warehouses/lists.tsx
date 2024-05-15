import CustomTooltip from "@/components/tooltip";
import { Button } from "@nextui-org/react";
import { Pencil, Trash } from "@phosphor-icons/react";

import { WarehousesType } from "@/types/warehouses.type";
import { formatDate } from "@/utils/formatDate";

export const columnsGudang = [
  { name: "Kode Gudang", uid: "kode_gudang" },
  { name: "Nama", uid: "nama" },
  { name: "Dibuat Pada", uid: "created_at" },
  { name: "Aksi", uid: "action" },
];

export function renderCellGudang(gudang: WarehousesType, columnKey: React.Key) {
  const cellValue = gudang[columnKey as keyof WarehousesType];

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
