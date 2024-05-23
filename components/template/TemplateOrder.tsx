import { formatRupiah } from "@/utils/formatRupiah";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React, { forwardRef } from "react";

type TemplateOrderType = {
  no: number;
  kode_pabrik: string;
  nama_produk: string;
  qty: number;
  satuan: string;
  harga: number;
  jumlah: number;
};

const dummy: TemplateOrderType[] = [
  {
    no: 1,
    kode_pabrik: "TEST",
    nama_produk: "Test Produk",
    qty: 1,
    satuan: "dus",
    harga: 150000000,
    jumlah: 150000000,
  },
];

const Order = (props: any, ref: any) => {
  const columns = [
    { name: "No", uid: "no" },
    { name: "Kode Pabrik", uid: "kode_pabrik" },
    { name: "Nama Produk", uid: "nama_produk" },
    { name: "Qty", uid: "qty" },
    { name: "Harga", uid: "harga" },
    { name: "Jumlah", uid: "jumlah" },
  ];

  const renderCell = (item: TemplateOrderType, columnKey: React.Key) => {
    const cellValue = item[columnKey as keyof TemplateOrderType];

    switch (columnKey) {
      case "no":
        return (
          <div className="text-[10px] font-medium text-black">{item.no}</div>
        );
      case "kode_pabrik":
        return (
          <div className="text-[10px] font-medium text-black">
            {item.kode_pabrik}
          </div>
        );
      case "nama_produk":
        return (
          <div className="w-max text-[10px] font-medium text-black">
            {item.nama_produk}
          </div>
        );
      case "qty":
        return (
          <div className="w-max text-[10px] font-medium text-black">
            {item.qty} {item.satuan}
          </div>
        );
      case "harga":
        return (
          <div className="w-max text-[10px] font-medium text-black">
            {formatRupiah(item.harga)}
          </div>
        );
      case "jumlah":
        return (
          <div className="w-max text-[10px] font-medium text-black">
            {formatRupiah(item.jumlah)}
          </div>
        );

      default:
        return cellValue;
    }
  };

  return (
    <div className="container grid gap-2 px-20 pt-8 font-inter" ref={ref}>
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
          <div className="mt-2">
            <h5 className="text-[10px] font-medium text-black">Kepada</h5>
            <h5 className="text-[10px] font-medium text-black">Yth. Sup 1</h5>
            <h5 className="text-[10px] font-medium text-black">
              Texas, United State of America
            </h5>
          </div>
        </div>

        <div className="grid justify-end">
          <div className="flex flex-col">
            <h1 className="font-bold uppercase text-black">Purchase Order</h1>
            <div className="grid h-3">
              <div className="grid">
                <div className="grid w-[250px] grid-cols-[70px_6px_1fr] gap-1 text-[10px] text-black">
                  <div className="font-medium">Nomor</div>
                  <div className="font-medium">:</div>
                  <p className="font-medium">POOUT0909090</p>
                </div>

                <div className="grid w-[250px] grid-cols-[70px_6px_1fr] gap-1 text-[10px] text-black">
                  <div className="font-medium">Tanggal</div>
                  <div className="font-medium">:</div>
                  <p className="font-medium">23 Mei 2024</p>
                </div>

                <div className="grid w-[250px] grid-cols-[70px_6px_1fr] gap-1 text-[10px] text-black">
                  <div className="font-medium">ID Supplier</div>
                  <div className="font-medium">:</div>
                  <p className="font-medium">SUP-1</p>
                </div>
                <div className="grid w-[250px] grid-cols-[70px_6px_1fr] gap-1 text-[10px] text-black">
                  <div className="font-medium">Email</div>
                  <div className="font-medium">:</div>
                  <p className="font-medium">sup1@mail.com</p>
                </div>
                <div className="grid w-[250px] grid-cols-[70px_6px_1fr] gap-1 text-[10px] text-black">
                  <div className="font-medium">No. Telpon</div>
                  <div className="font-medium">:</div>
                  <p className="font-medium">081234345656</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-2">
        <div className="grid grid-cols-[1fr_100px] gap-4">
          <div className="grid gap-1 text-[10px]">
            <p className="font-medium text-black">
              Berikut adalah data item yang kami pesan
            </p>
          </div>
        </div>

        <Table
          removeWrapper
          isHeaderSticky
          aria-label="order table"
          classNames={{
            base: ["max-h-[calc(100vh-100px)] overflow-scroll"],
            table: ["border border-black"],
            thead: [
              "[&>tr]:first:rounded-none [&>tr]:first:shadow-none border-b border-black",
            ],
            th: [
              "px-5 h-[14px] text-[10px] first:rounded-none last:rounded-none font-medium bg-transparent text-black",
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

          <TableBody items={dummy}>
            {(item) => (
              <TableRow key={item.kode_pabrik}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export const TemplateOrder = forwardRef(Order);
