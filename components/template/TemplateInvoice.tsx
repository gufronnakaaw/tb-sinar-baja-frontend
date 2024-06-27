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

import { InvoutType } from "@/types/invoices.type";
import { ListProduk } from "@/types/transactions.type";
import { formatDateWithoutTime } from "@/utils/formatDate";
import { angkaTerbilang } from "@/utils/terbilang";

const Invoice = (props: InvoutType, ref: any) => {
  const columns = [
    { name: "Jumlah", uid: "jumlah" },
    { name: "Kode Item", uid: "kode_item" },
    { name: "Nama Produk", uid: "nama_produk" },
    { name: "Harga", uid: "harga" },
    { name: "Potongan", uid: "pot" },
    { name: "Subtotal", uid: "subtotal" },
  ];

  function checkDiskon(item: ListProduk) {
    if (!item.diskon_langsung_item && !item.diskon_persen_item) {
      return 0;
    }

    if (item.diskon_langsung_item) {
      return formatRupiah(item.diskon_langsung_item);
    }

    if (item.diskon_persen_item) {
      return `${item.diskon_persen_item}%`;
    }
  }

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
      case "pot":
        return (
          <div className="text-[10px] font-medium text-black">
            {checkDiskon(transaction)}
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
            <div className="mt-2">
              <h5 className="text-[10px] font-medium text-black">Kepada</h5>
              <h5 className="text-[10px] font-medium text-black">
                Yth. {props.transaksi.penerima}
              </h5>
              <h5 className="text-[10px] font-medium text-black">
                {props.transaksi.alamat}
              </h5>
            </div>
          </div>

          <div className="grid justify-end">
            <div className="flex flex-col">
              <h1 className="font-bold uppercase text-black">Invoice</h1>
              <div className="grid h-3">
                <div className="grid">
                  <div className="grid w-[250px] grid-cols-[70px_6px_1fr] gap-1 text-[10px] text-black">
                    <div className="font-medium">Nomor</div>
                    <div className="font-medium">:</div>
                    <p className="font-medium">{props.id_invoice}</p>
                  </div>

                  <div className="grid w-[250px] grid-cols-[70px_6px_1fr] gap-1 text-[10px] text-black">
                    <div className="font-medium">ID Transaksi</div>
                    <div className="font-medium">:</div>
                    <p className="font-medium">
                      {props.transaksi.id_transaksi}
                    </p>
                  </div>

                  <div className="grid w-[250px] grid-cols-[70px_6px_1fr] gap-1 text-[10px] text-black">
                    <div className="font-medium">Jatuh Tempo</div>
                    <div className="font-medium">:</div>
                    <p className="font-medium">{props.jatuh_tempo ?? "-"}</p>
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
                    <p className="font-medium">{props.transaksi.no_telp}</p>
                  </div>
                </div>
              </div>
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

            <TableBody items={props.transaksi.list_produk}>
              {(transaction) => (
                <TableRow key={transaction.kode_item}>
                  {(columnKey) => (
                    <TableCell>{renderCell(transaction, columnKey)}</TableCell>
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
                  {angkaTerbilang(props.sisa)}
                </p>
              </div>
            </div>

            <div className="grid justify-self-end border border-black p-2">
              <div className="grid grid-cols-[65px_6px_1fr] gap-1 text-[10px] text-black">
                <div className="w-24 font-medium">Ongkir</div>
                <div className="font-medium">:</div>
                <p className="font-medium">
                  {formatRupiah(props.transaksi.ongkir)}
                </p>
              </div>

              <div className="grid grid-cols-[65px_6px_1fr] gap-1 text-[10px] text-black">
                <div className="w-24 font-medium">Subtotal</div>
                <div className="font-medium">:</div>
                <p className="font-medium">
                  {formatRupiah(props.transaksi.total_belanja)}
                </p>
              </div>

              {props.transaksi.pajak ? (
                <div className="grid grid-cols-[65px_6px_1fr] gap-1 text-[10px] text-black">
                  <div className="w-24 font-medium">
                    Pajak ({props.transaksi.persen_pajak}%)
                  </div>
                  <div className="font-medium">:</div>
                  <p className="font-medium">
                    {formatRupiah(props.transaksi.pajak)}
                  </p>
                </div>
              ) : null}

              {props.transaksi.diskon || props.transaksi.persen_diskon ? (
                <div className="grid grid-cols-[65px_6px_1fr] gap-1 text-[10px] text-black">
                  <div className="w-24 font-medium">
                    Diskon{" "}
                    {props.transaksi.persen_diskon
                      ? `(${props.transaksi.persen_diskon}%)`
                      : null}
                  </div>
                  <div className="font-medium">:</div>
                  <p className="font-medium">
                    {formatRupiah(
                      props.transaksi.diskon ? props.transaksi.diskon : 0,
                    )}
                  </p>
                </div>
              ) : null}

              <div className="grid grid-cols-[65px_6px_1fr] gap-1 text-[10px] text-black">
                <div className="w-24 font-medium">Total</div>
                <div className="font-medium">:</div>
                <p className="font-medium">
                  {formatRupiah(props.transaksi.total_pembayaran)}
                </p>
              </div>
              <div className="grid grid-cols-[65px_6px_1fr] gap-1 text-[10px] text-black">
                <div className="w-24 font-medium">DP</div>
                <div className="font-medium">:</div>
                <p className="font-medium">{formatRupiah(props.dp)}</p>
              </div>
              <div className="grid grid-cols-[65px_6px_1fr] gap-1 text-[10px] text-black">
                <div className="w-24 font-medium">Tagihan</div>
                <div className="font-medium">:</div>
                <p className="font-medium">{formatRupiah(props.sisa)}</p>
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

export const TemplateInvoice = forwardRef(Invoice);
