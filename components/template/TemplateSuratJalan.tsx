import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React, { forwardRef } from "react";

// utils

type SuratJalanProps = {
  id: number;
  nama_produk: string;
  jumlah: number;
  lokasi: string;
};

const items: SuratJalanProps[] = [
  {
    id: 1,
    nama_produk: "Sealent Asam Hitam(Black) 300gr",
    jumlah: 3,
    lokasi: "Gudang 1",
  },
  {
    id: 2,
    nama_produk: "Sealent Asam abu-abu(Light Grey) 300gr",
    jumlah: 6,
    lokasi: "Gudang 2",
  },
];

const SuratJalan = (props: any, ref: any) => {
  const columns = [
    { name: "Jumlah", uid: "jumlah" },
    { name: "Nama Barang", uid: "nama_produk" },
    { name: "Lokasi", uid: "lokasi" },
  ];

  const renderCell = (item: SuratJalanProps, columnKey: React.Key) => {
    const cellValue = item[columnKey as keyof SuratJalanProps];

    switch (columnKey) {
      case "jumlah":
        return (
          <div className="text-[10px] font-medium text-default-900">
            {item.jumlah} btl
          </div>
        );
      case "nama_produk":
        return (
          <div className="w-max text-[10px] font-medium text-default-900">
            {item.nama_produk}
          </div>
        );
      case "lokasi":
        return (
          <div className="w-max text-[10px] font-medium text-default-900">
            {item.lokasi}
          </div>
        );

      default:
        return cellValue;
    }
  };

  return (
    <div className="grid gap-8 px-20 pt-8" ref={ref}>
      <div className="grid grid-cols-2 items-start gap-12">
        <div className="grid gap-1">
          <h1 className="text-lg font-bold text-default-900">TB. Sinar Baja</h1>
          <p className="max-w-[300px] text-[10px] font-medium text-default-600">
            Jl. Letjend Sutoyo No.67, Burengan, Kec. Pesantren, Kabupaten
            Kediri, Jawa Timur 64131
          </p>
          <p className="max-w-[300px] text-[10px] font-medium text-default-600">
            (+62) 21 3456 7890
          </p>
        </div>

        <div className="grid gap-4">
          <div className="grid">
            <div className="grid grid-cols-[100px_6px_1fr] gap-1 text-[10px] text-default-900">
              <div className="font-medium">Id Transaksi</div>
              <div className="font-medium">:</div>
              <p className="font-medium">TX130524084725</p>
            </div>

            <div className="grid grid-cols-[100px_6px_1fr] gap-1 text-[10px] text-default-900">
              <div className="font-medium">Tanggal</div>
              <div className="font-medium">:</div>
              <p className="font-medium">9 Mei 2024</p>
            </div>

            <div className="grid grid-cols-[100px_6px_1fr] gap-1 text-[10px] text-default-900">
              <div className="font-medium">No. Surat Jalan</div>
              <div className="font-medium">:</div>
              <p className="font-medium">8172647018375</p>
            </div>
          </div>

          <div>
            <h5 className="text-[12px] font-semibold text-default-900">
              Kepada Yth,
            </h5>
            <div className="h-4 w-full border-b border-dashed border-default-900 text-[10px] font-medium text-default-900" />
            <div className="h-4 w-full border-b border-dashed border-default-900 text-[10px] font-medium text-default-900" />
            <div className="h-4 w-full border-b border-dashed border-default-900 text-[10px] font-medium text-default-900" />
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        <div className="grid grid-cols-[1fr_100px] gap-4">
          <div className="grid gap-1 text-[10px]">
            <p className="font-medium text-default-600">
              Kami kirimkan barang-barang dibawah ini dengan
              kendaraan......................................................................,
            </p>
            <p className="font-medium text-default-600">
              bernomor......................................................................
            </p>
          </div>
        </div>

        <Table
          removeWrapper
          isHeaderSticky
          aria-label="surat jalan table"
          classNames={{
            base: ["max-h-[calc(100vh-100px)] overflow-scroll"],
            table: ["border border-black"],
            thead: [
              "[&>tr]:first:rounded-none [&>tr]:first:shadow-none border-b border-black",
            ],
            th: [
              "px-5 h-[14px] first:rounded-none last:rounded-none bg-transparent text-default-600",
            ],
            td: ["px-5 py-0 h-[14px]"],
          }}
          className="scrollbar-hide"
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.uid}>{column.name}</TableColumn>
            )}
          </TableHeader>

          <TableBody items={items}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="grid gap-12 text-center">
          <h4 className="text-[12px] font-semibold text-default-900">
            Disiapkan oleh,
          </h4>
          <div className="text-sm font-medium text-default-900">
            (............................................................)
          </div>
        </div>
        <div className="grid gap-12 text-center">
          <h4 className="text-[12px] font-semibold text-default-900">
            Gudang A
          </h4>
          <div className="text-sm font-medium text-default-900">
            (............................................................)
          </div>
        </div>
        <div className="grid gap-12 text-center">
          <h4 className="text-[12px] font-semibold text-default-900">
            Gudang B
          </h4>
          <div className="text-sm font-medium text-default-900">
            (............................................................)
          </div>
        </div>

        <div className="grid gap-12 text-center">
          <h4 className="text-[12px] font-semibold text-default-900">
            Hormat Kami,
          </h4>
          <div className="text-sm font-medium text-default-900">
            (............................................................)
          </div>
        </div>
      </div>
    </div>
  );
};

export const TemplateSuratJalan = forwardRef(SuratJalan);
