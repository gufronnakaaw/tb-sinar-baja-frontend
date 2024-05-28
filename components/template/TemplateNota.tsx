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

import { ListProduk, TransaksiType } from "@/types/transactions.type";
import { formatDate } from "@/utils/formatDate";

const Nota = (props: TransaksiType, ref: any) => {
  const columns = [
    { name: "Jumlah", uid: "jumlah" },
    { name: "Kode Item", uid: "kode_item" },
    { name: "Nama Produk", uid: "nama_produk" },
    { name: "Harga", uid: "harga" },
    { name: "Sub Total", uid: "subtotal" },
  ];

  const renderCell = (transaction: ListProduk, columnKey: React.Key) => {
    const cellValue = transaction[columnKey as keyof ListProduk];

    switch (columnKey) {
      case "jumlah":
        return (
          <div className="text-[10px] font-medium text-black">
            {transaction.jumlah} {transaction.satuan}
          </div>
        );
      case "kode_item":
        return (
          <div className="text-[10px] font-medium text-black">
            {transaction.kode_item}
          </div>
        );
      case "nama_produk":
        return (
          <div className="max-w-[300px] text-[10px] font-medium text-black">
            {transaction.nama_produk}
          </div>
        );
      case "harga":
        return (
          <div className="text-[10px] font-medium text-black">
            {formatRupiah(transaction.harga)}
          </div>
        );
      case "subtotal":
        return (
          <div className="text-[10px] font-medium text-black">
            {formatRupiah(transaction.sub_total)}
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
      @page { size: 21cm 14.85cm; }\
    "
        }
      </style>
      <div className="container grid gap-2 px-8 pt-4 font-inter" ref={ref}>
        <div className="grid grid-cols-3 gap-4">
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

          <h1 className="text-center font-bold uppercase text-black">
            {props.pajak ? "FAKTUR" : "NOTA"}
          </h1>
        </div>

        <div className="grid w-full grid-cols-2 items-start gap-8">
          <div className="grid">
            <div className="grid grid-cols-[30px_6px_1fr] gap-1 text-[10px] text-black">
              <div className="font-medium">No</div>
              <div className="font-medium">:</div>
              <p className="font-medium">{props.id_transaksi}</p>
            </div>

            <div className="grid grid-cols-[30px_6px_1fr] gap-1 text-[10px] text-black">
              <div className="font-medium">Tgl</div>
              <div className="font-medium">:</div>
              <p className="font-medium">{formatDate(props.created_at)}</p>
            </div>

            <div className="grid w-[250px] grid-cols-[30px_6px_1fr] gap-1 text-[10px] text-black">
              <div className="font-medium">Ket</div>
              <div className="font-medium">:</div>
              <p className="break-all font-medium">{props.keterangan}</p>
            </div>
          </div>

          <div className="grid">
            <div className="grid grid-cols-[65px_6px_1fr] gap-1 text-[10px] text-black">
              <div className="font-medium">Penerima</div>
              <div className="font-medium">:</div>
              <p className="font-medium">{props.penerima}</p>
            </div>

            <div className="grid grid-cols-[65px_6px_1fr] gap-1 text-[10px] text-black">
              <div className="font-medium">No. Telp</div>
              <div className="font-medium">:</div>
              <p className="font-medium">{props.no_telp}</p>
            </div>

            <div className="grid grid-cols-[65px_6px_1fr] gap-1 text-[10px] text-black">
              <div className="font-medium">Pengiriman</div>
              <div className="font-medium">:</div>
              <p className="font-medium">{props.pengiriman}</p>
            </div>

            <div className="grid grid-cols-[65px_6px_1fr] gap-1 text-[10px] text-black">
              <div className="font-medium">Alamat</div>
              <div className="font-medium">:</div>
              <p className="break-all font-medium">{props.alamat}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
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

            <TableBody items={props.list_produk}>
              {(transaction) => (
                <TableRow key={transaction.kode_item}>
                  {(columnKey) => (
                    <TableCell>{renderCell(transaction, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>

          <div className="grid justify-self-end border border-black p-2">
            <div className="grid grid-cols-[60px_6px_1fr] gap-1 text-[10px] text-black">
              <div className="w-24 font-medium">Ongkir</div>
              <div className="font-medium">:</div>
              <p className="font-medium">{formatRupiah(props.ongkir)}</p>
            </div>

            <div className="grid grid-cols-[60px_6px_1fr] gap-1 text-[10px] text-black">
              <div className="w-24 font-medium">Total</div>
              <div className="font-medium">:</div>
              <p className="font-medium">{formatRupiah(props.total_belanja)}</p>
            </div>

            {props.pajak ? (
              <div className="grid grid-cols-[60px_6px_1fr] gap-1 text-[10px] text-black">
                <div className="w-24 font-medium">
                  Pajak ({props.persen_pajak}%)
                </div>
                <div className="font-medium">:</div>
                <p className="font-medium">{formatRupiah(props.pajak)}</p>
              </div>
            ) : null}

            {props.diskon || props.persen_diskon ? (
              <div className="grid grid-cols-[60px_6px_1fr] gap-1 text-[10px] text-black">
                <div className="w-24 font-medium">
                  Diskon{" "}
                  {props.persen_diskon ? `(${props.persen_diskon}%)` : null}
                </div>
                <div className="font-medium">:</div>
                <p className="font-medium">
                  {formatRupiah(props.diskon ? props.diskon : 0)}
                </p>
              </div>
            ) : null}

            <div className="grid grid-cols-[60px_6px_1fr] gap-1 text-[10px] text-black">
              <div className="w-24 font-medium">Tagihan</div>
              <div className="font-medium">:</div>
              <p className="font-medium">
                {formatRupiah(props.total_pembayaran)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const TemplateNota = forwardRef(Nota);
