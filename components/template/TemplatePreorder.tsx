import { FinalDetail, ProdukFinal } from "@/types/preorders.type";
import { formatDateWithoutTime } from "@/utils/formatDate";
import { formatRupiah } from "@/utils/formatRupiah";
import { angkaTerbilang } from "@/utils/terbilang";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React, { forwardRef } from "react";

const Preorder = (props: FinalDetail, ref: any) => {
  const columns = [
    { name: "No", uid: "no" },
    { name: "Kode Pabrik", uid: "kode_pabrik" },
    { name: "Nama Produk", uid: "nama_produk" },
    { name: "Qty", uid: "qty" },
    { name: "Harga", uid: "harga" },
    { name: "Jumlah", uid: "jumlah" },
  ];

  const renderCell = (
    index: number,
    item: ProdukFinal,
    columnKey: React.Key,
  ) => {
    const cellValue = item[columnKey as keyof ProdukFinal];

    switch (columnKey) {
      case "no":
        return (
          <div className="text-[10px] font-medium text-black">{index}</div>
        );
      case "kode_pabrik":
        return (
          <div className="text-[10px] font-medium text-black">
            {!item.kode_pabrik ? "-" : item.kode_pabrik}
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
    <>
      <style media="print">
        {
          "\
      @page { size: 21cm 29.7cm; }\
    "
        }
      </style>
      <div className="container grid gap-2 px-8 pt-4 font-inter" ref={ref}>
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
              <h5 className="text-[10px] font-medium text-black">
                Yth. {props.nama_supplier}
              </h5>
              <h5 className="text-[10px] font-medium text-black">
                {props.alamat}
              </h5>
            </div>
          </div>

          <div className="grid justify-end">
            <div className="flex flex-col">
              <h1 className="font-bold uppercase text-black">PURCHASE ORDER</h1>
              <div className="grid h-3">
                <div className="grid">
                  <div className="grid w-[250px] grid-cols-[70px_6px_1fr] gap-1 text-[10px] text-black">
                    <div className="font-medium">Nomor</div>
                    <div className="font-medium">:</div>
                    <p className="font-medium">{props.id_preorder}</p>
                  </div>

                  <div className="grid w-[250px] grid-cols-[70px_6px_1fr] gap-1 text-[10px] text-black">
                    <div className="font-medium">Tanggal</div>
                    <div className="font-medium">:</div>
                    <p className="font-medium">
                      {formatDateWithoutTime(props.created_at)}
                    </p>
                  </div>

                  <div className="grid w-[250px] grid-cols-[70px_6px_1fr] gap-1 text-[10px] text-black">
                    <div className="font-medium">ID Supplier</div>
                    <div className="font-medium">:</div>
                    <p className="font-medium">
                      {!props.supplier_id ? "-" : props.supplier_id}
                    </p>
                  </div>
                  <div className="grid w-[250px] grid-cols-[70px_6px_1fr] gap-1 text-[10px] text-black">
                    <div className="font-medium">Email</div>
                    <div className="font-medium">:</div>
                    <p className="font-medium">{props.email_supplier}</p>
                  </div>
                  <div className="grid w-[250px] grid-cols-[70px_6px_1fr] gap-1 text-[10px] text-black">
                    <div className="font-medium">No. Telpon</div>
                    <div className="font-medium">:</div>
                    <p className="font-medium">{props.no_telp}</p>
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
                Berikut adalah data item yang kami pesan :
              </p>
            </div>
          </div>

          <Table
            removeWrapper
            isHeaderSticky
            aria-label="preorder table"
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

            <TableBody items={props.produk}>
              {props.produk.map((item, index) => {
                return (
                  <TableRow key={item.nama_produk}>
                    {(columnKey) => (
                      <TableCell>
                        {renderCell(index + 1, item, columnKey)}
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-between">
          <div className="grid grid-cols-[45px_2px_1fr] gap-1 text-[10px] text-black">
            <div className="w-24 font-bold italic">Terbilang</div>
            <div className="font-bold italic">:</div>
            <p className="font-bold capitalize italic">
              {angkaTerbilang(props.total)}
            </p>
          </div>
          <div className="grid w-[135px] border border-black p-2">
            <div className="grid grid-cols-[25px_6px_1fr] gap-1 text-[10px] text-black">
              <div className="w-24 font-medium">Total</div>
              <div className="font-medium">:</div>
              <p className="font-medium">{formatRupiah(props.total)}</p>
            </div>
          </div>
        </div>

        <div className="mr-5 mt-2 grid justify-self-end">
          <h1 className="text-[10px] font-normal text-black">
            Kediri, {formatDateWithoutTime(props.created_at)}
          </h1>
          <h1 className="mt-1 text-center text-[10px] font-bold text-black">
            TB. SINAR BAJA
          </h1>
        </div>
      </div>
    </>
  );
};

export const TemplatePreorder = forwardRef(Preorder);
