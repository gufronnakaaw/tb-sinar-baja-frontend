import { Button } from "@nextui-org/react";
import { Eye, Pencil, Printer, Trash } from "@phosphor-icons/react";
import { NextRouter } from "next/router";
import React from "react";

// components & utils
import CustomTooltip from "@/components/tooltip";
import { InvoicesInType, InvoicesOutType } from "@/types/invoice.type";
import { formatRupiah } from "@/utils/formatRupiah";

type InvoicesInTable = {
  id: string;
  from: string;
  reference: string;
  total: number;
  due_date: string;
  description: string;
};

type InvoicesOutTable = {
  id: string;
  date: string;
  total: number;
  to: string;
};

export const columnsInvoicesIn = [
  { name: "ID Invoice Masuk", uid: "invin_id" },
  { name: "Dari", uid: "from" },
  { name: "Nomor", uid: "reference" },
  { name: "Total", uid: "total" },
  { name: "Jatuh Tempo", uid: "due_date" },
  { name: "Deskripsi", uid: "description" },
  { name: "Aksi", uid: "action" },
];

export const columnsInvoicesOut = [
  { name: "ID Invoice Keluar", uid: "invout_id" },
  { name: "Ke", uid: "to" },
  { name: "Total", uid: "total" },
  { name: "Tanggal", uid: "invout_date" },
  { name: "Aksi", uid: "action" },
];

export function renderCellInvoicesIn(
  invin: InvoicesInType,
  columnKey: React.Key,
  router: NextRouter,
) {
  const cellValue = invin[columnKey as keyof InvoicesInTable];

  switch (columnKey) {
    case "invin_id":
      return <div className="text-default-900">{invin.id}</div>;
    case "from":
      return <div className="w-max text-default-900">{invin.from}</div>;
    case "reference":
      return <div className="text-default-900">{invin.reference}</div>;
    case "total":
      return (
        <div className="text-default-900">{formatRupiah(invin.total)}</div>
      );
    case "due_date":
      return <div className="w-max text-default-900">{invin.due_date}</div>;
    case "description":
      return (
        <CustomTooltip content={invin.description}>
          <div className="line-clamp-1 max-w-[250px] text-default-900">
            {invin.description}
          </div>
        </CustomTooltip>
      );
    case "action":
      return (
        <div className="flex items-center gap-1">
          <CustomTooltip content="Cetak">
            <Button isIconOnly variant="light" size="sm">
              <Printer weight="bold" size={20} className="text-default-600" />
            </Button>
          </CustomTooltip>

          <CustomTooltip content="Detail">
            <Button
              isIconOnly
              variant="light"
              size="sm"
              onClick={() => router.push("/owner/invoices/in")}
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

export function renderCellInvoicesOut(
  invout: InvoicesOutType,
  columnKey: React.Key,
  router: NextRouter,
) {
  const cellValue = invout[columnKey as keyof InvoicesOutTable];

  switch (columnKey) {
    case "invout_id":
      return <div className="text-default-900">{invout.id}</div>;
    case "to":
      return <div className="w-max text-default-900">{invout.to}</div>;
    case "total":
      return (
        <div className="w-max text-default-900">
          {formatRupiah(invout.total)}
        </div>
      );
    case "invout_date":
      return <div className="w-max text-default-900">{invout.date}</div>;
    case "action":
      return (
        <div className="flex items-center gap-1">
          <CustomTooltip content="Cetak">
            <Button isIconOnly variant="light" size="sm">
              <Printer weight="bold" size={20} className="text-default-600" />
            </Button>
          </CustomTooltip>

          <CustomTooltip content="Detail">
            <Button
              isIconOnly
              variant="light"
              size="sm"
              onClick={() => router.push("/owner/invoices/out")}
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
