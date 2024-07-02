import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { forwardRef } from "react";

// utils
import { formatRupiah } from "@/utils/formatRupiah";

import { ReturnDetail, ReturnDetailPage } from "@/types/return.type";
import { formatDateWithoutTime } from "@/utils/formatDate";
import { angkaTerbilang } from "@/utils/terbilang";

const NotaReturnDetail = (props: ReturnDetailPage, ref: any) => {
  function checkDiskonItem(item: ReturnDetail) {
    if (item.diskon_langsung_item) {
      return item.diskon_langsung_item;
    }

    if (item.diskon_persen_item) {
      return item.diskon_persen_item;
    }

    return 0;
  }

  const columns = [
    { name: "Jumlah", uid: "jumlah" },
    { name: "Kode Item", uid: "kode_item" },
    { name: "Nama Produk", uid: "nama_produk" },
    { name: "Harga Asli", uid: "harga_asli" },
    { name: "Pot", uid: "pot" },
    { name: "Diskon Per Item", uid: "diskon_per_item" },
    { name: "Harga Setelah Diskon", uid: "harga_setelah_diskon" },
    { name: "Penalti Per Item", uid: "penalti_item" },
    { name: "Subtotal", uid: "subtotal" },
  ];

  const renderCell = (item: ReturnDetail, columnKey: React.Key) => {
    const cellValue = item[columnKey as keyof ReturnDetail];

    switch (columnKey) {
      case "jumlah":
        return (
          <div className="text-[10px] font-medium text-black">
            {item.jumlah} {item.satuan}
          </div>
        );
      case "kode_item":
        return (
          <div className="text-[10px] font-medium text-black">
            {item.kode_item}
          </div>
        );
      case "nama_produk":
        return (
          <div className="max-w-[300px] text-[10px] font-medium text-black">
            {item.nama_produk}
          </div>
        );
      case "harga_asli":
        return (
          <div className="max-w-[300px] text-[10px] font-medium text-black">
            {formatRupiah(item.harga)}
          </div>
        );
      case "pot":
        return (
          <div className="max-w-[300px] text-[10px] font-medium text-black">
            {formatRupiah(checkDiskonItem(item))}
          </div>
        );
      case "diskon_per_item":
        return (
          <div className="max-w-[300px] text-[10px] font-medium text-black">
            {formatRupiah(item.diskon_per_item)}
          </div>
        );
      case "harga_setelah_diskon":
        return (
          <div className="max-w-[300px] text-[10px] font-medium text-black">
            {formatRupiah(item.harga_setelah_diskon)}
          </div>
        );
      case "penalti_item":
        return (
          <div className="max-w-[300px] text-[10px] font-medium text-black">
            {formatRupiah(item.penalti_item)}
          </div>
        );
      case "subtotal":
        return (
          <div className="text-[10px] font-medium text-black">
            {formatRupiah(item.total_pengembalian)}
          </div>
        );

      default:
        return cellValue;
    }
  };

  return (
    <>
      <div className="container grid gap-1 pt-4 font-inter" ref={ref}>
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
              <h1 className="font-bold uppercase text-black">Nota Retur</h1>
              <div className="grid h-3">
                <div className="grid">
                  <div className="grid w-[250px] grid-cols-[70px_6px_1fr] gap-1 text-[10px] text-black">
                    <div className="font-medium">Nomor</div>
                    <div className="font-medium">:</div>
                    <p className="font-medium">{props.id_return}</p>
                  </div>

                  <div className="grid w-[250px] grid-cols-[70px_6px_1fr] gap-1 text-[10px] text-black">
                    <div className="font-medium">ID Transaksi</div>
                    <div className="font-medium">:</div>
                    <p className="font-medium">
                      {props.transaksi.id_transaksi}
                    </p>
                  </div>

                  <div className="grid w-[250px] grid-cols-[70px_6px_1fr] gap-1 text-[10px] text-black">
                    <div className="font-medium">Pembeli</div>
                    <div className="font-medium">:</div>
                    <p className="font-medium">{props.transaksi.penerima}</p>
                  </div>

                  <div className="grid w-[250px] grid-cols-[70px_6px_1fr] gap-1 text-[10px] text-black">
                    <div className="font-medium">Tanggal</div>
                    <div className="font-medium">:</div>
                    <p className="font-medium">
                      {formatDateWithoutTime(props.created_at)}
                    </p>
                  </div>

                  <div className="grid w-[250px] grid-cols-[70px_6px_1fr] gap-1 text-[10px] text-black">
                    <div className="font-medium">No. Telpon</div>
                    <div className="font-medium">:</div>
                    <p className="font-medium">
                      {props.transaksi.no_telp ?? "-"}
                    </p>
                  </div>

                  <div className="grid w-[250px] grid-cols-[70px_6px_1fr] gap-1 text-[10px] text-black">
                    <div className="font-medium">Metode</div>
                    <div className="font-medium">:</div>
                    <p className="font-medium capitalize">{props.metode}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-4">
          <Table
            isHeaderSticky
            aria-label="nota table"
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

            <TableBody items={props.returndetail}>
              {(item) => (
                <TableRow key={item.kode_item}>
                  {(columnKey) => (
                    <TableCell>{renderCell(item, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>

          <div className="flex items-center justify-between">
            <div className="grid">
              <div className="grid grid-cols-[45px_2px_1fr] gap-1 text-[10px] text-black">
                <div className="w-24 font-bold italic">Terbilang</div>
                <div className="font-bold italic">:</div>
                <p className="font-bold capitalize italic">
                  {angkaTerbilang(props.jumlah)}
                </p>
              </div>
            </div>

            <div className="grid justify-self-end border border-black p-2">
              <div className="grid grid-cols-[100px_6px_1fr] gap-1 text-[10px] text-black">
                <div className="w-24 font-medium">Subtotal</div>
                <div className="font-medium">:</div>
                <p className="font-medium">
                  {formatRupiah(
                    props.returndetail.reduce(
                      (a, b) => a + b.harga_setelah_diskon * b.jumlah,
                      0,
                    ),
                  )}
                </p>
              </div>
              <div className="grid grid-cols-[100px_6px_1fr] gap-1 text-[10px] text-black">
                <div className="w-24 font-medium">Penalti Keseluruhan</div>
                <div className="font-medium">:</div>
                <p className="font-medium">
                  {formatRupiah(
                    props.penalti_keseluruhan
                      ? props.penalti_keseluruhan
                      : props.returndetail.reduce(
                          (a, b) => a + b.penalti_item,
                          0,
                        ),
                  )}
                </p>
              </div>
              <div className="grid grid-cols-[100px_6px_1fr] gap-1 text-[10px] text-black">
                <div className="w-24 font-medium">Total</div>
                <div className="font-medium">:</div>
                <p className="font-medium">{formatRupiah(props.jumlah)}</p>
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
      </div>
    </>
  );
};

export const TemplateNotaReturnDetail = forwardRef(NotaReturnDetail);
