import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React, { forwardRef } from "react";

import {
  DocumentResponse,
  TransaksiDetail,
} from "@/pages/owner/warehouses/documents/[id]";
import { formatDate } from "@/utils/formatDate";

const SuratJalan = (props: DocumentResponse, ref: any) => {
  const columns = [
    { name: "Jumlah", uid: "jumlah" },
    { name: "Nama Barang", uid: "nama_produk" },
    { name: "Lokasi", uid: "lokasi" },
  ];

  const warehouses = Array.from(
    new Set(props.transaksi.transaksidetail.map((item) => item.gudang)),
  );

  const renderCell = (item: TransaksiDetail, columnKey: React.Key) => {
    const cellValue = item[columnKey as keyof TransaksiDetail];

    switch (columnKey) {
      case "jumlah":
        return (
          <div className="text-[10px] font-semibold text-black">
            {item.jumlah} btl
          </div>
        );
      case "nama_produk":
        return (
          <div className="w-max text-[10px] font-semibold text-black">
            {item.nama_produk}
          </div>
        );
      case "lokasi":
        return (
          <div className="w-max text-[10px] font-semibold text-black">
            {item.gudang}, {item.rak}
          </div>
        );

      default:
        return cellValue;
    }
  };

  return (
    <div className="container grid gap-2 px-20 pt-8 font-inter" ref={ref}>
      <div className="grid grid-cols-3 gap-4">
        <div className="grid gap-1">
          <h1 className="font-bold text-default-900">TB. SINAR BAJA</h1>
          <p className="max-w-[400px] text-[10px] font-medium text-default-600">
            Jl. Letjend Sutoyo No.67, Burengan, Kec. Pesantren, Kabupaten
            Kediri, Jawa Timur 64131
          </p>
          <p className="max-w-[300px] text-[10px] font-medium text-default-600">
            082140735711
          </p>
          <div className="mt-2">
            <h5 className="text-[10px] font-semibold text-black">
              Kepada Yth,
            </h5>
            <h5 className="text-[10px] font-semibold text-black">
              {props.transaksi.penerima}
            </h5>
            <h5 className="text-[10px] font-semibold text-black">
              {props.transaksi.alamat}
            </h5>
          </div>
        </div>

        <div>
          <h4 className="text-center text-xl font-bold uppercase text-black">
            Surat Jalan
          </h4>
        </div>

        <div className="grid grid-cols-3">
          <div className="grid h-3">
            <div className="grid">
              <div className="grid w-[250px] grid-cols-[100px_6px_1fr] gap-1 text-[10px] text-black">
                <div className="font-semibold">ID Transaksi</div>
                <div className="font-semibold">:</div>
                <p className="font-semibold">{props.transaksi.id_transaksi}</p>
              </div>

              <div className="grid w-[250px] grid-cols-[100px_6px_1fr] gap-1 text-[10px] text-black">
                <div className="font-semibold">No. Surat Jalan</div>
                <div className="font-semibold">:</div>
                <p className="font-semibold">{props.id_suratjalan}</p>
              </div>

              <div className="grid w-[250px] grid-cols-[100px_6px_1fr] gap-1 text-[10px] text-black">
                <div className="font-semibold">Tanggal</div>
                <div className="font-semibold">:</div>
                <p className="font-semibold">
                  {formatDate(props.transaksi.created_at)}
                </p>
              </div>

              <div className="grid w-[250px] grid-cols-[100px_6px_1fr] gap-1 text-[10px] text-black">
                <div className="font-semibold">No. Telpon</div>
                <div className="font-semibold">:</div>
                <p className="font-semibold">
                  {!props.transaksi.no_telp ? "-" : props.transaksi.no_telp}
                </p>
              </div>
              <div className="grid w-[250px] grid-cols-[100px_6px_1fr] gap-1 text-[10px] text-black">
                <div className="font-semibold">Nama Driver</div>
                <div className="font-semibold">:</div>
                <p className="font-semibold">
                  {!props.nama_driver ? "-" : props.nama_driver}
                </p>
              </div>

              <div className="grid w-[250px] grid-cols-[100px_6px_1fr] gap-1 text-[10px] text-black">
                <div className="font-semibold">Keterangan</div>
                <div className="font-semibold">:</div>
                <p className="font-semibold">{props.transaksi.keterangan}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-2">
        <div className="grid grid-cols-[1fr_100px] gap-4">
          <div className="grid gap-1 text-[10px]">
            <p className="font-semibold text-default-600">
              Kami kirimkan barang-barang dibawah ini dengan kendaraan{" "}
              {props.kendaraan}, bernomor {props.plat_kendaraan}
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
              "px-5 h-[14px] text-[10px] first:rounded-none last:rounded-none font-semibold bg-transparent text-black",
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

          <TableBody items={props.transaksi.transaksidetail}>
            {(item) => (
              <TableRow key={item.nama_produk}>
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
          <h4 className="text-[10px] font-semibold text-black">
            Disiapkan oleh,
          </h4>
          <div className="text-sm font-semibold text-black">
            (..................................)
          </div>
        </div>

        {warehouses.map((warehouse) => {
          return (
            <>
              <div className="grid gap-10 text-center">
                <h4 className="text-[10px] font-semibold text-black">
                  {warehouse},
                </h4>
                <div className="text-sm font-semibold text-black">
                  (..................................)
                </div>
              </div>
            </>
          );
        })}

        <div className="grid gap-10 text-center">
          <h4 className="text-[10px] font-semibold text-black">
            Diterima oleh,
          </h4>
          <div className="text-sm font-semibold text-black">
            (..................................)
          </div>
        </div>
      </div>
    </div>
  );
};

export const TemplateSuratJalan = forwardRef(SuratJalan);
