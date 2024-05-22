import { Button } from "@nextui-org/react";
import { Pencil, Trash } from "@phosphor-icons/react";
import { NextRouter } from "next/router";
import React from "react";

// components & utils
import CustomTooltip from "@/components/tooltip";
import { formatDate } from "@/utils/formatDate";

type SupplierTable = {
  id_supplier: string;
  nama: string;
  email: string;
  no_telp: string;
  alamat_kantor: string;
  alamat_gudang: string;
  keterangan: string;
  bank: string;
  atas_nama: string;
  no_rekening: string;
  created_at: string;
};

export const columnsSuppliersLists = [
  { name: "ID Supplier", uid: "id_supplier" },
  { name: "Nama", uid: "nama" },
  { name: "Email", uid: "email" },
  { name: "No Telpon", uid: "no_telp" },
  { name: "Alamat Gudang", uid: "alamat_gudang" },
  { name: "Alamat Kantor", uid: "alamat_kantor" },
  { name: "Keterangan", uid: "keterangan" },
  { name: "Bank", uid: "bank" },
  { name: "Atas Nama", uid: "atas_nama" },
  { name: "No Rekening", uid: "no_rekening" },
  { name: "Dibuat Pada", uid: "created_at" },
  { name: "Aksi", uid: "action" },
];

export function renderCellSuppliersLists(
  supplier: SupplierTable,
  columnKey: React.Key,
  router: NextRouter,
  deleteSupplier: (id_supplier: string) => Promise<void>,
) {
  const cellValue = supplier[columnKey as keyof SupplierTable];

  switch (columnKey) {
    case "id_supplier":
      return <div className="text-default-900">{supplier.id_supplier}</div>;
    case "nama":
      return <div className="w-max text-default-900">{supplier.nama}</div>;
    case "email":
      return <div className="w-max text-default-900">{supplier.email}</div>;
    case "no_telp":
      return <div className="w-max text-default-900">{supplier.no_telp}</div>;
    case "alamat_gudang":
      return (
        <div className="w-max text-default-900">{supplier.alamat_gudang}</div>
      );
    case "alamat_kantor":
      return (
        <div className="w-max text-default-900">{supplier.alamat_kantor}</div>
      );
    case "keterangan":
      return (
        <div className="w-max text-default-900">{supplier.keterangan}</div>
      );
    case "bank":
      return <div className="w-max text-default-900">{supplier.bank}</div>;
    case "atas_nama":
      return <div className="w-max text-default-900">{supplier.atas_nama}</div>;
    case "no_rekening":
      return (
        <div className="w-max text-default-900">{supplier.no_rekening}</div>
      );
    case "created_at":
      return (
        <div className="w-max text-default-900">
          {formatDate(supplier.created_at)}
        </div>
      );
    case "action":
      return (
        <div className="flex max-w-[110px] items-center gap-1">
          <CustomTooltip content="Edit">
            <Button
              isIconOnly
              variant="light"
              size="sm"
              onClick={() => {
                router.push(
                  `/owner/suppliers/lists/edit?id_supplier=${supplier.id_supplier}`,
                );
              }}
            >
              <Pencil weight="bold" size={20} className="text-default-600" />
            </Button>
          </CustomTooltip>

          <CustomTooltip content="Hapus">
            <Button
              isIconOnly
              variant="light"
              color="danger"
              size="sm"
              onClick={() => {
                deleteSupplier(supplier.id_supplier);
              }}
            >
              <Trash weight="bold" size={20} />
            </Button>
          </CustomTooltip>
        </div>
      );

    default:
      return cellValue;
  }
}
