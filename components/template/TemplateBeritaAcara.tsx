import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { forwardRef } from "react";

import { BrokenDetailType } from "@/types/broken.type";
import { formatDate } from "@/utils/formatDate";

const BeritaAcara = (props: BrokenDetailType, ref: any) => {
  const columns = [
    { name: "Jumlah", uid: "jumlah" },
    { name: "Kode Item", uid: "kode_item" },
    { name: "Nama Barang", uid: "nama_produk" },
    { name: "Keterangan", uid: "alasan" },
    { name: "Lokasi", uid: "lokasi" },
  ];

  const renderCell = (
    item: BrokenDetailType["list_produk"][0],
    columnKey: React.Key,
  ) => {
    const cellValue =
      item[columnKey as keyof BrokenDetailType["list_produk"][0]];

    switch (columnKey) {
      case "jumlah":
        return (
          <div className="text-[10px] font-medium text-black">
            {item.jumlah} {item.satuan}
          </div>
        );
      case "kode_item":
        return (
          <div className="w-max text-[10px] font-medium text-black">
            {item.kode_item}
          </div>
        );
      case "nama_produk":
        return (
          <div className="w-max text-[10px] font-medium text-black">
            {item.nama_produk}
          </div>
        );
      case "alasan":
        return (
          <div className="w-max text-[10px] font-medium capitalize text-black">
            {item.alasan}
          </div>
        );
      case "lokasi":
        return (
          <div className="w-max text-[10px] font-medium text-black">
            {item.gudang}, {item.rak}
          </div>
        );

      default:
        return cellValue;
    }
  };

  return (
    <>
      <div className="container grid gap-2 pt-4 font-inter" ref={ref}>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-1">
            <h1 className="font-bold text-black">TB. SINAR BAJA</h1>
            <p className="max-w-[300px] text-[10px] font-medium text-black">
              Jl. Letjend Sutoyo No.67, Burengan, Kec. Pesantren, Kabupaten
              Kediri, Jawa Timur 64131
            </p>
            <p className="max-w-[300px] text-[10px] font-medium text-black">
              082140735711
            </p>
          </div>
          <div className="grid justify-end">
            <div className="flex flex-col">
              <h1 className="font-bold uppercase text-black">Berita Acara</h1>
              <div className="grid h-3">
                <div className="grid">
                  <div className="grid w-[250px] grid-cols-[80px_6px_1fr] gap-1 text-[10px] text-black">
                    <div className="font-medium">ID Berita Acara</div>
                    <div className="font-medium">:</div>
                    <p className="font-medium">{props.id_ba}</p>
                  </div>

                  <div className="grid w-[250px] grid-cols-[80px_6px_1fr] gap-1 text-[10px] text-black">
                    <div className="font-medium">Tanggal</div>
                    <div className="font-medium">:</div>
                    <p className="font-medium">
                      {formatDate(props.created_at)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid gap-1">
          <div className="grid grid-cols-[1fr_100px] gap-4">
            <div className="grid gap-1 text-[10px]">
              <p className="font-medium text-black">
                Berikut adalah data item yang mengalami masalah :
              </p>
            </div>
          </div>

          <Table
            isHeaderSticky
            aria-label="broken table"
            classNames={{
              base: ["max-h-[calc(100vh-100px)] overflow-scroll"],
              table: ["border border-black"],
              thead: [
                "[&>tr]:first:rounded-none [&>tr]:first:shadow-none border-b border-black",
              ],
              th: [
                "px-5 h-[14px] text-[10px] first:rounded-none last:rounded-none bg-transparent text-black font-medium",
              ],
              td: ["px-5 py-0 h-[14px]"],
            }}
            className="scrollbar-hide"
            removeWrapper
          >
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.uid}>{column.name}</TableColumn>
              )}
            </TableHeader>

            <TableBody items={props.list_produk}>
              {(item) => (
                <TableRow key={item.kode_item}>
                  {(columnKey) => (
                    <TableCell>{renderCell(item, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="grid gap-10 text-center">
            <h4 className="text-[10px] font-medium text-black">
              Disetujui oleh,
            </h4>
            <div className="text-sm font-medium text-black">
              (..................................)
            </div>
          </div>

          <div className="grid gap-10 text-center">
            <h4 className="text-[10px] font-medium text-black">Oleh,</h4>
            <div className="text-sm font-medium text-black">
              (..................................)
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const TemplateBeritaAcara = forwardRef(BeritaAcara);
